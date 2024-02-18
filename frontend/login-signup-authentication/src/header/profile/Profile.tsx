
import './Profile.style.css'
// import { userAuthentication } from '../../store/auth'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios';

export const Profile = () => {

  // const {user , userData} = useContext(UserContext);
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
  useEffect(()=>{
    const token :any =localStorage.getItem("token")
    userAuthentication(token)
  },[])

  return (
    <div className='profile-container'>
        <h2> Profile  </h2>
        <h3 className='profile-component'> User Name  - {userData.userName} </h3>
        <h3 className='profile-component'> User Number  - {userData.userNumber} </h3>
        <h3 className='profile-component'> User Email  - {userData.userEmail} </h3>
        <h3 className='profile-component'> User Gender  - {userData.userGender} </h3>

        <div className='profile-items'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum laudantium vero labore eveniet illum impedit facilis deserunt iste esse, delectus voluptate minima sint, nostrum incidunt explicabo quasi modi illo dolor!
        </div>
    </div>
  )
}
