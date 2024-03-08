import axios from "axios";
import { useContext, useEffect, useState } from "react";
import './myUpload.style.css'
import { UserContext } from "../../../store/auth";
import { Link } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";

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
        <div className="main-outer-container">
            <div className="outer-container">
                    {data.length === 0 ? (
                        <div className="message">
                            <h3>You have not uploaded any item.</h3>
                            <span className="inner-message">
                                If want to Upload  ?   
                            </span>
                            <Link className="link" to='/fileUpload' >   Upload Here...</Link>
                        </div>
                    )
                    :
                    (
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
                    )}
            </div>
            <div className="my-right-container">
                <Link className='my-link-to-upload' to='/fileUpload'>
                    <FaCloudUploadAlt size={30}/>
                    Upload Your Products
                </Link>
        </div>
        </div>
    )
}