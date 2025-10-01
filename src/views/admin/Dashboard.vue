<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50/30">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-xl border-b border-gray-200/60 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <router-link 
              to="/" 
              class="flex items-center space-x-3 group"
            >
              <div class="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span class="text-white font-black text-sm">T</span>
              </div>
              <span class="text-xl font-black text-gray-900 group-hover:text-yellow-600 transition-colors">
                Shop
              </span>
            </router-link>
            <div class="h-6 w-px bg-gray-300"></div>
            <h1 class="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <div class="text-sm text-gray-600">Welcome back</div>
              <div class="font-semibold text-gray-900">{{ authStore.user?.name }}</div>
            </div>
            <button 
              @click="handleLogout"
              class="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-300"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Total Products -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 hover:shadow-lg transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Products</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.totalProducts }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm text-gray-500">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
            <span>All active products</span>
          </div>
        </div>

        <!-- Total Orders -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 hover:shadow-lg transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Orders</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.totalOrders }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm text-gray-500">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
            <span>All customer orders</span>
          </div>
        </div>

        <!-- Total Revenue -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 hover:shadow-lg transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Revenue</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">Ksh {{ stats.totalRevenue?.toLocaleString() }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm text-gray-500">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
            <span>Lifetime revenue</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <router-link 
          to="/admin/products" 
          class="group bg-white rounded-2xl shadow-sm border border-gray-200/60 p-8 hover:shadow-xl hover:border-yellow-300 transition-all duration-300"
        >
          <div class="flex items-center space-x-6">
            <div class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors mb-2">
                Manage Products
              </h3>
              <p class="text-gray-600 leading-relaxed">Add, edit, or remove products from your store. Manage inventory and product details.</p>
            </div>
            <svg class="w-6 h-6 text-gray-400 group-hover:text-yellow-600 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </router-link>

        <router-link 
          to="/admin/orders" 
          class="group bg-white rounded-2xl shadow-sm border border-gray-200/60 p-8 hover:shadow-xl hover:border-yellow-300 transition-all duration-300"
        >
          <div class="flex items-center space-x-6">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors mb-2">
                View Orders
              </h3>
              <p class="text-gray-600 leading-relaxed">See all customer orders, track shipments, and manage order fulfillment.</p>
            </div>
            <svg class="w-6 h-6 text-gray-400 group-hover:text-yellow-600 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </router-link>
      </div>

      <!-- Recent Activity Placeholder -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-8">
        <h3 class="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
        <div class="text-center py-12 text-gray-500">
          <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <p class="text-lg mb-2">No recent activity</p>
          <p class="text-gray-400">Activity will appear here as customers interact with your store</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth';

const authStore = useAuthStore();
const router = useRouter();

const stats = ref({
  totalProducts: 0,
  totalOrders: 0,
  totalRevenue: 0,
});

function handleLogout() {
  authStore.logout();
  router.push('/login');
}

onMounted(async () => {
  // Check if user is admin
  if (!authStore.isAdmin) {
    router.push('/profile');
    return;
  }

  // TODO: Fetch real stats from backend API
  // For now, these will show 0 until backend endpoints are implemented
  try {
    // Example of how you would fetch real data:
    // const response = await fetch('/api/admin/stats');
    // stats.value = await response.json();
    
    // Remove prebuilt data - showing zeros until real data is fetched
    stats.value = {
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
    };
  } catch (error) {
    console.error('Failed to fetch admin stats:', error);
  }
});
</script>