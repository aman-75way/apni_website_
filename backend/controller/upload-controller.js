import { uploadImage } from "../Cloudinary/cloudinary.js";
import fs from 'fs'
import { Product } from "../models/productSchema.js";

// const unlinkAsync = promisify(fs.unlink);

const uploadHandler = async (req,res,next)=>{
    const url = await uploadImage(req.file.path);
    const {title , price} = req.body;
    fs.unlinkSync(req.file.path);
    // res.json(req.file);

    const productData = new Product({
        title,
        price,
        imageLink: url
    });

    await productData.save().then(async ()=>{
        res.status(200).json({message : "Successfully saved data"});
    }).catch((err)=>{   
        console.log("Error at upload in backend : " , err);
    })

    console.log("Image url is : " , url);
    // res.send("File uploaded Successfully");
}

export {uploadHandler}