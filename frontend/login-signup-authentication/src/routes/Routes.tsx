// src/components/Routes.tsx
import React from 'react';
import {  Route, Routes as ReactRoutes } from 'react-router-dom'; // Use a different name for the import
// import ProtectedRoute from './ProtectedRoute.tsx';
import Home from '../header/Home/Home';
import About from '../header/About/About';
import Login from '../header/login/login';
import { RegisterDetails } from '../header/Registration/registerDetails';
import { Profile } from '../header/profile/Profile';
import { Logout } from '../header/logout/Logout';
import { Forget_Password } from '../header/forget-password/Forget_Password';
import { FileUpload } from '../header/Products/FileUpload/FileUpload';
import { ShowProduct } from '../header/Products/showProduct/ShowProduct';
import Protected from '../protectedRoutes/ProtectedRoutes';
import { SuccessPage } from '../components/successPage/SuccessPage';
import { MyUpload } from '../header/Products/MyUpload/MyUpload';
import OTP from '../header/Signup_OTP-Verification/Otp';


const Routes_: React.FC = () => {
  
  return (
      <div className="outer-container">
        <ReactRoutes> {/* Use the imported name here */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<OTP />} />
          <Route path="/register" element={<RegisterDetails />} />

          {/* <Route path="/showProduct" element={<ShowProduct />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/fileUpload" element={<FileUpload />} />
        <Route path="/profile" element={<Profile />} /> */}
          <Route path="/logout" element={<Logout />} />
          
          <Route path='/success' element={<Protected name="success" children={<SuccessPage />} />} />
          <Route path='/showProduct' element={<Protected name="showProduct" children={<ShowProduct />} />} />
          <Route path='/fileUpload' element={<Protected name="fileUpload" children={<FileUpload />} />} />
          <Route path='/myUpload' element={<Protected name="myUpload" children={<MyUpload />} />} />
          {/* <Route path='/logout' element={<Protected name="logout" children={<Logout />} />} /> */}
          <Route path='/profile' element={<Protected name="profile" children={<Profile />} />} />

          <Route path="/forgetPassword" element={<Forget_Password />} />

        </ReactRoutes> 
      </div>
  );
};

export default Routes_;
