import  {v2 as Cloudinary} from 'cloudinary'; 


// {

Cloudinary.config({
    cloud_name : "dcetdunwj",
    api_key: "912326934368821",
    api_secret: "1WESWiil6ouE50suIJN55IZd8Ec"
});

// const image = './uploads/4.4.png';

/* Function to upload image to cloudinary*/


export const uploadImage = async(image) =>{
    try {
        const result = await Cloudinary.uploader.upload(image);
        // console.log(result);
        return result.secure_url;
    } catch (error) {
        console.log("Error in back-end is : " , error);
    }
}

// uploadImage(image);


// }