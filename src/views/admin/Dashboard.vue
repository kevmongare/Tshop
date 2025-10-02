<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50/30">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-xl border-b border-gray-200/60 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <router-link 
              to="/admin/dashboard" 
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
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

        <!-- Total Users -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 hover:shadow-lg transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Users</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.totalUsers }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm text-gray-500">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
            <span>Registered users</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <router-link 
          to="/admin/products" 
          class="group bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 hover:shadow-xl hover:border-yellow-300 transition-all duration-300"
        >
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
                Manage Products
              </h3>
              <p class="text-gray-600">Add, edit, or remove products</p>
            </div>
          </div>
        </router-link>

        <router-link 
          to="/admin/orders" 
          class="group bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 hover:shadow-xl hover:border-yellow-300 transition-all duration-300"
        >
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
                Manage Orders
              </h3>
              <p class="text-gray-600">View and manage customer orders</p>
            </div>
          </div>
        </router-link>

        <router-link 
          to="/admin/users" 
          class="group bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 hover:shadow-xl hover:border-yellow-300 transition-all duration-300"
        >
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
                Manage Users
              </h3>
              <p class="text-gray-600">View and manage users</p>
            </div>
          </div>
        </router-link>
      </div>

      <!-- Recent Orders & Users -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Recent Orders -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-900">Recent Orders</h3>
            <router-link 
              to="/admin/orders" 
              class="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
            >
              View all
            </router-link>
          </div>
          
          <div class="space-y-4">
            <div 
              v-for="order in recentOrders" 
              :key="order.id"
              class="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h4 class="font-semibold text-gray-900">Order #{{ order.id }}</h4>
                  <span :class="[
                    'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                    getStatusClasses(order.status)
                  ]">
                    {{ order.status }}
                  </span>
                </div>
                <div class="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span class="font-medium">Customer:</span>
                    <p class="truncate">{{ order.user?.name || 'Unknown' }}</p>
                  </div>
                  <div>
                    <span class="font-medium">Total:</span>
                    <p class="text-gray-900 font-semibold">Ksh {{ order.total.toLocaleString() }}</p>
                  </div>
                </div>
                <div class="mt-2 text-xs text-gray-500">
                  {{ formatDate(order.created_at) }}
                </div>
              </div>
              <div class="text-right">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  :class="order.mpesa_receipt ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                  {{ order.mpesa_receipt ? 'M-Pesa' : 'Cash' }}
                </span>
              </div>
            </div>
          </div>

          <div v-if="recentOrders.length === 0" class="text-center py-8 text-gray-500">
            <svg class="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            <p>No orders found</p>
          </div>
        </div>

        <!-- Recent Users -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-900">Recent Users</h3>
            <router-link 
              to="/admin/users" 
              class="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
            >
              View all
            </router-link>
          </div>
          
          <div class="space-y-4">
            <div 
              v-for="user in recentUsers" 
              :key="user.id"
              class="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <div class="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {{ user.name.charAt(0).toUpperCase() }}
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-semibold text-gray-900 truncate">{{ user.name }}</h4>
                <p class="text-sm text-gray-500 truncate">{{ user.email }}</p>
              </div>
              <div class="text-right">
                <span :class="[
                  'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize',
                  user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                ]">
                  {{ user.role }}
                </span>
                <p class="text-xs text-gray-500 mt-1">{{ formatDate(user.created_at) }}</p>
              </div>
            </div>
          </div>

          <div v-if="recentUsers.length === 0" class="text-center py-8 text-gray-500">
            <svg class="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
            </svg>
            <p>No users found</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth';
import { orderAPI, productAPI } from '../../services/api';
import type { Order, User, Product } from '../../services/api';

const authStore = useAuthStore();
const router = useRouter();

const stats = ref({
  totalProducts: 0,
  totalOrders: 0,
  totalRevenue: 0,
  totalUsers: 0,
});

const orders = ref<Order[]>([]);
const users = ref<User[]>([]);
const products = ref<Product[]>([]);

const recentOrders = computed(() => {
  return orders.value.slice(0, 5);
});

const recentUsers = computed(() => {
  return users.value.slice(0, 5);
});

function getStatusClasses(status: string) {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800';
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function handleLogout() {
  authStore.logout();
  router.push('/login');
}

async function fetchDashboardData() {
  try {
    // Fetch all data in parallel
    const [ordersData, usersData, productsData] = await Promise.all([
      orderAPI.getOrders(),
      orderAPI.getUsers(),
      productAPI.getProducts()
    ]);

    orders.value = ordersData;
    users.value = usersData;
    products.value = productsData;

    // Calculate stats
    stats.value = {
      totalProducts: productsData.length,
      totalOrders: ordersData.length,
      totalRevenue: ordersData.reduce((total, order) => total + order.total, 0),
      totalUsers: usersData.length,
    };
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    alert('Failed to load dashboard data');
  }
}

onMounted(async () => {
  // Check if user is admin
  if (!authStore.isAdmin) {
    router.push('/profile');
    return;
  }

  await fetchDashboardData();
});
</script>