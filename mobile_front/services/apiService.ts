import AsyncStorage from '@react-native-async-storage/async-storage';

// API base URL - using hardcoded value for now to avoid import issues
// In a production app, you might want to use a more sophisticated configuration approach
const API_BASE_URL = 'http://localhost:3001/api/v1';

// Log the API base URL for verification
console.log('API Base URL:', API_BASE_URL);

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
    
    const options: RequestInit = {
      method,
      headers: this.getHeaders(includeAuth),
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
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

      return await response.json();
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
  async getCurrentUser(): Promise<User> {
    return await this.apiRequest<User>('/users/me', 'GET');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.token;
  }
}

// Export singleton instance
export const apiService = new ApiService();