// import logo from './logo.svg';
import axios from 'axios';
import React, { useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {routes} from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';


function App() {


  // useEffect(() => {
  //   fetchApi()
  // }, [])
  const fetchApi = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAllProduct`)
    return res.data
  }

  
  const query = useQuery({ queryKey:['todos'], queryFn:fetchApi})
  console.log('456', query)


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