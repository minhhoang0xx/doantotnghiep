import React, { useEffect, useState } from 'react';
import { Card, Avatar, Form, Input, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slices/userSlice'; // Action để cập nhật user vào Redux store
import * as UserService from '../../services/UserService';

const UserDetailPage = () => {
        const dispatch = useDispatch();
        const user = useSelector((state) => state.user);
        const [name, setName] = useState('')
        const [email, setEmail] = useState('')
        const [phone, setPhone] = useState('')
        const [address, setAddress] = useState('')
        const [avatar, setAvatar] = useState('')

        useEffect(() => {
                setName(user?.name)
                setEmail(user?.email)
                setPhone(user?.phone)
                setAddress(user?.address)
                setAvatar(user?.avatar)
        }, [user])

        const handleChangeName = (e) => {
                setName(e.target.value);
        }
        const handleChangeEmail = (e) => {
                setEmail(e.target.value);
        }
        const handleChangePhone = (e) => {
                setPhone(e.target.value);
        }
        const handleChangeAddress = (e) => {
                setAddress(e.target.value);
        }
        const handleChangeAvatar = (e) => {
                setAvatar(e.target.value);
        }

        const handleUpdate = async () => {
                const updatedUser = { name, email, phone, address, avatar }; // cac data ng dung nhap vao
                const update = await UserService.updateUser(user?.id, updatedUser);
                console.log('update', update);
                message.success('Login successful!');
                // Dispatch action để cập nhật user vào Redux store hoặc gửi yêu cầu cập nhật lên server
                if (update) {
                        dispatch(updateUser({ ...update, access_token: user?.access_token }));
                        message.success('Update successful!');
                } else {
                        message.error('Update failed!');
                }
        }


        return (
                <div style={{ margin: '0 auto' }}>
                        <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                minHeight: '100vh',
                                width: '100%',
                                // backgroundImage: 'url("https://media.istockphoto.com/id/843549772/vi/vec-to/m%C3%B4-h%C3%ACnh-tr%C6%B0%E1%BB%9Dng-h%E1%BB%8Dc-li%E1%BB%81n-m%E1%BA%A1ch-b%E1%BB%91i-c%E1%BA%A3nh-v%E1%BB%9Bi-c%C3%A1c-h%C3%ACnh-minh-h%E1%BB%8Da-v%C3%A0-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-gi%C3%A1o-d%E1%BB%A5c-v%C3%A0-tr%C6%B0%E1%BB%9Dng.jpg?s=612x612&w=0&k=20&c=b5QKJ5TAV7D0_FVxz5ZjBNzHJrCc2yGDnMuEHZQNxLQ=")',

                        }}>
                                <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        borderRadius: '20px',
                                        padding: ' 10px 0',
                                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                                        backgroundColor: '#f5f5f5',
                                        width: '45%',
                                }}>
                                        <h2 style={{
                                                fontSize: '32px',
                                                fontWeight: 'bold',
                                                color: '#333',
                                                marginTop: '20px',

                                        }}>
                                                User Information
                                        </h2>
                                        <Card
                                                style={{ width: '50%' }}
                                                actions={[
                                                        <Button type="primary" htmlType="submit" form="userForm" onClick={handleUpdate}>
                                                                Save
                                                        </Button>,
                                                ]}
                                        >
                                                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                                                        <Avatar
                                                                size={100}
                                                                icon={<UserOutlined />}
                                                                src={avatar || user?.avatar}
                                                        />
                                                </div>


                                                <Form
                                                        id="userForm"
                                                        layout="vertical"
                                                        initialValues={{
                                                                name: user?.name,
                                                                email: user?.email,
                                                                phone: user?.phone,
                                                                address: user?.address,
                                                        }}
                                                >
                                                        <Form.Item label="Name" name="name">
                                                                <Input placeholder="Enter your name" value={name} onChange={handleChangeName} />
                                                        </Form.Item >

                                                        <Form.Item label="Email" name="email">
                                                                <Input placeholder="Enter your email" value={email} onChange={handleChangeEmail} />
                                                        </Form.Item >

                                                        <Form.Item label="Phone" name="phone">
                                                                <Input placeholder="Enter your phone number" value={phone} onChange={handleChangePhone} />
                                                        </Form.Item >

                                                        <Form.Item label="Address" name="address">
                                                                <Input placeholder="Enter your address" value={address} onChange={handleChangeAddress} />
                                                        </Form.Item >
                                                        <Form.Item label="Avatar URL" name="avatar">
                                                                <Input
                                                                        placeholder="Enter your avatar URL"
                                                                        value={avatar}
                                                                        onChange={handleChangeAvatar}
                                                                />
                                                        </Form.Item>

                                                </Form>
                                        </Card>

                                </div>
                        </div>
                </div>
        )
}
export default UserDetailPage

