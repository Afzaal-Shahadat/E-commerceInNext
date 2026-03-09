// lib/store.js
'use client';

import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart') || '[]') : [] },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exist = state.items.find(i => i._id === item._id);
      if (exist) exist.quantity = (exist.quantity || 1) + 1;
      else state.items.push({ ...item, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i._id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

const store = configureStore({ reducer: { cart: cartSlice.reducer } });

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}