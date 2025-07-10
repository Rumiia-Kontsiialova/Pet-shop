import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalPrice: 0,
}

const basketSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload
      const existingItem = state.items.find((i) => i.id === item.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...item, quantity: 1 })
      }
      state.totalPrice = state.items.reduce(
        (sum, i) => sum + i.quantity * (i.discont_price || i.price),
        0
      )
    },
    removeFromCart(state, action) {
      const id = action.payload
      const item = state.items.find((i) => i.id === id)
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          state.items = state.items.filter((i) => i.id !== id)
        }
      }
      state.totalPrice = state.items.reduce(
        (sum, i) => sum + i.quantity * (i.discont_price || i.price),
        0
      )
    },
    clearCart(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const { addToCart, removeFromCart, clearCart } = basketSlice.actions
export default basketSlice.reducer
;
