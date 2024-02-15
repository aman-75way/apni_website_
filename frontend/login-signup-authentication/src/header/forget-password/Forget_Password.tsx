import { useState } from 'react'
import './forget_password.style.css'
import axios from 'axios';
import Login from '../login/login';

export const Forget_Password : React.FC = () => {

    const [name , setName] = useState("");
    const [password , setPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");
    const [forget , setForget] = useState(false);

  const eventHandler = async (event : React.FormEvent)=>{
      event.preventDefault();

      if(password === confirmPassword){
        try {
          const response = await axios.post('http://localhost:4000/forgetPassword' , {
            name,
            password,
            confirmPassword
          })
          // console.log("Reponse at forgePassword : " , response);
          if(response.status === 200){
            alert('password changed successfully');
            setName("");
            setPassword("");
            setConfirmPassword("");
            setForget(true);
          }else if(response.status === 300){
            alert('New password must be different from the old password');
          }

        } catch (error) {
          console.log("Error is : " , error);
          alert("Error in Password modification ");
        }
      }else{
        alert('password and confirm Password are not matching');
        setName("");
        setPassword("");
        setConfirmPassword("");
      }
  }


  return (
    <>
    {
      forget 
      ? 
        <Login />
      :
        <div className='main-container'>
            <h2> Forget Password </h2>
            <form onSubmit={eventHandler}>
                <input type='text' className='form-component' placeholder='Enter Name' value={name} onChange={(e)=>{setName(e.target.value)}} />
                
                <input type='password' className='form-component' placeholder='Enter New Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                
                <input type='text' className='form-component' placeholder='Re-Enter Password ' value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} />

                <button type='submit'> Change Password </button>
            </form>

        </div>
    }
    </>
  )
}
