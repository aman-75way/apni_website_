import  { useEffect } from 'react'
import { useContext } from 'react';
import { UserContext } from '../../store/auth';
import Home from '../Home/Home';


export const Logout = () => {

  const { setUser , setUserData } = useContext(UserContext);


  useEffect(()=>{
       setUser({token : ""});
       setUserData({
        userName : "",
        userNumber : "",
        userEmail : "",
        userGender : ""
       });
       localStorage.removeItem("token");
  } , [])


  return (
    <>
      <Home />
    </>
  )
}
