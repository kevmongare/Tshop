<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '../../store/auth';
import { useCartStore, type CartItem } from '../../store/cart';

interface MenuItem {
  name: string;
  path: string;
}

const MenuList: MenuItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'About', path: '/about' },
];

const mobileMenuOpen = ref(false);
const authStore = useAuthStore();
const cartStore = useCartStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);

function toggleMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}

function closeMenu() {
  mobileMenuOpen.value = false;
  cartStore.closeCartDropdown();
}

function handleLogout() {
  authStore.logout();
  closeMenu();
}

function handleRemoveFromCart(item: CartItem) {
  cartStore.removeFromCart(item);
}

// Close dropdown when clicking outside
function handleClickOutside(event: Event) {
  const target = event.target as HTMLElement;
  if (!target.closest('.cart-dropdown') && !target.closest('.cart-button')) {
    cartStore.closeCartDropdown();
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <nav class="bg-white backdrop-blur-xl shadow-sm sticky p-5 top-0 z-50 border-b border-gray-200/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link
          to="/"
          class="flex items-center space-x-3 group"
          @click="closeMenu"
        >
          <div class="flex items-center text-4xl">
            T-Shop
          </div>
        </router-link>

        <!-- Desktop Menu -->
        <ul class="hidden md:flex items-center space-x-8">
          <li v-for="(item, i) in MenuList" :key="i">
            <router-link
              :to="item.path"
              class="relative text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-300 py-2 group"
              active-class="text-yellow-600"
            >
              {{ item.name }}
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-full"></span>
              <span v-if="$route.path === item.path" class="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-600"></span>
            </router-link>
          </li>
        </ul>

        <!-- Desktop Actions -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- Cart with Dropdown -->
          <div v-if="isAuthenticated" class="relative cart-dropdown">
            <button
              @click="cartStore.toggleCartDropdown()"
              class="cart-button relative p-2 text-gray-600 hover:text-yellow-600 transition-colors duration-300 hover:bg-yellow-50 rounded-xl flex items-center"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 13m-7.5 5.5L12 13"/>
              </svg>
              <span
                v-if="cartStore.cartItemsCount > 0"
                class="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg"
              >
                {{ cartStore.cartItemsCount }}
              </span>
            </button>
            
            <!-- Cart Dropdown -->
            <div 
              v-if="cartStore.showCartDropdown" 
              class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-20 border border-gray-200"
            >
              <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Your Cart</h3>
                <div v-if="cartStore.cartItems.length > 0" class="max-h-60 overflow-y-auto">
                  <div 
                    v-for="item in cartStore.cartItems" 
                    :key="item.id" 
                    class="flex items-center py-2 border-b border-gray-100"
                  >
                    <div class="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center">
                      <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                      </svg>
                    </div>
                    <div class="ml-3 flex-1">
                      <p class="text-sm font-medium text-gray-900 truncate">{{ item.name }}</p>
                      <p class="text-xs text-gray-500">Ksh {{ item.price }} x {{ item.quantity }}</p>
                    </div>
                    <button 
                      @click="handleRemoveFromCart(item)" 
                      class="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
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
                    <span class="font-semibold">Ksh {{ cartStore.cartTotal }}</span>
                  </div>
                  <router-link 
                    to="/cart" 
                    class="block w-full bg-yellow-600 text-white text-center py-2 rounded-lg hover:bg-yellow-700 transition-colors duration-200"
                    @click="cartStore.closeCartDropdown()"
                  >
                    View Cart
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Auth Buttons / User Menu -->
          <template v-if="!isAuthenticated">
            <router-link
              to="/login"
              class="px-4 py-2 text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-300"
            >
              Login
            </router-link>
            <router-link
              to="/signup"
              class="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-yellow-500/25 hover:scale-105 transition-all duration-300"
            >
              Sign Up
            </router-link>
          </template>

          <template v-else>
            <router-link
              :to="user?.role === 'admin' ? '/admin/dashboard' : '/profile'"
              class="flex items-center space-x-3 px-4 py-2 bg-gray-100 hover:bg-yellow-50 rounded-xl transition-colors duration-300 group"
            >
              <div class="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {{ user?.name?.charAt(0)?.toUpperCase() }}
              </div>
              <div class="text-left">
                <div class="text-sm font-semibold text-gray-900">{{ user?.name }}</div>
                <div class="text-xs text-gray-500 capitalize">{{ user?.role }}</div>
              </div>
            </router-link>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMenu"
          class="md:hidden p-2 rounded-xl text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 transition-colors duration-300"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-show="mobileMenuOpen"
        class="md:hidden border-t border-gray-200/60 bg-white/95 backdrop-blur-xl rounded-b-2xl shadow-xl"
      >
        <div class="py-4 space-y-2">
          <!-- Menu Items -->
          <router-link
            v-for="(item, i) in MenuList"
            :key="i"
            :to="item.path"
            @click="closeMenu"
            class="flex items-center px-4 py-3 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-xl transition-colors duration-300 mx-2"
            active-class="text-yellow-600 bg-yellow-50"
          >
            {{ item.name }}
          </router-link>

          <!-- Cart -->
          <div v-if="isAuthenticated">
            <router-link
              to="/cart"
              @click="closeMenu"
              class="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-xl transition-colors duration-300 mx-2"
            >
              <span>Cart</span>
              <span
                v-if="cartStore.cartItemsCount > 0"
                class="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold"
              >
                {{ cartStore.cartItemsCount }} items
              </span>
            </router-link>
          </div>

          <!-- Auth Buttons -->
          <template v-if="!isAuthenticated">
            <router-link
              to="/login"
              @click="closeMenu"
              class="flex items-center px-4 py-3 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-xl transition-colors duration-300 mx-2"
            >
              Login
            </router-link>
            <router-link
              to="/signup"
              @click="closeMenu"
              class="flex items-center px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl mx-2 shadow-lg"
            >
              Sign Up
            </router-link>
          </template>

          <template v-else>
            <router-link
              :to="user?.role === 'admin' ? '/admin/dashboard' : '/profile'"
              @click="closeMenu"
              class="flex items-center space-x-3 px-4 py-3 bg-gray-100 hover:bg-yellow-50 rounded-xl transition-colors duration-300 mx-2"
            >
              <div class="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {{ user?.name?.charAt(0)?.toUpperCase() }}
              </div>
              <div class="flex-1">
                <div class="text-sm font-semibold text-gray-900">{{ user?.name }}</div>
                <div class="text-xs text-gray-500 capitalize">{{ user?.role }}</div>
              </div>
            </router-link>
            <button
              @click="handleLogout"
              class="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-300 mx-2"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              Logout
            </button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>