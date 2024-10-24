import React from "react";
import ProductDetailComponent from "../../components/ProductComponent/ProductDetailComponent";

const ProductDetailPage = () =>{
    return (
        <div style={{ padding: '50px 0 0 0 ',background:'#f5f5f5' }}>
        <div style={{padding:'0px 120px ', background:'#f5f5f5', height:'1000px'}}> 
         <br></br>
            <h1>Detail</h1>
            <ProductDetailComponent />
        </div>
        </div>
        )
}
 export default ProductDetailPage
