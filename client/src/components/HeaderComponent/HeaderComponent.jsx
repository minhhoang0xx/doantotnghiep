import React from 'react';
import { Badge, Col, Input } from 'antd'
import { WrapperAccount, WrapperHeader, WrapperText } from './style';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const HeaderComponent = () => {
    return (
        <div>
            <WrapperHeader>
                <Col span={5}>
                    <WrapperText>Hoang System Education</WrapperText>
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                    <WrapperText>Product</WrapperText>
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                    <WrapperText>About</WrapperText>
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                    <WrapperText>Contact</WrapperText>
                </Col>
                <Col span={9} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Input.Search placeholder="input search text" allowClear style={{ width: '90%' }} />
                </Col>
                <Col span={4}>
                    
                    <WrapperAccount>
                    <div>
                        <UserOutlined style={{ fontSize: '30px' }} />
   
                        </div>
                        <div>
                        <Badge count={1} size='small'>
                        <ShoppingCartOutlined style={{ fontSize: '30px' }} />
                        </Badge>

                        </div>
                    </WrapperAccount>

                </Col>

            </WrapperHeader>
        </div>
    )
}
export default HeaderComponent