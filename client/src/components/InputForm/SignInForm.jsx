import React from "react";
import { useState } from "react";
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from '../../services/UserService';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { updateUser } from "../../redux/slices/userSlice";

const SignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleNavigateSignUp = () => {
        navigate('/sign-up');
    }
    const handleNavigateHome = () => {
        navigate('/');
    }
    const handleGetDetailUser = async (id, token) => {
        try {
            const res = await UserService.getDetailUser(id, token);
            console.log('Response data:', res.data);
            const payload = { ...res.data, access_token: token };
            console.log('Dispatching payload:', payload);
            dispatch(updateUser(payload));
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    // o trang nay khong su dung useEffect(theo doi su thay doi) nen no se reload lai cho sau khi state duoc cap nhat
    // dispatch la nguyen nhan cho thay gia tri cu

    const onFinish = async () => {
        try {
            // Post den BE
            const res = await UserService.loginUser({ email, password });
            // userService tra ve res.data nen res = res.data
            if (res.status === 'OK') {
                message.success('Login successful!');
                localStorage.setItem('access_token', JSON.stringify(res?.access_token)); // luu access_token vào localStorage
                const decoded = jwtDecode(res?.access_token)
                if (decoded?.id) {
                    handleGetDetailUser(decoded?.id, res?.access_token)
                }
                if (location.state) {
                    navigate(location.state);
                } else {
                    if (decoded?.isAdmin) {
                        navigate('/admin');
                    } else {
                        navigate('/');
                    }
                }
            } else {
                message.error(res.message || 'Login failed!');
            }
        } catch (error) {
            // check server co tra ve loi khong
            if (error.response) {
                message.error(error.response.data.message || 'An error occurred. Please try again later.');
            } else {
                message.error('An error occurred. Please try again later 2.');
            }
            console.error('Error during login:', error);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '100vh',
            width: '100%',
            backgroundImage: 'url("https://media.istockphoto.com/id/843549772/vi/vec-to/m%C3%B4-h%C3%ACnh-tr%C6%B0%E1%BB%9Dng-h%E1%BB%8Dc-li%E1%BB%81n-m%E1%BA%A1ch-b%E1%BB%91i-c%E1%BA%A3nh-v%E1%BB%9Bi-c%C3%A1c-h%C3%ACnh-minh-h%E1%BB%8Da-v%C3%A0-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-gi%C3%A1o-d%E1%BB%A5c-v%C3%A0-tr%C6%B0%E1%BB%9Dng.jpg?s=612x612&w=0&k=20&c=b5QKJ5TAV7D0_FVxz5ZjBNzHJrCc2yGDnMuEHZQNxLQ=")'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                borderRadius: '20px',
                padding: ' 10px 0',
                boxShadow: '0 8px 16px rgba(0, 0, 10, 50)',
                backgroundColor: '#f5f5f5',
                width: '45%',
            }}>
                <span onClick={handleNavigateHome} style={{
                    fontSize: '16px',
                    color: '#333',
                    textDecoration: 'none',
                    marginRight: '620px',
                    cursor: 'pointer',
                }}>
                    Home
                </span>
                <h2 style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    margin: '20px',
                    color: '#333',
                    paddingBottom: '10px',
                    marginTop: '10px',
                }}>
                    LOGIN
                </h2>
                <Form
                    name="SignIn"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    style={{ maxWidth: 500, width: '100%' }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"

                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input onChange={handleOnChangeEmail} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password onChange={handleOnChangePassword} />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 4, span: 20 }}
                    >
                        <Checkbox >Remember me</Checkbox>
                        <p style={{ marginTop: '5px' }}>
                            Don't have an account? <span onClick={handleNavigateSignUp} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>Sign up</span>
                        </p>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                        <Button type="primary" htmlType="submit" style={{ width: '50%' }} >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default SignInForm;
