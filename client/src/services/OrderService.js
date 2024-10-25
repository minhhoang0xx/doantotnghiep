import axios from 'axios';

export const axiosJWT = axios.create(); // Tạo axios instance nếu cần

export const createOrder = async (userId, orderData) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/order/createOrder/${userId}`, orderData);
    return res.data; 
};

export const updateOrderStatus = (orderId, status) => {
    return axios.put(`${process.env.REACT_APP_API_URL}/order/${orderId}`, { status });
  };
  
  export const deleteOrder = (orderId) => {
    return axios.delete(`${process.env.REACT_APP_API_URL}/order/${orderId}`);
  };
  export const getAllOrder = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/getAllOrder`)
    return res.data
};

