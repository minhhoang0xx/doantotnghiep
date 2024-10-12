import axios from 'axios'

export const loginUser = async (data) =>{
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return res;
};
export const signUpUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return res;
};

export const getDetailUser = async (id,access_token) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/detailUser/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            token: `Bearer ${access_token}`
        }
    });
    return res;
};