import axios from 'axios'

export const axiosJWT = axios.create()

export const getAllProduct = async (data) =>{
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAllProduct`)
    return res.data
};
