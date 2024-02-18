import axios from "axios";

let apiEndPoint = 'https://api.opencagedata.com/geocode/v1/json';
let apiKey = 'dbb42f899d674414a366b17da7dbcc47';

export const fetchAddress = async (latitude : number , longitude : number) =>{
    let query =  `${latitude},${longitude}`;
    let apiURL = `${apiEndPoint}?key=${apiKey}&q=${query}&pretty=1`;

    try {
        const res = await axios.get(apiURL);
        console.log("Address is : " , res.data.results[0].formatted);
        return (res.data.results[0].formatted);
    } catch (error) {
        console.log("Error at fetchAddress :" , error);
    }

}


// export const LocationFetch = () => {

//     const [address , setAddress] = useState<string>("");

//     const locationHandler = async ()=>{
        
//         try {
//             if(navigator.geolocation){
//                 navigator.geolocation.getCurrentPosition((position)=>{
//                     const {latitude , longitude} = position.coords;
//                     console.log(latitude , longitude);
//                     fetchAddress(latitude , longitude)
//                     .then((currentAddress)=>{
//                         setAddress(currentAddress);
//                     })
//                     .catch((error)=>{
//                         console.log("Error at return point of fetch Address is : " , error);
//                     })
//                     return address;
//                 },
//                 (error)=>{
//                     console.log("Error is : " , error);
//                 });
//             }
//         }catch (error) {
//             console.log(error);
//         }
//         return "";
//     }

//     locationHandler();
//     return address;
// }

