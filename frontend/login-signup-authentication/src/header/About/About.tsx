// src/components/About.tsx
import React, { useContext } from 'react';
import './about.style.css'; // Import the CSS file for styling
import { UserContext } from '../../store/auth';

const About: React.FC = () => {

  const {userData} = useContext(UserContext);
  return (
    <div className="about-container">
      <h2>About Us</h2>
      <h3 className='name-container'> Hello , {userData.userName} </h3>
      <p>
        Welcome to our website, <br></br>
        This website is designed by <b>Mr. Aman Kumar Tiwari </b> , working on <b>75way technologies pvt. ltd.</b> as an <b>Intern</b>

      </p>
      <p>
      </p>
    </div>
  );
};

export default About;
