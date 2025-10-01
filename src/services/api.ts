import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance with better configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Enhanced request interceptor with better token handling
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    
    console.log('🔐 API Request:', {
      url: config.url,
      method: config.method,
      hasToken: !!token,
    });
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ Token added to headers');
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Enhanced response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Success: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`);
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    
    console.error('💥 API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('🔐 401 Unauthorized - Clearing auth data');
      localStorage.removeItem('authToken');
      
      // Redirect to login if not already there
      if (!window.location.pathname.includes('/login')) {
        console.log('🔄 Redirecting to login');
        window.location.href = '/login';
      }
    }
    
    // Handle 403 Forbidden (Admin access)
    if (error.response?.status === 403) {
      console.log('🚫 403 Forbidden - Admin access required');
      if (!window.location.pathname.includes('/profile')) {
        window.location.href = '/profile';
      }
    }
    
    return Promise.reject(error);
  }
);

// Debug function to check token validity
export const checkTokenStatus = () => {
  const token = localStorage.getItem('authToken');
  console.log('🔍 Token Status Check:', {
    hasToken: !!token,
    tokenLength: token?.length,
    tokenPreview: token ? token.substring(0, 20) + '...' : 'No token',
  });
  return !!token;
};

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expires_at: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  created_at?: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
}

export const authAPI = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      console.log('🔐 API: Attempting login...', { email: credentials.email });
      const response = await api.post('/auth/login', credentials);
      console.log('✅ API: Login successful');
      
      const authResponse = response.data.data;
      return authResponse;
    } catch (error: any) {
      console.error('❌ API: Login failed', error.response?.data);
      throw error;
    }
  },

  signup: async (userData: SignupRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/signup', userData);
    return response.data.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/profile');
    return response.data.data;
  },

  health: async (): Promise<any> => {
    const response = await api.get('/auth/health');
    return response.data;
  },

  // ADDED: Token validation function
  validateToken: async (): Promise<any> => {
    try {
      console.log('🔐 Validating token...');
      const response = await api.get('/auth/profile');
      console.log('✅ Token validation successful');
      return response.data;
    } catch (error: any) {
      console.error('❌ Token validation failed:', error.response?.data);
      throw error;
    }
  },
};

export const productAPI = {
  // Public product endpoints (no auth required)
  getPublicProducts: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
  },

  getPublicProduct: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Admin product endpoints (require admin auth)
  getProducts: async (): Promise<Product[]> => {
    console.log('🔄 Fetching products via admin endpoint...');
    const response = await api.get('/admin/products');
    console.log('✅ Products fetched successfully');
    return response.data;
  },

  getProduct: async (id: number): Promise<Product> => {
    const response = await api.get(`/admin/products/${id}`);
    return response.data;
  },

  createProduct: async (product: CreateProductRequest): Promise<Product> => {
    const response = await api.post('/admin/products', product);
    return response.data;
  },

  updateProduct: async (id: number, product: Partial<Product>): Promise<Product> => {
    const response = await api.put(`/admin/products/${id}`, product);
    return response.data;
  },

  deleteProduct: async (id: number): Promise<void> => {
    await api.delete(`/admin/products/${id}`);
  },
};

export default api;