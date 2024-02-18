import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    imageLink:{
        type: String,
        required: true
    }
});

export const Product = new mongoose.model("Product" , productSchema);