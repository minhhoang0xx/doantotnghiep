import axios from 'axios';

export const axiosJWT = axios.create(); // Tạo axios instance nếu cần

export const createOrder = async (userId, orderData) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/order/createOrder/${userId}`, orderData);
  return res.data;
};

export const cancelOrder = async (orderId, orderItems) => {
  const res = await axios.delete(`${process.env.REACT_APP_API_URL}/order/deleteOrder/${orderId}`, { data: { orderItems } });
  return res.data

};

export const UserOrder = async (userId) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/UserOrder/${userId}`);
  return res.data;
};

export const getAllOrder = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/getAllOrder`)
  return res.data
};

export const getDetailOrder = async (orderId) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/detailOrder/${orderId}`);
  return res.data;
};
// export const updateOrderStatus = async (orderId, status) => {
//   const res = await axios.put(`${process.env.REACT_APP_API_URL}/order/${orderId}`, { status });
//   return res.data
// };