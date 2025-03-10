<script setup>
import { ref } from 'vue'
import { useProductStore, useCartStore } from '../stores'
import ProductCard from '../components/ProductCard.vue'

// Get stores
const productStore = useProductStore()
const cartStore = useCartStore()

// Get products from the store
const products = productStore.products

// Handle add to cart event
const handleAddToCart = (product) => {
  cartStore.addToCart(product)
}
</script>

<template>
  <div class="home">
    <h2>Nos produits</h2>
    <div class="products-container">
      <ProductCard 
        v-for="product in products" 
        :key="product.id"
        :title="product.title"
        :price="product.price"
        :description="product.description"
        :inStock="product.inStock"
        @add-to-cart="handleAddToCart"
      />
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  animation: fadeIn var(--transition-normal);
}

.products-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
  justify-content: center;
  margin-top: var(--spacing-lg);
}

h2 {
  text-align: center;
  margin-bottom: var(--spacing-lg);
  color: var(--color-primary);
  font-size: var(--font-size-xl);
  position: relative;
  padding-bottom: var(--spacing-sm);
}

h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background-color: var(--color-primary-light);
  border-radius: var(--border-radius-sm);
}
</style>