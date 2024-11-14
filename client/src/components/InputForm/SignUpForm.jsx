import React, { useState } from "react";
import { Button, Form, Input, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { getBase64 } from "../../ultils";
import { WrapperUploadFile, ResponsiveButton } from "./style";

const SignUpForm = () => {
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState(null);

    const handleNavigateLogin = () => navigate('/sign-in');
    const handleNavigateHome = () => navigate('/');

    const onFinishSignUp = async (values) => {
        try {
            const payload = {
                ...values,
                avatar: avatar ? avatar : null,
            };
            console.log(payload);
            const response = await UserService.signUpUser(payload);
            if (response?.status === "OK") {
                message.success('Sign Up Success!');
                navigate('/sign-in');
            }
        } catch (error) {
            message.error('Sign Up Failed: ' + (error.response?.data?.message || 'Unknown error'));
        }
    };

    const onFinishSignUpFailed = (errorInfo) => {
        console.error('Sign Up Failed:', errorInfo);
    };

    // Xử lý upload avatar
    const handleOnchangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0];
        if (file && !file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file ? file.preview : null);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '100vh',
            width: '100%',
            backgroundImage: 'url("https://media.istockphoto.com/id/843549772/vi/vec-to/m%C3%B4-h%C3%ACnh-tr%C6%B0%E1%BB%9Dng-h%E1%BB%8Dc-li%E1%BB%81n-m%E1%BA%A1ch-b%E1%BB%91i-c%E1%BA%A3nh-v%E1%BB%9Bi-c%C3%A1c-h%C3%ACnh-minh-h%E1%BB%8Da-v%C3%A0-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-gi%C3%A1o-d%E1%BB%A5c-v%C3%A0-tr%C6%B0%E1%BB%9Dng.jpg?s=612x612&w=0&k=20&c=b5QKJ5TAV7D0_FVxz5ZjBNzHJrCc2yGDnMuEHZQNxLQ=")',
            backgroundPosition: 'center',
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
                width: '90%',
                maxWidth: '700px'
            }}>
                <span onClick={handleNavigateHome} style={{
                    fontSize: '16px',
                    color: '#333',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                    marginLeft: '15px',
                }}>
                    Home
                </span>
                <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '20px' }}>SIGN UP</h2>

                <Form
                    name="signUp"
                    labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}
                    wonFinishFailed={onFinishSignUpFailed}
                    style={{ maxWidth: '80%', width: '80%' }}
                    onFinish={onFinishSignUp}
                    onFinishFailed={onFinishSignUpFailed}
                    autoComplete="off"
                >
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[
                            { required: true, message: 'Please input your phone number!' },
                            { pattern: /^[0-9]{10}$/, message: 'Phone number is incorrect!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }, { min: 6, message: 'Password must be at least 6 characters!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords do not match!'));
                                }
                            })
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input your address!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Avatar" name="avatar">
                        <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1} accept="image/*">
                            <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                        </WrapperUploadFile>
                        {avatar && (
                            <img
                                src={avatar}
                                style={{ height: "60px", width: "60px", objectFit: "cover", marginLeft: "10px" }}
                                alt="avatar"
                            />
                        )}
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6 }}>
                        <ResponsiveButton type="primary" htmlType="submit">
                            Sign Up
                        </ResponsiveButton>
                    </Form.Item>
                </Form>

                <p>Already have an account? <span onClick={handleNavigateLogin} style={{ color: 'blue', cursor: 'pointer' }}>Sign in</span></p>
            </div>
        </div>
    );
};

export default SignUpForm;
