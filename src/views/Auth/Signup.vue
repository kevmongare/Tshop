<template>
  <div class="min-h-screen grid grid-cols-1 md:grid-cols-2">
    <!-- Left side: background image or info -->
    <div class="hidden md:flex items-center justify-center bg-black text-white p-10">
      <div class="text-center">
        <h2 class="text-4xl font-bold mb-4">Join Us Today</h2>
        <p class="text-lg">Create your account and explore the shop.</p>
      </div>
    </div>

    <!-- Right side: signup form -->
    <div class="flex items-center justify-center p-8 bg-white">
      <div class="w-full max-w-md space-y-6">
        <h2 class="text-3xl font-bold text-center text-gray-800">Create an account</h2>

        <!-- Success Message -->
        <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p class="font-bold">Success!</p>
          <p>{{ success }}</p>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p class="font-bold">Signup Failed</p>
          <p>{{ error }}</p>
        </div>

        <form @submit.prevent="handleSignup" class="space-y-5">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              placeholder="John Doe"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              :disabled="loading"
            />
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              id="email"
              v-model="form.email"
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
              v-model="form.password"
              type="password"
              required
              placeholder="••••••••"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              :disabled="loading"
            />
          </div>

          <!-- Confirm Password -->
          <div>
            <label for="confirm" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              id="confirm"
              v-model="form.confirmPassword"
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
            class="w-full bg-black text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Creating Account...</span>
            <span v-else>Sign Up</span>
          </button>
        </form>

        <p class="text-sm text-center text-gray-600">
          Already have an account?
          <router-link to="/login" class="text-black hover:underline font-medium">Log in</router-link>
        </p>
        <router-link to="/" class="hover:text-black underline font-medium">Return to HomePage</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth';
import type { SignupRequest } from '../../services/api';

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const loading = ref(false);
const error = ref('');
const success = ref('');

const authStore = useAuthStore();
const router = useRouter();

async function handleSignup() {
  if (loading.value) return;

  // Reset messages
  error.value = '';
  success.value = '';

  // Validation
  if (form.value.password !== form.value.confirmPassword) {
    error.value = '❌ Passwords do not match';
    return;
  }

  if (form.value.password.length < 6) {
    error.value = '❌ Password must be at least 6 characters';
    return;
  }

  if (!form.value.name || !form.value.email || !form.value.password) {
    error.value = '❌ Please fill in all fields';
    return;
  }

  loading.value = true;

  try {
    console.log('🚀 Starting signup process...');
    
    const userData: SignupRequest = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    };

    console.log('📤 Sending signup request:', { 
      name: userData.name,
      email: userData.email, 
      passwordLength: userData.password.length 
    });

    // Call the auth store to register the user
    await authStore.signup(userData);

    console.log('✅ Signup successful in component');
    console.log('👤 User after signup:', authStore.user);
    console.log('🔑 Token after signup:', authStore.token);

    success.value = '✅ Account created successfully! Redirecting...';

    // Wait a moment to show success message, then redirect
    setTimeout(() => {
      if (authStore.isAdmin) {
        router.push('/admin/dashboard');
      } else {
        router.push('/profile');
      }
    }, 1500);

  } catch (err: any) {
    console.error('💥 SIGNUP COMPONENT ERROR:', err);
    
    const errorDetails = {
      message: err.message,
      status: err.response?.status,
      statusText: err.response?.statusText,
      data: err.response?.data,
      code: err.code
    };
    
    console.error('📋 Error details:', errorDetails);

    // User-friendly error messages
    if (err.code === 'NETWORK_ERROR' || err.message.includes('Network Error')) {
      error.value = '🌐 Network error: Cannot connect to server. Please check if the backend is running.';
    } else if (err.code === 'ECONNABORTED') {
      error.value = '⏰ Request timeout: Server is taking too long to respond.';
    } else if (err.response?.status === 400) {
      error.value = err.response?.data?.error || '❌ Invalid signup data. Please check your information.';
    } else if (err.response?.status === 409) {
      error.value = '❌ User with this email already exists.';
    } else if (err.response?.status === 0) {
      error.value = '🔗 Cannot connect to server. Check if the backend is running on localhost:8080.';
    } else {
      error.value = err.response?.data?.error || '❌ Signup failed. Please try again.';
    }
  } finally {
    loading.value = false;
  }
}
</script>