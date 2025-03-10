<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Dans une application réelle, ces données viendraient d'un store
const cartItems = ref([
  {
    id: 1,
    title: 'Produit A',
    price: 19.99,
    quantity: 2
  },
  {
    id: 2,
    title: 'Produit B',
    price: 29.99,
    quantity: 1
  }
])

// Calculer le total du panier
const cartTotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)
})

// Supprimer un article du panier
const removeFromCart = (itemId) => {
  const index = cartItems.value.findIndex(item => item.id === itemId)
  if (index !== -1) {
    cartItems.value.splice(index, 1)
  }
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
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #42b883;
}

.cart-content {
  display: flex;
  gap: 30px;
}

.cart-items {
  flex: 2;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.item-info h3 {
  margin-top: 0;
  margin-bottom: 10px;
}

.price {
  color: #42b883;
  font-weight: bold;
}

.quantity {
  color: #666;
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
  border: 1px solid #ff6b6b;
  color: #ff6b6b;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.cart-summary {
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  align-self: flex-start;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.total {
  font-weight: bold;
  font-size: 1.2em;
  color: #42b883;
}

.checkout-button {
  background-color: #42b883;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 1em;
  padding: 10px 20px;
  width: 100%;
  margin-top: 20px;
}

.continue-button {
  background: none;
  border: 1px solid #42b883;
  color: #42b883;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  padding: 10px 20px;
  width: 100%;
  margin-top: 10px;
}

.empty-cart {
  text-align: center;
  padding: 50px 0;
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