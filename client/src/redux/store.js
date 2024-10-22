import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice'; 
import cartReducer from './slices/cartSlice'; 

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    order: orderReducer, 
    cart: cartReducer, 
  },
});
