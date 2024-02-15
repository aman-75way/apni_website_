import mongoose from "mongoose";
import 'dotenv/config'

export const connectDB = ()=>{
    try{
        mongoose.connect(process.env.MONGODB_URL)
        .then(()=>{
            console.log("Mongodb Connected");
        })
    }catch(err){
        console.log(err);
    }
}