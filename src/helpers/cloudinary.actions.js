import cloudinary from "./cloudinary.js";
import {deleteImg} from "./deleteImg.js"

export const subirImageCloudinary=async(file)=>{
    try {
        const {secure_url,public_id}=await cloudinary.uploader.upload(file.path)

        deleteImg(file.filename)

        return{
            secure_url,
            public_id,
        }
    } catch (error) {
        console.log("error al subirImageCloudinary. :(",error.message)
    }
}

export const eliminarImageCloudinary=async(public_id)=>{
    try {
        await cloudinary.uploader.destroy(public_id)
    } catch (error) {
        console.log("error al eliminarImageCloudinary. :(",error.message)
    }
}
