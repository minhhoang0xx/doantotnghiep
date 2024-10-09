import React from "react";
import CardComponent from "../../components/CardComponet/CartComponent";
import { Pagination } from "antd";

const ProductPage = () => {
        const onChange = () => { }
        return (
                <>
                        <div style={{ margin: '20px 0 20px 20px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                                <CardComponent />
                                <CardComponent />
                                <CardComponent />
                                <CardComponent />
                                <CardComponent />
                                <CardComponent />
                                <CardComponent />
                                <CardComponent />
                                <CardComponent />
                                <CardComponent />
                                <CardComponent />
                                <CardComponent />
                                <CardComponent />
                                <CardComponent />
                                <CardComponent />
                                <CardComponent />
                                <CardComponent />
                                <CardComponent />
                                <CardComponent />
                                <CardComponent />

                        </div>
                        <Pagination defaultCurrent={1} total={50} onChange={onChange} />
                </>



        )
}
export default ProductPage