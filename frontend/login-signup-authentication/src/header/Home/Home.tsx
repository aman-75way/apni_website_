// src/components/Home.tsx
import React, { useContext } from 'react';
import './Home.style.css'; // Import the CSS file for styling

const Home: React.FC = () => {

  return (
    <div className="home-container">
      <div className="home-background">
      <div className="home-content">
        <h2>Welcome to Our Website</h2>
      </div>
      </div>
    </div>
  );
};

export default Home;
