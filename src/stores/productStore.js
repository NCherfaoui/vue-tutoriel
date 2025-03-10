import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [
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
  }),
  
  getters: {
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === id)
    },
    inStockProducts: (state) => {
      return state.products.filter(product => product.inStock)
    }
  }
})