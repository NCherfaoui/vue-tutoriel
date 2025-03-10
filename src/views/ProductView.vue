<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Dans une application réelle, ces données viendraient d'une API
const products = [
  {
    id: 1,
    title: 'Produit A',
    price: 19.99,
    description: 'Un produit de qualité supérieure',
    inStock: true,
    image: '/images/product-a.jpg',
    details: 'Ce produit est fabriqué avec les meilleurs matériaux et offre une durabilité exceptionnelle.'
  },
  {
    id: 2,
    title: 'Produit B',
    price: 29.99,
    description: 'Notre meilleure vente',
    inStock: true,
    image: '/images/product-b.jpg',
    details: 'Le produit B est notre best-seller grâce à son excellent rapport qualité-prix.'
  },
  {
    id: 3,
    title: 'Produit C',
    price: 15.50,
    description: 'Édition limitée',
    inStock: false,
    image: '/images/product-c.jpg',
    details: 'Le produit C est une édition limitée avec des caractéristiques uniques.'
  }
]

// Récupérer le produit correspondant à l'ID dans l'URL
const productId = parseInt(route.params.id)
const product = computed(() => products.find(p => p.id === productId))

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
    // Dans une application réelle, nous utiliserions un store pour gérer le panier
    alert(`${quantity} ${product.value.title} ajouté(s) au panier!`)
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
  padding: 20px;
}

.back-button {
  background: none;
  border: none;
  color: #42b883;
  cursor: pointer;
  font-size: 1.1em;
  margin-bottom: 20px;
  padding: 0;
}

.product-content {
  display: flex;
  gap: 30px;
}

.product-image {
  flex: 1;
}

.placeholder-image {
  background-color: #f0f0f0;
  border-radius: 8px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  font-size: 1.5em;
}

.product-info {
  flex: 1;
}

.price {
  color: #42b883;
  font-size: 1.5em;
  font-weight: bold;
  margin: 10px 0;
}

.description {
  font-size: 1.1em;
  margin-bottom: 15px;
}

.stock {
  font-weight: bold;
}

.out-of-stock {
  color: red;
}

.details {
  margin: 20px 0;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
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
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2em;
  height: 30px;
  width: 30px;
}

.quantity-selector span {
  margin: 0 15px;
  font-size: 1.1em;
}

.add-to-cart {
  background-color: #42b883;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 1em;
  padding: 10px 20px;
  width: 100%;
}

.not-found {
  text-align: center;
  margin-top: 50px;
}

.not-found button {
  background-color: #42b883;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 1em;
  margin-top: 20px;
  padding: 10px 20px;
}
</style>