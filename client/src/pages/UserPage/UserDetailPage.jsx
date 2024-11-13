import React, { useEffect, useState } from 'react';
import { Card, Avatar, Form, Input, Button, message, Row, Col, Modal } from 'antd';
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [form] = Form.useForm();

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

useEffect(() => {
        form.setFieldsValue({
            name: name,
            email: email,
            phone: phone,
            address: address,
            avatar: avatar || user?.avatar,
        });
    }, [name, email, phone, address, avatar, user, form]);
    const handleValuesChange = (changedValues) => {
        if (changedValues.name !== undefined) setName(changedValues.name);
        if (changedValues.phone !== undefined) setPhone(changedValues.phone);
        if (changedValues.address !== undefined) setAddress(changedValues.address);
        if (changedValues.avatar !== undefined) setAvatar(changedValues.avatar);
    };

    const handleUpdate = async () => {
        const updatedUser = {
            name, email, phone, address, avatar,
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
    const handlePasswordUpdate = async () => {
        if (newPassword !== confirmPassword) {
            message.error("New passwords don't match!");
            return;
        }
        const userId = user?.id || JSON.parse(localStorage.getItem('user'))?.id;
        const data = { oldPassword, newPassword }
        try {
            const result = await UserService.updatePassword(userId, data);
            if (result.status === 'OK') {

                const updatedUser = { ...user, password: newPassword };
                dispatch(updateUser(updatedUser));
                localStorage.setItem('user', JSON.stringify(updatedUser));

                message.success('Password updated successfully!');
                setIsModalOpen(false);
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                message.error('Password update failed123!');
            }
        } catch (error) {
            console.error('Password update error:', error);
            message.error('Password update failed!');
        }
    };

    return (
        <div style={{ padding: '70px 0', background: '#f5f5f5' }}>
            <Row justify="center" style={{ minHeight: '100vh' }}>
                <Col xs={24} sm={20} md={16} lg={12} xl={10} xxl={8}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: '20px',
                        paddingBottom: '30px',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                        backgroundColor: '#fff',
                    }}>
                        <h2 style={{
                            fontSize: '28px',
                            fontWeight: 'bold',
                            color: '#333',
                            marginBottom: '20px',
                            textAlign: 'center'
                        }}>
                            User Information
                        </h2>
                        <Card
                            style={{ width: '100%', maxWidth: '500px' }}
                            actions={[
                                <Button type="primary" htmlType="submit"  onClick={handleUpdate}>
                                    Save
                                </Button>,
                                <Button type="default" onClick={() => setIsModalOpen(true)}>
                                    Change Password
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
                                layout="vertical"
                                form={form}
                                onValuesChange={handleValuesChange}
                            >
                                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name!' }]}>
                                    <Input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                                </Form.Item>

                                <Form.Item label="Email">
                                    <Input placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />

                                </Form.Item>

                                <Form.Item label="Phone"name="phone"
                        rules={[
                            { required: true, message: 'Please input your phone number!' },
                            { pattern: /^[0-9]{10}$/, message: 'Phone number is incorrect!' }]}>
                                    <Input placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={10}  />
                                </Form.Item>

                                <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please enter your address!' }]}>
                                    <Input placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                </Form.Item>

                                <Form.Item label="Avatar URL">
                                    <Input
                                        placeholder="Enter your avatar URL"
                                        value={avatar || user?.avatar}
                                        onChange={(e) => setAvatar(e.target.value)}
                                    />
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                </Col>
            </Row>
            <Modal
                title="Change Password"
                visible={isModalOpen}
                onOk={handlePasswordUpdate}
                onCancel={() => setIsModalOpen(false)}
                okText="Update Password"
            >
                <Form layout="vertical">
                    <Form.Item label="Current Password">
                        <Input.Password value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                       label="New Password"
                       name="newPassword"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            { min: 6, message: 'Password must be at least 6 characters!' }
                        ]}
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
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords do not match!'));
                                }
                            })
                        ]}
                    >
                   <Input.Password  />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserDetailPage;
