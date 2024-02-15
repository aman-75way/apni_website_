import jwt from 'jsonwebtoken';
import User from '../models/UserSchema.js';

const authMiddleware = async(req ,res , next) => {
    const tokenHeader = req.header("Authorization");
    
    console.log("token Header " , tokenHeader);
    if(!tokenHeader){
        return res.status(401).json({
            message : 'Unauthorized HTTP , token not provided'
        });
    }

    const jwtToken = tokenHeader.replace("Bearer", "").trim();

    try {
        const dataFromToken = jwt.verify(jwtToken , process.env.SECRET_KEY);
        
        const userId = dataFromToken._id;

        const completeDataFromDatabase = await User.findOne({_id : userId});

        req.user = completeDataFromDatabase;
        req.token = jwtToken;

        next();
    } catch (error) {
        console.log("Error is : " , error);
    }

};

export {authMiddleware};