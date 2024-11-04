import React from "react";
import ProductDetailComponent from "../../components/ProductComponent/ProductDetailComponent";

const ProductDetailPage = () =>{
    return (
        <div style={{ padding: '50px 0 0 0', background: '#f5f5f5' }}>
        <div style={{ padding: '0 16px', maxWidth: '1200px', margin: '0 auto' }}> 
            <br />
            <h1>Detail</h1>
            <ProductDetailComponent />
        </div>
    </div>
        )
}
 export default ProductDetailPage
