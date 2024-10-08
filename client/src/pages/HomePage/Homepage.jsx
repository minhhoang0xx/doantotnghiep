import React from "react";
import { Carousel } from 'antd';
import CardComponent from "../../components/CardComponet/CartComponent";
const contentStyle = {
    margin: '20px 0',
    height: '500px',
    color: '#fff',
    lineHeight: '500px',
    textAlign: 'center',
    background: '#364d79',
    objectFit: 'cover',
  };
  
const HomePage = () =>{
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
            color: 'darkgreen', 
            textAlign: 'center', 
            marginTop: '20px', 
            fontSize: '36px',
        }}>
            CHAO MUNG BAN DEN VOI HOANG SYSTEM EDUCATION</h1>
            <div style={{margin:'20px 0 20px 20px',display:'flex', alignItems:'center', gap:'20px'}}>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            
            </div>
    </div>
        </>
        
        
        
        )
}
 export default HomePage
