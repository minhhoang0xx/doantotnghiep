
import React, { useState } from 'react';
import { Layout, Menu, Table, Spin, Divider, Typography, Button, Checkbox, message, Input } from 'antd';
import { UserOutlined, ProductOutlined, ContainerOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import * as ProductService from "../../services/ProductService";
import * as UserService from "../../services/UserService";
// import * as OrderService from "../../services/OrderService"; 
import AddProduct from '../../components/AdminComponent/AddProduct';
import DeleteConfirm from '../../components/AdminComponent/DeleteConfirm';
import UpdateModal from '../../components/AdminComponent/UpdateModal';
const { Title } = Typography;
const { Sider, Content } = Layout;

const AdminPage = () => {
    const [currentView, setCurrentView] = useState('users'); // check view hien tai
    const [AddModal, setAddModal] = useState(false); // check Add modal co mo hay khong
    const [selectedRadio, setSelectedRadio] = useState([]); // mang luu ID da chon
    const [deleteModal, setDeleteModal] = useState(false); // check modal delete co mo hay khong
    const [updateModal, setUpdateModal] = useState(false); // check modal update co mo hay khong
    const [currentData, setCurrentData] = useState(null); // data cua doi tuong cap nhat
    const [userSearch, setUserSearch] = useState('');
    const [productSearch, setProductSearch] = useState('');
    const [orderSearch, setOrderSearch] = useState('');
    const [sort, setSort] = useState(null); 
    const [filter, setFilter] = useState(null); 
    const navigate = useNavigate();

    const handleOpenModal = () => {
        setAddModal(true);
    };

    const handleSelect = (id) => {
        setSelectedRadio((prev) =>
            prev.includes(id) ? prev.filter((key) => key !== id) : [...prev, id]
        );
    };

    /// delete
    const handleDeleteConfirm = () => {
        setDeleteModal(true);
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
            setDeleteModal(false);
            refetchData(); // lam moi du lieu
        } catch (error) {
            message.error('Failed to delete: ' + (error.response?.data?.message || 'Unknown error'));
        }
    };
    // update
    const handleUpdate = (record) => {
        setCurrentData(record); // Lưu đối tượng hiện tại cần update
        setUpdateModal(true); // Mở modal update
    };


    // show 
    const refetchData = () => {
        if (currentView === 'products') {
            refetchProducts(); // call api lay list product
        } else if (currentView === 'users') {
            refetchUsers();
        }
        // else if (currentView === 'orders') {
        //     refetchOrders();
        // }
    };

    // Gọi API lấy dữ liệu sản phẩm
    const fetchAllProduct = async () => {
        const res = await ProductService.getAllProduct(sort, filter);
        return res;
    };
    const fetchAllUser = async () => {
        const res = await UserService.getAllUser();
        return res;
    };
    const fetchAllOrder = async () => {
        // const res = await OrderService.getAllOrders(); // Giả sử bạn có hàm này trong OrderService
        // return res;
    };


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
    //     queryFn: fetchAllOrder,
    //     enabled: currentView === 'orders',
    //     retry: 3,
    //     retryDelay: 1000,
    //   });

    /// Search
    const filteredUsers = users?.data.filter(user =>
        user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearch.toLowerCase())
    );

    const filteredProducts = products?.data.filter(product =>
        product.name.toLowerCase().includes(productSearch.toLowerCase())
    );

    // const filteredOrders = orders?.data.filter(order => 
    //     order.user.name.toLowerCase().includes(orderSearch.toLowerCase())
    // );


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
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        {
            title: 'Role', dataIndex: 'isAdmin', key: 'isAdmin',
            render: (text) => (text ? 'Admin' : 'User'), // Hiển thị vai trò người dùng
        },
        {
            title: 'Action', render: (text, record) =>
                (<Button onClick={() => handleUpdate(record)}>Set Admin</Button>),
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
        { title: 'Name', dataIndex: 'name', key: 'name', sorter: true },
        {
            title: 'Price', dataIndex: 'price', key: 'price', sorter: true,
            render: (text) => `$${text}`, // Format giá tiền
        },
        {
            title: 'Type', dataIndex: 'type', key: 'type',
            filters: [
                { text: 'Electronic', value: 'electronic' },
                { text: 'Clothing', value: 'clothing' },
            ],
        },
        { title: 'Count In Stock', dataIndex: 'countInStock', key: 'countInStock', sorter: true },
        { title: 'Rating', dataIndex: 'rating', key: 'rating', sorter: true },
        { title: 'Description', dataIndex: 'description', key: 'description', },
        {
            title: 'Action', render: (text, record) =>
                (<Button onClick={() => handleUpdate(record)}>Update</Button>),
        },
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
        { title: 'Order ID', dataIndex: '_id', key: '_id', },
        {
            title: 'User', dataIndex: 'user', key: 'user',
            render: (user) => user.name, // Giả sử bạn có trường name trong User
        },
        { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice' },
        {
            title: 'Is Paid', dataIndex: 'isPaid', key: 'isPaid',
            render: (text) => (text ? 'Yes' : 'No'), // Hiển thị tình trạng thanh toán
        },
        {
            title: 'Created At', dataIndex: 'createdAt', key: 'createdAt',
            render: (text) => new Date(text).toLocaleString(), // Hiển thị thời gian tạo
        },
        {
            title: 'Action', render: (text, record) =>
            (<Button onClick={() => handleUpdate(record)}>Update</Button>
            ),

        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width='12%' style={{ background: '#fff' }}>
                <div style={{ padding: '20px', textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
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
                    {currentView === 'users' && (
                        <Input.Search
                            placeholder="Search Users by name or email"
                            onSearch={value => setUserSearch(value)}
                            style={{ marginBottom: 16 }}
                        />
                    )}
                    {currentView === 'products' && (
                        <Input.Search
                            placeholder="Search Products by name"
                            onSearch={value => setProductSearch(value)}
                            style={{ marginBottom: 16 }}
                        />
                    )}
                    {currentView === 'orders' && (
                        <Input.Search
                            placeholder="Search Orders"
                            onSearch={value => setOrderSearch(value)}
                            style={{ marginBottom: 16 }}
                        />
                    )}
                    {currentView === 'products' && (
                        <Button type="primary" onClick={handleOpenModal}>
                            Add New Product
                        </Button>
                    )}
                    <Button onClick={handleDeleteConfirm} disabled={selectedRadio.length === 0} style={{ backgroundColor: selectedRadio.length === 0 ? 'gray' : 'red', color: 'white', fontSize: '16px', border: 'none', borderRadius: '4px', padding: '10px 20px', cursor: selectedRadio.length === 0 ? 'not-allowed' : 'pointer', transition: 'background-color 0.3s ease', }} onMouseEnter={(e) => { if (selectedRadio.length > 0) { e.currentTarget.style.backgroundColor = 'darkred'; } }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = selectedRadio.length > 0 ? 'red' : 'gray'; }}>
                        Delete
                    </Button>
                    {loadingProducts || loadingUsers ? ( ////////////////////////////////////// nho them loading order
                        <Spin size="large" />
                    ) : currentView === 'users' ? (
                        <Table
                            columns={userColumns}
                            dataSource={filteredUsers}
                            rowKey={(record) => record._id}
                            pagination={{ pageSize: 10 }}
                        />
                    ) : currentView === 'products' ? (
                        <Table
                            columns={productColumns}
                            dataSource={filteredProducts} // Hiển thị dữ liệu từ API sản phẩm
                            rowKey={(record) => record._id} // Đặt key là _id của mỗi sản phẩm
                            pagination={{ pageSize: 10 }} // Phân trang, 10 sản phẩm mỗi trang
                        />
                    ) : (
                        <Table
                            columns={orderColumns}
                            //   dataSource={filteredOrders} // Hiển thị dữ liệu từ API đơn hàng
                            rowKey={(record) => record._id}
                            pagination={{ pageSize: 10 }}
                        />
                    )}
                    <AddProduct
                        isModalOpen={AddModal}
                        setIsModalOpen={setAddModal}
                        refetchProducts={refetchProducts}
                        products={products?.data || []}
                    />
                    <DeleteConfirm
                        open={deleteModal}
                        onConfirm={handleDelete}
                        onCancel={() => setDeleteModal(false)}
                    />
                    <UpdateModal
                        isModalOpen={updateModal}
                        setIsModalOpen={setUpdateModal}
                        currentData={currentData}
                        refetchData={refetchData}
                        currentView={currentView}
                    />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminPage;
