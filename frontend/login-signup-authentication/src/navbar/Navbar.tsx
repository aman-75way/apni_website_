// src/components/Navbar.tsx
import React, {  useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
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
              <li><Link to="/">Home</Link></li>

              {authToken
              ? 
              <>
                      <li><Link to="/about">About</Link></li>
                      <li><Link to="/profile">Profile</Link></li>
                      <li><Link to="/showProduct">Display_Products</Link></li>
                      <li><Link to="/myUpload">My Products</Link></li>
                      <li className='logout-list' onClick={logout}>Logout</li>
                  </>
              :
                  <>
                      <li><Link to="/signup">Signup</Link></li>
                      <li><Link to="/login">Login</Link></li>
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