import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, Card, Form, Input, message, Image, Radio } from 'antd';
import { jwtTranslate } from '../../ultils';
import * as OrderService from "../../services/OrderService"; 
import { useNavigate } from 'react-router-dom';
import { removeSelectedItems } from '../../redux/slices/cartSlice';
import * as CartService from "../../services/CartService";
const { Title } = Typography;


const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const user = localStorage.getItem('access_token');
    const selectedCartItems = JSON.parse(localStorage.getItem('selectedCartItems')) || [];
    selectedCartItems.forEach(item => {
        console.log(item); // Check if amount is present and correct
    });
    const calculateTotal = () => {
        return selectedCartItems.reduce((total, item) => total + item.price * item.amount, 0);
    };
    // State để lưu thông tin địa chỉ giao hàng và phương thức thanh toán
    const [shippingAddress, setShippingAddress] = useState({
        fullname: '',
        address: '',
        phone: '',
    });

    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        // Tự động lưu địa chỉ giao hàng và phương thức thanh toán nếu có
        const savedAddress = JSON.parse(localStorage.getItem('shippingAddress'));
        const savedPaymentMethod = localStorage.getItem('paymentMethod');

        if (savedAddress) setShippingAddress(savedAddress);
        if (savedPaymentMethod) setPaymentMethod(savedPaymentMethod);
    }, []);

    const handleAddressChange = (field, value) => {
        const newAddress = { ...shippingAddress, [field]: value };
        setShippingAddress(newAddress);
        localStorage.setItem('shippingAddress', JSON.stringify(newAddress)); // Lưu địa chỉ vào localStorage
    };
    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
        localStorage.setItem('paymentMethod', e.target.value); // Lưu phương thức thanh toán vào localStorage
    };

    const handleCheckout = async () => {
        if (isLoading) return; // Ngăn chặn nhấn nhiều lần
    setIsLoading(true);
        if (selectedCartItems.length === 0) {
            message.warning('Your cart is empty.');
            return;
        }
        const userId = jwtTranslate(user)?.id;
        if (!userId) {
            message.error('User ID is not available. Please log in.');
            return;
        }
        console.log("Selected Cart Items:", selectedCartItems);
        const orderData = {
            orderItems: selectedCartItems.map(item => ({
                image: item.image,
                product: item.product,
                name: item.name,
                price: item.price,
                amount: item.amount,
            })),
            shippingAddress,
            paymentMethod,
            user: userId,
            itemsPrice: calculateTotal(),
            shippingPrice: 30,
            totalPrice: calculateTotal(),
            isPaid: false,
            paidAt: null,
            // email: 'hoanglmgch210529@fpt.edu.vn'
        };
        console.log("Order Data:", orderData);
        try {
            const response = await OrderService.createOrder(userId, orderData);
            if (response.status === 'ERR') {
                message.error(`Out of stock!!!`);
            } else {
                for (const item of selectedCartItems) {
                        await CartService.removeCart(userId, item.product); 
                }
                dispatch(removeSelectedItems(selectedCartItems));// xoa san pham trong cart
                message.success('Order created successfully');
                localStorage.removeItem('shippingAddress');
                localStorage.removeItem('paymentMethod');
                localStorage.removeItem('selectedCartItems');
                navigate('/myOrder');
            }
        } catch (error) {
            message.error('Failed to create order: ' + error);
        }
        setIsLoading(false);
    };

    return (
        <div style={{ padding: '50px', background: '#f0f2f5' }}>
            <Title level={2} style={{ textAlign: 'center' }}>CHECK OUT</Title>
            <Card style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Title level={4}>Order Summary</Title>
                {selectedCartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
                        {selectedCartItems.map(item => (
                            <Card
                                key={item.product}
                                style={{
                                    alignItems: 'center',
                                    marginBottom: '15px',
                                    border: '1px solid #f0f0f0',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '10px',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <Image width={70} height={70} src={item.image} alt={item.name} style={{ borderRadius: '8px' }} />
                                    <div>
                                        <p style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>{item.name}</p>
                                        <p style={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '14px', margin: '5px 0 0' }}>Quantity: {item.amount}</p>
                                    </div>
                                </div>
                                <div style={{ fontSize: '16px', fontWeight: '500', textAlign: 'right', minWidth: '80px' }}>
                                    ${(item.price * item.amount)}
                                </div>
                            </Card>
                        ))}
                        <div style={{ textAlign: 'left', marginTop: '20px', fontSize: '18px', fontWeight: 'bold', color: 'darkorange' }}>
                            Total: ${calculateTotal()}
                        </div>
                    </div>
                )}

                {/* Form nhập địa chỉ giao hàng */}
                <Form layout="vertical" style={{ marginTop: '20px' }}>
                    <Title level={4}>Shipping Address</Title>
                    <Form.Item label="Full Name">
                        <Input
                            value={shippingAddress.fullname}
                            onChange={(e) => handleAddressChange('fullname', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Address">
                        <Input
                            value={shippingAddress.address}
                            onChange={(e) => handleAddressChange('address', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Phone Number">
                        <Input
                            value={shippingAddress.phone}
                            onChange={(e) => handleAddressChange('phone', e.target.value)}
                        />
                    </Form.Item>

                    <Title level={4}>Payment Method</Title>
                    <Form.Item label="Choose Payment Method">
                        <Radio.Group onChange={handlePaymentChange} value={paymentMethod} style={{ display: 'block' }}>
                            <Radio style={{ display: 'block', marginBottom: '10px' }} value="creditCard">Credit Card</Radio>
                            <Radio style={{ display: 'block', marginBottom: '10px' }} value="paypal">PayPal</Radio>
                            <Radio style={{ display: 'block', marginBottom: '10px' }} value="cashOnDelivery">Cash on Delivery</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <div>
                        <Button type="primary" onClick={handleCheckout} style={{ width: '100%' }}>
                            Place Order
                        </Button>
                    </div>

                </Form>
            </Card>
        </div>
    );
};

export default CheckoutPage;
