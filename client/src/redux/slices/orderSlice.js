import { createSlice } from '@reduxjs/toolkit';
import * as OrderService from '../../services/OrderService'; 

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
    addOrder: (state, action) => {
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
  addOrder,
  updateOrderStatus,
  removeOrder
} = orderSlice.actions;

export default orderSlice.reducer;





// import { createSlice } from '@reduxjs/toolkit';
// import * as OrderService from '../../services/OrderService'; 
// const initialState = {
//   orderItems: [],

// };

// //Tạo action asynchronous để lấy danh sách đơn hàng

// export const orderSlide = createSlice({
//   name: 'order',
//   initialState,
//   reducers: {
//     addOrderProduct: (state, action) => {
//       const { orderItem } = action.payload;
//       const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product);
//       if (itemOrder) {
//         if (itemOrder.amount <= itemOrder.countInstock) {
//           itemOrder.amount += orderItem.amount;
//           state.isSucessOrder = true;
//         }
//       } else {
//         state.orderItems.push(orderItem);
//       }
//     },
//     removeOrderProduct: (state, action) => {
//       const {idProduct} = action.payload
      
//       const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct)
//       const itemOrderSeleted = state?.orderItemsSlected?.filter((item) => item?.product !== idProduct)

//       state.orderItems = itemOrder;
//       state.orderItemsSlected = itemOrderSeleted;
//     },
//     resetOrder: (state) => {
//       state.isSucessOrder = false;
//     },
//     increaseAmount: (state, action) => {
//       const { idProduct } = action.payload;
//       const itemOrder = state.orderItems.find((item) => item.product === idProduct);
//       const itemOrderSelected = state.orderItemsSlected.find((item) => item.product === idProduct);
//       itemOrder.amount++;
//       if (itemOrderSelected) {
//         itemOrderSelected.amount++;
//       }
//     },
//     decreaseAmount: (state, action) => {
//       const { idProduct } = action.payload;
//       const itemOrder = state.orderItems.find((item) => item.product === idProduct);
//       const itemOrderSelected = state.orderItemsSlected.find((item) => item.product === idProduct);
//       itemOrder.amount--;
//       if (itemOrderSelected) {
//         itemOrderSelected.amount--;
//       }
//     },
    
//     removeAllOrderProduct: (state, action) => {
//       const {listChecked} = action.payload
      
//       const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
//       const itemOrdersSelected = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
//       state.orderItems = itemOrders
//       state.orderItemsSlected = itemOrdersSelected

//     },
//     selectedOrder: (state, action) => {
//       const {listChecked} = action.payload
//       const orderSelected = []
//       state.orderItems.forEach((order) => {
//         if(listChecked.includes(order.product)){
//           orderSelected.push(order)
//         };
//       });
//       state.orderItemsSlected = orderSelected
//     }
//   },
// });

// // Action creators được tạo ra cho từng trường hợp reducer function
// export const {
//   addOrderProduct,
//   increaseAmount,
//   decreaseAmount,
//   removeOrderProduct,
//   removeAllOrderProduct,
//   selectedOrder,
//   resetOrder,
// } = orderSlide.actions;

// export default orderSlide.reducer;
