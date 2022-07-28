import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/filterSlice'
import cart from './cart/cartSlice'

export const store = configureStore({
  reducer: {
    filter,
    cart
  },
})