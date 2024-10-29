import React from 'react';
import { Modal, Button, Descriptions, Image, Spin, Typography } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title } = Typography;

const DetailOrderModal = ({ visible, onClose, orderDetails, loading }) => {
    if (loading) {
        return <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />;
    }

    if (!orderDetails) {
        return <p></p>;
    }

    return (
        <Modal
            title="Order Details"
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={800}
        >
            <div style={{ padding: '20px' }}>
                <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>Order Details</Title>
                <Descriptions bordered column={1}>
                <Descriptions.Item label="Created At">
                        {new Date(orderDetails.paidAt).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </Descriptions.Item>
                    <Descriptions.Item label="Pay">
                        {orderDetails.isPaid ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleTwoTone twoToneColor="#ff4d4f" />}  {orderDetails?.paymentMethod}
                    </Descriptions.Item>
                    <Descriptions.Item label="Delivery">
                        <>
                            {orderDetails.isDelivered ? (
                                <>
                                    <CheckCircleTwoTone twoToneColor="#52c41a"  />
                                    <Descriptions.Item label="Delivery At">
                                        {new Date(orderDetails.deliveredAt).toLocaleString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </Descriptions.Item>
                                </>
                            ) : (
                                <CloseCircleTwoTone twoToneColor="#ff4d4f" />
                            )}
                        </>
                    </Descriptions.Item>
                    <Descriptions.Item label="FullName">
                        {orderDetails.shippingAddress?.fullname}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address">
                        {orderDetails.shippingAddress?.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone">
                        {orderDetails.shippingAddress?.phone}
                    </Descriptions.Item>
                    <Descriptions.Item label="Products">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {orderDetails.orderItems.map((item) => (
                                <div
                                    key={item.product}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '10px',
                                        borderRadius: '8px',
                                        background: '#f9f9f9',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                        width: '100%',
                                    }}
                                >
                                    <Image
                                        width={80}
                                        height={80}
                                        src={item.image}
                                        alt={item.name}
                                        style={{ borderRadius: '8px', objectFit: 'cover', marginRight: '20px' }}
                                    />
                                    <div style={{ flex: 1, paddingLeft: '10px' }}>
                                        <p style={{ margin: 0, fontWeight: 'bold', fontSize: '16px' }}>{item.name}</p>
                                        <p style={{ margin: '4px 0' }}>Quantity: {item.amount}</p>
                                        <p style={{ margin: 0, fontWeight: 'bold', color: 'darkOrange' }}>
                                            Total Price of Product: ${(item.amount * item.price)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Order Price">
                        <p style={{ fontWeight: 'bold', fontSize: '18px', color: 'darkOrange' }}>
                            ${orderDetails.totalPrice}
                        </p>
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </Modal>
    );
};

export default DetailOrderModal;
