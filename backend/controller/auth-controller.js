// import { connectDB } from './db.js';
import User from "../models/UserSchema.js";
import bodyParser from "body-parser";
import { sendMail } from "./mail-controller.js";




// ------------------------------
//     Home Page (GET)
// ------------------------------


        const GetHome = (req, res) => {
        res.send("Home");
        };


// ------------------------------
//     UserDetails (GET)
// ------------------------------


        const userDetails = async (req, res) => {
        try {
            const userData = req.user;
            res.status(200).json({ userData });
        } catch (error) {
            console.log(`Error from the user route , ${error}`);
        }
        };


// ------------------------------
//     Signup controller (POST)
// ------------------------------


        const userSignUp = async (req, res) => {
        const { name, mobile, email, gender, password, confirmPassword } = req.body;

        // let userData = new User({
        //     name,
        //     hashPassword,
        //     // confirmPassword
        // });

        // const existingUser = await User.findOne({email});
        // if(existingUser) res.status(403).json({msg : "User exists already"});
        // else{
        // const token = await userData.generateAuthToken();
        // console.log("The token part is : " , token);

        // res.cookie("jwt" , token , {
        //     expires: new Date(Date.now() + 100000),
        //     httpOnly:true
        //     // secure : true    // (this is for https only - when we deploy our project)
        // });

        // const salt = 10;
        // const hashPassword = await bcrypt.hash(password , salt);
        // const hashConfirmPassword = await bcrypt.hash(confirmPassword , salt);

        let userData = new User({
            name,
            mobile,
            email,
            gender,
            password,
            confirmPassword,
        });

        // controller go on to schema.js and there is a pre function (middleware) , which encrypts the password and confirmPassword and modifies the original password and hashPassword.....

        await userData
            .save()
            .then(async () => {
            // console.log(userData);

            // by this below line , we are sending the token to the frontend user....with status code and message...
            // await sendMail();
            res
                .status(201)
                .json({
                message: "User created Successfully",
                token: await userData.generateAuthToken(),
                userId: userData._id,
                });
            })
            .catch((err) => {
            console.log("Error : ", err);
            res.status(500).send("Internal Server Error");
            });
        };


// -------------------------------
//      Login controller (POST) 
// -------------------------------


        const userLogin = async function (req, res) {
            const { email, password } = req.body;
            try {
                const existingUser = await User.findOne({ email, password });
                // console.log(existingUser);
                if (!existingUser) {
                res.status(400).json({ message: "Invailid Credentials" });
                } else {
                res
                    .status(200)
                    .json({
                    message: "login successful",
                    token: await existingUser.generateAuthToken(),
                    userId: existingUser._id,
                    });
                }
            } catch (err) {
                console.log("Error : ", err);
                res.status(500).json({ message: "Internal Server Error" });
            }
        };


// -----------------------------
//      Forget Password (POST)
// -----------------------------


        const forgetPassword = async function (req, res) {
            // console.log("Request body : " , req.body);
            const { email, password, confirmPassword } = req.body;

            const existingUser = await User.findOne({ email });

            // console.log("Data from backend : " , existingUser);
            if (existingUser) {
                // if(existingUser.password === confirmPassword){
                //     res.status(422).json({error: 'New password must be different from the old password'});
                // }

                existingUser.password = password;
                await existingUser.save();
                res.status(200).json({ msg: "Password changed successfully" });
            } else {
                res.status(404).json({ msg: "User not found" });
            }
        };


// ---------------------------
//      Update User Details 
// ---------------------------


        const updateUserDetails = async function (req,res){
            try {
                const { name, mobile } = req.body;
                const user = req.user;
                user.name = name;
                user.mobile = mobile;
                await user.save();
                res.status(200).json({message : "User Data Updated Successfully"});
            } catch (error) {
                console.log(error);
                res.status(400).json({message : "Error "})
            }
        }



export { GetHome, userDetails, userSignUp, userLogin, forgetPassword, updateUserDetails};
