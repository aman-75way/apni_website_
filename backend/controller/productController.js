import { Product } from "../models/productSchema.js";

const deleteProductById = async(req,res)=>{
    try {
        const id = req.params.id;
        const response = await Product.deleteOne({_id : id});
        res.status(200).json({message : "Product data deleted Successfully...."})
     } catch (error) {
           res.status(400).json({Error : "Error in deletion"});
     } 
}


const updateProductById = async(req,res)=>{
    
}



export  {deleteProductById , updateProductById};
