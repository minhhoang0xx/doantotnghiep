import axios from 'axios'

export const axiosJWT = axios.create()

export const loginUser = async (data) =>{
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data)
    return res.data
};
export const signUpUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data)
    return res.data
};

export const getAllUser = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/getAllUser`)
    return res.data
};

export const getDetailUser = async (id,access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/detailUser/${id}`,{
        headers: {
         token: `Bearer ${access_token}` 
        }
    });
    return res.data
};

export const refreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refreshToken`, {
        withCredentials: true // tu dong lay cookie de truyen xuong be
    })
    return res.data
};

export const logOut = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/logout`)
    return res.data
};

export const updateUser = async (id,data) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/user/updateUser/${id}`, data)
    return res.data
};
export const updatePassword = async (id,data) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/user/updatePassword/${id}`, data)
    return res.data
};

export const deleteUser = async (id) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/user/deleteUser/${id}`);
    return res.data;
};