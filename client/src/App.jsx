import React from 'react'
import NotFound from './pages/NotFound'
import { Routes, Route } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes> 
        <Route path='*' element={<NotFound/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        {/* <Route path='/about-us' element={<AboutUs/>}/> */}

      </Routes>
    </div>
  )
}

export default App
