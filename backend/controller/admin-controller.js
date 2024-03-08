import User from "../models/UserSchema.js"
import { Product } from "../models/productSchema.js";

export const userDetails = async(req,res)=>{

    const userData = await User.find({} , {password : 0 , confirmPassword : 0 , tokens : 0});
    res.status(200).json({msg : userData});
}

export const productDetails = async(req, res)=>{
    const productDetails = await Product.find();
    res.status(200).json({productDetails});
}