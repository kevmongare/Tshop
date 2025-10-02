<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="flex flex-col items-center space-y-4">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        <p class="text-gray-600">Loading product...</p>
      </div>
    </div>

    <!-- Product Not Found -->
    <div v-else-if="!product" class="flex justify-center items-center py-20">
      <div class="text-center">
        <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p class="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
        <router-link 
          to="/shop" 
          class="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors duration-200"
        >
          Back to Shop
        </router-link>
      </div>
    </div>

    <!-- Product Details -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <!-- Product Images -->
          <div class="space-y-4">
            <!-- Main Image -->
            <div class="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden flex items-center justify-center">
              <div v-if="product.image" class="w-full h-full flex items-center justify-center">
                <img :src="product.image" :alt="product.name" class="w-full h-full object-cover">
              </div>
              <div v-else class="text-gray-400 text-center">
                <svg class="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <p>No Image Available</p>
              </div>
            </div>
          </div>

          <!-- Product Info -->
          <div class="space-y-6">
            <!-- Breadcrumb -->
            <nav class="flex space-x-2 text-sm text-gray-500">
              <router-link to="/" class="hover:text-yellow-600">Home</router-link>
              <span>/</span>
              <router-link to="/shop" class="hover:text-yellow-600">Shop</router-link>
              <span>/</span>
              <span class="text-gray-900">{{ product.name }}</span>
            </nav>

            <!-- Product Title -->
            <h1 class="text-3xl font-bold text-gray-900">{{ product.name }}</h1>

            <!-- Price -->
            <div class="flex items-baseline space-x-2">
              <span class="text-4xl font-bold text-gray-900">Ksh {{ product.price.toLocaleString() }}</span>
            </div>

            <!-- Stock Status -->
            <div class="flex items-center space-x-2">
              <span :class="[
                'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                product.stock > 10 ? 'bg-green-100 text-green-800' : 
                product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              ]">
                {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock' }}
              </span>
              <span v-if="product.stock < 10 && product.stock > 0" class="text-sm text-yellow-600">
                Low stock - Order soon!
              </span>
            </div>

            <!-- Description -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p class="text-gray-600 leading-relaxed">{{ product.description }}</p>
            </div>

            <!-- Add to Cart -->
            <div class="space-y-4">
              <button
                @click="addToCart"
                :disabled="!authStore.isAuthenticated || product.stock === 0"
                class="w-full bg-yellow-600 text-white py-4 px-6 rounded-xl hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2 font-semibold text-lg"
              >
                <svg v-if="authStore.isAuthenticated && product.stock > 0" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                <span>{{ getButtonText() }}</span>
              </button>

              <!-- Success Message -->
              <div v-if="showSuccess" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Added to cart successfully!</span>
              </div>

              <!-- Auth Required Message -->
              <div v-if="!authStore.isAuthenticated" class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-lg">
                <p class="flex items-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  <span>Please login to add items to your cart</span>
                </p>
              </div>
            </div>

            <!-- Additional Info -->
            <div class="border-t border-gray-200 pt-6 space-y-4">
              <div class="flex items-center space-x-2 text-sm text-gray-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Usually ships within 24 hours</span>
              </div>
              <div class="flex items-center space-x-2 text-sm text-gray-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Free shipping on orders over Ksh 5,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products (Optional) -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Related products would go here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import { useCartStore } from '../store/cart';
import { productAPI } from '../services/api';
import type { Product } from '../services/api';
import Header from '../components/layout/Menu.vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();

const product = ref<Product | null>(null);
const loading = ref(true);
const showSuccess = ref(false);

const productId = parseInt(route.params.id as string);

function getButtonText() {
  if (!authStore.isAuthenticated) {
    return 'Login to Purchase';
  }
  if (product.value?.stock === 0) {
    return 'Out of Stock';
  }
  return 'Add to Cart';
}

async function addToCart() {
  if (!authStore.isAuthenticated || !product.value || product.value.stock === 0) {
    return;
  }

  // Add to cart using the cart store
  cartStore.addToCart({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    quantity: 1,
    image: product.value.image
  });

  // Show success message
  showSuccess.value = true;
  setTimeout(() => {
    showSuccess.value = false;
  }, 3000);
}

async function fetchProduct() {
  try {
    loading.value = true;
    const productData = await productAPI.getPublicProduct(productId);
    product.value = productData;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    product.value = null;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchProduct();
});
</script>