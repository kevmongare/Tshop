<template>
  <div class="max-w-7xl bg-white mx-auto px-6 py-12">
    <!-- Category Filter -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Our Products</h2>
          <p class="text-gray-600 mt-1">Discover amazing products for every need</p>
        </div>
        
        <!-- Category Filter -->
        <div class="flex items-center space-x-4">
          <label class="text-sm font-medium text-gray-700">Filter by:</label>
          <select 
            v-model="selectedCategory"
            @change="handleCategoryChange"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200"
          >
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <div 
        v-for="product in products" 
        :key="product.id"
        class="bg-white rounded-sm  overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col "
      >
        <!-- Product Image -->
        <router-link :to="`/product/${product.id}`" class="block cursor-pointer">
          <div class="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
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
              <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            
            <!-- Stock Badges -->
            <div v-if="product.stock < 10 && product.stock > 0" class="absolute top-3 left-3 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
              Low Stock
            </div>
            <div v-if="product.stock === 0" class="absolute top-3 left-3 bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
              Out of Stock
            </div>
          </div>
        </router-link>
        
        <!-- Product Details -->
        <div class="p-6 flex-1 flex flex-col">
          <!-- Category Badge -->
          <div v-if="product.category" class="mb-2">
            <span class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {{ product.category.name }}
            </span>
          </div>

          <router-link :to="`/product/${product.id}`" class="block cursor-pointer mb-3">
            <h3 class="text-xl font-semibold text-gray-900 line-clamp-1 hover:text-yellow-600 transition-colors">{{ product.name }}</h3>
          </router-link>
          
          <p class="text-gray-600 text-sm line-clamp-2 flex-1 mb-4">{{ product.description }}</p>
          
          <div class="mt-auto space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold text-gray-900">Ksh {{ product.price.toLocaleString() }}</span>
              <span class="text-sm text-gray-500">{{ product.stock }} in stock</span>
            </div>
            
            <button
              @click="addToCart(product)"
              :disabled="!authStore.isAuthenticated || product.stock === 0"
              class="w-full bg-yellow-600 text-white py-3 px-4 rounded-xl hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center font-semibold"
            >
              <svg v-if="authStore.isAuthenticated && product.stock > 0" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              {{ getButtonText(product) }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="flex flex-col items-center space-y-4">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        <p class="text-gray-600">Loading products...</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && products.length === 0" class="text-center py-12">
      <div class="max-w-md mx-auto">
        <svg class="w-24 h-24 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">
          {{ selectedCategory ? 'No products in this category' : 'No products available' }}
        </h3>
        <p class="mt-2 text-gray-500">
          {{ selectedCategory ? 'Try selecting a different category' : 'Check back later for new products.' }}
        </p>
        <button 
          v-if="selectedCategory"
          @click="clearFilter"
          class="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors duration-200"
        >
          Show All Products
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../../store/auth';
import { useCartStore } from '../../store/cart';
import { productAPI } from '../../services/api';
import type { Product, Category } from '../../services/api';

const products = ref<Product[]>([]);
const categories = ref<Category[]>([]);
const selectedCategory = ref<number | string>('');
const loading = ref(false);
const authStore = useAuthStore();
const cartStore = useCartStore();

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
  
  // Use the cart store
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

async function fetchProducts(categoryId?: number) {
  loading.value = true;
  try {
    const data = await productAPI.getPublicProducts(categoryId);
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

function handleCategoryChange() {
  if (selectedCategory.value) {
    fetchProducts(Number(selectedCategory.value));
  } else {
    fetchProducts();
  }
}

function clearFilter() {
  selectedCategory.value = '';
  fetchProducts();
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