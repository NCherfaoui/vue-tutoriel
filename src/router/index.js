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