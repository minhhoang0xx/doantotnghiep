import { createSlice } from '@reduxjs/toolkit';

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
          state.cartItems.push({ ...cartItem, amount: cartItem.amount });
        } else {
          console.warn('Attempted to add empty cart item:', cartItem); 
        }
      }
      state.totalPrice += cartItem.price * cartItem.amount; // Total
    },
    updateCartItem: (state, action) => {
      const { productId, newAmount } = action.payload;
      const itemInCart = state.cartItems.find(item => item.product === productId);
      if (itemInCart) {
          state.totalPrice -= itemInCart.price * itemInCart.amount; // Trừ giá trị cũ
          itemInCart.amount = newAmount; // Cập nhật số lượng mới
          state.totalPrice += itemInCart.price * newAmount; // Cộng giá trị mới
      }
  },
  removeCartItem: (state, action) => {
      const { productId } = action.payload;
      const itemToRemove = state.cartItems.find(item => item.product === productId);
      if (itemToRemove) {
          state.totalPrice -= itemToRemove.price * itemToRemove.amount; // Cập nhật tổng giá trị
      }
      state.cartItems = state.cartItems.filter(item => item.product !== productId); // Xóa sản phẩm khỏi giỏ hàng
  },
  removeSelectedItems: (state, action) => {
    const selectedItems = action.payload; // Lấy danh sách sản phẩm từ payload
    // Lọc ra các mục không nằm trong danh sách được chọn
    state.cartItems = state.cartItems.filter(item => !selectedItems.some(selected => selected.product === item.product));
    // Cập nhật tổng giá trị
    state.totalPrice = state.cartItems.reduce((total, item) => total + item.price * item.amount, 0);
},
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

export const { addCartItem, removeCartItem, updateCartItem, clearCart, removeSelectedItems } = cartSlice.actions;

export default cartSlice.reducer;
