import React from 'react';
import { Badge, Col, Input } from 'antd'
import { Link, useNavigate } from "react-router-dom";
import { WrapperAccount, WrapperHeader, WrapperText } from './style';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
// import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux'




const HeaderComponent = () => {
    const navigate = useNavigate() 
    const user = useSelector((state) => state.user)
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    console.log('user',user)

    // const [cookies, setCookie] = useCookies(['name']);
    // const login = () => {
    //     setCookie("access_token", "456")
    // }
    // const logout = () => {
    //     setCookie("access_token");
    // }
    // console.log(cookies.access_token)
    return (
        <div>
            <WrapperHeader>
                <Col span={5}>
                    <Link to="/"> <WrapperText>Hoang System Education</WrapperText></Link>
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                    <Link to="/product"><WrapperText>Product</WrapperText></Link>
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                    <Link to="/about"><WrapperText>About</WrapperText></Link>
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                    <Link to="/contact"><WrapperText>Contact</WrapperText></Link>
                </Col>
                <Col span={9} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Input.Search placeholder="input search text" allowClear style={{ width: '90%' }} />
                </Col>
                <Col span={4}>

                    <WrapperAccount>
                        {user?.name ? (
                            <div>{user.name}</div>
                        ):(
                        <div onClick={handleNavigateLogin} style={{cursor: 'pointer'}} >
                        
                                <UserOutlined style={{ fontSize: '30px' }} />
                        </div>
                        )}
                        <div>
                            <Link to="/Cart">
                                <Badge count={1} size='small'>
                                    <ShoppingCartOutlined style={{ fontSize: '30px' }} />
                                </Badge>
                            </Link>
                        </div>
                        {/* {cookies.access_token !==undefined ? <div onClick={logout}>Logout</div> : <></>} */}

                    </WrapperAccount>


                </Col>

            </WrapperHeader>
        </div>
    )
}
export default HeaderComponent