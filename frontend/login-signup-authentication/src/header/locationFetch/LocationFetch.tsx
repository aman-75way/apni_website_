import './locationfetch.style.css'
import { useState } from 'react';
import { fetchAddress } from '../../utils/LocationFetch.utils';


export const LocationFetch = () => {

    const [address , setAddress] = useState<string>("");

    const locationHandler = async ()=>{
        
        try {
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition((position)=>{
                    const {latitude , longitude} = position.coords;

                    fetchAddress(latitude , longitude)
                    .then((currentAddress)=>{
                        setAddress(currentAddress);
                    })
                    .catch((error)=>{
                        console.log("Error at return point of fetch Address is : " , error);
                    })
                    return address;
                },
                (error)=>{
                    console.log("Error is : " , error);
                });
            }
        }catch (error) {
            console.log(error);
        }
    }

    return(
        <>
        <p>Address is :  {address} </p>
        <button onClick={locationHandler}> Fetch Location </button>
        </>
    )
}



// export const LocationFetcher = ()=>{

//     const [add , setAdd] = useState("");

//     const submitHandler = ()=>{
//         setAdd(LocationFetch);
//     }

//     return(
//         <button onClick={submitHandler}> Fetch location </button>
//     )
// }