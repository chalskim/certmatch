import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, User } from '../services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize user data on app start
  useEffect(() => {
    initializeUser();
  }, []);

  const initializeUser = async () => {
    try {
      setIsLoading(true);
      
      // Check if user is authenticated
      if (apiService.isAuthenticated()) {
        try {
          // Try to get current user data
            const userData = await apiService.getCurrentUser();
            if (userData) {
              setUser(userData);
              setIsAuthenticated(true);
              // Save user data to AsyncStorage for offline access
              await AsyncStorage.setItem('userData', JSON.stringify(userData));
            } else {
              // No user returned (empty/non-JSON response); clear any invalid auth
              await apiService.logout();
              setUser(null);
              setIsAuthenticated(false);
            }
        } catch (error: any) {
          console.error('Error getting current user:', error);
          
          // If we get a 401 error, the token is invalid/expired
          if (error.message && (error.message.includes('401') || error.message.includes('Unauthorized'))) {
            console.log('Token is invalid/expired, clearing authentication');
            await apiService.logout(); // Clear the invalid token
            
            // Try to load cached user data for offline access
            const cachedUserData = await AsyncStorage.getItem('userData');
            if (cachedUserData) {
              setUser(JSON.parse(cachedUserData));
            }
          }
          setIsAuthenticated(false);
        }
      } else {
        // Try to load cached user data
        const cachedUserData = await AsyncStorage.getItem('userData');
        if (cachedUserData) {
          setUser(JSON.parse(cachedUserData));
        }
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error initializing user:', error);
      // If API call fails, try to load cached data
      try {
        const cachedUserData = await AsyncStorage.getItem('userData');
        if (cachedUserData) {
          setUser(JSON.parse(cachedUserData));
        }
      } catch (cacheError) {
        console.error('Error loading cached user data:', cacheError);
      }
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData: User) => {
    try {
      setUser(userData);
      setIsAuthenticated(true);
      
      // Save user data to AsyncStorage
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const logout = async () => {
    try {
      // Clear user data
      setUser(null);
      setIsAuthenticated(false);
      
      // Clear cached user data
      await AsyncStorage.removeItem('userData');
      
      // Call API logout
      await apiService.logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      try {
        // Save updated user data to AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Error saving updated user data:', error);
      }
    }
  };

  const refreshUser = async () => {
    if (isAuthenticated) {
      try {
          const userData = await apiService.getCurrentUser();
          if (userData) {
            setUser(userData);
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
          } else {
            // If no user returned, clear auth state
            setUser(null);
            setIsAuthenticated(false);
            await AsyncStorage.removeItem('userData');
          }
      } catch (error) {
        console.error('Error refreshing user data:', error);
      }
    }
  };

  const value: UserContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updateUser,
    refreshUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};