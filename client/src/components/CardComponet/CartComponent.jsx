import React from "react";
import { EditOutlined, EllipsisOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import Meta from "antd/es/card/Meta";
const CardComponent = () => {
    return (
        <Card
            style={{ width: '18.7%' }}
            cover={
                <img
                    alt="Product Card"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            }
            actions={[
                <ShoppingCartOutlined key="addToCart" alt='Add To Cart'/>,

            ]}
        >
            <Meta
                title="Card title"
                description="This is the description"
            />
        </Card>
    )
}
export default CardComponent
