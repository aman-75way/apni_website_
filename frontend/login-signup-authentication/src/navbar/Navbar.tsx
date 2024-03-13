// src/components/Navbar.tsx
import React, {  useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FaHome } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { FcAbout } from "react-icons/fc";
import './Navbar.style.css';

const Navbar: React.FC = () => {
  const navigate =useNavigate()


  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const logout= ()=>{
    localStorage.removeItem('token');
    console.log("current Token is : ")
    navigate('/login')
  }

  const rootStyles = document.documentElement.style;

  useEffect(() => {
    // Dynamically set CSS variables based on dark mode
    rootStyles.setProperty('--background-color', darkMode ? '#9290C3' : 'rgb(55, 149, 237)');
    rootStyles.setProperty('--header-color', darkMode ? '#535C91' : '#2C5F2D');
  }, [darkMode]);

  const authToken = localStorage.getItem("token")
  return (
    <>
      
        <div className="left-header">
          <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
            <ul>
              <li><Link to="/"> <FaHome size={25}/> Home </Link></li>
              <li><Link to="/admin"> Admin </Link></li>

              {authToken
              ? 
              <>
                      <li><Link to="/about"> About</Link></li>
                      <li><Link to="/profile"> <CgProfile /> Profile</Link></li>
                      <li><Link to="/showProduct">Display_Products</Link></li>
                      <li><Link to="/myUpload">My Products</Link></li>
                      <li className='logout-list' onClick={logout}> Logout <IoLogOutOutline /></li>
                  </>
              :
                  <>
                      <li><Link to="/signup">Register</Link></li>
                      <li><Link to="/login"> <CiLogin /> Login</Link></li>
                  </>
              }

          <div className="right-header">
                <span className="toggle-btn" onClick={toggleDarkMode}>
                  <FontAwesomeIcon className='toggle-icon' icon={darkMode ? faSun : faMoon } size="2x" />
                </span>
          </div>
          </ul>
          </nav>
        </div>
        
    </>
  );
};

export default Navbar;