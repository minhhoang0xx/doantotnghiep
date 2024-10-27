import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as OrderService from '../../services/OrderService';

const initialState = {
    orders: [],
    totalOrders: 0,
    isLoading: false,
    error: null,
};

// Thunk để lấy danh sách đơn hàng của người dùng
export const fetchOrders = createAsyncThunk('order/fetchOrders', async (orders) => {
    return orders;
});

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        createOrder: (state, action) => {
            const newOrder = action.payload;
            state.orders.push(newOrder);
            state.totalOrders += 1;
        },
        cancelOrder: (state, action) => {
          const { orderId, orderItems } = action.payload;
          // Cập nhật orders trong redux state
          state.orders = state.orders.filter(order => order._id !== orderId);
          state.totalOrders -= 1;
      
          // Cập nhật countInStock cho từng sản phẩm
          orderItems.forEach(item => {
              const product = state.orders.find(orderItem => orderItem._id === item.productId);
              if (product) {
                  product.countInStock += item.quantity; // Cộng lại số lượng vào countInStock
              }
          });
      },
        clearOrders: (state) => {
            state.orders = [];
            state.totalOrders = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload;
                state.totalOrders = action.payload.length;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { createOrder, cancelOrder, clearOrders } = orderSlice.actions;

export default orderSlice.reducer;
