<script setup>
import { ref } from 'vue'
import ProductCard from '../components/ProductCard.vue'

// Données de l'application
const products = [
  {
    id: 1,
    title: 'Produit A',
    price: 19.99,
    description: 'Un produit de qualité supérieure',
    inStock: true,
    image: '/images/product-a.jpg'
  },
  {
    id: 2,
    title: 'Produit B',
    price: 29.99,
    description: 'Notre meilleure vente',
    inStock: true,
    image: '/images/product-b.jpg'
  },
  {
    id: 3,
    title: 'Produit C',
    price: 15.50,
    description: 'Édition limitée',
    inStock: false,
    image: '/images/product-c.jpg'
  }
]
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
        @add-to-cart="$emit('add-to-cart', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
}

.products-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #42b883;
}
</style>