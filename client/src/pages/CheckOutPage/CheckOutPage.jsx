import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, Card, Form, Input, message } from 'antd';
import { createOrder as createOrderAction } from '../../redux/slices/orderSlice';
import { jwtTranslate } from '../../ultils';

const { Title } = Typography;

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const user = localStorage.getItem('access_token');
    const selectedCartItems = JSON.parse(localStorage.getItem('selectedCartItems')) || [];
    selectedCartItems.forEach(item => {
        console.log(item); // Check if amount is present and correct
    });
    const calculateTotal = () => {
        return selectedCartItems.reduce((total, item) => total + item.price * item.amount, 0).toFixed(2);
    };
    // State để lưu thông tin địa chỉ giao hàng và phương thức thanh toán
    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: '',
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
    const handlePaymentChange = (value) => {
        setPaymentMethod(value);
        localStorage.setItem('paymentMethod', value); // Lưu phương thức thanh toán vào localStorage
    };

    const handleCheckout = async () => {
        if (selectedCartItems.length === 0) {
            message.warning('Your cart is empty.'); 
            return;
        }
        console.log("Selected Cart Items:", selectedCartItems);
        const orderData = {
            orderItems: selectedCartItems.map(item => ({
                product: item.product,
                name: item.name,
                price: item.price,
                amount: item.amount,
                
            })),

            shippingAddress: {
                address: shippingAddress.address,
                city: shippingAddress.city,
                postalCode: shippingAddress.postalCode,
                country: shippingAddress.country,
            },
            paymentMethod,
            user: jwtTranslate(user)?.id,
            totalPrice: calculateTotal(),
    
        };
        console.log("Order Data:", orderData);
        try {
            await dispatch(createOrderAction(orderData)).unwrap();
            message.success('Order created successfully!');
            // Reset giỏ hàng và thông tin địa chỉ sau khi đặt hàng thành công
            localStorage.removeItem('shippingAddress');
            localStorage.removeItem('paymentMethod');
            localStorage.removeItem('selectedCartItems'); // Xóa sản phẩm đã chọn
            // Điều hướng tới trang khác nếu cần
        } catch (error) {
            message.error('Failed to create order: ' + error);
        }
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
                            <div key={item.product} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                                <span>{item.name} (x{item.amount})</span>
                                <span>${(item.price * item.amount).toFixed(2)}</span>
                            </div>
                        ))}
                        <div style={{ fontWeight: 'bold', marginTop: '10px' }}>
                            Total: ${calculateTotal()}
                        </div>
                    </div>
                )}
                
                {/* Form nhập địa chỉ giao hàng */}
                <Form layout="vertical" style={{ marginTop: '20px' }}>
                    <Title level={4}>Shipping Address</Title>
                    <Form.Item label="Address">
                        <Input
                            value={shippingAddress.address}
                            onChange={(e) => handleAddressChange('address', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="City">
                        <Input
                            value={shippingAddress.city}
                            onChange={(e) => handleAddressChange('city', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Postal Code">
                        <Input
                            value={shippingAddress.postalCode}
                            onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Country">
                        <Input
                            value={shippingAddress.country}
                            onChange={(e) => handleAddressChange('country', e.target.value)}
                        />
                    </Form.Item>

                    {/* Form nhập phương thức thanh toán */}
                    <Title level={4}>Payment Method</Title>
                    <Form.Item label="Payment Method">
                        <Input
                            value={paymentMethod}
                            onChange={(e) => handlePaymentChange(e.target.value)}
                        />
                    </Form.Item>

                    <Button type="primary" onClick={handleCheckout} style={{ width: '100%' }}>
                        Place Order
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default CheckoutPage;
