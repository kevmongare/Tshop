<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '../../store/auth';

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
const cartItemCount = ref(3);
const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);

function toggleMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}

function closeMenu() {
  mobileMenuOpen.value = false;
}

function handleLogout() {
  authStore.logout();
  closeMenu();
}
</script>

<template>
  <nav class="bg-white/80 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-gray-200/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link
          to="/"
          class="flex items-center space-x-3 group"
        >
          <div class="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <span class="text-white font-black text-lg">T</span>
          </div>
          <span class="text-2xl font-black text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
            Shop
          </span>
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
          <!-- Cart -->
          <router-link
            to="/cart"
            class="relative p-2 text-gray-600 hover:text-yellow-600 transition-colors duration-300 hover:bg-yellow-50 rounded-xl"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 13m-7.5 5.5L12 13"/>
            </svg>
            <span
              v-if="cartItemCount > 0"
              class="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg"
            >
              {{ cartItemCount }}
            </span>
          </router-link>

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
          <router-link
            to="/cart"
            @click="closeMenu"
            class="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-xl transition-colors duration-300 mx-2"
          >
            <span>Cart</span>
            <span
              v-if="cartItemCount > 0"
              class="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold"
            >
              {{ cartItemCount }} items
            </span>
          </router-link>

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