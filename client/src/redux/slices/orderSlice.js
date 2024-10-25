import { createSlice } from '@reduxjs/toolkit';
import * as OrderService from '../../services/OrderService';


const initialState = {
  orderList: [],
};


export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderList: [],
        
    },
    reducers: {
      
  },
});


export default orderSlice.reducer;
