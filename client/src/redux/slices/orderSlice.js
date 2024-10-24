import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderItems: [],
  status: 'pending',  // pending, confirmed, shipped, completed
    orderItemsSlected: [],
  shippingAddress: {},
  paymentMethod: '',
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: '',
  isPaid: false,
  paidAt: '',
  isDelivered: false,
  deliveredAt: '',
  isSucessOrder: false,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrder: (state, action) => {
      state.orderItems.push(action.payload);
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orderItems.find(item => item.id === orderId);
      if (order) {
        order.status = status;
      }
    },
    removeOrder: (state, action) => {
      state.orderItems = state.orderItems.filter(item => item.id !== action.payload);
    }
  },
});

export const {
  createOrder,
  updateOrderStatus,
  removeOrder
} = orderSlice.actions;

export default orderSlice.reducer;





