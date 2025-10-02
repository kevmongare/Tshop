<script setup lang="ts">
import Hero from '../components/layout/Hero.vue'
import Header from '../components/layout/Menu.vue'
import Product from '../components/product/ProductList.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <Header />
    <Hero />
    <Product/>
  </div>
</template>