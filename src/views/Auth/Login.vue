<template>
  <div class="min-h-screen grid grid-cols-1 md:grid-cols-2">
    <!-- Left Side: Background / Image -->
    <div class="hidden md:flex items-center justify-center bg-yellow-600 text-white">
      <div class="text-center p-10">
        <h2 class="text-4xl font-bold mb-4">Welcome Back!</h2>
        <p class="text-lg">Log in to manage your store and orders.</p>
      </div>
    </div>

    <!-- Right Side: Form -->
    <div class="flex items-center justify-center bg-white p-8">
      <div class="w-full max-w-md space-y-6">
        <h2 class="text-3xl font-bold text-gray-800 text-center">Login to your account</h2>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              placeholder="you@example.com"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              :disabled="loading"
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              placeholder="••••••••"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              :disabled="loading"
            />
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Logging in...</span>
            <span v-else>Login</span>
          </button>
        </form>

        <p class="text-center text-sm text-gray-600">
          Don't have an account?
          <router-link to="/signup" class="text-yellow-600 hover:underline">Sign up</router-link>
        </p>
        <router-link to="/" class="hover:text-yellow-600 underline font-medium">Return to HomePage</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth';
import { authAPI, checkTokenStatus } from '../../services/api';

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

const authStore = useAuthStore();
const router = useRouter();

async function handleLogin() {
  if (loading.value) return;

  loading.value = true;
  error.value = '';

  try {
    console.log('=== LOGIN FLOW START ===');
    
    // Step 1: Check initial state
    console.log('📋 Step 1 - Initial state:');
    checkTokenStatus();
    
    // Step 2: Call login
    console.log('📋 Step 2 - Calling authStore.login...');
    const authResponse = await authStore.login({
      email: email.value,
      password: password.value,
    });
    console.log('✅ Login response:', authResponse);

    // Step 3: Check state after login
    console.log('📋 Step 3 - State after login:');
    checkTokenStatus();
    console.log('AuthStore user:', authStore.user);
    console.log('AuthStore token:', authStore.token);

    // Step 4: Test token immediately
    console.log('📋 Step 4 - Testing token...');
    try {
      const profile = await authAPI.validateToken();
      console.log('✅ Token test successful:', profile);
    } catch (testError) {
      console.error('❌ Token test failed:', testError);
      throw new Error('Token is not working after login');
    }

    // Step 5: Wait for state to settle
    console.log('📋 Step 5 - Waiting for state to settle...');
    await new Promise(resolve => setTimeout(resolve, 100));

    // Step 6: Redirect
    console.log('📋 Step 6 - Redirecting...');
    const userRole = authResponse.user.role;
    console.log('User role:', userRole);
    
    if (userRole === 'admin') {
      await router.push('/admin/dashboard');
    } else {
      await router.push('/profile');
    }
    
    console.log('=== LOGIN FLOW COMPLETE ===');
    
  } catch (err: any) {
    console.error('=== LOGIN FLOW FAILED ===');
    console.error('Error:', err);
    
    if (err.response?.data?.error) {
      error.value = err.response.data.error;
    } else if (err.message) {
      error.value = err.message;
    } else {
      error.value = 'Login failed. Please try again.';
    }
    
    // Final state check on error
    console.log('📋 Final state on error:');
    checkTokenStatus();
  } finally {
    loading.value = false;
  }
}
</script>