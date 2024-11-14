import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, message, InputNumber } from 'antd';
import * as ProductService from '../../services/ProductService';
import { getBase64 } from "../../ultils";
import { WrapperUploadFile, ResponsiveButton } from "./style";
import { UploadOutlined } from '@ant-design/icons';

const AddProduct = ({ isModalOpen, setIsModalOpen, refetchProducts, products }) => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [form] = Form.useForm();
    useEffect(() => {
        if (isModalOpen) {
            form.resetFields(); // Reset form khi mở modal
        }
    }, [isModalOpen, form]);

    const onFinish = async (data) => {
        setLoading(true);
        try {
            const payload = {
                ...data,
                image: image ? image : null,
            };
            const isNameExists = products.some(product => product.name === data.name);
            if (isNameExists) {
                message.error('Product name already exists!');
                return; 
            }
            console.log('Sending data to API:', data);
            // Gửi dữ liệu sản phẩm đến API
            const response = await ProductService.createProduct(payload);
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
    const handleOnchangeImage = async ({ fileList }) => {
        const file = fileList[0];
        if (file && !file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setImage(file ? file.preview : null);
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
                {/* <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input product image URL!' }, {
                        type: 'url', message: 'Please input a valid URL!'
                    }]}
                >
                    <Input />
                </Form.Item> */}
                <Form.Item label="Image" name="image" rules={[{ required: true, message: 'Please input Image!' }]}>
                        <WrapperUploadFile onChange={handleOnchangeImage} maxCount={1} accept="image/*">
                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                        </WrapperUploadFile>
                        {image && (
                            <img
                                src={image}
                                style={{ height: "60px", width: "60px", objectFit: "cover", marginLeft: "10px" }}
                                alt="image"
                            />
                        )}
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
                    <InputNumber style={{width:'100%'}}/>
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
                    <InputNumber style={{width:'100%'}}/>
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
