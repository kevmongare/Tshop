<template>
  <footer class="bg-black text-gray-300 pt-12 pb-6">
    <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
      
      <!-- Brand -->
      <div>
        <h2 class="text-2xl font-bold text-white">Tshop</h2>
        <p class="mt-3 text-sm leading-relaxed">
          Discover the latest fashion, gadgets, and essentials at unbeatable prices.
          Quality products delivered right to your doorstep.
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-3">Quick Links</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="/" class="hover:text-white transition">Home</a></li>
          <li><a href="/products" class="hover:text-white transition">Shop</a></li>
          <li><a href="/about" class="hover:text-white transition">About Us</a></li>
          <li><a href="/contact" class="hover:text-white transition">Contact</a></li>
        </ul>
      </div>

      <!-- Customer Service -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-3">Customer Service</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="/faq" class="hover:text-white transition">FAQs</a></li>
          <li><a href="/shipping" class="hover:text-white transition">Shipping & Returns</a></li>
          <li><a href="/orders" class="hover:text-white transition">Order Tracking</a></li>
          <li><a href="/support" class="hover:text-white transition">Support</a></li>
        </ul>
      </div>

      <!-- Newsletter -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-3">Stay Updated</h3>
        <p class="text-sm mb-3">
          Subscribe to our newsletter and get the latest deals & offers.
        </p>
        <form class="flex flex-col sm:flex-row gap-3">
          <input 
            type="email" 
            placeholder="Enter your email" 
            class="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none border-gray-200 border text-white"
          />
          <button 
            type="submit" 
            class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition"
          >
            Subscribe
          </button>
        </form>
      </div>

    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-gray-700 mt-10 pt-4 text-center text-sm">
      <p>&copy; {{ new Date().getFullYear() }} Tshop. All rights reserved.</p>
      <div class="flex justify-center space-x-6 mt-3">
        <a href="#" class="hover:text-white transition">🐦</a>
        <a href="#" class="hover:text-white transition">📘</a>
        <a href="#" class="hover:text-white transition">📸</a>
      </div>
    </div>
  </footer>
</template>
