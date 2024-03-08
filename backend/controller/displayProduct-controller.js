import { Product } from "../models/productSchema.js"

 const displayProduct = async(req,res)=>{
      
    // way-1 for fetching and sending data
            res.status(200).json(await Product.find());
    
    // way-2 for fetching and sending data
            // const allData = await Product.find();
            // res.status(200).json({allData});
}

 const myProduct = async(req,res)=>{
      const userId = req.user.id;
//       console.log("userId" , userId);
      res.status(200).json(await Product.find({user : userId}));
}

export {displayProduct , myProduct}