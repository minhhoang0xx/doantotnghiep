import React, { useEffect, useState } from 'react';
import { Badge, Col, Input, message } from 'antd'
import { useNavigate } from "react-router-dom";
import { WrapperAccount, WrapperHeader, WrapperText } from './style';
import { UserOutlined, ShoppingCartOutlined, LogoutOutlined } from '@ant-design/icons';
// import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { resetUser } from '../../redux/slices/userSlice'


const HeaderComponent = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [storedUser, setStoredUser] = useState(null);
    const user = useSelector((state) => state.user)
    const handleNavigateHome = () => {
        navigate('/')
    }
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    const handleNavigateProduct = () => {
        navigate('/product')
    }
    const handleNavigateAbout = () => {
        navigate('/about')
    }
    const handleNavigateContact = () => {
        navigate('/contact')
    }
    const handleNavigateCart = () => {
        navigate('/cart')
    }
    const handleLogout = async () => {
        await UserService.logOut()
        dispatch(resetUser)
        localStorage.clear()
        navigate('/')
        window.location.reload()
        message.success('Login successful!');

    }
    const storageData = localStorage.getItem('access_token');
    // const handleNavigateUserDetail = () => {
    //     navigate('/detailUser/:id')
    // }

    return (
        <div>
            <WrapperHeader>
                <Col span={5}>
                    <div onClick={handleNavigateHome} style={{ cursor: 'pointer' }}> <WrapperText>Hoang System Education</WrapperText></div>
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                    <div onClick={handleNavigateProduct} style={{ cursor: 'pointer' }}><WrapperText>Product</WrapperText></div>
                </Col>
                <Col span={2} style={{ textAlign: 'center' }} >
                    <div onClick={handleNavigateAbout} style={{ cursor: 'pointer' }}><WrapperText>About</WrapperText></div>
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                    <div onClick={handleNavigateContact} style={{ cursor: 'pointer' }} ><WrapperText>Contact</WrapperText></div>
                </Col>
                <Col span={9} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Input.Search placeholder="input search text" allowClear style={{ width: '90%' }} />
                </Col>
                <Col span={4}>

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

                        <div>
                            <div onClick={handleNavigateCart} style={{ cursor: 'pointer' }}>
                                <Badge count={1} size='small'>
                                    <ShoppingCartOutlined style={{ fontSize: '30px' }} />
                                </Badge>
                            </div>
                        </div>
                        {storageData && (
                            <div>
                                <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                    <LogoutOutlined style={{ fontSize: '30px' }} />
                                </div>
                            </div>
                        )}

                    </WrapperAccount>

                </Col>

            </WrapperHeader>
        </div >
    )
}
export default HeaderComponent