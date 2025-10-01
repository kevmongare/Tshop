import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User, LoginRequest, SignupRequest, AuthResponse } from '../services/api';
import { authAPI } from '../services/api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const isAuthenticated = computed(() => {
    const hasToken = !!token.value;
    console.log('🔐 Auth Check:', { hasToken, user: user.value });
    return hasToken && !!user.value;
  });

  // Initialize token from localStorage
  const initializeToken = () => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      token.value = storedToken;
      console.log('🔄 Token initialized from localStorage');
    } else {
      console.log('❌ No token found in localStorage');
    }
  };

  const setAuth = (newToken: string, userData: User) => {
    console.log('💾 Setting auth data:', { 
      tokenLength: newToken.length,
      user: userData 
    });
    
    token.value = newToken;
    user.value = userData;
    localStorage.setItem('authToken', newToken);
    
    console.log('✅ Auth data saved to localStorage');
  };

  const clearAuth = () => {
    console.log('🧹 Clearing auth data...');
    token.value = null;
    user.value = null;
    localStorage.removeItem('authToken');
    console.log('✅ Auth data cleared');
  };

  const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      console.log('🔐 AuthStore: Attempting login...');
      const authResponse = await authAPI.login(credentials);
      
      console.log('📦 Raw auth response:', authResponse);
      
      // Set auth data
      setAuth(authResponse.token, authResponse.user);
      console.log('✅ AuthStore: Login successful');
      
      return authResponse;
    } catch (error: any) {
      console.error('❌ AuthStore: Login failed', error);
      clearAuth();
      throw error;
    }
  };

  const signup = async (userData: SignupRequest): Promise<AuthResponse> => {
    try {
      console.log('👤 AuthStore: Attempting signup...');
      const authResponse = await authAPI.signup(userData);
      setAuth(authResponse.token, authResponse.user);
      console.log('✅ AuthStore: Signup successful');
      return authResponse;
    } catch (error: any) {
      console.error('❌ AuthStore: Signup failed', error);
      clearAuth();
      throw error;
    }
  };

  const logout = () => {
    console.log('🚪 AuthStore: Logging out...');
    clearAuth();
  };

  const checkAuth = async (): Promise<boolean> => {
    // Initialize token first
    initializeToken();
    
    if (!token.value) {
      console.log('❌ checkAuth: No token available');
      return false;
    }
    
    try {
      console.log('🔍 checkAuth: Validating token with server...');
      const userData = await authAPI.getProfile();
      user.value = userData;
      console.log('✅ checkAuth: Token is valid');
      return true;
    } catch (error) {
      console.error('❌ checkAuth: Token validation failed', error);
      clearAuth();
      return false;
    }
  };

  const isAdmin = computed(() => user.value?.role === 'admin');
  const isCustomer = computed(() => user.value?.role === 'customer');

  // Initialize when store is created
  initializeToken();

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    isCustomer,
    login,
    signup,
    logout,
    checkAuth,
  };
});