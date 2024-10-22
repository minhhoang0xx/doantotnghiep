import axios from 'axios';

export const axiosJWT = axios.create(); // Tạo axios instance nếu cần

export const createOrder = async (userId, orderData) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/order/createOrder/${userId}`, orderData);
    return res.data; // Trả về dữ liệu từ phản hồi
};

export const updateOrderStatus = (orderId, status) => {
    return axios.put(`${process.env.REACT_APP_API_URL}/order/${orderId}`, { status });
  };
  
  export const deleteOrder = (orderId) => {
    return axios.delete(`${process.env.REACT_APP_API_URL}/order/${orderId}`);
  };
// export const getAllOrderDetail = async (userId) => {
//     const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/getAllOrderDetail/${userId}`);
//     return res.data; // Trả về dữ liệu từ phản hồi
// };

// export const getDetailOrder = async (orderId) => {
//     const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/detailOrder/${orderId}`);
//     return res.data; // Trả về dữ liệu từ phản hồi
// };

// export const cancelOrder = async (orderId, orderItems) => {
//     const res = await axios.delete(`${process.env.REACT_APP_API_URL}/order/cancelOrder/${orderId}`, {
//         data: { orderItems } // Gửi dữ liệu hủy đơn hàng
//     });
//     return res.data; // Trả về dữ liệu từ phản hồi
// };

// export const getAllOrder = async () => {
//     const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/getAllOrder`);
//     return res.data; // Trả về dữ liệu từ phản hồi
// };
