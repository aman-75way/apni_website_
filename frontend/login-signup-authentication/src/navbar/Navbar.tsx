// src/components/Navbar.tsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.style.css';
import { UserContext } from '../store/auth';

const Navbar: React.FC = () => {
  
  const {user} = useContext(UserContext);
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>

        {user.token !== "" 
        ? 
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </>
        :
        <>
        <li><Link to="/fileUpload">File_Upload</Link></li>
              <li><Link to="/signup">Signup</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
        }
      </ul>
    </nav>
  );
};

export default Navbar;
