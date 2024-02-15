
import './Profile.style.css'
import { UserContext } from '../../store/auth'
import { useContext } from 'react'

export const Profile = () => {

  const {user , userData} = useContext(UserContext);


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
