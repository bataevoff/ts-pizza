import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/filterSlice'
import cart from './cart/cartSlice'
import pizza from './pizza/pizzaSlice'

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza
  },
})