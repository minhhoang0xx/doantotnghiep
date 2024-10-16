import React from "react";
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import Meta from "antd/es/card/Meta";


const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating } = props;
    return (
        <Card
        hoverable
            style={{ width: '18.7%', borderRadius: '8px',  overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}
            cover={ 
                <div style={{ height: '200px', overflow: 'hidden',  }}>
                    <img alt="Product Card" src={image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            }
            actions={[

                <ShoppingCartOutlined key="addToCart" alt='Add To Cart' style={{ color: '#52c41a', fontSize: '24px' }}/>,
            ]}
        >
            <Meta
                title={<span style={{ fontWeight: 'bold', fontSize: '20px' }}>{name}</span>}
                description={
                    <div style={{ marginTop: '10px' }}>
                    <p style={{ margin: 0, color: '#555' }}>{description}</p> 
                    <p style={{ margin: '10px 0', fontSize: '14px', fontWeight: 'bold', color: 'darkgreen' }}>Price: ${price}</p> 
                    <p style={{ margin: '5px 0', fontSize: '12px', color: '#999' }}>Stock: {countInStock}</p> 
                    <p style={{ margin: '5px 0', fontSize: '12px', color: '#999' }}>Rating: {rating}</p> 
                  </div>
                }
            />
        </Card>
    )
}
export default CardComponent
