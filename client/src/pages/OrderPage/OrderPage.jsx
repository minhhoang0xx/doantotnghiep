import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Checkbox, Modal, Typography, Steps, Row, Col, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { fetchAllOrder } from '../../redux/slices/orderSlice';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Step } = Steps;

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.order.orderItems);
  const [quantities, setQuantities] = useState({});
  const orderItemsSelected = useSelector((state) => state.order.orderItemsSlected);

const handleQuantityChange = (orderId, value) => {
  setQuantities((prev) => ({ ...prev, [orderId]: value })); // Cập nhật quantity cho order tương ứng
};


  // const handleCancelOrder = (orderId) => {
  //   Modal.confirm({
  //     title: 'Are you sure you want to cancel this order?',
  //   });
  // };

  // const handleRemoveAllSelectedOrders = () => {
  //   const listChecked = orderItemsSelected.map(item => item.product);
  //   dispatch(removeAllOrderProduct({ listChecked }));
  //   message.success('Removed all selected orders successfully');
  // };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', fontSize: '28px' }}>Your Orders</Title>
      {orders.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888', fontSize: '18px' }}>You have no orders yet.</p>
      ) : (
        <div style={{ background: '#fff', borderRadius: '10px', padding: '20px', maxWidth: '85%', margin: '0 auto', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <Row gutter={16} style={{ display: 'flex' }}>
            <Col span={16}>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '22px' }}>Order status</h4>
                <Steps current={0}>
                  <Step title="Order" />
                  <Step title="Payment" />
                  <Step title="Shipping" />
                </Steps>
              </div>

              <Row gutter={16} style={{ fontWeight: 'bold', fontSize: '16px', padding: '10px 0', borderBottom: '1px solid #ddd' }}>
                <Col span={2}>
                  <Checkbox />
                </Col>
                <Col span={8}>
                  Product
                </Col>
                <Col span={4}>
                  Price
                </Col>
                <Col span={4}>
                  Quantity
                </Col>
                <Col span={4}>
                  Total
                </Col>
                <Col span={2}>
                  <DeleteOutlined style={{ cursor: 'pointer' }} />
                </Col>
              </Row>

              {orders.map((order, index) => (
                <Row key={index} gutter={16} style={{ padding: '10px 0', borderBottom: '1px solid #eee', alignItems: 'center' }}>
                  <Col span={2}>
                    <Checkbox />
                  </Col>
                  <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={order.image} alt={order.name} style={{ width: '77px', height: '79px', objectFit: 'cover', marginRight: '10px', borderRadius: '8px' }} />
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#333' }}>{order.name}</div>
                  </Col>
                  <Col span={4}>
                    ${order.price}
                  </Col>
                  <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                    <InputNumber min={1} value={order.amount} onChange={(value) => handleQuantityChange(value, order)} />
                  </Col>
                  <Col span={4}>
                    ${order.price * order.amount}
                  </Col>
                  <Col span={2}>
                    <DeleteOutlined style={{ cursor: 'pointer' }} />
                  </Col>
                </Row>
              ))}
            </Col>

            <Col span={8}>
              <div style={{ padding: '20px', background: '#fafafa', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', position: 'relative', height: '95%' }}>
                <div style={{ marginBottom: '20px', fontSize: '16px' }}>
                  <span>Address: </span>
                  <span style={{ fontWeight: 'bold' }}>Address</span>
                  <Button type="link">Change</Button>
                </div>
                <div style={{ marginBottom: '20px', fontSize: '14px' }}>
                  <div>Subtotal: ${orders.reduce((total, order) => total + order.price * order.amount, 0)}</div>
                  <div>Discount: $0.00</div>
                  <div>Shipping Fee: $0.00</div>
                </div>
                <div style={{ fontWeight: 'bold', color: 'rgb(254, 56, 52)', fontSize: '18px' }}>
                  Total: ${orders.reduce((total, order) => total + order.price * order.amount, 0)} 
                </div>
                <Button type="primary" size="large" style={{ width: '100%', marginTop: '20px', fontSize: '16px' }}>
                  Checkout
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};


export default OrderPage;
