import React from "react";
import { Button, Form, Input, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate} from "react-router-dom";
import * as UserService from "../../services/UserService";

const SignUpForm = () => {


    const navigate = useNavigate() 
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    const handleNavigateHome = () => {
        navigate('/')
    }

    const onFinishSignUp = async (values) => {
        try {
            // POST toi API backend
            const response = await UserService.signUpUser(values);
            console.log('res',response)
            message.success('Sign Up Success!');
            navigate('/sign-in');
        } catch (error) {
            message.error('Sign Up Failed: ' + (error.response?.data?.message || 'Unknown error'));
        }
    };
    const onFinishSignUpFailed = (errorInfo) => {
        console.log('Sign Up Failed:', errorInfo);
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
                    marginRight:'620px',
                    cursor: 'pointer',
                }}>
                    Home
                </span>
                <h2 style={{
                    fontSize: '32px', 
                    fontWeight: 'bold', 
                    color: '#333' ,
                    marginTop: '20px',
                    paddingBottom: '10px',

                }}>
                    SIGN UP
                </h2>
                <Form
                    name="signUp"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 500, width: '100%', marginRight: '40px'}}
                    onFinish={onFinishSignUp}
                    onFinishFailed={onFinishSignUpFailed}
                    autoComplete="off"
                >
                        
                    <Form.Item
                        label={<span style={{ textAlign:'left' }}>Name</span>}
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={<span style={{ textAlign:'left' }}>Phone Number</span>}
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
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
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
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
                      
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                        label="Avatar"
                        name="avatar"
                        rules={[{  message: 'Please input your avatar!' }]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{offset:8, span: 16 }}>
                        <Button type="primary" htmlType="submit" style={{ width: '40%'}}>
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
                <p style={{ marginTop: '5px' }}>Already have an account? <span onClick={handleNavigateLogin} style={{color:'blue', textDecoration:'underline', cursor:'pointer'}}>Sign in</span></p>
                </div>
        </div>
    );
};

export default SignUpForm;

