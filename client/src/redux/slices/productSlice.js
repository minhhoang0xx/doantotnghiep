import { createSlice } from '@reduxjs/toolkit';
import * as ProductService from '../../services/ProductService';

const initialState = {
  searchResults: [],
  search: '',
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload; // Gán từ khóa tìm kiếm
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload; // Gán kết quả tìm kiếm
    },
    clearSearchResults: (state) => {
      state.searchResults = []; // Xóa kết quả tìm kiếm
    },
  },
});

// Thunk để gọi API tìm kiếm sản phẩm
export const fetchSearchResults = (keyword) => async (dispatch) => {
  try {
    if (keyword) {
      const results = await ProductService.searchProduct(keyword); // Gọi API tìm kiếm
      dispatch(setSearchResults(results)); // Lưu kết quả vào state
    } else {
      dispatch(clearSearchResults()); // Xóa kết quả nếu không có từ khóa
    }
  } catch (error) {
    console.error('Error fetching search results:', error);
    dispatch(clearSearchResults()); // Xóa kết quả nếu có lỗi
  }
};

// Action creators
export const { setSearch, setSearchResults, clearSearchResults } = productSlice.actions;

export default productSlice.reducer;
