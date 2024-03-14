// src/components/Login.tsx
import React, { useContext, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { SuccessPage } from '../../components/successPage/SuccessPage';
import './login.style.css'; // Import the CSS file for styling
import { UserContext } from '../../store/auth';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [loading , setLoading] = useState(false);


  // const { storeTokenInLocalStorage , userAuthentication } = useContext(UserContext);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      // const response = await axios.post(`${process.env.BACKEND_SERVER}/login`, {
      const response = await axios.post("https://apni-website.onrender.com/login", {
        email,
        password
      });

      if(response){
        const data = await response.data;
         console.log("Responsed from login : " , data);
        
        // if(!localStorage.getItem("token")){
          const Usertoken = data.token;
          // userAuthentication(Usertoken);

          //  storeTokenInLocalStorage(Usertoken);
          localStorage.setItem('token' , Usertoken);
          //  setUserData({userDetails : "Hello"});
  
          console.log('Successful login');
          //  navigate('/success')
        // }
        navigate('/profile');
        
        //  console.log(response);
         setLoading(false);
         setIsLogin(true);
        //  alert("Login Successful");
      }
      else{
        console.log("error",response);
        setLoading(false);
        // alert(`${response.message}`)
      }
    } 
    
    catch (error: any) {
      if (error.response && error.response.data) {
        const responseData = error.response.data;
        setLoading(false);
        if (responseData.message) {
          // Handle error with message
          console.error('Error with message:', responseData.message);
          alert(responseData.message);
        } else if (responseData.errors && Array.isArray(responseData.errors) && responseData.errors.length > 0) {
          // Handle validation errors
          const validationError = responseData.errors[0];
          console.error('Validation Error:', validationError);
          // You can extract information like validation error type, message, etc.
          const fieldPath = validationError.path;
          const errorMsg = validationError.msg;
          alert(`${fieldPath} :: ${errorMsg}`);
        } else {
          // Handle other types of errors in the response
          console.error('Unexpected error in response:', responseData);
          alert('Unexpected error occurred');
        }
      } else {
        // Handle other types of errors
        console.error('Unexpected error:', error);
        alert('Unexpected error occurred');
      }
    }
    
    
    
  };

  return (
    <div className="outer-login-container">
      <div className="login-container">
          
          <h2> Login </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className='form-component'
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            <input
              type="password"
              className='form-component'
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className='form-component'>
              {loading ? <div className='loader'></div> : <>
              Login
              </>}
            </button>
            <Link className='forget' to='/forgetPassword'> Forget Password ? </Link>
            <div className="inner-container">
              Do not have accounts ?
              <Link className='link-signup' to='/signup'> Signup </Link>
            </div>
          </form>
      </div>
    </div>
  );
};

export default Login;


