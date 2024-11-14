import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, message, Button, Checkbox } from 'antd';
import * as ProductService from '../../services/ProductService';
import * as UserService from '../../services/UserService';
import * as OrderService from '../../services/OrderService';
import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from "../../ultils";
import { WrapperUploadFile, ResponsiveButton } from "./style";

const UpdateModal = ({ isModalOpen, setIsModalOpen, currentData, refetchData, currentView, paymentMethod }) => {
    const [form] = Form.useForm();
    const [image, setImage] = useState(null);
    useEffect(() => {
        if (isModalOpen && currentData) {
            form.setFieldsValue(currentData); // Đặt giá trị form với dữ liệu hiện tại
        }
    }, [isModalOpen, currentData, form]);

    const onFinish = async (data) => {
        try {
            const payload = {
                ...data,
                image: image ? image : null,
            };
            let response;
            if (currentView === 'products') {
                response = await ProductService.updateProduct(currentData._id, payload);
            } else if (currentView === 'users') {
                response = await UserService.updateUser(currentData._id, data); // Tương tự cho user
            }
            else if (currentView === 'orders') {
                response = await OrderService.updateOrderStatus(currentData._id, data);
            }

            message.success('Updated successfully!');
            setIsModalOpen(false);
            refetchData(); // Cập nhật lại bảng sau khi thành công
        } catch (error) {
            message.error('Failed to update: ' + (error.response?.data?.message || 'Unknown error'));
        }
    };
    const handleOnchangeImage = async ({ fileList }) => {
        const file = fileList[0];
        if (file && !file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setImage(file ? file.preview : null);
    };

    return (
        <Modal
            title="Update Data"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
        >
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
            >
                {/* Trường hợp currentView === 'users' */}
                {currentView === 'users' && (
                    <Form.Item
                        label="Role"
                        name="isAdmin"
                        valuePropName="checked"
                    >
                        <Checkbox>Admin</Checkbox>
                    </Form.Item>
                )}

                {/* Trường hợp currentView === 'products' */}
                {currentView === 'products' && (
                    <>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input price!' }]}
                        >
                            <InputNumber min={1} />
                        </Form.Item>
                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: 'Please input type!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Count In Stock"
                            name="countInStock"
                            rules={[{ required: true, message: 'Please input stock count!' }]}
                        >
                            <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input description!' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        {/* <Form.Item
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Please input Image!' }]}
                        >
                            <Input.TextArea />
                        </Form.Item> */}
                        <Form.Item label="Image" name="image" rules={[{ required: true, message: 'Please input Image!' }]}>
                        <WrapperUploadFile onChange={handleOnchangeImage} maxCount={1} accept="image/*">
                            <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                        </WrapperUploadFile>
                        {image && (
                            <img
                                src={image}
                                style={{ height: "60px", width: "60px", objectFit: "cover", marginLeft: "10px" }}
                                alt="image"
                            />
                        )}
                    </Form.Item>

                    </>
                )}

                {/* Trường hợp currentView === 'orders' */}
                {currentView === 'orders' && (
                    <>
                        <Form.Item
                            label="Is Paid"
                            name="isPaid"
                            valuePropName="checked"
                        >
                            <Checkbox disabled={paymentMethod === 'paypal' }>Pay</Checkbox>
                        </Form.Item>
                        <Form.Item
                            label="Is Delivered"
                            name="isDelivered"
                            valuePropName="checked"
                        >
                            <Checkbox>Delivery</Checkbox>
                        </Form.Item>
                    </>
                )}

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateModal;