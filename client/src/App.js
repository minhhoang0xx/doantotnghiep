// import logo from './logo.svg';

import React, { useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {routes} from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { Fragment } from 'react';
// import { useQuery } from '@tanstack/react-query';
import { isJsonString } from './ultils';
import { jwtDecode } from 'jwt-decode';
import * as UserService from './services/UserService';
import { useDispatch } from 'react-redux'
import { updateUser } from './redux/slices/userSlice';


function App() {
  const dispatch = useDispatch();

// kiem tra token
  const handleDecoded = () =>{
    let storageData = localStorage.getItem('access_token'); // lay gia tri access_token, Token luc nay la chuoi JWT JSON
    let decoded = {} // tu day tro xuong la de giai ma no
    if(storageData && isJsonString(storageData)){
      storageData = JSON.parse(storageData) // phantich thanh object
      decoded = jwtDecode(storageData)
    }
    return {decoded, storageData}
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => { // no se chay vao day truoc, o day de check token da het han chua, neu het han thi access token = config
    const currentTime = new Date()
    const { decoded} = handleDecoded()
    // kiem tra thoi gian het han
    if(decoded?.exp < currentTime.getTime() / 1000){
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  const handleGetDetailsUser = async (id,token) => {
    const res = await UserService.getDetailUser(id,token)
    dispatch(updateUser({...res?.data, access_token: token}))
  }

//luu thong tin sau khi dang nhap, reload khong phai dang nhap lai
  useEffect(() => {
    const { decoded, storageData } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded.id, storageData); // Gọi API lấy thông tin chi tiết người dùng
    }
  }, []); 

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return(
              <Route key = {route.path} path={route.path} element={
                <Layout>
                <Page/>
                </Layout>
              }/>
            )
          })}
        </Routes>
      </Router>
      
    </div>
  )
}

export default App