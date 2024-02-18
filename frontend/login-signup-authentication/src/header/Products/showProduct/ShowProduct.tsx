import { useEffect, useState } from 'react';
import './showProduct.style.css';
import axios from 'axios';

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
