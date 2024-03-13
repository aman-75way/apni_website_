import express from 'express';
// import User from './models/UserSchema.js';
import bodyParser from 'body-parser';
import Jwt from 'jsonwebtoken';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import 'dotenv/config'

// Database.........
import { connectDB } from './db.js';


// Multer + Cloudinary ........
import multer from 'multer';
import {v2 as Cloudinary} from 'cloudinary';
import { upload } from './Multer/multer.configuration.js';


// Controller...........
import { GetHome, forgetPassword, updateUserDetails, userDetails, userLogin, userSignUp } from './controller/auth-controller.js';
import { uploadHandler } from './controller/upload-controller.js';
import { displayProduct , myProduct } from './controller/displayProduct-controller.js';


// Middleware.............
import { authMiddleware } from './middleware/auth-middleware.js';
import { validateLogin } from './middleware/login-middleware.js';
import { validateSignUp } from './middleware/signup-middleware.js';
import { validateForgetPassword } from './middleware/forget-password-middleware.js';


// Routes..............
import OTP from './Routes/Otp.js';
import adminRouter from './Routes/admin-route.js';
import productOperations from './Routes/product-route.js';
import { validateEditProfile } from './middleware/edit-profile-middleware.js';




//  Our server is live on - https://apni-website.onrender.com/


const PORT = 4000 | process.env.PORT
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: "*",
}
app.use(cors(corsOptions));


connectDB();



app.get('/' , (req,res)=>{
    res.send("Hello");
})


// --------------------------
//     Routes Section  💀
// --------------------------


app.use('/admin' , adminRouter);
app.use('/otp' , OTP);
app.use('/product' , productOperations);


// --------------------------
//     User Details  💀
// --------------------------


app.get('/userDetails' , authMiddleware , userDetails)
app.post('/updateUserDetails' , validateEditProfile , authMiddleware , updateUserDetails)


// --------------------------
//     Upload Photo  💀
// --------------------------


app.post('/api/upload'  , upload.single("images") , authMiddleware ,  uploadHandler)
app.get('/api/displayProduct' , displayProduct);
app.get('/api/myProduct' , authMiddleware ,  myProduct);


// ----------------------------
//     User Authentication  💀
// ----------------------------


app.post('/signup' , validateSignUp , userSignUp);
app.post('/login' , validateLogin , userLogin);
app.post('/forgetPassword' , validateForgetPassword ,  forgetPassword);



// ---------------------
//     Run Server  💀
// ---------------------


app.listen(PORT , (req,res)=>{
    console.log(`Server started at ${PORT}`);
})