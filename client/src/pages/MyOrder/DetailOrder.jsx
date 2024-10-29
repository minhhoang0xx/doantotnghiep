import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Descriptions, Image, Spin, Typography, message } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import * as OrderService from "../../services/OrderService";
import dayjs from 'dayjs';

const { Title } = Typography;

const DetailOrder = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cancelLoading, setCancelLoading] = useState(false);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            setLoading(true);
            try {
                const res = await OrderService.getDetailOrder(orderId);
                if (res?.status === 'OK') {
                    setOrderDetails(res.data);
                } else {
                    message.error('Failed to fetch order details');
                }
            } catch (error) {
                message.error('Error fetching order details: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderDetails();
    }, [orderId]);

    const handleCancelOrder = async () => {
        setCancelLoading(true);
        try {
            const res = await OrderService.cancelOrder(orderId, orderDetails.orderItems);
            if (res?.status === 'OK') {
                message.success('Order canceled successfully');
                navigate('/myOrder');
            } else {
                message.error('Failed to cancel order');
            }
        } catch (error) {
            message.error('Error canceling order: ' + error.message);
        } finally {
            setCancelLoading(false);
        }
    };

    if (loading) {
        return <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />;
    }

    if (!orderDetails) {
        return <p>No order details found.</p>;
    }

    return (
        <div style={{ padding: '100px 0 0 0', background: '#f0f2f5', minHeight: '100vh' }}>
            <div style={{ maxWidth: '80%', margin: '0 auto', background: '#fff', padding: '20px', borderRadius: '8px' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', fontSize: '28px' }}>Order Details</Title>
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
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button
                        type="primary"
                        danger
                        onClick={handleCancelOrder}
                        loading={cancelLoading}
                        disabled={orderDetails.isPaid}
                    >
                        Cancel Order
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DetailOrder;
