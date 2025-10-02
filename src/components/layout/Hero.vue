<template>
  <section class="relative h-screen bg-[url('https://tshop-lorx.vercel.app/bg.jpg')] bg-fixed bg-cover bg-center">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 opacity-10 bg-black  h-screen">
      <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-black rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
      <div class="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      <div class="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
    </div>

    <!-- Content -->
    <div class="relative max-w-7xl mx-auto px-6 h-full flex items-center justify-center">
      <div class="text-center space-y-8 animate-fadeInUp">
        <!-- Badge -->
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 backdrop-blur-sm">
          <span class="text-yellow-400 text-sm font-semibold tracking-wider">PREMIUM AFRICAN LUXURY</span>
        </div>

        <!-- Main Heading -->
        <h1 class="text-6xl md:text-8xl font-black text-white tracking-tight">
          T-<span class="text-yellow-400">Shop</span>
        </h1>

        <!-- Subheading -->
        <p class="text-xl md:text-2xl text-gray-300 bg-black/50 max-w-2xl mx-auto leading-relaxed font-light">
          Discover the finest African luxury merchandise. 
          <span class="text-yellow-400 font-semibold">Authentic</span>, 
          <span class="text-yellow-400 font-semibold">Elegant</span>, 
          <span class="text-yellow-400 font-semibold">Timeless</span>.
        </p>

        <!-- CTA Button -->
        <div class="pt-4">
          <router-link
            to="/shop"
            class="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl shadow-2xl shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
          >
            <span class="relative z-10">Explore Collection</span>
            <div class="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg class="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </router-link>
        </div>

        <!-- Stats -->
        <div class="flex justify-center items-center space-x-8 pt-8 text-gray-400 bg-black/30">
          <div class="text-center">
            <div class="text-2xl font-bold text-white">500+</div>
            <div class="text-sm">Premium Products</div>
          </div>
          <div class="w-1 h-8 bg-yellow-400/30 rounded-full"></div>
          <div class="text-center">
            <div class="text-2xl font-bold text-white">10K+</div>
            <div class="text-sm">Happy Customers</div>
          </div>
          <div class="w-1 h-8 bg-yellow-400/30 rounded-full"></div>
          <div class="text-center">
            <div class="text-2xl font-bold text-white">5★</div>
            <div class="text-sm">Rated Service</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div class="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center">
        <div class="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 1s ease-out forwards;
}
</style>