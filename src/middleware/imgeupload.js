import multer from "multer"
import  {CloudinaryStorage} from "multer-storage-cloudinary"
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage =new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"products",
        allowed_formates:['jpg','png','jpeg']
    }
})

console.log("storage");


export  const upload=multer({storage:storage})


