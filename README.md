# Tutoriel Vue.js - Création d'un projet pas à pas

Ce tutoriel vous guidera à travers les étapes de création d'un projet Vue.js moderne en utilisant Vite comme outil de build.

## Prérequis

- Node.js (version 16 ou supérieure recommandée)
- npm (généralement installé avec Node.js)
- Un éditeur de code (VS Code recommandé)

## Étape 1: Initialisation du projet

### Création du projet avec Vite

Vite est un outil de build moderne qui offre un démarrage rapide et des performances optimales pour les projets Vue.js.

```bash
npx create-vite nom-du-projet --template vue
cd nom-du-projet
npm install
```

### Structure du projet

Après l'initialisation, votre projet aura la structure suivante:

```
nom-du-projet/
├── .vscode/             # Configuration VS Code
├── public/              # Fichiers statiques
├── src/                 # Code source
│   ├── assets/          # Images, polices, etc.
│   ├── components/      # Composants Vue
│   ├── App.vue          # Composant racine
│   ├── main.js          # Point d'entrée
│   └── style.css        # Styles globaux
├── .gitignore           # Fichiers ignorés par Git
├── index.html           # Page HTML principale
├── package.json         # Dépendances et scripts
└── vite.config.js       # Configuration Vite
```

## Étape 2: Comprendre les fichiers clés

### main.js

C'est le point d'entrée de votre application. Il crée l'instance Vue et la monte sur l'élément DOM avec l'id 'app'.

```javascript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
```

### App.vue

C'est le composant racine de votre application. Il contient trois sections:
- `<script>`: Logique JavaScript
- `<template>`: Structure HTML
- `<style>`: Styles CSS

### Composants

Les composants sont des éléments réutilisables qui encapsulent la logique, le template et les styles. Ils sont stockés dans le dossier `components/`.

## Étape 3: Lancer le serveur de développement

```bash
npm run dev
```

Cela démarre un serveur de développement avec hot-reload à l'adresse http://localhost:5173/

## Étape 4: Ajouter des fonctionnalités (à venir)

- Routage avec Vue Router
- Gestion d'état avec Pinia
- Formulaires et validation
- Appels API
- Tests unitaires

## Étape 5: Construire pour la production

```bash
npm run build
```

Cela génère une version optimisée de votre application dans le dossier `dist/`.

## Ressources utiles

- [Documentation officielle de Vue.js](https://vuejs.org/)
- [Documentation de Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia (gestion d'état)](https://pinia.vuejs.org/)

## Prochaines étapes

Dans les prochaines sections de ce tutoriel, nous allons:
1. Créer des composants personnalisés
2. Mettre en place le routage
3. Implémenter la gestion d'état
4. Styliser l'application
5. Déployer l'application

## Étape 6: Créer des composants personnalisés

Les composants sont au cœur de Vue.js. Ils permettent de créer des éléments d'interface réutilisables et de structurer votre application de manière modulaire.

### Structure d'un composant

Un composant Vue se compose généralement de trois parties:

```vue
<script setup>
// Logique JavaScript
</script>

<template>
<!-- Structure HTML -->
</template>

<style scoped>
/* Styles CSS */
</style>
```

### Créer un composant de carte produit

Créons un composant `ProductCard.vue` dans le dossier `components/`:

```vue
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
```

### Utiliser le composant dans App.vue

Modifiez votre `App.vue` pour utiliser le nouveau composant:

```vue
<script setup>
import { ref } from 'vue'
import ProductCard from './components/ProductCard.vue'

// Données de l'application
const products = [
  {
    id: 1,
    title: 'Produit A',
    price: 19.99,
    description: 'Un produit de qualité supérieure',
    inStock: true
  },
  {
    id: 2,
    title: 'Produit B',
    price: 29.99,
    description: 'Notre meilleure vente',
    inStock: true
  },
  {
    id: 3,
    title: 'Produit C',
    price: 15.50,
    description: 'Édition limitée',
    inStock: false
  }
]

// Panier d'achat
const cart = ref([])

// Ajouter un produit au panier
const addToCart = (product) => {
  cart.value.push(product)
  alert(`${product.quantity} ${product.title} ajouté(s) au panier!`)
}
</script>

<template>
  <div class="app">
    <header>
      <h1>Ma Boutique Vue.js</h1>
      <div class="cart-info">
        Panier: {{ cart.length }} article(s)
      </div>
    </header>
    
    <main>
      <div class="products-container">
        <ProductCard 
          v-for="product in products" 
          :key="product.id"
          :title="product.title"
          :price="product.price"
          :description="product.description"
          :inStock="product.inStock"
          @add-to-cart="addToCart"
        />
      </div>
    </main>
  </div>
</template>

<style>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.products-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
</style>
```

### Concepts clés des composants

1. **Props**: Permettent de passer des données d'un composant parent à un composant enfant.
   ```javascript
   defineProps({
     title: String,
     price: Number
   })
   ```

2. **Émission d'événements**: Permettent à un composant enfant de communiquer avec son parent.
   ```javascript
   const emit = defineEmits(['add-to-cart'])
   emit('add-to-cart', data)
   ```

3. **État local**: Données réactives propres au composant.
   ```javascript
   const count = ref(0)
   ```

4. **Directives**: Instructions spéciales dans le template.
   - `v-if`: Affichage conditionnel
   - `v-for`: Rendu de liste
   - `v-bind` ou `:`: Liaison d'attributs
   - `v-on` ou `@`: Écoute d'événements

5. **Styles scoped**: Styles limités au composant.
   ```vue
   <style scoped>
   /* Styles qui n'affecteront que ce composant */
   </style>
   ```

### Cycle de vie des composants

Vue 3 utilise des hooks de cycle de vie qui peuvent être importés et utilisés dans la section `<script setup>`:

```javascript
import { onMounted, onUpdated, onUnmounted } from 'vue'

onMounted(() => {
  console.log('Le composant est monté')
})

onUpdated(() => {
  console.log('Le composant est mis à jour')
})

onUnmounted(() => {
  console.log('Le composant est démonté')
})
```

Ces hooks vous permettent d'exécuter du code à des moments spécifiques du cycle de vie d'un composant.

Restez à l'écoute pour la suite du tutoriel où nous aborderons la mise en place du routage avec Vue Router!

## Étape 7: Mettre en place le routage avec Vue Router

Le routage est essentiel pour créer des applications à page unique (SPA) avec plusieurs vues. Vue Router est la bibliothèque officielle de routage pour Vue.js.

### Installation de Vue Router

```bash
npm install vue-router@4
```

### Configuration du routeur

Créez un nouveau fichier `src/router/index.js` pour configurer vos routes:

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import CartView from '../views/CartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products/:id',
      name: 'product',
      component: ProductView,
      props: true // Passe les paramètres de route comme props au composant
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/about',
      name: 'about',
      // Chargement paresseux - le composant n'est chargé que lorsqu'on visite la route
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
```

### Intégration du routeur dans l'application

Modifiez votre fichier `main.js` pour intégrer le routeur:

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

### Création des composants de vue

Créez un dossier `views` dans le répertoire `src` pour stocker vos composants de page. Commençons par créer `HomeView.vue`:

```vue
<script setup>
import { ref } from 'vue'
import ProductCard from './components/ProductCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Données de l'application
const products = ref([
  {
    id: 1,
    title: 'Produit A',
    price: 19.99,
    description: 'Un produit de qualité supérieure',
    inStock: true
  },
  {
    id: 2,
    title: 'Produit B',
    price: 29.99,
    description: 'Notre meilleure vente',
    inStock: true
  },
  {
    id: 3,
    title: 'Produit C',
    price: 15.50,
    description: 'Édition limitée',
    inStock: false
  }
])

// Naviguer vers la page de détails du produit
const viewProduct = (productId) => {
  router.push({ name: 'product', params: { id: productId } })
}

// Ajouter un produit au panier et naviguer vers le panier
const addToCartAndView = (product) => {
  // Logique d'ajout au panier (à implémenter avec Pinia dans une prochaine étape)
  router.push({ name: 'cart' })
}
</script>

<template>
  <div class="home">
    <h1>Bienvenue dans notre boutique</h1>
    
    <div class="products-container">
      <ProductCard 
        v-for="product in products" 
        :key="product.id"
        :title="product.title"
        :price="product.price"
        :description="product.description"
        :inStock="product.inStock"
        @add-to-cart="addToCartAndView"
      />
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.products-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 30px;
}
</style>
```

Ensuite, créez `ProductView.vue` pour afficher les détails d'un produit:

```vue
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
    details: 'Édition limitée disponible pour une durée limitée. Ne manquez pas cette opportunité!'
  }
]

// Récupérer l'ID du produit depuis les paramètres de route
const productId = computed(() => parseInt(route.params.id))

// Trouver le produit correspondant
const product = computed(() => {
  return products.find(p => p.id === productId.value) || null
})

// Quantité sélectionnée
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

const addToCart = () => {
  // Logique d'ajout au panier (à implémenter avec Pinia dans une prochaine étape)
  alert(`${quantity.value} ${product.value.title} ajouté(s) au panier!`)
}

const goBack = () => {
  router.back()
}

// Rediriger si le produit n'existe pas
onMounted(() => {
  if (!product.value) {
    router.push({ name: 'home' })
  }
})
</script>

<template>
  <div v-if="product" class="product-detail">
    <button class="back-button" @click="goBack">← Retour</button>
    
    <div class="product-content">
      <div class="product-image">
        <!-- Dans une application réelle, utilisez une vraie image -->
        <div class="placeholder-image">{{ product.title }}</div>
      </div>
      
      <div class="product-info">
        <h1>{{ product.title }}</h1>
        <p class="price">{{ product.price.toFixed(2) }} €</p>
        <p class="description">{{ product.description }}</p>
        <p class="details">{{ product.details }}</p>
        
        <p class="stock" :class="{ 'out-of-stock': !product.inStock }">
          {{ product.inStock ? 'En stock' : 'Rupture de stock' }}
        </p>
        
        <div v-if="product.inStock" class="purchase-options">
          <div class="quantity-selector">
            <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
            <span>{{ quantity }}</span>
            <button @click="increaseQuantity">+</button>
          </div>
          
          <button class="add-to-cart" @click="addToCart">
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.back-button {
  background: none;
  border: none;
  color: #42b883;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 20px;
  padding: 5px 0;
}

.product-content {
  display: flex;
  gap: 40px;
}

.product-image {
  flex: 1;
}

.placeholder-image {
  background-color: #f1f1f1;
  border-radius: 8px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  font-size: 1.5rem;
}

.product-info {
  flex: 1;
}

.price {
  color: #42b883;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 10px 0;
}

.description {
  color: #666;
  margin-bottom: 10px;
}

.details {
  line-height: 1.6;
  margin-bottom: 20px;
}

.stock {
  font-weight: bold;
  margin-bottom: 20px;
}

.out-of-stock {
  color: red;
}

.purchase-options {
  margin-top: 20px;
}

.quantity-selector {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.quantity-selector button {
  background-color: #f1f1f1;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  height: 30px;
  width: 30px;
}

.quantity-selector span {
  margin: 0 15px;
  font-size: 1rem;
}

.add-to-cart {
  background-color: #42b883;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 10px 20px;
  width: 100%;
}
</style>
```

Enfin, créez `CartView.vue` pour afficher le panier:

```vue
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Dans une application réelle, ces données viendraient d'un store Pinia
const cartItems = ref([
  {
    id: 1,
    title: 'Produit A',
    price: 19.99,
    quantity: 2
  },
  {
    id: 3,
    title: 'Produit C',
    price: 15.50,
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
const removeItem = (itemId) => {
  cartItems.value = cartItems.value.filter(item => item.id !== itemId)
}

// Modifier la quantité d'un article
const updateQuantity = (itemId, newQuantity) => {
  if (newQuantity < 1) return
  
  const item = cartItems.value.find(item => item.id === itemId)
  if (item) {
    item.quantity = newQuantity
  }
}

// Continuer les achats
const continueShopping = () => {
  router.push({ name: 'home' })
}

// Passer à la caisse
const checkout = () => {
  alert('Fonctionnalité de paiement à venir dans une prochaine étape du tutoriel!')
}
</script>

<template>
  <div class="cart">
    <h1>Votre Panier</h1>
    
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Votre panier est vide.</p>
      <button class="continue-shopping" @click="continueShopping">
        Continuer vos achats
      </button>
    </div>
    
    <div v-else>
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="item-details">
            <h3>{{ item.title }}</h3>
            <p class="item-price">{{ item.price.toFixed(2) }} €</p>
          </div>
          
          <div class="item-quantity">
            <button @click="updateQuantity(item.id, item.quantity - 1)" :disabled="item.quantity <= 1">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
          </div>
          
          <div class="item-total">
            {{ (item.price * item.quantity).toFixed(2) }} €
          </div>
          
          <button class="remove-item" @click="removeItem(item.id)">
            ×
          </button>
        </div>
      </div>
      
      <div class="cart-summary">
        <div class="cart-total">
          <span>Total:</span>
          <span>{{ cartTotal.toFixed(2) }} €</span>
        </div>
        
        <div class="cart-actions">
          <button class="continue-shopping" @click="continueShopping">
            Continuer vos achats
          </button>
          <button class="checkout" @click="checkout">
            Passer à la caisse
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.empty-cart {
  text-align: center;
  margin: 50px 0;
}

.cart-items {
  margin-bottom: 30px;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.item-details {
  flex: 2;
}

.item-price {
  color: #666;
}

.item-quantity {
  display: flex;
  align-items: center;
  flex: 1;
}

.item-quantity button {
  background-color: #f1f1f1;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  height: 30px;
  width: 30px;
}

.item-quantity span {
  margin: 0 10px;
}

.item-total {
  flex: 1;
  font-weight: bold;
  text-align: right;
}

.remove-item {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: 15px;
}

.cart-summary {
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-top: 20px;
  padding: 20px;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.cart-actions {
  display: flex;
  gap: 10px;
}

.continue-shopping {
  background-color: white;
  border: 1px solid #42b883;
  border-radius: 4px;
  color: #42b883;
  cursor: pointer;
  flex: 1;
  padding: 10px;
}

.checkout {
  background-color: #42b883;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  flex: 1;
  padding: 10px;
}
</style>
```

### Mise à jour du composant App.vue

Modifiez votre `App.vue` pour intégrer le routeur:

```vue
<script setup>
// Aucune logique nécessaire ici car la gestion des routes est maintenant dans le routeur
</script>

<template>
  <div class="app">
    <header>
      <h1>Ma Boutique Vue.js</h1>
      <nav>
        <router-link to="/">Accueil</router-link> |
        <router-link to="/cart">Panier</router-link> |
        <router-link to="/about">À propos</router-link>
      </nav>
    </header>
    
    <main>
      <!-- Le composant correspondant à la route actuelle sera rendu ici -->
      <router-view />
    </main>
    
    <footer>
      <p>© 2023 Ma Boutique Vue.js - Tutoriel Vue Router</p>
    </footer>
  </div>
</template>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

header {
  padding: 20px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #eee;
  text-align: center;
}

nav {
  padding: 10px 0;
}

nav a {
  color: #2c3e50;
  margin: 0 10px;
  text-decoration: none;
}

nav a.router-link-active {
  color: #42b883;
  font-weight: bold;
}

main {
  padding: 20px;
}

footer {
  background-color: #f8f8f8;
  border-top: 1px solid #eee;
  color: #666;
  font-size: 0.8rem;
  padding: 20px;
  text-align: center;
  margin-top: 40px;
}
</style>
```

### Création d'une page À propos

Créez le fichier `AboutView.vue` dans le dossier `views`:

```vue
<template>
  <div class="about">
    <h1>À propos de notre boutique</h1>
    <p>
      Cette boutique est un exemple créé dans le cadre du tutoriel Vue.js pour illustrer
      l'utilisation de Vue Router dans une application de commerce électronique.
    </p>
    <p>
      Dans une application réelle, cette page pourrait contenir des informations sur l'entreprise,
      sa mission, son histoire, et ses valeurs.
    </p>
  </div>
</template>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

p {
  line-height: 1.6;
  margin-bottom: 20px;
}
</style>
```

### Navigation programmatique

Vue Router permet de naviguer entre les pages de manière programmatique:

```javascript
// Dans un composant Vue avec <script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Naviguer vers une page
router.push('/cart')

// Naviguer avec un nom de route
router.push({ name: 'product', params: { id: 1 } })

// Naviguer en arrière
router.back()

// Naviguer en avant
router.forward()
```

### Routes avec paramètres

Les routes peuvent contenir des paramètres dynamiques, comme l'ID d'un produit:

```javascript
{
  path: '/products/:id',
  name: 'product',
  component: ProductView,
  props: true // Passe les paramètres de route comme props au composant
}
```

Dans le composant, vous pouvez accéder à ces paramètres:

```javascript
import { useRoute } from 'vue-router'

const route = useRoute()
const productId = route.params.id
```

### Gardes de navigation

Vue Router permet de contrôler l'accès aux routes avec des gardes de navigation:

```javascript
// Dans le fichier router/index.js
router.beforeEach((to, from, next) => {
  // Vérifier si l'utilisateur est authentifié pour les routes protégées
  if (to.meta.requiresAuth && !isAuthenticated()) {
    // Rediriger vers la page de connexion
    next({ name: 'login' })
  } else {
    // Continuer la navigation
    next()
  }
})
```

### Conclusion

Vue Router est un outil puissant qui permet de créer des applications à page unique avec plusieurs vues. Il offre de nombreuses fonctionnalités comme:

- La navigation entre les pages sans rechargement
- Les routes imbriquées
- Les routes avec paramètres
- Le chargement paresseux des composants
- Les gardes de navigation pour contrôler l'accès

Dans la prochaine étape du tutoriel, nous aborderons la gestion d'état avec Pinia pour améliorer la communication entre les composants et centraliser les données de notre application.
