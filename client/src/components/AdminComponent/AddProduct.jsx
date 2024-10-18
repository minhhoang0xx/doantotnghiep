import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, message, InputNumber } from 'antd';
import * as ProductService from '../../services/ProductService';

const AddProduct = ({ isModalOpen, setIsModalOpen, refetchProducts, products }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    useEffect(() => {
        if (isModalOpen) {
            form.resetFields(); // Reset form khi mở modal
        }
    }, [isModalOpen, form]);

    const onFinish = async (data) => {
        setLoading(true);
        try {
            const isNameExists = products.some(product => product.name === data.name);
            if (isNameExists) {
                message.error('Product name already exists!');
                return; 
            }
            console.log('Sending data to API:', data);
            // Gửi dữ liệu sản phẩm đến API
            const response = await ProductService.createProduct(data);
            console.log('API response:', response);
            message.success('Product added successfully!');
            setIsModalOpen(false);
            refetchProducts(); // Gọi lại API để lấy danh sách sản phẩm mới
        } catch (error) {
            message.error('Failed to add product: ' + (error.response?.data?.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Add Product Failed:', errorInfo);
    };

    return (
        <Modal
            title="Add New Product"
            open={isModalOpen}
            onCancel={() => {setIsModalOpen(false)}}

            
        >
            <Form
                name="addProduct"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input product name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input product image URL!' }, {
                        type: 'url', message: 'Please input a valid URL!'
                    }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Type"
                    name="type"
                    rules={[{ required: true, message: 'Please input product type!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        { required: true, message: 'Please input product price!' },
                        {
                            validator: (_, value) =>
                                value > 0 ? Promise.resolve() : Promise.reject(new Error('Price > 0')),
                        }
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="Stock Count"
                    name="countInStock"
                    rules={[
                        { required: true, message: 'Please input stock count!' },
                        {
                            validator: (_, value) =>
                                value >= 0 ? Promise.resolve() : Promise.reject(new Error('Stock > 0')),
                        }
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Add Product
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddProduct;
