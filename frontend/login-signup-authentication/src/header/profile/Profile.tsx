
import './Profile.style.css'
// import { userAuthentication } from '../../store/auth'
import { useContext, useEffect, useState } from 'react'
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

export const Profile = () => {

  const navigate = useNavigate();

  const [userData , setUserData] = useState({
    userName : "",
    userNumber : "",
    userEmail : "",
    userGender : ""
})


  const userAuthentication = async ( serverToken : string)=> {
    try {
      // console.log("Jo user ka token hai n  " ,  serverToken);
      const response = await axios.get('http://localhost:4000/userDetails' , {
        headers : {
          Authorization : `Bearer ${serverToken}`,
        },
      });
      if(response.status === 200){
        // console.log("auth.tsx me response :::: " , response);
        const userDetails_ = await response.data;

        // console.log(userDetails_);
        setUserData({
          userName : userDetails_.userData.name.toString(),
          userNumber : userDetails_.userData.mobile,
          userEmail : userDetails_.userData.email,
          userGender : userDetails_.userData.gender 
        });
        // console.log("Name is : " , userDetails_.userData.name);

      }
      
    } catch (error) {
      console.log("Error : " , error);
    }
  }


  const editProfile = async()=>{
    navigate('/edit-profile');
  }


  useEffect(()=>{
    const token :any =localStorage.getItem("token")
    userAuthentication(token)
  },[])

  return (
    <div className="outer-profile-container">
        <div className='profile-container'>
            <button className='profile-icon' onClick={editProfile} ><FaUserEdit size={25} /></button>
            <h2> Profile </h2>
            <h3 className='profile-component'> User Name  - {userData.userName} </h3>
            <h3 className='profile-component'> User Number  - {userData.userNumber} </h3>
            <h3 className='profile-component'> User Email  - {userData.userEmail} </h3>
            <h3 className='profile-component'> User Gender  - {userData.userGender} </h3>
        </div>
    </div>
  )
}

