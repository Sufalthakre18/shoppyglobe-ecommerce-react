// Manages cart state: items, quantities, add/remove actions
import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array of { id, title, price, thumbnail, quantity }
  },
  reducers: {
    // Add product to cart or increment quantity if already exists
    addToCart: (state, action) => {
      const existing = state.items.find(item => item.id === action.payload.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },

    // Remove product from cart entirely
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },

    // Update quantity - minimum quantity is 1
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      if (item && quantity >= 1) {
        item.quantity = quantity
      }
    },

    // Clear all items from cart (used after order placement)
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0)
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)

export default cartSlice.reducer