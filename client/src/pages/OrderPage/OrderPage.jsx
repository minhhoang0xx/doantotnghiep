import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Row, Col, InputNumber, Typography, Steps, message, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { addCartItem, removeCartItem, updateCartItem, clearCart } from '../../redux/slices/cartSlice';
import * as CartService from "../../services/CartService";
import { jwtTranslate } from "../../ultils";

const { Title } = Typography;
const { Step } = Steps;

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems || []); // Lấy list product trong cart từ Redux
  console.log('Current cart items:', cartItems);
  const [quantities, setQuantities] = useState({});
  const user = localStorage.getItem('access_token');
  const [loading, setLoading] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());

  // LAY GIO HANG TU API, LUU VAO REDUX, UPDATE SO LUONG
  // chay moi khi co su thay doi tk user
  // useEffect để load cart từ API hoặc localStorage
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Khi có người dùng đăng nhập, lấy giỏ hàng từ API
        if (user) {
          const res = await CartService.getCart(jwtTranslate(user)?.id);
          console.log('user', res.data.cartItems)
          if (res.data.cartItems) {
            res.data.cartItems.forEach(item => {
              console.log('item', item)
              if (item.product && item.name && item.price && item.image) {
                dispatch(addCartItem(item));
              }
            });
            setQuantities(
              res.data.cartItems.reduce((acc, item) => ({ ...acc, [item.product]: item.amount }), {})
            );
          }
        } else {
          // Khi chưa đăng nhập, lấy giỏ hàng từ localStorage
          const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
          console.log('stored', storedCart)
          if (storedCart.length > 0) {
            storedCart.forEach(item => {
              if (item.product && item.name && item.price && item.image) {
                console.log('item', item)
                dispatch(addCartItem(item));
              }
            });
            setQuantities(
              storedCart.reduce((acc, item) => ({ ...acc, [item.product]: item.amount }), {})
            );
          } else {
            console.log('No items in local storage');
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, dispatch]);


  localStorage.removeItem('selectedCartItems');
  // localStorage.removeItem('cart')
  const handleSelectAllChange = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      const allSelected = new Set(cartItems.map(item => item.product));
      setSelectedItems(allSelected);
    } else {
      setSelectedItems(new Set());
    }
  };
  const handleItemSelect = (product) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(product)) {
      newSelectedItems.delete(product);
    } else {
      newSelectedItems.add(product);
    }
    setSelectedItems(newSelectedItems);
    setSelectAll(newSelectedItems.size === cartItems.length);
  };

  const handleDeleteAll = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete all items?',
      onOk: async () => {
        try {
          await CartService.deleteCart(jwtTranslate(user)?.id);
          dispatch(clearCart()); // Cập nhật Redux
          message.success('All items removed from cart successfully');
        } catch (error) {
          message.error('Failed to remove all items from cart');
        }
      },
    });
  };

  const handleQuantityChange = async (product, value) => {
    if (value < 1) return;
    if (user) {
      try {
        await CartService.updateCart(jwtTranslate(user)?.id, product, value); //Api update
        dispatch(updateCartItem({ product, newAmount: value })); // update  Redux
        setQuantities((prev) => ({ ...prev, [product]: value })); // update trạng thái
      } catch (error) {
        message.error('Failed to update cart item');
      }
    } else {
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCart = storedCart.map(item =>
        item.product === product ? { ...item, amount: value } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      dispatch(updateCartItem({ product, newAmount: value })); 
      setQuantities((prev) => ({ ...prev, [product]: value })); //set lai quantity
    }
  };

  const handleRemoveCartItem = async (product) => {
    if (user){
    try {
      await CartService.removeCart(jwtTranslate(user)?.id, product); // Gọi API 
      dispatch(removeCartItem({ product })); // xoa trong Redux
      message.success('Removed item from cart successfully');
      if (cartItems.length === 1) { // neu sp =1 thi xoa luon cart
        await CartService.deleteCart(jwtTranslate(user)?.id);
      }
    } catch (error) {
      message.error('Failed to remove cart item'); 
    }
  } else {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = storedCart.filter(item => item.product !== product);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    dispatch(removeCartItem({ product })); // delete trong redux
    message.success('Removed item from cart successfully');
  }
  };

  // Hàm xử lý khi nhấn nút Checkout
  const handleCheckout = () => {
    if (selectedItems.size === 0) {
      message.warning('Please select at least one item to proceed to checkout.');
      return;
    }
    // Tạo một danh sách các sản phẩm đã chọn
    const selectedCartItems = cartItems.filter(item => selectedItems.has(item.product));
    /////// // gán gia tri amount tranh loi logic
    const selectedQuantities = {};
    selectedItems.forEach(product => {
      selectedQuantities[product] = quantities[product];
    });
    const updatedSelectedCartItems = selectedCartItems.map(item => {
      return {
        ...item,
        amount: selectedQuantities[item.product] || item.amount
      };
    });
    localStorage.setItem('selectedCartItems', JSON.stringify(updatedSelectedCartItems));
    navigate('/checkOut');
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      if (selectedItems.has(item.product)) {
        return total + item.price * (quantities[item.product] || 1);
      }
      return total;
    }, 0);
  };

  return (
    <div style={{ padding: '50px 0 0 0 ', background: '#f0f2f5' }}>
      <Button type="primary" style={{ position: 'absolute', top: 60, right: 10, fontSize: '16px', backgroundColor: '#4CAF50', border: 'none', padding: '10px 20px', borderRadius: '5px', }}
        onClick={() => navigate('/myOrder')}>My Orders </Button>
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
                  <Col span={2}><Checkbox checked={selectAll} onChange={handleSelectAllChange} /></Col>
                  <Col span={8}>Product</Col>
                  <Col span={4}>Price</Col>
                  <Col span={4}>Quantity</Col>
                  <Col span={4}>Total</Col>
                  <Col span={2}><DeleteOutlined style={{ cursor: 'pointer' }} onClick={handleDeleteAll} /></Col>
                </Row>

                {cartItems.map((item) => (
                  <Row key={item.product} gutter={16} style={{ padding: '10px 0', borderBottom: '1px solid #eee', alignItems: 'center' }}>
                    <Col span={2}><Checkbox checked={selectedItems.has(item.product)} onChange={() => handleItemSelect(item.product)} /></Col>
                    <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={item.image} alt={item.name} style={{ width: '77px', height: '79px', objectFit: 'cover', marginRight: '10px', borderRadius: '8px' }} />
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#333' }}>{item.name}</div>
                    </Col>
                    <Col span={4}>${item.price}</Col>
                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                      <InputNumber min={1} value={quantities[item.product] || 1} onChange={(value) => handleQuantityChange(item.product, value)} />
                    </Col>
                    <Col span={4}>${(item.price * (quantities[item.product] || 1))}</Col>
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
                    <div>Subtotal: ${calculateTotal()}</div>
                    <div>Discount: $0.00</div>
                    <div>Shipping Fee: $30.00</div>
                  </div>
                  <div style={{ fontWeight: 'bold', color: 'rgb(254, 56, 52)', fontSize: '18px' }}>
                    Total: ${calculateTotal() + 30}
                  </div>
                  <Button type="primary" size="large" style={{ width: '100%', marginTop: '20px', fontSize: '16px' }} onClick={handleCheckout}>
                    Checkout
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
