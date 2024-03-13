
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Otp.style.css'; // Import the stylesheet
import { RegisterDetails } from '../Registration/registerDetails';
import 'dotenv/config';
import Login from '../login/login';

const OTP: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isVerify , setIsVerify] = useState<Boolean>(false);
  const [loading1 , setLoading1] = useState(false);
  const [loading2 , setLoading2] = useState(false);
  
  const sendOTP = async (event : React.FormEvent) => {
    event.preventDefault;
    setLoading1(true);
    try {
      // const response = await axios.post(`${process.env.BACKEND_SERVER}/otp/send-otp`, { email });
      const response = await axios.post(`http://localhost:8104/otp/send-otp`, { email });
      setLoading1(false);
      setMessage(response.data.message);
    } catch (error) {
      setLoading1(false);
      setMessage('Failed to send OTP');
    }
  };


  const verifyOTP = async () => {
    setLoading2(true);
    try {
      const response = await axios.post('http://localhost:4000/otp/verify-otp', { email, otp });
      setLoading2(false);
      setMessage(response.data.message);
      setIsVerify(true);
    } catch (error) {
      setLoading2(false);
      setMessage('Invalid OTP');
    }
  };


  return (
    <div className="outer-otp-container">
        <div className='otp-container'>
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
                <button onClick={sendOTP}>
                    {loading1 ? <div className='loader'></div> : <>
                        Send OTP
                    </>}
                </button>
                <br />
                <br />
                <label>
                  Enter the OTP Sent to Your Mail:
                  <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                </label>
                <br />
                <button onClick={verifyOTP}>
                    {loading2 ? <div className='loader1'></div> : <>
                      Verify OTP
                    </>}
                </button>
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
        </div>
    </div>
  );
  

};


export default OTP;
