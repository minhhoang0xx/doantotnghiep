import React from "react";
import {Col,Row, InputNumber} from "antd";
import { WrapperDetail, WrapperImage, WrapperPrice, WrapperPriceText, WrapperQuantity, WrapperTextSell, WrapperTitle } from "./style";
import { StarFilled, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonComponent from "../Button/ButtonComponent";
// import imageProduct from '../public/assets/test.jpg'; 
const ProductDetailComponent = () =>{
    const onChange = () => {

    }
    return ( 
            <Row style ={{padding: '16px', background:'white',  borderRadius:'10px'}}> 
                <Col span={10} style={{ paddingRight:'16px'}} >
                    <WrapperImage src="/assets/1.jpg" alt="image Product" preview={true} style={{ borderRadius:'10px'}}/>
                </Col>


                <Col span={14} style={{ border: '1px solid #ccc', borderRadius:'10px'}}>
                    <WrapperTitle style={{margin: '10px'}}> 
                        123123123
                    </WrapperTitle>
                    <div style={{margin: '10px'}}>
                        <StarFilled style={{ fontSize:'12px', color: 'rgb(254,216,54)'}}/>
                        <WrapperTextSell> | Sold 100+</WrapperTextSell>

                    </div>
                    <WrapperPrice>
                        <WrapperPriceText>Price: 200$</WrapperPriceText>
                    </WrapperPrice>
                    <WrapperQuantity>
                        <div>Quantity</div>
                        <div>
                       <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} changeOnWheel />
                       <br/>
                        <span style={{fontSize:'15px'}}>Stock: 100</span>
                        </div>
                    </WrapperQuantity>
                    <WrapperDetail>Mo taaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</WrapperDetail>
                 <div>
                    <ButtonComponent
                        size={'40px'}
                        styleButton={{
                            background:'red',
                            height:'48px',
                            width: '220px',
                            margin: '30px',
                            
                        }}
                        icon={<ShoppingCartOutlined style={{color:'#fff'}}/>}
                        textButton={'Add to Cart'}
                        styleTextButton={{color:'white'}}
                    ></ButtonComponent>
                 </div>

                </Col>
            </Row>
        )
}
 export default ProductDetailComponent
