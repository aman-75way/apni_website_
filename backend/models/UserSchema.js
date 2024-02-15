import 'dotenv/config'
import mongoose from "mongoose";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    confirmPassword:{
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


/* this below code for generating the token */

userSchema.methods.generateAuthToken = async function(){
    try {
        const token = Jwt.sign({_id : this._id , name: this.name} , process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        console.log(token);
        await this.save();
        return token;
    } catch (error) {
        console.log("Error : " , error);
    }
}



/* This below code is for encrypt the password */

// userSchema.pre("save" , async function(next){
//     // console.log("This is pre method : " , this);
//     const user = this;

//     if(!user.isModified("password")){
//         next();
//     }
    
//     try {
//         const salt = 10;
//         // const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(user.password , salt);
//         const hashConfirmPassword = await bcrypt.hash(user.confirmPassword , salt);
//         user.password = hashPassword;
//         user.confirmPassword = hashConfirmPassword;
//     } catch (error) { 
//         next(error);
//     }
//     next();
// });



const User = mongoose.model("User" , userSchema);
export default User;