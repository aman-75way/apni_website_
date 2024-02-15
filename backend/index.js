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
import { dataUpload } from './middleware/product-middleware.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: "*",
}

app.use(cors(corsOptions));

const PORT = 4000;

connectDB();



app.get('/sendmail' , sendMail)


app.get('/' , GetHome);


app.get('/userDetails' , authMiddleware , userDetails)


app.post('/api/upload'  , upload.single("images") , uploadHandler)


app.post('/signup' , sendMail, userSignUp);


app.post('/login' , userLogin);


app.post('/forgetPassword' , forgetPassword);


app.listen(PORT , (req,res)=>{
    console.log(`Server started at ${PORT}`);
})