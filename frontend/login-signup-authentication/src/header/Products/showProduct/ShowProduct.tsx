import { useEffect, useState } from 'react';
import './showProduct.style.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCloudUploadAlt } from "react-icons/fa";
interface Product {
    _id: string;
    title: string;
    price: string;
    imageLink: string;
  }

export const ShowProduct = () => {

    const [data ,setData] = useState<Product[]>([]);

    useEffect(()=>{
        axios.get('http://localhost:4000/api/displayProduct').then((response)=>{
            // console.log(response.data);
            setData(response.data);
        }).catch((err)=>{
            console.log("Error at fetching products : " , err);
        });

    } , []);


  return (
    <div className="outer-product-list-container">
  
        <div className="product-list">
            {data.map(product => {
              // console.log("Image link is : " , product.imageLink); // Log the image_link
              return (
                <div key={product._id} className="product-card">
                  <img src={product.imageLink} alt={product.title} style={{ width: '20vw', height: '25vh' }} />
                  <h3>{product.title}</h3>
                  <p>{product.price}</p>
                </div>
              );
            })}
        </div>

        <div className="right-container">
           <Link className='link-to-upload' to='/fileUpload'>
              <FaCloudUploadAlt size={30}/>
              Upload Your Products
           </Link>
        </div>
        

    </div>

  )
}
