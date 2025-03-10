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
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  margin: var(--spacing-md) 0;
  max-width: 300px;
  box-shadow: var(--box-shadow);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.price {
  font-weight: bold;
  font-size: var(--font-size-lg);
  color: var(--color-primary);
}

.stock {
  font-size: var(--font-size-sm);
}

.out-of-stock {
  color: var(--color-accent);
}

.quantity-selector {
  display: flex;
  align-items: center;
  margin: var(--spacing-md) 0;
}

.quantity-selector button {
  background-color: var(--color-background-light);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.quantity-selector button:hover {
  background-color: var(--color-border);
}

.quantity-selector span {
  margin: 0 var(--spacing-md);
  font-weight: bold;
}

.add-to-cart {
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  width: 100%;
  transition: background-color var(--transition-fast);
}

.add-to-cart:hover {
  background-color: var(--color-primary-dark);
}

.add-to-cart:disabled {
  background-color: var(--color-text-light);
  cursor: not-allowed;
}
</style>