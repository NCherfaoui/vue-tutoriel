import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  
  getters: {
    cartCount: (state) => {
      return state.items.length
    },
    cartTotal: (state) => {
      return state.items.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    },
    formattedCartTotal: (state) => {
      return state.items.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0).toFixed(2) + ' €'
    }
  },
  
  actions: {
    addToCart(product) {
      // Check if the product is already in the cart
      const existingItem = this.items.find(item => item.id === product.id)
      
      if (existingItem) {
        // If it exists, increase the quantity
        existingItem.quantity += product.quantity
      } else {
        // Otherwise, add it as a new item
        this.items.push(product)
      }
    },
    
    removeFromCart(productId) {
      const index = this.items.findIndex(item => item.id === productId)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    },
    
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
      }
    },
    
    clearCart() {
      this.items = []
    }
  }
})