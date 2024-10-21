import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice'; 

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    order: orderReducer, 
  },
});
