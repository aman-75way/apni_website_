import axios from "axios";
import { useContext, useEffect, useState } from "react";
import './myUpload.style.css'
import { UserContext } from "../../../store/auth";

interface Product {
    _id: string;
    title: string;
    price: string;
    imageLink: string;
}

export const MyUpload = ()=>{
    const {userData} = useContext(UserContext);
    const [data , setData] = useState<Product[]>([]);

    useEffect(()=>{
        axios.get('http://localhost:4000/api/myProduct' , {
            headers : {
                Authorization : `Bearer ${localStorage.getItem("token")}`,
            },
          })
        .then((response)=>{
            setData(response.data);
        }).catch((error)=>{
            console.log("Error :" , error);
        });
    } , []);

    return(
        <div className="product-list">
            {data.map(product => {
            // console.log("Image link is : " , product.imageLink); // Log the image_link
                return (
                    <div key={product._id} className="product-card">
                    <img src={product.imageLink} alt={product.title} />
                    <h3>{product.title}</h3>
                    <p>{product.price}</p>
                    </div>
                );
            })}
        </div>
    )
}