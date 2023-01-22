import { eliminarImageCloudinary, subirImageCloudinary } from "../helpers/cloudinary.actions.js"
import { deleteImg } from "../helpers/deleteImg.js"
import { response } from "../helpers/Response.js"
import { postModel } from "../models/post.model.js"

const postCtrl={}

// Listar post
postCtrl.list=async(req,reply)=>{
    try {
        const posts=await postModel.find()
        response(reply,200,true,posts,"Lista de posts")        
        
    } catch (error) {
        response(reply,500,false,"",error.message)        
    }
}

// Listar post por ID
postCtrl.listOne=async(req,reply)=>{
    try {
        const{id}=req.params
        const post=await postModel.findById(id)
        
        if(!post){
            return response(reply,404,false,"","Post no encontrado. :(")
        }
        response(reply,200,true,post,"Post encontrado. :)")        
        
    } catch (error) {
        response(reply,500,false,"",error.message)        
    }
}

// Crear post
postCtrl.add=async(req,reply)=>{
    try {
        const {title,description, category}=req.body
        const newPost= new postModel({
            title,
            description,
            category
        })

        // req.file && newPost.setImg(req.file.filename)

        if(req.file){
            const {secure_url,public_id}=await subirImageCloudinary(req.file);newPost.setImg({secure_url,public_id})
        }
        await postModel.create(newPost)
        response(reply,201,true,newPost,"Post creado. :)")  

    } catch (error) {
        response(reply,500,false,"",error.message)        
    }
}

// Eliminar post
postCtrl.delete=async(req,reply)=>{
    try {
        const {id}=req.params
        const post=await postModel.findById(id)

        if(!post){
            return response(reply,404,false,"","Post encontrado. :(")
        }

        // post.nameImage && deleteImg(post.nameImage)
        if(post.public_id){
            await eliminarImageCloudinary(post.public_id)
        }

        
        await post.deleteOne()

        response(reply,200,true,"","Post eliminado. :)")      

    } catch (error) {
        response(reply,500,false,"",error.message)        
    }
}

// Actualizar post
postCtrl.update=async(req,reply)=>{
    try {
        const {id}=req.params
        const post=await postModel.findById(id)

        if(!post){
            return response(reply,404,false,"","Post no encontrado. :(")
        }

        if(req.file){
            // post.nameImage && deleteImg(post.nameImage)

            if(post.public_id){
                await eliminarImageCloudinary(post.public_id)
            }
            
            const {secure_url,public_id}=await subirImageCloudinary(req.file);
            post.setImg({secure_url,public_id});
    
            await post.save()
        }
        
        await post.updateOne(req.body)

        response(reply,200,true,"","Post actualizado. :)")      

    } catch (error) {
        response(reply,500,false,"",error.message)        
    }
}

export default postCtrl