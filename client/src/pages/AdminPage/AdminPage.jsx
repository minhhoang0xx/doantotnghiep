import React, { useState } from 'react';
import { Layout, Menu, Table, Spin, Divider, Typography, Button, Checkbox, message } from 'antd';
import { UserOutlined, ProductOutlined, ContainerOutlined  } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import * as ProductService from "../../services/ProductService";
import * as UserService from "../../services/UserService";
// import * as OrderService from "../../services/OrderService"; 
import AddProduct from '../../components/AdminComponent/AddProduct';
const { Title } = Typography;
const { Sider, Content } = Layout;

const AdminPage = () => {
    const [currentView, setCurrentView] = useState('users'); // Trạng thái hiện tại của view
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRadio, setSelectedRadio] = useState([]);
    const navigate = useNavigate(); 

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleSelect = (id) => {
        setSelectedRadio((prev) =>
            prev.includes(id) ? prev.filter((key) => key !== id) : [...prev, id]
        );
    };

    const handleDelete = async () => {
        try {
            let deletePromises;
            if (currentView === 'products') {
                deletePromises = selectedRadio.map(id => ProductService.deleteProduct(id));
            } else if (currentView === 'users') {
                deletePromises = selectedRadio.map(id => UserService.deleteUser(id)); // Giả sử bạn có hàm deleteUser
            } 
            // else if (currentView === 'orders') {
            //     deletePromises = selectedRadio.map(id => OrderService.deleteOrder(id)); // Giả sử bạn có hàm deleteOrder
            // }

            await Promise.all(deletePromises);
            message.success(`${currentView.charAt(0).toUpperCase() + currentView.slice(1)} deleted successfully!`);
            setSelectedRadio([]); // Reset selected keys
            refetchData(); // Refetch data after deletion
        } catch (error) {
            message.error('Failed to delete: ' + (error.response?.data?.message || 'Unknown error'));
        }
    };

    const refetchData = () => {
        if (currentView === 'products') {
            refetchProducts();
        } else if (currentView === 'users') {
            refetchUsers();
        } 
        // else if (currentView === 'orders') {
        //     refetchOrders();
        // }
    };

    // Gọi API lấy dữ liệu sản phẩm
    const fetchAllProduct = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    };

    // Gọi API lấy dữ liệu người dùng
    const fetchAllUser = async () => {
        const res = await UserService.getAllUser();
        return res;
    };

    // Gọi API lấy dữ liệu đơn hàng
    //   const fetchAllOrder = async () => {
    //     const res = await OrderService.getAllOrders(); // Giả sử bạn có hàm này trong OrderService
    //     return res;
    //   };


    // Sử dụng react-query để quản lý trạng thái lấy dữ liệu cho các loại bảng khác nhau
    const { data: users, isLoading: loadingUsers, refetch: refetchUsers } = useQuery({
        queryKey: ['users'],
        queryFn: fetchAllUser,
        enabled: currentView === 'users', // Chỉ gọi khi view là users
        retry: 3,
        retryDelay: 1000,
    });


    const { data: products, isLoading: loadingProducts, refetch: refetchProducts } = useQuery({
        queryKey: ['products'],
        queryFn: fetchAllProduct,
        enabled: currentView === 'products', 
        retry: 3,
        retryDelay: 1000,
    });



    //   const { data: orders, isLoading: loadingOrders, refetch: refetchOrders } = useQuery({
    //     queryKey: ['orders'],
    //     queryFn: fetchOrderAll,
    //     enabled: currentView === 'orders', // Chỉ gọi khi view là orders
    //     retry: 3,
    //     retryDelay: 1000,
    //   });

    // Cấu trúc của cột trong bảng người dùng
    const userColumns = [
        {
            title: 'Select',
            render: (text, record) => (
                <Checkbox
                    checked={selectedRadio.includes(record._id)}
                    onChange={() => handleSelect(record._id)}
                />
            ),
        },
        { title: 'Name', dataIndex: 'name', key: 'name'},
        { title: 'Email', dataIndex: 'email', key: 'email'},
        {title: 'Phone',dataIndex: 'phone',key: 'phone'},
        {title: 'Address',   dataIndex: 'address',  key: 'address'},
        {title: 'Role', dataIndex: 'isAdmin',    key: 'isAdmin',
            render: (text) => (text ? 'Admin' : 'User'), // Hiển thị vai trò người dùng
        },
    ];

    // Cấu trúc của cột trong bảng sản phẩm
    const productColumns = [
        {
            title: 'Select',
            render: (text, record) => (
                <Checkbox
                    checked={selectedRadio.includes(record._id)}
                    onChange={() => handleSelect(record._id)}
                />
            ),
        },
        {title: 'Name',dataIndex: 'name',key: 'name',},
        { title: 'Price',dataIndex: 'price',key: 'price',
            render: (text) => `$${text}`, // Format giá tiền
        },
        { title: 'Type', dataIndex: 'type', key: 'type',},
        { title: 'Count In Stock',dataIndex: 'countInStock',key: 'countInStock',},
        { title: 'Rating', dataIndex: 'rating', key: 'rating',},
        { title: 'Description', dataIndex: 'description', key: 'description',},
    ];


    // Cấu trúc của cột trong bảng đơn hàng
    const orderColumns = [
        {
            title: 'Select',
            render: (text, record) => (
                <Checkbox
                    checked={selectedRadio.includes(record._id)}
                    onChange={() => handleSelect(record._id)}
                />
            ),
        },
        {title: 'Order ID',dataIndex: '_id',key: '_id',},
        { title: 'User', dataIndex: 'user',key: 'user',
            render: (user) => user.name, // Giả sử bạn có trường name trong User
        },
        { title: 'Total Price',dataIndex: 'totalPrice',key: 'totalPrice'},
        {
            title: 'Is Paid', dataIndex: 'isPaid', key: 'isPaid',
            render: (text) => (text ? 'Yes' : 'No'), // Hiển thị tình trạng thanh toán
        },
        { title: 'Created At',  dataIndex: 'createdAt', key: 'createdAt',
            render: (text) => new Date(text).toLocaleString(), // Hiển thị thời gian tạo
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width='12%' style={{ background: '#fff' }}>
                <div style={{ padding: '20px', textAlign: 'center', cursor:'pointer' }} onClick={() => navigate('/')}>
                    <Title level={4} style={{ margin: 0, color: '#333' }}>Hoang System Education</Title>
                    <Button type="link"> Back to Home</Button>
                </div>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']} //1 la user
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'User',
                            onClick: () => setCurrentView('users'), // Cập nhật trạng thái khi nhấp vào User
                        },
                        {
                            key: '2',
                            icon: <ProductOutlined />,
                            label: 'Product',
                            onClick: () => setCurrentView('products'), // Cập nhật trạng thái khi nhấp vào Product
                        },
                        {
                            key: '3',
                            icon: <ContainerOutlined />,
                            label: 'Order',
                            onClick: () => setCurrentView('orders'), // Cập nhật trạng thái khi nhấp vào Order
                        },
                    ]}
                    style={{ height: '100%', borderRight: 0 }}
                />
            </Sider>
            <Layout>
                <Content style={{ padding: '24px', minHeight: '100vh' }}>
                    <Divider orientation="left">
                        {currentView === 'users' ? 'User List' : currentView === 'products' ? 'Product List' : 'Order List'}
                    </Divider>
                    {currentView === 'products' && (
                        <Button type="primary" onClick={handleOpenModal} style={{ marginBottom: '20px' }}>
                            Add New Product
                        </Button>
                    )}
                     <Button type="danger" onClick={handleDelete} style={{ marginBottom: '20px' }} disabled={selectedRadio.length === 0}>
                        Delete Selected
                    </Button>
                    {loadingProducts || loadingUsers ? ( ////////////////////////////////////// nho them loading order
                        <Spin size="large" />
                    ) : currentView === 'users' ? (
                        <Table
                            columns={userColumns}
                            dataSource={users?.data}
                            rowKey={(record) => record._id}
                            pagination={{ pageSize: 10 }}
                        />
                    ) : currentView === 'products' ? (
                        <Table
                            columns={productColumns}
                            dataSource={products?.data} // Hiển thị dữ liệu từ API sản phẩm
                            rowKey={(record) => record._id} // Đặt key là _id của mỗi sản phẩm
                            pagination={{ pageSize: 10 }} // Phân trang, 10 sản phẩm mỗi trang
                        />
                    ) : (
                        <Table
                            columns={orderColumns}
                            //   dataSource={orders?.data} // Hiển thị dữ liệu từ API đơn hàng
                            rowKey={(record) => record._id}
                            pagination={{ pageSize: 10 }}
                        />
                    )}
                    <AddProduct
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        refetchProducts={refetchProducts}
                        products={products?.data || []}
                    />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminPage;
