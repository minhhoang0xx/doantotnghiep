import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Checkbox, Modal, Typography, Steps, Row, Col, InputNumber, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { addCartItem, removeCartItem, updateCartItem } from '../../redux/slices/cartSlice';
import * as CartService from "../../services/CartService"
import {jwtTranslate} from "../../ultils"
const { Title } = Typography;
const { Step } = Steps;

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems || []); // Use cartItems from cartSlice
  const [quantities, setQuantities] = useState({});
  
  const user = localStorage.getItem('access_token');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await CartService.getCart(jwtTranslate(user)?.id);
        if (res.data.cartItems) {
          res.data.cartItems.forEach(item => {
            if (item.product && item.name && item.price && item.image) {
              dispatch(addCartItem(item));
            } else {
              console.warn('Incomplete cart item:', item); // Log cảnh báo nếu có sản phẩm không đầy đủ
            }
          });
          setQuantities(res.data.cartItems.reduce((acc, item) => ({ ...acc, [item.product]: item.amount }), {}));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, dispatch]);
  
  // Lưu cart vào localStorage khi cartItems thay đổi
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Tải cart từ localStorage khi trang được tải lại
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      storedCart.forEach(item => {
        // Kiểm tra xem item có đầy đủ thông tin không trước khi thêm vào
        if (item.product && item.name && item.price && item.image) {
          dispatch(addCartItem(item));
        } else {
          console.warn('Stored item is incomplete:', item); // Log nếu sản phẩm không đầy đủ
        }
      });
    }
  }, [dispatch]);
  
  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator
  }

  const handleQuantityChange = (productId, value) => {
    dispatch(updateCartItem({ productId, newAmount: value }));
    setQuantities((prev) => ({ ...prev, [productId]: value }));
  };
  const handleRemoveCartItem = (productId) => {
    dispatch(removeCartItem({ productId }));
    message.success('Removed item from cart successfully');
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', fontSize: '28px' }}>Your Cart</Title>
      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888', fontSize: '18px' }}>Your cart is empty.</p>
      ) : (
        <div style={{ background: '#fff', borderRadius: '10px', padding: '20px', maxWidth: '85%', margin: '0 auto', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <Row gutter={16} style={{ display: 'flex' }}>
            <Col span={16}>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '22px' }}>Cart Status</h4>
                <Steps current={0}>
                  <Step title="Order" />
                  <Step title="Payment" />
                  <Step title="Shipping" />
                </Steps>
              </div>

              <Row gutter={16} style={{ fontWeight: 'bold', fontSize: '16px', padding: '10px 0', borderBottom: '1px solid #ddd' }}>
                <Col span={2}><Checkbox /></Col>
                <Col span={8}>Product</Col>
                <Col span={4}>Price</Col>
                <Col span={4}>Quantity</Col>
                <Col span={4}>Total</Col>
                <Col span={2}><DeleteOutlined style={{ cursor: 'pointer' }} /></Col>
              </Row>

              {cartItems.map((item, index) => (
                <Row key={index} gutter={16} style={{ padding: '10px 0', borderBottom: '1px solid #eee', alignItems: 'center' }}>
                  <Col span={2}><Checkbox /></Col>
                  <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: '77px', height: '79px', objectFit: 'cover', marginRight: '10px', borderRadius: '8px' }} />
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#333' }}>{item.name}</div>
                  </Col>
                  <Col span={4}>${item.price}</Col>
                  <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                    <InputNumber min={1} value={quantities[item.product] || 1} onChange={(value) => handleQuantityChange(item.product, value)} />
                  </Col>
                  <Col span={4}>${(item.price * (quantities[item.product] || 1)).toFixed(2)}</Col>
                  <Col span={2}><DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleRemoveCartItem(item.product)} /></Col>
                </Row>
              ))}
            </Col>

            <Col span={8}>
              <div style={{ padding: '20px', background: '#fafafa', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', position: 'relative', height: '95%' }}>
                <div style={{ marginBottom: '20px', fontSize: '16px' }}>
                  <span>Address: </span>
                  <span style={{ fontWeight: 'bold' }}>Your Address</span>
                  <Button type="link">Change</Button>
                </div>
                <div style={{ marginBottom: '20px', fontSize: '14px' }}>
                  <div>Subtotal: ${cartItems.reduce((total, item) => total + item.price * (quantities[item.product] || 1), 0).toFixed(2)}</div>
                  <div>Discount: $0.00</div>
                  <div>Shipping Fee: $0.00</div>
                </div>
                <div style={{ fontWeight: 'bold', color: 'rgb(254, 56, 52)', fontSize: '18px' }}>
                  Total: ${cartItems.reduce((total, item) => total + item.price * (quantities[item.product] || 1), 0).toFixed(2)}
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