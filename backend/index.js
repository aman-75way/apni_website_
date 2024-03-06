import express from 'express';
import { connectDB } from './db.js';
// import User from './models/UserSchema.js';
import bodyParser from 'body-parser';
import Jwt from 'jsonwebtoken';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import {v2 as Cloudinary} from 'cloudinary';
import { GetHome, forgetPassword, userDetails, userLogin, userSignUp } from './controller/auth-controller.js';
import { authMiddleware } from './middleware/auth-middleware.js';
import { sendMail } from './controller/mail-controller.js';
import { uploadHandler } from './controller/upload-controller.js';
import { upload } from './Multer/multer.configuration.js';
import { displayProduct , myProduct } from './controller/displayProduct-controller.js';
import { validateLogin } from './middleware/login-middleware.js';
import { validateSignUp } from './middleware/signup-middleware.js';
import OTP from './Routes/Otp.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: "*",
}

app.use(cors(corsOptions));

const PORT = 4000;

connectDB();


app.use('/otp' , OTP);


app.get('/sendmail' , sendMail)


app.get('/' , GetHome);


app.get('/userDetails' , authMiddleware , userDetails)


app.post('/api/upload'  , upload.single("images") , authMiddleware ,  uploadHandler)


app.get('/api/displayProduct' , displayProduct);


app.get('/api/myProduct' , authMiddleware ,  myProduct);


app.post('/signup' , validateSignUp , userSignUp);


app.post('/login' , validateLogin , userLogin);


app.post('/forgetPassword' , forgetPassword);




app.listen(PORT , (req,res)=>{
    console.log(`Server started at ${PORT}`);
})