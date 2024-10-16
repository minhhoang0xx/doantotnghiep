import React from "react";
import { Carousel } from 'antd';
import CardComponent from "../../components/CardComponet/CartComponent";
import { useQuery } from '@tanstack/react-query';
import * as ProductService from "../../services/ProductService";
const contentStyle = {
    margin: '20px 0',
    height: '500px',
    color: '#fff',
    lineHeight: '500px',
    textAlign: 'center',
    background: '#364d79',
    objectFit: 'cover',
    width: '100%',
  };
  
const HomePage = () =>{

  const fetchProductAll = async() =>{
    const res =await ProductService.getAllProduct()
    console.log('res',res)
    return res
  }
  const{ data: products} = useQuery({queryKey: ['products'],queryFn: fetchProductAll, retry:3, retryDelay: 1000});
  console.log('data',products)


    return (
        <>
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
    <div >
        <h1 
        className="title"
        style={{ 
            color: '#000000', 
            textAlign: 'center', 
            marginTop: '20px', 
            fontSize: '36px',
        }}>
            WELCOME TO HOANG SYSTEM EDUCATION</h1>
            <div style={{margin:'20px 0 20px 20px',display:'flex', alignItems:'center', gap:'20px',  flexWrap:'wrap'}}>
              {products?.data?.slice(0,5).map((product) =>{
                return (
                  <CardComponent 
                  key={product._id} 
                  countInStock={product.countInStock} 
                  description={product.description} 
                  image = {product.image} 
                  name = {product.name}
                  price = {product.price}
                  rating = {product.rating}/>
                )
              })} 
            </div>
    </div>
        </>
        
        
        
        )
}
 export default HomePage
