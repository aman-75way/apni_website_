
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Otp.style.css'; // Import the stylesheet
import { RegisterDetails } from '../Registration/registerDetails';
import Login from '../login/login';

const OTP: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isVerify , setIsVerify] = useState<Boolean>(false);

  
  const sendOTP = async () => {
    try {
      const response = await axios.post('http://localhost:4000/otp/send-otp', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to send OTP');
    }
  };


  const verifyOTP = async () => {
    try {
      const response = await axios.post('http://localhost:4000/otp/verify-otp', { email, otp });
      setMessage(response.data.message);
      setIsVerify(true);
    } catch (error) {
      setMessage('Invalid OTP');
    }
  };


  return (
     <>
     {isVerify ?
     <RegisterDetails  email={email}/>
     :    
    <div className="container">
    <h1>Register YourSelf</h1>
    <br />
    <label>
      Enter Your Email:
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </label>
    <button onClick={sendOTP}>Send OTP</button>
    <br />
    <br />
    <label>
      Enter the OTP Sent to Your Mail:
      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
    </label>
    <br />
    <button onClick={verifyOTP}>Verify OTP</button>
    <br />
    <div className="inner-container">
      Already Have an Account ? 
      <Link to='/login'>Login</Link>
    </div>
    <p className={message.startsWith('Failed') || message.startsWith('Invalid') ? 'error' : 'success'}>
      {message}
    </p>
    </div>
     }
     </>
  );
  

};


export default OTP;
