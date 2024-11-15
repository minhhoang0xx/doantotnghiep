import React, { useEffect, useState } from 'react';
import { Table, message, Button, Image ,Typography, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, cancelOrder } from '../../redux/slices/orderSlice';
import * as OrderService from "../../services/OrderService";
import { jwtTranslate } from "../../ultils";
import dayjs from 'dayjs';
const { Title } = Typography;
const MyOrderPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders, isLoading, error } = useSelector((state) => state.order);
    const user = localStorage.getItem('access_token'); 
    const userId = jwtTranslate(user)?.id || '';
    const [loading, setLoading] = useState(true);
    const handleClick = (orderId) => {
        navigate(`/order/detailOrder/${orderId}`);
    };
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const userID = userId
                const res = await OrderService.UserOrder(userID)
                console.log(res)
                if (res?.status === 'OK') {
                    dispatch(fetchOrders(res.data));
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch, userId]);

    const handleCancelOrder = async (orderId, orderItems) => {
        console.log(orderItems)
        try {
            const res = await OrderService.cancelOrder(orderId, orderItems); // Gọi API hủy đơn
          
            if (res.status === 'OK') {
                message.success('Order canceled successfully');
                dispatch(cancelOrder({ orderId, orderItems })); // Cập nhật redux
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            message.error('Error while canceling order: ' + error.message);
        }
    };

    const columns = [
        {
            title: 'Product',
            dataIndex: 'orderItems',
            key: 'orderItems',
            render: (orderItems, record) => (
                <div style={{ display: 'flex', gap: '10px', cursor: 'pointer' }}  onClick={() => handleClick(record._id)}>
                    {orderItems.slice(0,1).map((item) => (
                        <Image
                            key={item._id}
                            width={50}
                            height={50}
                            src={item.image}
                            alt={item.name}
                            style={{ borderRadius: '8px', objectFit: 'cover' }}
                        />
                    ))}
                    {orderItems.length > 1 && <span>+{orderItems.length - 1}</span>}
                </div>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'paidAt',
            key: 'paidAt',
            render: (text) => new Date(text).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }),
        },
  
        {
            title: 'Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (price) => `$${price}`,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button
                    type="text"
                    icon={<CloseCircleOutlined style={{ color: 'red', fontSize: '18px' }} />}
                    onClick={() => handleCancelOrder(record._id, record.orderItems)}
                    disabled={record.isPaid || record.isDelivered} 
                />
            ),
        },
    ];

    return (
        <div style={{ padding: '50px 0', background: '#f0f2f5', minHeight: '100vh' }}>
            <Row justify="center">
                <Col xs={24} sm={24} md={20} lg={16}>
                    <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', fontSize: '28px' }}>My Order</Title>
                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    <Table
                        loading={isLoading || loading}
                        dataSource={Array.isArray(orders) ? orders : []}
                        columns={columns}
                        rowKey="_id"
                        pagination={{ pageSize: 5 }}
                        style={{ background: '#fff', padding: '20px', borderRadius: '8px' }}
                    />
                </Col>
            </Row>
        </div>
    );
};


export default MyOrderPage;
