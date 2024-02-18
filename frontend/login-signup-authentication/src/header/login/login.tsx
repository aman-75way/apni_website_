// src/components/Login.tsx
import React, { useContext, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { SuccessPage } from '../../components/successPage/SuccessPage';
import './login.style.css'; // Import the CSS file for styling
import { UserContext } from '../../store/auth';
import { Link, useNavigate } from 'react-router-dom';


const Login: React.FC = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [password, setPassword] = useState('');
  // const { storeTokenInLocalStorage , userAuthentication } = useContext(UserContext);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/login', {
        name,
        password
      });

      if(response.status === 200){
        const data = await response.data;
        //  console.log("Responsed from login : " , data);
        
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

         setIsLogin(true);
        //  alert("Login Successful");
      }
    } catch (error : any) {
         const fieldPath = error.response.data.errors[0].path;
        const errorMsg = error.response.data.errors[0].msg
        console.log(fieldPath , " :: " , errorMsg );
        alert(`${fieldPath}  ::  ${errorMsg}`)
    }
  };

  return (
    <div className="login-container">
      
        <h2> Login </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className='form-component'
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            className='form-component'
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className='form-component'>Login</button>
          <Link className='forget' to='/forgetPassword'> Forget Password ? </Link>
        </form>
    </div>
  );
};

export default Login;
