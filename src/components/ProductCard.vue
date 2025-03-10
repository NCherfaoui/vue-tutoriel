<script setup>
import { ref } from 'vue'

// Définition des props (données passées au composant)
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  inStock: {
    type: Boolean,
    default: true
  }
})

// État local du composant
const quantity = ref(1)

// Méthodes
const increaseQuantity = () => {
  quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

// Émettre un événement vers le composant parent
const emit = defineEmits(['add-to-cart'])

const addToCart = () => {
  emit('add-to-cart', {
    title: props.title,
    price: props.price,
    quantity: quantity.value
  })
}
</script>

<template>
  <div class="product-card">
    <h3>{{ title }}</h3>
    <p class="price">{{ price.toFixed(2) }} €</p>
    <p v-if="description">{{ description }}</p>
    <p class="stock" :class="{ 'out-of-stock': !inStock }">
      {{ inStock ? 'En stock' : 'Rupture de stock' }}
    </p>
    
    <div class="quantity-selector">
      <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
      <span>{{ quantity }}</span>
      <button @click="increaseQuantity">+</button>
    </div>
    
    <button 
      class="add-to-cart" 
      @click="addToCart" 
      :disabled="!inStock"
    >
      Ajouter au panier
    </button>
  </div>
</template>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  max-width: 300px;
}

.price {
  font-weight: bold;
  font-size: 1.2em;
  color: #42b883;
}

.stock {
  font-size: 0.9em;
}

.out-of-stock {
  color: red;
}

.quantity-selector {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.quantity-selector button {
  background-color: #f1f1f1;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.quantity-selector span {
  margin: 0 10px;
}

.add-to-cart {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.add-to-cart:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>