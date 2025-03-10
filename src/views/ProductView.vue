<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore, useCartStore } from '../stores'

const route = useRoute()
const router = useRouter()

// Get stores
const productStore = useProductStore()
const cartStore = useCartStore()

// Récupérer le produit correspondant à l'ID dans l'URL
const productId = parseInt(route.params.id)
const product = computed(() => productStore.getProductById(productId))

// Initialiser la quantité
const quantity = ref(1)

// Fonction pour retourner à la page d'accueil
const goBack = () => {
  router.push('/')
}

// Fonction pour ajouter au panier
const addToCart = (quantity) => {
  if (product.value) {
    const cartItem = {
      id: product.value.id,
      title: product.value.title,
      price: product.value.price,
      quantity: quantity
    }
    // Utiliser le store pour gérer le panier
    cartStore.addToCart(cartItem)
    router.push('/cart')
  }
}
</script>

<template>
  <div v-if="product" class="product-detail">
    <button class="back-button" @click="goBack">← Retour</button>
    
    <div class="product-content">
      <div class="product-image">
        <!-- Dans une application réelle, nous aurions des images réelles -->
        <div class="placeholder-image">{{ product.title }}</div>
      </div>
      
      <div class="product-info">
        <h1>{{ product.title }}</h1>
        <p class="price">{{ product.price.toFixed(2) }} €</p>
        <p class="description">{{ product.description }}</p>
        <p class="stock" :class="{ 'out-of-stock': !product.inStock }">
          {{ product.inStock ? 'En stock' : 'Rupture de stock' }}
        </p>
        
        <div class="details">
          <h3>Détails du produit</h3>
          <p>{{ product.details }}</p>
        </div>
        
        <div v-if="product.inStock" class="actions">
          <div class="quantity-selector">
            <button @click="quantity > 1 ? quantity-- : null">-</button>
            <span>{{ quantity }}</span>
            <button @click="quantity++">+</button>
          </div>
          
          <button class="add-to-cart" @click="addToCart(quantity)">
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="not-found">
    <h2>Produit non trouvé</h2>
    <button @click="goBack">Retourner à l'accueil</button>
  </div>
</template>

<style scoped>
.product-detail {
  max-width: 1000px;
  margin: 0 auto;
  padding: var(--spacing-lg);
  animation: fadeIn var(--transition-normal);
}

.back-button {
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-lg);
  padding: 0;
  transition: color var(--transition-fast);
}

.back-button:hover {
  color: var(--color-primary-dark);
}

.product-content {
  display: flex;
  gap: var(--spacing-xl);
  margin-top: var(--spacing-md);
}

.product-image {
  flex: 1;
}

.placeholder-image {
  background-color: var(--color-background-light);
  border-radius: var(--border-radius-md);
  color: var(--color-text-light);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  font-size: var(--font-size-xl);
  box-shadow: var(--box-shadow);
  transition: transform var(--transition-normal);
}

.placeholder-image:hover {
  transform: scale(1.02);
}

.product-info {
  flex: 1;
}

.price {
  color: var(--color-primary);
  font-size: var(--font-size-xl);
  font-weight: bold;
  margin: var(--spacing-sm) 0;
}

.description {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

.stock {
  font-weight: bold;
}

.out-of-stock {
  color: var(--color-accent);
}

.details {
  margin: var(--spacing-lg) 0;
  padding: var(--spacing-md);
  background-color: var(--color-background-light);
  border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow);
}

.actions {
  margin-top: 20px;
}

.quantity-selector {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.quantity-selector button {
  background-color: var(--color-background-light);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-size: var(--font-size-lg);
  height: 30px;
  width: 30px;
  transition: all var(--transition-fast);
}

.quantity-selector button:hover {
  background-color: var(--color-border);
}

.quantity-selector span {
  margin: 0 15px;
  font-size: 1.1em;
}

.add-to-cart {
  background-color: var(--color-primary);
  border: none;
  border-radius: var(--border-radius-md);
  color: white;
  cursor: pointer;
  font-size: var(--font-size-md);
  padding: var(--spacing-sm) var(--spacing-md);
  width: 100%;
  transition: background-color var(--transition-fast);
}

.add-to-cart:hover {
  background-color: var(--color-primary-dark);
}

.not-found {
  text-align: center;
  margin-top: var(--spacing-xl);
  animation: fadeIn var(--transition-normal);
}

.not-found button {
  background-color: var(--color-primary);
  border: none;
  border-radius: var(--border-radius-md);
  color: white;
  cursor: pointer;
  font-size: var(--font-size-md);
  margin-top: var(--spacing-lg);
  padding: var(--spacing-sm) var(--spacing-md);
  transition: background-color var(--transition-fast);
}

.not-found button:hover {
  background-color: var(--color-primary-dark);
}
</style>