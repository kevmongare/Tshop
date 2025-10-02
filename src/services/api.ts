import axios from 'axios';

const API_BASE_URL = 'https://tshopbackend.onrender.com/api';

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

export interface Category {
  id: number;
  name: string;
  description: string;
  created_at?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category_id: number;
  category?: Category;
  created_at?: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
  category_id: number;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  image?: string;
  category_id?: number;
}

// Order related interfaces
export interface Order {
  id: number;
  user_id: number;
  user?: User;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  mpesa_receipt?: string;
  phone_number?: string;
  created_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product?: Product;
  quantity: number;
  price: number;
}

export interface CreateOrderRequest {
  items: OrderItemRequest[];
  phone_number?: string;
}

export interface OrderItemRequest {
  product_id: number;
  quantity: number;
}

export interface UpdateOrderStatusRequest {
  status: Order['status'];
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
  getPublicProducts: async (categoryId?: number): Promise<Product[]> => {
    const url = categoryId ? `/products?category=${categoryId}` : '/products';
    const response = await api.get(url);
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

  updateProduct: async (id: number, product: UpdateProductRequest): Promise<Product> => {
    const response = await api.put(`/admin/products/${id}`, product);
    return response.data;
  },

  deleteProduct: async (id: number): Promise<void> => {
    await api.delete(`/admin/products/${id}`);
  },

  // Category endpoints
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data;
  },

  getProductsByCategory: async (categoryId: number): Promise<Product[]> => {
    const response = await api.get(`/products?category=${categoryId}`);
    return response.data;
  },
};

export const orderAPI = {
  // User order endpoints
  createOrder: async (orderData: CreateOrderRequest): Promise<Order> => {
    console.log('🔄 Creating order via API:', orderData);
    const response = await api.post('/orders', orderData);
    console.log('✅ Order created successfully:', response.data);
    return response.data.data;
  },

  getUserOrders: async (): Promise<Order[]> => {
    const response = await api.get('/orders');
    return response.data;
  },

  getOrder: async (id: number): Promise<Order> => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // Admin order endpoints
  getOrders: async (): Promise<Order[]> => {
    const response = await api.get('/admin/orders');
    return response.data;
  },

  updateOrderStatus: async (id: number, status: UpdateOrderStatusRequest): Promise<void> => {
    await api.put(`/admin/orders/${id}/status`, status);
  },

  // Admin user endpoints
  getUsers: async (): Promise<User[]> => {
    const response = await api.get('/admin/users');
    return response.data;
  },
};

export const normalizePhone = (num: string): string => {
  let cleaned = num.trim();
  if (cleaned.startsWith("07")) {
    return "254" + cleaned.substring(1);
  } else if (cleaned.startsWith("+254")) {
    return cleaned.substring(1);
  } else if (cleaned.startsWith("254")) {
    return cleaned;
  }
  return cleaned;
};

export interface MpesaResponse {
  success: boolean;
  message: string;
  data?: any;
}

export class PaymentService {
  static async processMpesaPayment(phone: string, amount: number): Promise<MpesaResponse> {
    const normalizedPhone = normalizePhone(phone);
    
    // Ensure amount is an integer (M-Pesa expects whole numbers)
    const amountInt = Math.round(amount);

    try {
      const res = await fetch("https://mpesaapi-sbss.onrender.com/mpesa/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: normalizedPhone,
          amount: amountInt,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        return {
          success: true,
          message: "Payment initiated successfully. Check your phone to complete the transaction.",
          data
        };
      } else {
        return {
          success: false,
          message: data.message || "Payment failed. Please try again.",
          data
        };
      }
    } catch (error) {
      console.error('MPesa payment error:', error);
      return {
        success: false,
        message: "Network error. Please check your connection and try again.",
      };
    }
  }

  static validatePhone(phone: string): string | null {
    const normalized = normalizePhone(phone);
    const phoneRegex = /^254[17]\d{8}$/;
    if (!phoneRegex.test(normalized)) {
      return "Please enter a valid Kenyan phone number";
    }
    return null;
  }
}

export default api;