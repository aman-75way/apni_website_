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
import { displayProduct } from './controller/displayProduct-controller.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: "*",
}

app.use(cors(corsOptions));

const PORT = 4000;

connectDB();


// const accountSid = 'AC94ebeb0fb991e18d794ecc92ae6691ea';
// const authToken = 'abcec0e7b55a3b242096da597e81e9f4';

// const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create({
//     body: 'Hello from twilio-node',
//     to: '+919754234746', // Text your number
//     from: '+12345678901', // From a valid Twilio number
//   })
//   .then((message) => console.log(message.sid));















app.get('/sendmail' , sendMail)


app.get('/' , GetHome);


app.get('/userDetails' , authMiddleware , userDetails)


app.post('/api/upload'  , upload.single("images") , uploadHandler)


app.get('/api/displayProduct' , displayProduct);


app.post('/signup' , sendMail, userSignUp);


app.post('/login' , userLogin);


app.post('/forgetPassword' , forgetPassword);


app.listen(PORT , (req,res)=>{
    console.log(`Server started at ${PORT}`);
})