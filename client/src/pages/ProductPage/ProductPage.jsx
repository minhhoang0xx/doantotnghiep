import React from "react";
import CardComponent from "../../components/CardComponet/CardComponent";
import { Pagination } from "antd";
import { useQuery } from '@tanstack/react-query';
import * as ProductService from "../../services/ProductService";


const ProductPage = () => {
        const fetchProductAll = async() =>{
                const res =await ProductService.getAllProduct()
                console.log('res',res)
                return res
              }
              const{data: products} = useQuery({queryKey: ['products'],queryFn: fetchProductAll, retry:3, retryDelay: 1000});


        const onChange = (page) => {
                console.log(`Current page: ${page}`);
        }

        return (
                <>
                    <div style={{ padding: '50px 0 0 0 ',background:'#f5f5f5' }}>
                        <div style={{ margin: '20px 0 20px 20px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                                {products?.data?.map((product) => ( 
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

                        </div>
                        <Pagination defaultCurrent={1} total={50} onChange={onChange} style={{ textAlign: 'center', margin: '20px 0' }} />
                        </div>
                </>



        )

}
export default ProductPage