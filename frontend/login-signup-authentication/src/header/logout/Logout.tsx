import  { useEffect } from 'react'
import { useContext } from 'react';
import { UserContext } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import Home from '../Home/Home';
// import './'

export const Logout = () => {

  // const { setUser , setUserData } = useContext(UserContext);

  const navigate = useNavigate();
  useEffect(()=>{
      //  setUser({token : ""});
      //  setUserData({
      //   userName : "",
      //   userNumber : "",
      //   userEmail : "",
      //   userGender : ""
      //  });
       if(localStorage.getItem("token")){
         localStorage.removeItem("token");
         window.location.reload();
       }else{
         navigate('/');
       }
  } , [])


  return (
    <>
      
    </>
  )
}
