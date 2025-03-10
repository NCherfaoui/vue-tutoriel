<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores'

const router = useRouter()
const cartStore = useCartStore()

// Calculer le total du panier (maintenant géré par le store)
const cartItems = computed(() => cartStore.items)
const cartTotal = computed(() => cartStore.cartTotal)

// Supprimer un article du panier
const removeFromCart = (itemId) => {
  cartStore.removeFromCart(itemId)
}

// Continuer les achats
const continueShopping = () => {
  router.push('/')
}

// Passer à la caisse
const checkout = () => {
  alert('Fonctionnalité de paiement à venir!')
  // Dans une application réelle, nous redirigerions vers une page de paiement
}
</script>

<template>
  <div class="cart-view">
    <h1>Votre Panier</h1>
    
    <div v-if="cartItems.length > 0" class="cart-content">
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="item-info">
            <h3>{{ item.title }}</h3>
            <p class="price">{{ item.price.toFixed(2) }} €</p>
            <p class="quantity">Quantité: {{ item.quantity }}</p>
          </div>
          <div class="item-actions">
            <p class="item-total">{{ (item.price * item.quantity).toFixed(2) }} €</p>
            <button class="remove-button" @click="removeFromCart(item.id)">
              Supprimer
            </button>
          </div>
        </div>
      </div>
      
      <div class="cart-summary">
        <h3>Récapitulatif</h3>
        <div class="summary-row">
          <span>Sous-total:</span>
          <span>{{ cartTotal.toFixed(2) }} €</span>
        </div>
        <div class="summary-row">
          <span>Livraison:</span>
          <span>Gratuite</span>
        </div>
        <div class="summary-row total">
          <span>Total:</span>
          <span>{{ cartTotal.toFixed(2) }} €</span>
        </div>
        <button class="checkout-button" @click="checkout">
          Passer à la caisse
        </button>
        <button class="continue-button" @click="continueShopping">
          Continuer les achats
        </button>
      </div>
    </div>
    
    <div v-else class="empty-cart">
      <p>Votre panier est vide.</p>
      <button class="continue-button" @click="continueShopping">
        Parcourir les produits
      </button>
    </div>
  </div>
</template>

<style scoped>
.cart-view {
  max-width: 1000px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

h1 {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  color: var(--color-primary);
}

.cart-content {
  display: flex;
  gap: var(--spacing-xl);
}

.cart-items {
  flex: 2;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow);
  transition: transform var(--transition-fast);
}

.cart-item:hover {
  transform: translateY(-3px);
}

.item-info h3 {
  margin-top: 0;
  margin-bottom: 10px;
}

.price {
  color: var(--color-primary);
  font-weight: bold;
}

.quantity {
  color: var(--color-text-light);
}

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
}

.item-total {
  font-weight: bold;
  font-size: 1.1em;
}

.remove-button {
  background: none;
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
  border-radius: var(--border-radius-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.remove-button:hover {
  background-color: var(--color-accent);
  color: white;
}

.cart-summary {
  flex: 1;
  padding: var(--spacing-lg);
  background-color: var(--color-background-light);
  border-radius: var(--border-radius-md);
  align-self: flex-start;
  box-shadow: var(--box-shadow);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--color-border);
}

.total {
  font-weight: bold;
  font-size: var(--font-size-lg);
  color: var(--color-primary);
}

.checkout-button {
  background-color: var(--color-primary);
  border: none;
  border-radius: var(--border-radius-md);
  color: white;
  cursor: pointer;
  font-size: var(--font-size-md);
  padding: var(--spacing-sm) var(--spacing-md);
  width: 100%;
  margin-top: var(--spacing-lg);
  transition: background-color var(--transition-fast);
}

.checkout-button:hover {
  background-color: var(--color-primary-dark);
}

.continue-button {
  background: none;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-size: var(--font-size-md);
  padding: var(--spacing-sm) var(--spacing-md);
  width: 100%;
  margin-top: var(--spacing-sm);
  transition: all var(--transition-fast);
}

.continue-button:hover {
  background-color: var(--color-primary-light);
  color: white;
}

.empty-cart {
  text-align: center;
  padding: var(--spacing-xl) 0;
  animation: fadeIn var(--transition-normal);
}

.empty-cart p {
  font-size: 1.2em;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .cart-content {
    flex-direction: column;
  }
  
  .cart-summary {
    width: 100%;
  }
}
</style>