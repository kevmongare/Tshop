<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">Shopping Cart</h1>
      </div>
    </header>

    <main class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div v-if="cartItems.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">Your cart is empty</p>
        <router-link to="/shop" class="text-yellow-600 hover:underline mt-4 inline-block">
          Continue Shopping
        </router-link>
      </div>

      <div v-else class="bg-white shadow rounded-lg">
        <!-- Cart items and checkout button -->
        <div class="p-6">
          <p>Cart functionality will be implemented here</p>
          <router-link 
            to="/checkout" 
            class="mt-4 bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700"
          >
            Proceed to Checkout
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const cartItems = ref([]); // Will be populated from cart store
</script>