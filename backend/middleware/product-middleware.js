
export const dataUpload = async(req , res , next)=>{
    const {title , price , images} = req.body;
    console.log("Title : " , title);
    // console.log("Middleware : " , req.body);
    next();
}