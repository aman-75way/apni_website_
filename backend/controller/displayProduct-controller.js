import { Product } from "../models/productSchema.js"

export const displayProduct = async(req,res)=>{
    
    // way-1 for fetching and sending data
            res.status(200).json(await Product.find())
    
    // way-2 for fetching and sending data
            // const allData = await Product.find();
            // res.status(200).json({allData});
}