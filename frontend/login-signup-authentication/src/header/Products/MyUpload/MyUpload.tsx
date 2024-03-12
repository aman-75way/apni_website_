import axios from "axios";
import { useContext, useEffect, useState } from "react";
import './myUpload.style.css'
import { UserContext } from "../../../store/auth";
import { Link } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";

interface Product {
    _id: string;
    title: string;
    price: string;
    imageLink: string;
}

export const MyUpload = ()=>{
    const {userData} = useContext(UserContext);
    const [data , setData] = useState<Product[]>([]);
    
const deleteProduct = async(id : any)=>{
    try {       
        // const response = await  axios.delete(`http://localhost:4000/product/delete/${id}`);

        const response = await axios.delete(`http://localhost:4000/product/delete/${id}`);
        if(response.status === 200){
            // alert('Product Deleted Successfully');
            getAllProducts();
        }        
    } catch (error) {
        console.log("Error is : " , error);
    }
}

const getAllProducts = ()=>{
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
}


    useEffect(()=>{
        getAllProducts();
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
                                    <p>{product.price} </p>
                                    <button className="delete-Product" onClick={() => deleteProduct(product._id)} > <MdDelete size={18} /> </button>
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