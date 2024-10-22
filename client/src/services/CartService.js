import axios from 'axios';

export const axiosJWT = axios.create(); 

export const createCart = async (userId, data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/cart/createCart/${userId}`, data);
    return res.data; // Trả về dữ liệu từ phản hồi
};
export const getCart = async (userId, data) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/cart/getCart/${userId}`, data);
    return res.data; 
};
export const updateCart = (userId, productId, newAmount) => {
    return axios.put(`${process.env.REACT_APP_API_URL}/cart/${userId}`, { productId, newAmount });
  };
  
  export const removeCartItem = (userId, productId) => {
    return axios.delete(`${process.env.REACT_APP_API_URL}/cart/${userId}/${productId}`);
  };
