import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import categoryReducer from './slices/categorySlice';
import searchReducer from './slices/searchSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    category: categoryReducer,
    search: searchReducer,
  },
});

export default store;