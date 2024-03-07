import { useRef, useState } from "react";
import axios from "axios";
import './fileUpload.style.css';
import { Link } from "react-router-dom";


export const FileUpload = ()=>{
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title , setTitle] = useState("");
  const [price , setPrice] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploaded , setUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
          setSelectedFile(file);
        }
  };

  const handleUpload = async (event : React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    // const formData = new FormData();
    // formData.append('images', selectedFile);
    // formData.append('title' , title);
    // formData.append('price' , price);

    try {
      // const response = await axios.post('http://localhost:4000/api/upload', formData, {
      const response = await axios.post('http://localhost:4000/api/upload', {
        images : selectedFile,
        title : title,
        price : price
      } , {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization : `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("File Uploaded Successfully");
      setTitle("");
      setPrice("");
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // console.log('Upload successful', response);
      setUploaded(true);

    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  return (
        <div className="outerImageContainer">
          <div className="imageContainer">
            <form onSubmit={handleUpload}>
              <input
                type="text"
                name="title"
                placeholder="Enter title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <input
                type="text"
                name="price"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <input
                type="file"
                name="images"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <button className="submit-btn" type="submit" onClick={handleUpload}>
                Upload
              </button>
              <div className="extra-link">
                All Products...?
                <Link className="showProduct" to='/showProduct'> See Products </Link>
                <br />
                Your Products...?
                <Link className="showProduct" to='/myUpload'> My Products </Link>
              </div>
            </form>
          </div>
        </div>
  );
  
};


