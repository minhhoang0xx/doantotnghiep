import React, { useState, useEffect } from "react";
import CardComponent from "../../components/CardComponet/CardComponent";
import { Pagination, Select, Spin, Empty } from "antd";
import { useQuery } from '@tanstack/react-query';
import * as ProductService from "../../services/ProductService";

const { Option } = Select;

const ProductPage = () => {
        const [sort, setSort] = useState(['desc', 'createdAt']);
        const [filter, setFilter] = useState(['type', 'all']);
        const [page, setPage] = useState(0);
        const pageSize = 100;

        const fetchProductAll = async () => {
                const res = await ProductService.getAllProduct();
                return res;
        };

        const { data: products, isLoading } = useQuery({
                queryKey: ['products'],
                queryFn: fetchProductAll,
                retry: 3,
                retryDelay: 1000,
        });

        const onChange = (newPage) => {
                setPage(newPage - 1);
        };

        const handleSortChange = (value) => {
                const [order, field] = value.split(',');
                setSort([order, field]);
        };

        const handleFilterChange = (value) => {
                setFilter(['type', value]);
        };

        const handleChange = (data) => {
                let filteredProducts = data;
                //filter[0] = default = all (duoc setup o tren)
                if (filter[1] !== 'all') { // filter != all => lay san pham = type
                        filteredProducts = filteredProducts.filter(product => product.type === filter[1]);
                }
                filteredProducts.sort((a, b) => {
                        if (sort[0] === 'asc') {
                                return a[sort[1]] > b[sort[1]] ? 1 : -1;
                                // a>b => 1 => b,a
                                // a!> b => -1 => a,b
                        } else {
                                return a[sort[1]] < b[sort[1]] ? 1 : -1;
                        }
                });

                return filteredProducts;
        };

        if (isLoading) {
                return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
        }
        // Lọc và sắp xếp các sản phẩm
        const FiledSorted = handleChange(products.data || []);
        const paginated = FiledSorted.slice(page * pageSize, (page + 1) * pageSize);
        // slice(start, end)
        // neu page = 0 => p*pS = 0 => start tu sp 1 va end o sp 15
       
        return (
                <div style={{ padding: '60px 0 0 0', background: '#f5f5f5' }}>
                        <div style={{ margin: '0 10px' }}>
                                <Select
                                        defaultValue="Filter"
                                        style={{ flex: '1', marginRight: '10px', minWidth:'12%' }} 
                                        onChange={handleFilterChange}
                                >
                                        <Option value="all">All Items</Option>
                                        <Option value="Math">Math</Option>
                                        <Option value="Foreign language">Foreign language</Option>
                                        <Option value="Reading tab">Reading tab</Option>
                                        <Option value="others">others</Option>

                                </Select>
                                <Select
                                        defaultValue="Sort"
                                        style={{ flex: '1' ,minWidth:'12%'}} 
                                        onChange={handleSortChange}
                                >
                                        <Option value="asc,price">Price: Low to High</Option>
                                        <Option value="desc,price">Price: High to Low</Option>
                                        <Option value="asc,rating">Rating: Low to High</Option>
                                        <Option value="desc,rating">Rating: High to Low</Option>
                                </Select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                {paginated.length ? (
                                        paginated.map((product) => (
                                                <CardComponent
                                                        key={product._id}
                                                        {...product}
                                                />
                                        ))
                                ) : (
                                        <Empty description="Have not any Products!" style={{ margin: '50px auto' }} />
                                )}
                        </div>
                        <Pagination
                                current={page + 1}
                                total={FiledSorted.length} // Tổng số sản phẩm đã được lọc và sắp xếp
                                pageSize={pageSize}
                                onChange={onChange}
                                style={{ textAlign: 'center', marginTop: '20px', display: 'flex', justifyContent: 'center' }}
                        />
                </div>
        );
};

export default ProductPage;