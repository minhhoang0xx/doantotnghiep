import axios from 'axios'

export const axiosJWT = axios.create()

export const getAllProduct = async () =>{
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAllProduct`)
    return res.data
};

export const createProduct = async (data) =>{
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/createProduct`, data)
    return res.data
};

export const deleteProduct = async (id) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/product/deleteProduct/${id}`);
    return res.data;
};

export const updateProduct = async (id, data) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/product/updateProduct/${id}`, data);
    return res.data;
};

