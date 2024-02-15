// src/components/Routes.tsx
import React from 'react';
import {  Route, Routes as ReactRoutes } from 'react-router-dom'; // Use a different name for the import
import Home from '../header/Home/Home';
import About from '../header/About/About';
import Login from '../header/login/login';
import { Signup } from '../header/signup/signup';
import { Profile } from '../header/profile/Profile';
import { Logout } from '../header/logout/Logout';
import { Forget_Password } from '../header/forget-password/Forget_Password';
import { FileUpload } from '../header/FileUpload/FileUpload';

const Routes_: React.FC = () => {
  return (

      <ReactRoutes> {/* Use the imported name here */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/fileUpload" element={<FileUpload />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgetPassword" element={<Forget_Password />} />

      </ReactRoutes> 

  );
};

export default Routes_;
