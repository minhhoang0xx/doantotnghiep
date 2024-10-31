
import React, { useState } from 'react';
import { Layout, Menu, Table, Spin, Divider, Typography, Button, Checkbox, message, Input } from 'antd';
import { UserOutlined, ProductOutlined, ContainerOutlined,EditOutlined, EyeOutlined, CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import * as ProductService from "../../services/ProductService";
import * as UserService from "../../services/UserService";
import * as OrderService from "../../services/OrderService";
import AddProduct from '../../components/AdminComponent/AddProduct';
import DeleteConfirm from '../../components/AdminComponent/DeleteConfirm';
import UpdateModal from '../../components/AdminComponent/UpdateModal';
import DetailOrderModal from '../../components/AdminComponent/DetailOrderModal';
const { Title } = Typography;
const { Sider, Content } = Layout;

const AdminPage = () => {
    const [currentView, setCurrentView] = useState('users'); // check view hien tai
    const [AddModal, setAddModal] = useState(false); // check Add modal co mo hay khong
    const [selectedRadio, setSelectedRadio] = useState([]); // mang luu ID da chon
    const [deleteModal, setDeleteModal] = useState(false); // check modal delete co mo hay khong
    const [updateModal, setUpdateModal] = useState(false); // check modal update co mo hay khong
    const [currentData, setCurrentData] = useState(null); // data cua doi tuong cap nhat
    const [orderDetailModal, setOrderDetailModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentOrderDetails, setCurrentOrderDetails] = useState(null);
    const [userSearch, setUserSearch] = useState('');
    const [productSearch, setProductSearch] = useState('');
    const [orderSearch, setOrderSearch] = useState('');
    const [sort, setSort] = useState(null);
    const [filter, setFilter] = useState(null);
    const navigate = useNavigate();

    const handleOrderDetail = async (orderId) => {
        setLoading(true);
        try {
            const res = await OrderService.getDetailOrder(orderId);
            if (res?.status === 'OK') {
                setCurrentOrderDetails(res.data);
                setOrderDetailModal(true);
            }
        } catch (error) {
            message.error('Error fetching order details: ' + error.message);
        } finally {
            setLoading(false);
        }
    };
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
                deletePromises = selectedRadio.map(id => UserService.deleteUser(id));
            }
            else if (currentView === 'orders') {
                deletePromises = selectedRadio.map(id => OrderService.doneOrder(id));
                console.log('123', deletePromises)
            }

            await Promise.all(deletePromises);
            message.success(`${currentView.charAt(0).toUpperCase() + currentView.slice(1)} deleted successfully!`);
            setSelectedRadio([]); // Đặt lại các khóa đã chọn
            setDeleteModal(false);
            refetchData(); // lam moi du lieu
        } catch (error) {
            message.error('Failed to delete');
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
        else if (currentView === 'orders') {
            refetchOrders();
        }
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
        const res = await OrderService.getAllOrder();
        console.log('res', res)
        return res;


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



    const { data: orders, isLoading: loadingOrders, refetch: refetchOrders } = useQuery({
        queryKey: ['orders'],
        queryFn: fetchAllOrder,
        enabled: currentView === 'orders',
        retry: 3,
        retryDelay: 1000,
    });

    /// Search
    const filteredUsers = users?.data.filter(user =>
        user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearch.toLowerCase())
    );

    const filteredProducts = products?.data.filter(product =>
        product.name.toLowerCase().includes(productSearch.toLowerCase())
    );

    const filteredOrders = orders?.data.filter(order => {
        console.log('order', order); // Kiểm tra cấu trúc của order
        const itemName = order.user.name || '';
        const searchTerm = orderSearch ? orderSearch.toLowerCase() : ''; // Kiểm tra searchInput
        return itemName.toLowerCase().includes(searchTerm);
    });


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
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text) => <img src={text} alt="User" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />,
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
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <img src={text} alt="Product" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />,
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
        { title: 'Stock', dataIndex: 'countInStock', key: 'countInStock', sorter: true },
        { title: 'Sold', dataIndex: 'sold', key: 'sold', sorter: true },
        { title: 'Rating', dataIndex: 'rating', key: 'rating', sorter: true },
        // { title: 'Description', dataIndex: 'description', key: 'description', },
        {
            title: 'Action', render: (text, record) =>
                (<Button icon={<EditOutlined />}  onClick={() => handleUpdate(record)}/>),
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
        {
            title: 'User', dataIndex: 'user', key: 'user',
            render: (text, record) => record.user?.name || 'Unknown',
        },
        { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice' },
        {
            title: 'Is Paid', dataIndex: 'isPaid', key: 'isPaid',
            render: (text) => (text ? <CheckCircleTwoTone twoToneColor="#52c41a"/> : <CloseCircleTwoTone twoToneColor="#ff4d4f" />), // Hiển thị tình trạng thanh toán
        },
        {
            title: 'Is Delivery', dataIndex: 'isDelivered', key: 'isDelivered',
            render: (text) => (text ? <CheckCircleTwoTone twoToneColor="#52c41a"/> : <CloseCircleTwoTone twoToneColor="#ff4d4f" />), // Hiển thị tình trạng thanh toán
        },
        {
            title: 'Created At',dataIndex: 'paidAt',key: 'paidAt',
            render: (text) => new Date(text).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }),
        },
        {
            title: 'Action', render: (text, record) => (
                <>
                    <Button icon={<EditOutlined />} onClick={() => handleUpdate(record)} style={{ marginRight: '8px' }} />
                    <Button  icon={<EyeOutlined />} onClick={() => handleOrderDetail(record._id)}/>
                </>
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
                    {currentView === 'orders' ? 'Order completed, removed?' : 'Delete'}
                    </Button>
                    {loadingProducts || loadingUsers || loadingOrders ? (
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
                            dataSource={filteredOrders} // Hiển thị dữ liệu từ API đơn hàng
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
                        paymentMethod={currentData?.paymentMethod}
                    />
                    <DetailOrderModal
                        visible={orderDetailModal}
                        onClose={() => setOrderDetailModal(false)}
                        orderDetails={currentOrderDetails}
                        loading={loading}
                    />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminPage;
