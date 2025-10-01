<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Modern Header -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <svg class="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path>
            </svg>
            <h1 class="text-2xl font-bold text-gray-900">ModernShop</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <router-link 
              to="/" 
              class="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center"
            >
              <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              Home
            </router-link>
            
            <div v-if="authStore.isAuthenticated" class="relative">
              <button 
                @click="toggleCartDropdown"
                class="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors duration-200 flex items-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                Cart
                <span v-if="cartItemsCount > 0" class="ml-1 bg-white text-yellow-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {{ cartItemsCount }}
                </span>
              </button>
              
              <!-- Cart Dropdown -->
              <div v-if="showCartDropdown" class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-20 border border-gray-200">
                <div class="p-4">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Your Cart</h3>
                  <div v-if="cartItems.length > 0" class="max-h-60 overflow-y-auto">
                    <div v-for="item in cartItems" :key="item.id" class="flex items-center py-2 border-b border-gray-100">
                      <div class="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0"></div>
                      <div class="ml-3 flex-1">
                        <p class="text-sm font-medium text-gray-900 truncate">{{ item.name }}</p>
                        <p class="text-xs text-gray-500">Ksh {{ item.price }} x {{ item.quantity }}</p>
                      </div>
                      <button @click="removeFromCart(item)" class="text-gray-400 hover:text-red-500">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div v-else class="py-4 text-center text-gray-500">
                    Your cart is empty
                  </div>
                  <div class="mt-4 pt-4 border-t border-gray-200">
                    <div class="flex justify-between mb-2">
                      <span class="text-gray-600">Total:</span>
                      <span class="font-semibold">Ksh {{ cartTotal }}</span>
                    </div>
                    <router-link 
                      to="/cart" 
                      class="block w-full bg-yellow-600 text-white text-center py-2 rounded-lg hover:bg-yellow-700 transition-colors duration-200"
                      @click="showCartDropdown = false"
                    >
                      View Cart
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            
            <router-link 
              v-else
              to="/login" 
              class="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors duration-200 flex items-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
              </svg>
              Login to Shop
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Products Section -->
    <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Discover Our Products</h2>
        <p class="text-gray-600 mt-2">Handpicked items just for you</p>
      </div>

      <!-- Filters & Search -->
      <div class="bg-white rounded-xl shadow-sm p-4 mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div class="flex space-x-4">
            <div class="relative">
              <select v-model="selectedCategory" class="appearance-none bg-gray-50 border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            
            <div class="relative">
              <select v-model="sortBy" class="appearance-none bg-gray-50 border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="relative w-full md:w-64">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search products..." 
              class="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="flex flex-col items-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
          <p class="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
        >
          <!-- Product Image -->
          <div class="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
            <div class="w-full h-full bg-gray-300 flex items-center justify-center">
              <span class="text-gray-500">Product Image</span>
            </div>
            <div v-if="product.stock < 10 && product.stock > 0" class="absolute top-3 left-3 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
              Low Stock
            </div>
            <div v-if="product.stock === 0" class="absolute top-3 left-3 bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
              Out of Stock
            </div>
          </div>
          
          <!-- Product Details -->
          <div class="p-4 flex-1 flex flex-col">
            <h3 class="text-lg font-semibold text-gray-900 line-clamp-1">{{ product.name }}</h3>
            <p class="text-gray-600 text-sm mt-1 line-clamp-2 flex-1">{{ product.description }}</p>
            
            <div class="mt-4 flex justify-between items-center">
              <span class="text-2xl font-bold text-gray-900">Ksh {{ product.price.toLocaleString() }}</span>
              <span class="text-sm text-gray-500">{{ product.stock }} in stock</span>
            </div>
            
            <button
              @click="addToCart(product)"
              :disabled="!authStore.isAuthenticated || product.stock === 0"
              class="mt-4 w-full bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
            >
              <svg v-if="authStore.isAuthenticated && product.stock > 0" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              {{ getButtonText(product) }}
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && filteredProducts.length === 0" class="text-center py-12">
        <div class="max-w-md mx-auto">
          <svg class="w-24 h-24 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900">No products found</h3>
          <p class="mt-2 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          <button 
            @click="resetFilters"
            class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Reset filters
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '../store/auth';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const products = ref<Product[]>([]);
const loading = ref(true);
const authStore = useAuthStore();
const showCartDropdown = ref(false);
const searchQuery = ref('');
const selectedCategory = ref('');
const sortBy = ref('name');
const cartItems = ref<CartItem[]>([]);

// Sample categories - in a real app, these would come from an API
const categories = ref(['Electronics', 'Clothing', 'Home & Garden', 'Books', 'Toys']);

// Computed properties
const cartItemsCount = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0);
});

const cartTotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});

const filteredProducts = computed(() => {
  let filtered = [...products.value];
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query)
    );
  }
  
  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategory.value);
  }
  
  // Sort products
  if (sortBy.value === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy.value === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }
  
  return filtered;
});

// Methods
function getButtonText(product: Product) {
  if (!authStore.isAuthenticated) {
    return 'Login to Purchase';
  }
  if (product.stock === 0) {
    return 'Out of Stock';
  }
  return 'Add to Cart';
}

function addToCart(product: Product) {
  if (!authStore.isAuthenticated || product.stock === 0) {
    return;
  }
  
  // Check if product is already in cart
  const existingItem = cartItems.value.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.value.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }
  
  // Show success feedback
  const button = event?.target as HTMLElement;
  const originalText = button.innerText;
  button.innerText = 'Added!';
  button.classList.add('bg-green-600');
  
  setTimeout(() => {
    button.innerText = originalText;
    button.classList.remove('bg-green-600');
  }, 1500);
}

function removeFromCart(item: CartItem) {
  cartItems.value = cartItems.value.filter(cartItem => cartItem.id !== item.id);
}

function toggleCartDropdown() {
  showCartDropdown.value = !showCartDropdown.value;
}

function resetFilters() {
  searchQuery.value = '';
  selectedCategory.value = '';
  sortBy.value = 'name';
}

async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:8080/api/products');
    if (response.ok) {
      products.value = await response.json();
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchProducts();
  
  // Close cart dropdown when clicking outside
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      showCartDropdown.value = false;
    }
  });
});
</script>

<style scoped>
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>