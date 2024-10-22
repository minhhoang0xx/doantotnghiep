import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Row, Col, InputNumber, Typography, Steps, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { addCartItem, removeCartItem, updateCartItem } from '../../redux/slices/cartSlice';
import * as CartService from "../../services/CartService";
import { jwtTranslate } from "../../ultils";

const { Title } = Typography;
const { Step } = Steps;

const OrderPage = () => {
  const dispatch = useDispatch(); // Khởi tạo dispatch từ Redux
  const navigate = useNavigate(); // Khởi tạo navigate từ react-router-dom
  const cartItems = useSelector((state) => state.cart.cartItems || []); // Lấy danh sách sản phẩm trong giỏ hàng từ Redux
  const [quantities, setQuantities] = useState({}); // Trạng thái cho số lượng sản phẩm
  const user = localStorage.getItem('access_token'); // Lấy token người dùng từ localStorage
  const [loading, setLoading] = useState(true); // Trạng thái loading

  // Fetch dữ liệu giỏ hàng khi component được mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Bắt đầu loading
      try {
        const res = await CartService.getCart(jwtTranslate(user)?.id); // Lấy giỏ hàng từ API
        if (res.data.cartItems) {
          res.data.cartItems.forEach(item => {
            if (item.product && item.name && item.price && item.image) {
              dispatch(addCartItem(item)); // Thêm sản phẩm vào giỏ hàng Redux
            } else {
              console.warn('Incomplete cart item:', item); // Log nếu sản phẩm không đầy đủ
            }
          });
          // Cập nhật trạng thái số lượng cho mỗi sản phẩm
          setQuantities(res.data.cartItems.reduce((acc, item) => ({ ...acc, [item.product]: item.amount }), {}));
        }
      } catch (error) {
        console.error("Error fetching data:", error); // Log lỗi nếu có
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };
    fetchData(); // Gọi hàm fetchData
  }, [user, dispatch]);

  // Tải giỏ hàng từ localStorage khi trang được tải lại
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')); // Lấy giỏ hàng từ localStorage
    if (storedCart) {
      storedCart.forEach(item => {
        // Kiểm tra từng sản phẩm có đầy đủ thông tin không
        if (item.product && item.name && item.price && item.image) {
          dispatch(addCartItem(item)); // Thêm sản phẩm vào giỏ hàng Redux
        } else {
          console.warn('Stored item is incomplete:', item); // Log nếu sản phẩm không đầy đủ
        }
      });
    }
  }, [dispatch]);

  // Lưu giỏ hàng vào localStorage khi cartItems thay đổi
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems)); // Lưu giỏ hàng vào localStorage
  }, [cartItems]);

  // Hiển thị loading nếu đang trong trạng thái loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Hàm xử lý khi thay đổi số lượng sản phẩm
  const handleQuantityChange = async (productId, value) => {
    if (value < 1) return; // Ngăn không cho số lượng nhỏ hơn 1
    try {
      await CartService.updateCart(jwtTranslate(user)?.id, productId, value); // Gọi API để cập nhật số lượng sản phẩm
      dispatch(updateCartItem({ productId, newAmount: value })); // Cập nhật số lượng sản phẩm trong Redux
      setQuantities((prev) => ({ ...prev, [productId]: value })); // Cập nhật trạng thái số lượng
    } catch (error) {
      message.error('Failed to update cart item'); // Hiển thị thông báo lỗi
    }
  };

  // Hàm xử lý khi xóa sản phẩm khỏi giỏ hàng
  const handleRemoveCartItem = async (productId) => {
    try {
      await CartService.removeCart(jwtTranslate(user)?.id, productId); // Gọi API để xóa sản phẩm khỏi giỏ hàng
      dispatch(removeCartItem({ productId })); // Xóa sản phẩm khỏi giỏ hàng trong Redux
      message.success('Removed item from cart successfully');
      if (cartItems.length === 1) { // Nếu chỉ còn lại một sản phẩm và sản phẩm đó được xóa
        await CartService.deleteCart(jwtTranslate(user)?.id); } // Hiển thị thông báo thành công
    } catch (error) {
      console.error("Error removing cart item:", error); // Log lỗi nếu có
      message.error('Failed to remove cart item'); // Hiển thị thông báo lỗi
    }
  };


  // Hàm xử lý khi nhấn nút Checkout
  const handleCheckout = () => {
    message.success('Proceeding to checkout...'); // Hiển thị thông báo khi chuyển sang thanh toán
    navigate('/checkout'); // Chuyển đến trang thanh toán
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', fontSize: '28px' }}>Your Cart</Title>
      {cartItems.length === 0 ? ( // Kiểm tra xem giỏ hàng có sản phẩm không
        <p style={{ textAlign: 'center', color: '#888', fontSize: '18px' }}>Your cart is empty.</p>
      ) : (
        <div style={{ background: '#fff', borderRadius: '10px', padding: '20px', maxWidth: '85%', margin: '0 auto', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <Row gutter={16} style={{ display: 'flex' }}>
            <Col span={16}>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '22px' }}>Cart Status</h4>
                <Steps current={0}> {/* Hiển thị trạng thái thanh toán */}
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

              {cartItems.map((item) => ( // Lặp qua từng sản phẩm trong giỏ hàng
                <Row key={item.product} gutter={16} style={{ padding: '10px 0', borderBottom: '1px solid #eee', alignItems: 'center' }}>
                  <Col span={2}><Checkbox /></Col>
                  <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: '77px', height: '79px', objectFit: 'cover', marginRight: '10px', borderRadius: '8px' }} />
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#333' }}>{item.name}</div>
                  </Col>
                  <Col span={4}>${item.price.toFixed(2)}</Col>
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
                  {/* Hiển thị thông tin về giá trị giỏ hàng */}
                  <div>Subtotal: ${cartItems.reduce((total, item) => total + item.price * (quantities[item.product] || 1), 0).toFixed(2)}</div>
                  <div>Discount: $0.00</div>
                  <div>Shipping Fee: $0.00</div>
                </div>
                <div style={{ fontWeight: 'bold', color: 'rgb(254, 56, 52)', fontSize: '18px' }}>
                  Total: ${cartItems.reduce((total, item) => total + item.price * (quantities[item.product] || 1), 0).toFixed(2)}
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
  );
};

export default OrderPage;
