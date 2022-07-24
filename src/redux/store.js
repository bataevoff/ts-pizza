import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/filterSlice'

export const store = configureStore({
  reducer: {
    filter
  },
})