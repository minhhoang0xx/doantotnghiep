import React from "react";
import { Carousel } from 'antd';
import CardComponent from "../../components/CardComponet/CardComponent";
import { useQuery } from '@tanstack/react-query';
import * as ProductService from "../../services/ProductService";
import styled from 'styled-components';
const contentStyle = {

    color: '#f5f5f5',
    lineHeight: '500px',
    textAlign: 'center',
    background: '#f5f5f5',
    objectFit: 'cover',
    width: '100%',
    height: 'auto',
    objectFit: 'cover'
  };
  const Title = styled.h1`
    font-size: 36px;
    text-align: center;
    color: #000000;
    margin-top: 20px;

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (min-width: 769px) and (max-width: 1200px) {
        font-size: 30px;
    }
`;

const ProductGrid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Tự động điều chỉnh số cột */
gap: 20px;

padding:  0 0 20px 0
@media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2 cột trên mobile */
}

@media (min-width: 769px) and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr); /* 3 cột trên tablet */
}

@media (min-width: 1201px) {
    grid-template-columns: repeat(4, 1fr); /* 4 cột trên desktop */
}
@media (min-width: 1201px) {
  grid-template-columns: repeat(5, 1fr); /* 4 cột trên desktop */
}

`;

const CarouselImage = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
`;


  
const HomePage = () =>{

  const fetchProductAll = async() =>{
    const res =await ProductService.getAllProduct()
    return res
  }
  const{ data: products} = useQuery({queryKey: ['products'],queryFn: fetchProductAll, retry:3, retryDelay: 1000});
  console.log('data',products)


  return (
    <div style={{ background: '#f5f5f5' }}>
          <Carousel arrows infinite={false}>
      <div>
        <img src="assets/slide1.jpg" alt="Slide1" style={contentStyle}/>
      </div>
      <div>
        <img src="assets/slide2.jpg" alt="Slide2" style={contentStyle}/>
      </div>
      <div>
        <img src="assets/slide1.jpg" alt="Slide3" style={contentStyle}/>
      </div>
      <div>
        <img src="assets/slide2.jpg" alt="Slide4" style={contentStyle}/>
      </div>
    </Carousel>

        <div style={{ padding: '0 20px' }}>
            <Title>WELCOME TO HOANG SYSTEM EDUCATION</Title>

            <ProductGrid>
                {products?.data?.slice(0, 5).map((product) => (
                    <CardComponent
                        key={product._id}
                        _id={product._id}
                        countInStock={product.countInStock}
                        description={product.description}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        rating={product.rating}
                        sold={product.sold}
                    />
                ))}
                
            </ProductGrid>
            
        </div>
    </div>
);
};
 export default HomePage
