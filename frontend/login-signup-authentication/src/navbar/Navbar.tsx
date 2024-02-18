// src/components/Navbar.tsx
import React, { useContext, useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Navbar.style.css';

const Navbar: React.FC = () => {
  const navigate =useNavigate()
  const[token,setToken]=useState<string | null>(null)
  const logout= ()=>{
    localStorage.removeItem('token');
    console.log("current Token is : ")
    navigate('/login')
  }

  const authToken = localStorage.getItem("token")
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>

        {authToken
        ? 
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/fileUpload">File_Upload</Link></li>
              <li><Link to="/showProduct">Display_Products</Link></li>
              <li className='logout-list' onClick={logout}>Logout</li>
            </>
        :
            <>
              <li><Link to="/signup">Signup</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
        }
      </ul>
    </nav>
  );
};

export default Navbar;
