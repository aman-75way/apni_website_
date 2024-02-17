// src/components/Routes.tsx
import React, { useEffect, useState } from 'react';
import {  Route, Routes as ReactRoutes , Navigate} from 'react-router-dom'; // Use a different name for the import
// import ProtectedRoute from './ProtectedRoute.tsx';
import Home from '../header/Home/Home';
import About from '../header/About/About';
import Login from '../header/login/login';
import { Signup } from '../header/signup/signup';
import { Profile } from '../header/profile/Profile';
import { Logout } from '../header/logout/Logout';
import { Forget_Password } from '../header/forget-password/Forget_Password';
import { FileUpload } from '../header/FileUpload/FileUpload';
import { ShowProduct } from '../header/showProduct/ShowProduct';

const Routes_: React.FC = () => {
  const ProtectedRoute = ({ path, element }: { path: string; element: React.ReactNode }) => {
    const isAuthenticated = localStorage.getItem('token') !== null;
    return isAuthenticated ? <Route path={path} element={element} /> : <Navigate to="/login" replace />;
  };
  
  var [restricted , setRestricted] = useState<Boolean>(false);
  
  useEffect(()=>{
    restricted = localStorage.getItem('token') != null;
  } , [])
  return (

      <ReactRoutes> {/* Use the imported name here */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/showProduct" element={<ShowProduct />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/fileUpload" element={<FileUpload />} />
        <Route path="/logout" element={<Logout />} />

        {/* <Route path="/showProduct" element={<ShowProduct />} /> */}
        {/* <Route path="/showProduct"
          element={<ProtectedRoute path="/showProduct" element={<ShowProduct />} />} 
        />
        <Route path="/profile"
          element={<ProtectedRoute path="/profile" element={<Profile />} />} 
        />
        <Route path="/fileUpload"
          element={<ProtectedRoute path="/fileUpload" element={<FileUpload />} />} 
        />
        <Route path="/logout"
          element={<ProtectedRoute path="/logout" element={<Logout />} />} 
        /> */}
        <Route path="/forgetPassword" element={<Forget_Password />} />

      </ReactRoutes> 

  );
};

export default Routes_;
