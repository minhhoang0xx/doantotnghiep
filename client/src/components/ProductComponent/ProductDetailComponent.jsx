import React, { useEffect, useState } from "react";
import { Col, Row, InputNumber, message } from "antd";
import { WrapperDetail, WrapperImage, WrapperPrice, WrapperPriceText, WrapperQuantity, WrapperTextSell, WrapperTitle } from "./style";
import { StarFilled, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonComponent from "../Button/ButtonComponent";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../../redux/slices/cartSlice';
import * as CartService from "../../services/CartService";
import LikeButtonComponent from "../FBcomponent/LikeButtonComponent";
import CommentComponent from "../FBcomponent/CommentComponent";
import {initFacebookSDK} from "../../ultils"

const ProductDetailComponent = () => {
    const { id } = useParams(); // Lấy id sản phẩm từ URL
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); // Trạng thái số lượng sản phẩm
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    const location = useLocation();

    useEffect(() =>{
        initFacebookSDK()
    })
    useEffect(() => {
        const fetchProductDetail = async () => {
            const res = await ProductService.detailProduct(id); // Gọi API để lấy chi tiết sản phẩm
            setProduct(res?.data);

        };
        fetchProductDetail();
    }, [id]);
    if (!product) {
        return <div>Loading...</div>; // Hiển thị loading nếu product chưa có dữ liệu
    }

    const onChange = (value) => {
        setQuantity(value); // Cập nhật số lượng khi người dùng thay đổi
    };
    const handleAddToCart = async () => {
        if (user?.isAdmin) {
            message.error('Admin cannot add products to the cart.');
            return;
        }
        if (product.countInStock < quantity) {
            message.error('Not enough stock available.');
            return;
        }
        const data = {
            product: product?._id,
            name: product?.name,
            image: product?.image,
            price: product?.price,
            amount: quantity,
        };

        if (!user?.id) {
            // Xử lý giỏ hàng trong localStorage nếu chưa đăng nhập
            const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
            const checkcount = existingCart.findIndex(item => item.product === product?._id);
            if (checkcount !== -1) {
                // Cập nhật số lượng nếu sản phẩm đã tồn tại trong giỏ hàng
                existingCart[checkcount].amount += quantity;
            } else {
                existingCart.push(data);
            }
            localStorage.setItem('cart', JSON.stringify(existingCart));
            message.success(`${product?.name} added to session cart!`);
        } else {
            // Gọi API để lưu giỏ hàng cho người dùng đã đăng nhập
            try {
                const response = await CartService.createCart(user?.id, data);
                dispatch(addCartItem({ cartItem: data }));
                message.success(`${product?.name} added to cart!`);
            } catch (error) {
                message.error('Error adding product to cart.');
            }
        }
    };
    return (
        <Row gutter={[16, 16]} style={{ padding: '16px', background: 'white', borderRadius: '10px', boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.1)' }}>
            <Col xs={24} md={10} style={{ paddingRight: '16px', paddingLeft: '0px' }}>
                <WrapperImage src={product?.image} alt={product?.name} preview={true} />
            </Col>
            <Col xs={24} md={14} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '16px' }}>
                <div style={{ margin: '10px 0' }}>
                    <WrapperTitle>{product?.name}</WrapperTitle>
                
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(254,216,54)' }} />
                    <WrapperTextSell> | Sold {product?.sold}</WrapperTextSell>
                    <br />
                    <span style={{ fontSize: '15px' }}>Stock: {product?.countInStock}</span>
                </div>
                <WrapperPrice>
                    <WrapperPriceText>Price: ${product?.price}</WrapperPriceText>
                </WrapperPrice>
                <WrapperQuantity>
                    <div>Quantity</div>
                    <InputNumber min={1} max={product.countInStock} value={quantity} onChange={onChange} style={{ marginBottom: '8px' }} />
                </WrapperQuantity>
                <WrapperDetail>{product?.description}</WrapperDetail>
                <LikeButtonComponent dataHref={"https://developers.facebook.com/docs/plugins/"}/>
                <ButtonComponent
                    size={'40px'}
                    styleButton={{
                        background: 'red',
                        height: '48px',
                        width: '100%',
                        marginTop: '30px',
                    }}
                    icon={<ShoppingCartOutlined style={{ color: '#fff' }} />}
                    textButton={'Add to Cart'}
                    styleTextButton={{ color: 'white' }}
                    onClick={handleAddToCart}
                />
            </Col>
            <CommentComponent dataHref={"https://developers.facebook.com/docs/plugins/comments#configurator"} width="100%"/>
        </Row>
    );
};
export default ProductDetailComponent
