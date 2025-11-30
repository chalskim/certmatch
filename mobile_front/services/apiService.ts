import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// API base URL configuration - use environment variables for flexibility
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 
  (__DEV__ ? (
    Platform.OS === 'android' ? 'http://10.0.2.2:3002/api/v1' :
    Platform.OS === 'ios' ? 'http://localhost:3002/api/v1' :
    'http://localhost:3002/api/v1' // fallback for other platforms
  ) : 'https://your-production-domain.com/api/v1');

// Log the API base URL for verification
console.log('API Base URL:', API_BASE_URL);
console.log('Platform:', Platform.OS);
console.log('Development mode:', __DEV__);

// Types for our API responses
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role: 'company' | 'consultant' | 'educator' | 'admin';
}

export interface LoginData {
  email: string;
  password: string;
}

class ApiService {
  private token: string | null = null;
  
  private async ensureTokenLoaded() {
    if (!this.token) {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          this.token = token;
        }
      } catch (error) {
        console.log('Error ensuring token:', error);
      }
    }
  }

  constructor() {
    this.loadToken();
  }

  // Load token from storage
  private async loadToken() {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        this.token = token;
      }
    } catch (error) {
      console.log('Error loading token:', error);
    }
  }

  // Save token to storage
  private async saveToken(token: string) {
    try {
      await AsyncStorage.setItem('authToken', token);
      this.token = token;
    } catch (error) {
      console.log('Error saving token:', error);
    }
  }

  // Clear token from storage
  private async clearToken() {
    try {
      await AsyncStorage.removeItem('authToken');
      this.token = null;
    } catch (error) {
      console.log('Error clearing token:', error);
    }
  }

  // Get headers for API requests
  private getHeaders(includeAuth: boolean = true) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Generic API request method
  private async apiRequest<T>(
    endpoint: string,
    method: string = 'GET',
    data?: any,
    includeAuth: boolean = true
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`Making API request to: ${url}`, { method, data });
    
    if (includeAuth) {
      await this.ensureTokenLoaded();
    }

    const options: RequestInit = {
      method,
      headers: this.getHeaders(includeAuth),
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);

      // Check if the response is empty (no content)
      const contentType = response.headers.get('content-type');
      if (!response.ok) {
        // Try to parse error response, handle empty responses gracefully
        const errorData = contentType?.includes('application/json') ? 
          await response.json().catch(() => ({})) : 
          { message: 'No response from server' };
        console.log(`API request failed with status ${response.status}:`, errorData);
        
        // Handle specific error cases based on status code and endpoint
        if (response.status === 401) {
          if (endpoint.includes('register')) {
            throw new Error('이미 등록된 이메일 주소입니다. 다른 이메일을 사용해주세요.');
          } else if (endpoint.includes('login')) {
            // Check for specific login error messages from server
            if (errorData.message && errorData.message.includes('User not found')) {
              throw new Error('회원정보가 없습니다. 회원가입을 먼저 진행해주세요.');
            } else if (errorData.message && errorData.message.includes('Invalid password')) {
              throw new Error('비밀번호가 틀렸습니다. 다시 확인해주세요.');
            } else {
              throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
            }
          }
        } else if (response.status === 500) {
          throw new Error('서버 오류입니다. 잠시 후 다시 시도해주세요.');
        } else if (response.status === 404) {
          throw new Error('요청한 서비스를 찾을 수 없습니다.');
        } else if (response.status === 403) {
          throw new Error('접근 권한이 없습니다.');
        }
        
        throw new Error(errorData.message || `서버 오류가 발생했습니다. (상태 코드: ${response.status})`);
      }

      // Handle successful response
      if (response.status === 204) { // No Content
        return {} as T;
      }
      
      // Read response as text first
      const text = await response.text();

      // If empty body, return empty object (caller should handle null/empty)
      if (!text) {
        return {} as T;
      }

      // If content-type is not JSON, try to parse anyway; if parse fails, return the raw text
      if (!contentType?.includes('application/json')) {
        console.warn('API request returned non-JSON content-type:', contentType);
        try {
          return JSON.parse(text) as T;
        } catch (parseError) {
          console.warn('Failed to parse non-JSON response as JSON, returning raw text as fallback. parseError:', parseError);
          return text as unknown as T;
        }
      }

      try {
        return JSON.parse(text) as T;
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error('서버 응답을 처리하는 중 오류가 발생했습니다.');
      }
    } catch (error: any) {
      console.log(`API request failed: ${error}`);
      
      // Handle network/CORS errors specifically
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('서버에 연결할 수 없습니다. 네트워크 연결을 확인하거나 나중에 다시 시도해주세요.');
      }
      
      throw error;
    }
  }

  // Register a new user
  async register(userData: RegisterData): Promise<AuthResponse> {
    console.log('Attempting registration with data:', userData);
    const response = await this.apiRequest<AuthResponse>(
      '/auth/register',
      'POST',
      userData,
      false // No auth needed for registration
    );
    
    console.log('Registration response:', response);

    // Save the token if registration is successful
    if (response.access_token) {
      await this.saveToken(response.access_token);
    }

    return response;
  }

  // Login user
  async login(credentials: LoginData): Promise<AuthResponse> {
    console.log('Attempting login with credentials:', credentials);
    const response = await this.apiRequest<AuthResponse>(
      '/auth/login',
      'POST',
      credentials,
      false // No auth needed for login
    );

    // Save the token if login is successful
    if (response.access_token) {
      await this.saveToken(response.access_token);
    }

    return response;
  }

  // Logout user
  async logout(): Promise<void> {
    await this.clearToken();
  }

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    try {
      const res = await this.apiRequest<User | null>('/users/me', 'GET');
      // If API returned an empty object or raw text, normalize to null
      if (!res || (typeof res === 'object' && Object.keys(res).length === 0)) {
        return null;
      }
      return res as User;
    } catch (error) {
      // Bubble up error for callers to handle, or return null if desired
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.token;
  }

  async get<T>(endpoint: string, includeAuth: boolean = true): Promise<{ data: T }> {
    const data = await this.apiRequest<T>(endpoint, 'GET', undefined, includeAuth);
    return { data };
  }

  async post<T>(endpoint: string, payload: any, includeAuth: boolean = true): Promise<{ data: T }> {
    const data = await this.apiRequest<T>(endpoint, 'POST', payload, includeAuth);
    return { data };
  }

  async patch<T>(endpoint: string, payload: any, includeAuth: boolean = true): Promise<{ data: T }> {
    const data = await this.apiRequest<T>(endpoint, 'PATCH', payload, includeAuth);
    return { data };
  }

  async put<T>(endpoint: string, payload: any, includeAuth: boolean = true): Promise<{ data: T }> {
    const data = await this.apiRequest<T>(endpoint, 'PUT', payload, includeAuth);
    return { data };
  }

  async delete<T>(endpoint: string, includeAuth: boolean = true): Promise<{ data: T }> {
    const data = await this.apiRequest<T>(endpoint, 'DELETE', undefined, includeAuth);
    return { data };
  }
}

// Export singleton instance
export const apiService = new ApiService();
