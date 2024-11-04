import React, { useEffect, useState } from 'react';
import { Badge, Col, Input, message, Drawer, Button } from 'antd'
import { useNavigate } from "react-router-dom";
import { WrapperAccount, WrapperHeader, WrapperText } from './style';
import { UserOutlined, ShoppingCartOutlined, LogoutOutlined, SettingOutlined, MenuOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { resetUser } from '../../redux/slices/userSlice';
import { fetchSearchResults, clearSearchResults } from '../../redux/slices/productSlice';

const HeaderComponent = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const searchResults = useSelector((state) => state.product.searchResults);  // Lấy kết quả tìm kiếm
    const [search, setSearch] = useState('');
    const cart = useSelector((state) => state.cart);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const onSearch = (e) => {
        const keyword = e.target.value;
        setSearch(keyword);
        if (keyword.trim()) {
            dispatch(fetchSearchResults(keyword));// api tu redux
        } else {
            dispatch(clearSearchResults());
        }
    }
    const handleNavigate = (path) => {
        navigate(path);
        setIsDrawerVisible(false); 
    };
    const handleNavigateHome = () => {
        navigate('/')
        setIsDrawerVisible(false);
    }
    const handleNavigateLogin = () => {
        navigate('/sign-in')
        setIsDrawerVisible(false);
    }
    const handleNavigateProduct = () => {
        navigate('/product')
        setIsDrawerVisible(false);
    }
    const handleNavigateAbout = () => {
        navigate('/about')
        setIsDrawerVisible(false);
    }
    const handleNavigateContact = () => {
        navigate('/contact')
        setIsDrawerVisible(false);
    }
  
    const handleNavigateSearch = (id) => {
        navigate(`/product/detailProduct/${id}`);
        setSearch('');
        dispatch(clearSearchResults());
        setIsDrawerVisible(false);
    };
    const handleLogout = async () => {
        await UserService.logOut()
        dispatch(resetUser)
        localStorage.clear()
        navigate('/')
        window.location.reload()
        message.success('Login successful!');

    }
    const handleNavigateCartOrAdmin = () => {
        if (user.isAdmin) {
            navigate('/admin');
            setIsDrawerVisible(false);
        } else {
            navigate('/cart');
            setIsDrawerVisible(false);
        }
    };
    const handleScroll = () => {
        if (typeof window !== "undefined") {
            const scrollY = window.scrollY;
            if (scrollY > lastScrollY) {
                setIsVisible(false); // Cuộn xuống thì ẩn header
            } else {
                setIsVisible(true); // Cuộn lên thì hiện header
            }
            setLastScrollY(scrollY);
        }
    };
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Đảm bảo hiển thị header ban đầu
        const handleLoad = () => setIsVisible(true);

        window.addEventListener('load', handleLoad);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('load', handleLoad);
        };
    }, [lastScrollY]);

    const storageData = localStorage.getItem('access_token');

    return (
        <div>
            {!isMobile ? (
                <WrapperHeader style={{ top: isVisible ? '0' : '-70px' }}>
                    <Col xs={24} sm={5}>
                        <div onClick={handleNavigateHome} style={{ cursor: 'pointer' }}>
                            <WrapperText>Hoang System Education</WrapperText>
                        </div>
                    </Col>
                    <Col xs={24} sm={2} style={{ textAlign: 'center' }}>
                        <div onClick={handleNavigateProduct} style={{ cursor: 'pointer' }}>
                            <WrapperText>Product</WrapperText>
                        </div>
                    </Col>
                    <Col xs={24} sm={2} style={{ textAlign: 'center' }}>
                        <div onClick={handleNavigateAbout} style={{ cursor: 'pointer' }}>
                            <WrapperText>About</WrapperText>
                        </div>
                    </Col>
                    <Col xs={24} sm={2} style={{ textAlign: 'center' }}>
                        <div onClick={handleNavigateContact} style={{ cursor: 'pointer' }}>
                            <WrapperText>Contact</WrapperText>
                        </div>
                    </Col>
                    <Col xs={24} sm={8} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Input.Search
                            placeholder="input search text"
                            allowClear
                            style={{ width: '90%' }}
                            onChange={onSearch}
                        />
                    </Col>
                    {searchResults.length > 0 && (
                        <div style={{ position: 'absolute', top: '50px', width: '90%', zIndex: 1000, background: 'white', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)' }}>
                            {searchResults.map((product) => (
                                <div key={product._id} onClick={() => handleNavigateSearch(product._id)}
                                    style={{ padding: '10px', borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}
                                >
                                    {product.name}
                                </div>
                            ))}
                        </div>
                    )}
                    <Col xs={24} sm={5}>
                        <WrapperAccount>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div
                                    onClick={user?.name ? () => navigate('/userDetail') : handleNavigateLogin}
                                    style={{ cursor: 'pointer', marginRight: '10px' }}
                                >
                                    <UserOutlined style={{ fontSize: '30px' }} />
                                </div>
                                {storageData && (
                                    <div
                                        onClick={() => navigate('/userDetail')}
                                        style={{ fontSize: '16px', marginRight: '10px', cursor: 'pointer' }}
                                    >
                                        {user.name}
                                    </div>
                                )}
                            </div>
                            <div onClick={handleNavigateCartOrAdmin} style={{ cursor: 'pointer' }}>
                                {user.isAdmin ? (
                                    <SettingOutlined style={{ fontSize: '30px' }} />
                                ) : (
                                    <Badge count={cart?.cartItems?.length} size='small'>
                                        <ShoppingCartOutlined style={{ fontSize: '30px' }} />
                                    </Badge>
                                )}
                            </div>
                            {storageData && (
                                <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                    <LogoutOutlined style={{ fontSize: '30px' }} />
                                </div>
                            )}
                        </WrapperAccount>
                    </Col>
                </WrapperHeader>
            ) : (
                <div style={{ padding: '60px 0 0 0', background: '#f5f5f5' }}>
                    <WrapperHeader>
                        <Col xs={24} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                            <WrapperText onClick={handleNavigateHome}>Hoang System Education</WrapperText>
                            <MenuOutlined onClick={() => setIsDrawerVisible(true)} style={{ fontSize: '24px', cursor: 'pointer' }} />
                        </Col>
                        <Drawer
                            title="Menu"
                            placement="left"
                            onClose={() => setIsDrawerVisible(false)}
                            visible={isDrawerVisible}
                        >
                            <Input.Search
                                placeholder="Search"
                                allowClear
                                style={{ marginBottom: '20px' }}
                                onChange={onSearch}
                            />
                            <div style={{ marginBottom: '20px', cursor: 'pointer' }} onClick={handleNavigateHome}>Home</div>
                            <div onClick={handleNavigateProduct} style={{ marginBottom: '20px', cursor: 'pointer' }}>Product</div>
                            <div onClick={handleNavigateAbout} style={{ marginBottom: '20px', cursor: 'pointer' }}>About</div>
                            <div onClick={handleNavigateContact} style={{ marginBottom: '20px', cursor: 'pointer' }}>Contact</div>
                            <div style={{ marginBottom: '20px', cursor: 'pointer' }} onClick={user?.name ? () => handleNavigate('/userDetail') : handleNavigateLogin} >
                                {user.name ? 'Account' : 'Login'}
                            </div>
                            <div onClick={handleNavigateCartOrAdmin} style={{ cursor: 'pointer' }}>
                                {user.isAdmin ? (
                                    <SettingOutlined style={{ fontSize: '30px' }} />
                                ) : (
                                    <Badge count={cart?.cartItems?.length} size='small'>
                                        <ShoppingCartOutlined style={{ fontSize: '30px' }} />
                                    </Badge>
                                )}
                            </div>
                            {storageData && (
                                <div onClick={handleLogout} style={{ marginBottom: '20px', cursor: 'pointer' }}>Logout</div>
                            )}
                        </Drawer>
                    </WrapperHeader>
                </div>
            )}
        </div>

    );
};
export default HeaderComponent