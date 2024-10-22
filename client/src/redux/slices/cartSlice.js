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
      const cartItem = action.payload; 
      const itemInCart = state.cartItems.find(item => item.product === cartItem.product);
      if (itemInCart) {
        itemInCart.amount += cartItem.amount;
      } else {
        if (cartItem.product && cartItem.name && cartItem.price && cartItem.image) {
          state.cartItems.push({ ...cartItem, amount: 1 }); // Khởi tạo amount thành 1 nếu sản phẩm mới
        } else {
          console.warn('Attempted to add empty cart item:', cartItem); // Log cảnh báo nếu sản phẩm trống
        }
      }
      state.totalPrice += cartItem.price * cartItem.amount; // Tính toán tổng giá trị
    },
    removeCartItem: (state, action) => {
      const { productId } = action.payload;
      const itemToRemove = state.cartItems.find(item => item.product === productId);
      if (itemToRemove) {
        state.totalPrice -= itemToRemove.price * itemToRemove.amount; // Cập nhật tổng giá trị
      }
      state.cartItems = state.cartItems.filter(item => item.product !== productId);
    },
    updateCartItem: (state, action) => {
      const { productId, newAmount } = action.payload;
      const itemInCart = state.cartItems.find(item => item.product === productId);
      if (itemInCart) {
        state.totalPrice -= itemInCart.price * itemInCart.amount; // Trừ giá trị cũ
        itemInCart.amount = newAmount;
        state.totalPrice += itemInCart.price * newAmount; // Cộng giá trị mới
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

export const { addCartItem, removeCartItem, updateCartItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
