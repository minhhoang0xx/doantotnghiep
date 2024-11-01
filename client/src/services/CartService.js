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
export const updateCart = async (userId, product, newAmount) => {
  const res = await axios.put(`${process.env.REACT_APP_API_URL}/cart/updateCart/${userId}`, { product, newAmount });
  return res.data;
};

export const removeCart = async (userId, product) => {
  const res = await axios.delete(`${process.env.REACT_APP_API_URL}/cart/removeCart/${userId}/${product}`);
  return res.data;
};
export const deleteCart = async (userId) => { // xoa khi khong con item nào trong cart
  await axios.delete(`${process.env.REACT_APP_API_URL}/cart/deleteCart/${userId}`);
};