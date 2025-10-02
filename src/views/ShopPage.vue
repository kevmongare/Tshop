<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Use the shared Menu component -->
    <Header />
    
    <!-- Products Section -->
    <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Discover Our Products</h2>
        <p class="text-gray-600 mt-2">Handpicked items just for you</p>
      </div>

      <!-- Enhanced Filters & Search -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <!-- Category & Sort Filters -->
          <div class="flex flex-col sm:flex-row gap-4">
            <!-- Category Filter -->
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select 
                v-model="selectedCategory"
                class="appearance-none bg-gray-50 border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 w-48"
              >
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 bottom-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            
            <!-- Sort Filter -->
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select 
                v-model="sortBy"
                class="appearance-none bg-gray-50 border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 w-48"
              >
                <option value="name">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 bottom-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Search -->
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
            <div class="relative w-full lg:w-64">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Search products..." 
                class="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none top-2">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Active Filters -->
        <div v-if="hasActiveFilters" class="mt-4 flex items-center space-x-2">
          <span class="text-sm text-gray-600">Active filters:</span>
          <div class="flex flex-wrap gap-2">
            <span 
              v-if="selectedCategory" 
              class="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
            >
              Category: {{ getCategoryName(selectedCategory) }}
              <button @click="clearCategory" class="ml-1 hover:text-blue-600">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </span>
            <span 
              v-if="searchQuery" 
              class="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-800"
            >
              Search: "{{ searchQuery }}"
              <button @click="clearSearch" class="ml-1 hover:text-green-600">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </span>
          </div>
          <button 
            v-if="hasActiveFilters" 
            @click="resetFilters"
            class="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
          >
            Clear all
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-if="!loading && filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
        >
          <!-- Product Image -->
          <router-link :to="`/product/${product.id}`" class="block cursor-pointer">
            <div class="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
              <!-- Display product image if available -->
              <img 
                v-if="product.image && product.image.startsWith('data:image')" 
                :src="product.image" 
                :alt="product.name"
                class="w-full h-full object-cover"
              />
              <img 
                v-else-if="product.image" 
                :src="product.image" 
                :alt="product.name"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full bg-gray-300 flex items-center justify-center">
                <span class="text-gray-500">Product Image</span>
              </div>
              
              <!-- Category Badge -->
              <div v-if="product.category" class="absolute top-3 left-3">
                <span class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {{ product.category.name }}
                </span>
              </div>
              
              <!-- Stock Badges -->
              <div v-if="product.stock < 10 && product.stock > 0" class="absolute top-3 right-3 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                Low Stock
              </div>
              <div v-if="product.stock === 0" class="absolute top-3 right-3 bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                Out of Stock
              </div>
            </div>
          </router-link>
          
          <!-- Product Details -->
          <div class="p-4 flex-1 flex flex-col">
            <router-link :to="`/product/${product.id}`" class="block cursor-pointer mb-2">
              <h3 class="text-lg font-semibold text-gray-900 line-clamp-1 hover:text-yellow-600 transition-colors">{{ product.name }}</h3>
            </router-link>
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

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="flex flex-col items-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
          <p class="mt-4 text-gray-600">Loading products...</p>
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
import { ref, onMounted, computed, watch } from 'vue';
import { useAuthStore } from '../store/auth';
import { useCartStore } from '../store/cart';
import { productAPI } from '../services/api';
import type { Product, Category } from '../services/api';
import Header from '../components/layout/Menu.vue';

const products = ref<Product[]>([]);
const categories = ref<Category[]>([]);
const loading = ref(true);
const authStore = useAuthStore();
const cartStore = useCartStore();
const searchQuery = ref('');
const selectedCategory = ref<number | string>('');
const sortBy = ref('newest');

// Computed properties
const hasActiveFilters = computed(() => {
  return searchQuery.value !== '' || selectedCategory.value !== '';
});

const filteredProducts = computed(() => {
  let filtered = [...products.value];
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query) ||
      (product.category && product.category.name.toLowerCase().includes(query))
    );
  }
  
  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category_id === Number(selectedCategory.value));
  }
  
  // Sort products
  switch (sortBy.value) {
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
    default:
      filtered.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
      break;
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
  
  // Use the cart store instead of local cartItems
  cartStore.addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: 1,
    image: product.image
  });
  
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

function getCategoryName(categoryId: number | string) {
  const category = categories.value.find(c => c.id === Number(categoryId));
  return category ? category.name : 'Unknown';
}

function clearCategory() {
  selectedCategory.value = '';
}

function clearSearch() {
  searchQuery.value = '';
}

function resetFilters() {
  searchQuery.value = '';
  selectedCategory.value = '';
  sortBy.value = 'newest';
}

async function fetchProducts() {
  loading.value = true;
  try {
    const data = await productAPI.getPublicProducts();
    products.value = data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    products.value = [];
  } finally {
    loading.value = false;
  }
}

async function fetchCategories() {
  try {
    const data = await productAPI.getCategories();
    categories.value = data;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
}

onMounted(() => {
  fetchProducts();
  fetchCategories();
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