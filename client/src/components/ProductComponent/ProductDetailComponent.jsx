import React, { useEffect, useState } from "react";
import { Col, Row, InputNumber } from "antd";
import { WrapperDetail, WrapperImage, WrapperPrice, WrapperPriceText, WrapperQuantity, WrapperTextSell, WrapperTitle } from "./style";
import { StarFilled, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonComponent from "../Button/ButtonComponent";
import { useParams } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
const ProductDetailComponent = () => {
    const { id } = useParams(); // Lấy id sản phẩm từ URL
    const [product, setProduct] = useState(null);

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

    const onChange = () => { };
    return (
        <Row style={{ padding: '16px', background: 'white', borderRadius: '10px' }}>
            <Col span={10} style={{ paddingRight: '16px' }} >
                <WrapperImage src={product.image} alt={product.name} preview={true} />
            </Col>


            <Col span={14} style={{ border: '1px solid #ccc', borderRadius: '10px' }}>
                <WrapperTitle style={{ margin: '10px' }}>
                {product.name}
                </WrapperTitle>
                <div style={{ margin: '10px' }}>
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(254,216,54)' }} />
                    <WrapperTextSell> | Sold {product.sold}</WrapperTextSell>

                </div>
                <WrapperPrice>
                    <WrapperPriceText>Price: ${product.price}</WrapperPriceText>
                </WrapperPrice>
                <WrapperQuantity>
                    <div>Quantity</div>
                    <div>
                        <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} changeOnWheel />
                        <br />
                        <span style={{ fontSize: '15px' }}>Stock: {product.countInStock}</span>
                    </div>
                </WrapperQuantity>
                <WrapperDetail>{product.description}</WrapperDetail>
                <div>
                    <ButtonComponent
                        size={'40px'}
                        styleButton={{
                            background: 'red',
                            height: '48px',
                            width: '220px',
                            margin: '30px',

                        }}
                        icon={<ShoppingCartOutlined style={{ color: '#fff' }} />}
                        textButton={'Add to Cart'}
                        styleTextButton={{ color: 'white' }}
                    ></ButtonComponent>
                </div>

            </Col>
        </Row>
    )
}
export default ProductDetailComponent
