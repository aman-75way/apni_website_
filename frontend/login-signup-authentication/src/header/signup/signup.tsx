import { useState } from 'react';
import './signup.style.css'
import axios from 'axios';
import Login from '../login/login';

export const Signup = () => {
  
  const [name , setName ] = useState('');
  const [mobile , setMobile ] = useState('');
  const [email , setEmail ] = useState('');
  const [gender , setGender ] = useState('');
  const [password , setPassword ] = useState('');
  const [confirmPassword , setConfirmPassword] = useState("");
  const [register , setRegister] = useState(false);

  // const storeTokenInLocalStorage = useAuth();
  
  const handleSubmit = async(event : React.FormEvent)=>{
      event.preventDefault();

      try {

        if(password === confirmPassword){
              const response = await axios.post("http://localhost:4000/signup" , {
                name,mobile,email,gender,password,confirmPassword
              });

              if(response.status === 201){
                  console.log("Response is : " , response);
                  const data = await response.data;   // which comes from the backend (index.js)
                  const token = data.token;
                  console.log("Signup token is : " , token);
                  // we maintain below one line with the help of store in future......
                  localStorage.setItem("token" , token);
                  // storeTokenInLocalStorage(token);

                  setName("");
                  setMobile("");
                  setEmail("");
                  setGender("");
                  setPassword("");
                  setConfirmPassword("");
                  setRegister(true);

                  console.log(response);
              }

        }else{
          alert("Password is not matching");
        }
      } 
      catch (error : any) {
        console.log("Error : " , error);
      }
  }

  return (
    <>
    {
      register 
      ?
      <>
        <Login />
      </>
      :
      <div className='main--container'>
      <h2> Register Here </h2>
      <form onSubmit={handleSubmit} >
          
          <input type='text' className='formComponent' placeholder='Enter your name' onChange={(e) => setName(e.target.value)} value={name} />
          
          <input type='number' className='formComponent' placeholder='Enter your mobile number' onChange={(e)=>{setMobile(e.target.value)}} />
          
          <input type='text' className='formComponent' placeholder="Enter your email" onChange={(e)=>{setEmail(e.target.value)}} />

          <select name='gender' className='formComponent' onChange={(e)=>{setGender(e.target.value)}}>
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
          </select>

          <input type='text' className='formComponent' placeholder='Enter your Password' onChange={(e) => setPassword(e.target.value)} value={password} />

          <input type='password' className='formComponent' placeholder='Enter Password Again' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <button type='submit' className='formComponent' > Register </button>
      </form>  
    </div>
    }
    </>
  )
}
