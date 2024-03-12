import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.style.css';
import axios from 'axios';


export const EditProfile = ()=>{

    const [name , setName] = useState("");
    const [mobile , setMobile] = useState("");
    const [serverToken , setServerToken] = useState("");
    const [loading , setLoading] = useState(false);
    const [userData , setUserData] = useState({
        userName : "",
        userNumber : ""
    })
    const navigate = useNavigate();

    const handleSubmit = async(event : React.FormEvent)=>{ 
        setLoading(true);
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/updateUserDetails' , 
                {
                    name : name,
                    mobile : mobile
                },{
                    headers:{
                        Authorization : `Bearer ${serverToken}`
                    }
            })
            setLoading(false);
            if(response.status == 200){
                // alert("Data Modified Successfully"); 
                navigate('/profile')    
            }
        } catch (error : any) {
            setLoading(false);
            const fieldPath = error.response.data.errors[0].path;
            const errorMsg = error.response.data.errors[0].msg
            console.log(fieldPath , " :: " , errorMsg );
            alert(`${fieldPath}  ::  ${errorMsg}`);
        }
    }  
  
    
    const userAuthentication = async ( serverToken : string)=> {
        try {
        
            const response = await axios.get('http://localhost:4000/userDetails' , {
                headers : {
                Authorization : `Bearer ${serverToken}`,
                },
            });
        
            if(response.status === 200){
                const userDetails_ = await response.data;
                // setUserData({
                // userName : userDetails_.userData.name.toString(),
                // userNumber : userDetails_.userData.mobile
                // });
                setName(userDetails_.userData.name.toString());
                setMobile(userDetails_.userData.mobile);
            }
        
        } 
        catch (error) {
            console.log("Error : " , error);
        }
    }


    useEffect(()=>{
        const token :any =localStorage.getItem("token")
        userAuthentication(token);
        setServerToken(token);
    } , []);


    return(
        <div className='outer-edit-profile-container'>
            <div className="edit-profile-container">
                    <h2> Update Profile </h2>
                    <form onSubmit={handleSubmit}>
                        <input
                        type="name"
                        className='form-component'
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                        <input
                        type="Number"
                        className='form-component'
                        placeholder="Enter Mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        />
                        <button type="submit" className='form-component'>
                        {loading ? <div className='loader'></div> : <>
                            Update
                        </>}
                        </button>
                    </form>
            </div>
        </div>
    )
}