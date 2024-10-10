import React from 'react';
import { Badge, Col, Input } from 'antd'
import { Link } from "react-router-dom";
import { WrapperAccount, WrapperHeader, WrapperText } from './style';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const HeaderComponent = () => {
    return (
        <div>
            <WrapperHeader>
                <Col span={5}>
                    <Link to="/"> <WrapperText>Hoang System Education</WrapperText></Link>
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                    <Link to="/product"><WrapperText>Product</WrapperText></Link>
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                    <Link to="/about"><WrapperText>About</WrapperText></Link>
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                    <Link to="/contact"><WrapperText>Contact</WrapperText></Link>
                </Col>
                <Col span={9} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Input.Search placeholder="input search text" allowClear style={{ width: '90%' }} />
                </Col>
                <Col span={4}>

                    <WrapperAccount>
                        <div>
                            <Link to="/User" style={{
                                color: '#000000',
                            }}>
                                <UserOutlined style={{ fontSize: '30px' }} />
                            </Link>
                        </div>
                        <div>
                            <Link to="/Cart">
                                <Badge count={1} size='small'>
                                    <ShoppingCartOutlined style={{ fontSize: '30px' }} />
                                </Badge>
                            </Link>
                        </div>
                    </WrapperAccount>


                </Col>

            </WrapperHeader>
        </div>
    )
}
export default HeaderComponent