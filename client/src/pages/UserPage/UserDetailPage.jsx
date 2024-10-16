import React, { useEffect, useState } from 'react';
import { Card, Avatar, Form, Input, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slices/userSlice';
import * as UserService from '../../services/UserService';

const UserDetailPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log('Stored User from localStorage:', storedUser); 
        const currentUser = storedUser || user;
        console.log('Current User:', currentUser); 
        if (currentUser) {
            setName(currentUser?.name || '');
            setEmail(currentUser?.email || '');
            setPhone(currentUser?.phone || '');
            setAddress(currentUser?.address || '');
            setAvatar(currentUser?.avatar || '');
            if (storedUser) {
                dispatch(updateUser(storedUser));
            }
        }
    }, [user, dispatch]);

    const handleChangeName = (e) => setName(e.target.value);
    const handleChangeEmail = (e) => setEmail(e.target.value);
    const handleChangePhone = (e) => setPhone(e.target.value);
    const handleChangeAddress = (e) => setAddress(e.target.value);
    const handleChangeAvatar = (e) => setAvatar(e.target.value);

  

const handleUpdate = async () => {
        const updatedUser = { name, email, phone, address, avatar, 
                _id: user?.id || JSON.parse(localStorage.getItem('user'))?.id // set _id vi lay dtb tu mongo
        }; 
        try {
            const update = await UserService.updateUser(updatedUser._id, updatedUser);
    
            if (update) {
                const newUser = { ...user, ...updatedUser }; // ghi de updateUser len user xong truyen vao newUser
                dispatch(updateUser(newUser)); // update vào Redux
                localStorage.setItem('user', JSON.stringify(newUser)); // luu vao localStrorage
                message.success('Update successful!');
            } else {
                message.error('Update failed!');
            }
        } catch (error) {
            console.error('Update error:', error);
            message.error('Update failed!');
        }
    };
    
    return (
        <div style={{ margin: '0 auto' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
                width: '100%',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    borderRadius: '20px',
                    padding: '10px 0',
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
                        >
                            <Form.Item label="Name">
                                <Input placeholder="Enter your name" value={name} onChange={handleChangeName} />
                            </Form.Item>

                            <Form.Item label="Email">
                                <Input placeholder="Enter your email" value={email} onChange={handleChangeEmail} />
                            </Form.Item>

                            <Form.Item label="Phone">
                                <Input placeholder="Enter your phone number" value={phone} onChange={handleChangePhone} />
                            </Form.Item>

                            <Form.Item label="Address">
                                <Input placeholder="Enter your address" value={address} onChange={handleChangeAddress} />
                            </Form.Item>
                            <Form.Item label="Avatar URL">
                                <Input
                                    placeholder="Enter your avatar URL"
                                    value={avatar || user?.avatar}
                                    onChange={handleChangeAvatar}
                                />
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default UserDetailPage;
