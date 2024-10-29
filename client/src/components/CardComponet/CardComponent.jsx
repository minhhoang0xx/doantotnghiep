import React, { useState } from "react";
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Card, message } from 'antd';
import Meta from "antd/es/card/Meta";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { addCartItem } from '../../redux/slices/cartSlice'; 
import * as CartService from "../../services/CartService"

const CardComponent = (props) => {
    const { _id, countInStock, image, name, price, rating, sold } = props;
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    const location = useLocation();
    const [amount, setAmount] = useState(1);
    const handleClick = () => {
        navigate(`/product/detailProduct/${_id}`);
    };

    const handleAddToCart = async () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname });
        } else if (user?.isAdmin) { 
            message.error('Admin cannot add products to the cart.');
        } else {
            if (countInStock > 0) { // Kiểm tra xem sản phẩm còn hàng không
                const data = { productId: _id, name, image, price, amount};
                try {
                    const res = await CartService.createCart(user?.id, data);
    
                    if (res && res._id) { 
                        // Sau khi thêm vào cơ sở dữ liệu thành công, cập nhật Redux store
                        dispatch(addCartItem({ cartItem: data }));
                        message.success(`${name} added to cart!`);
                    } else {
                        console.log('Adding to cart:', data); // Log dữ liệu trước khi gửi
                        message.error('Failed to add product to cart.'); // Thông báo lỗi
                    }
                } catch (error) {
                    message.error('Error adding product to cart.'); // Thông báo lỗi
                }
            } else {
                message.error('This product is out of stock.');
            }
        }
    };
    
    return (
        <Card
            hoverable // hover 
            style={{ width: '18.7%', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            cover={
                <div style={{ height: '200px', overflow: 'hidden' }} onClick={handleClick} >
                    <img alt="Product Card" src={image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            }
            actions={[

                <ShoppingCartOutlined key="addToCart" alt='Add To Cart' style={{ color: '#52c41a', fontSize: '24px' }} onClick={handleAddToCart} />,
            ]} 
        >
            <Meta
                title={<span style={{ fontWeight: 'bold', fontSize: '20px' }}>{name}</span>}
                description={
                    <div style={{ marginTop: '10px' }}>
                        <p style={{ margin: '10px 0', fontSize: '14px', fontWeight: 'bold', color: 'darkgreen' }}>Price: ${price}</p>
                        <p style={{ margin: '5px 0', fontSize: '12px', color: '#999' }}>Stock: {countInStock}</p>
                        <p style={{ margin: '5px 0', fontSize: '12px', color: '#999' }}>Sold: {sold}</p>
                        <p style={{ margin: '5px 0', fontSize: '12px', color: '#999' }}>Rating: {rating}</p>
                    </div>
                }
            />
        </Card>
    )
}
export default CardComponent
