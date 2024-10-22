import { createSlice } from '@reduxjs/toolkit';
import * as CartService from '../../services/CartService'; 

const initialState = {
  cartItems: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const { cartItem } = action.payload;
      const itemInCart = state.cartItems.find(item => item.product === cartItem.product);
      if (itemInCart) {
        itemInCart.amount += cartItem.amount;
      } else {
        state.cartItems.push(cartItem);
      }
      state.totalPrice += cartItem.price * cartItem.amount;
    },
    removeCartItem: (state, action) => {
      const { productId } = action.payload;
      state.cartItems = state.cartItems.filter(item => item.product !== productId);
    },
    updateCartItem: (state, action) => {
      const { productId, newAmount } = action.payload;
      const itemInCart = state.cartItems.find(item => item.product === productId);
      if (itemInCart) {
        state.totalPrice -= itemInCart.price * itemInCart.amount;
        itemInCart.amount = newAmount;
        state.totalPrice += itemInCart.price * newAmount;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    }
  },
});

export const { addCartItem, removeCartItem, updateCartItem, clearCart} = cartSlice.actions;

export default cartSlice.reducer;