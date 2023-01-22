import mongoose from "mongoose"
import { postModel } from "./post.model.js"

const {Schema, model}=mongoose

const categorySchema=new Schema({
        nombre:{
            type:String,
            required:[true,"El campo nombre es obligatorio"]
        }
    }
)

categorySchema.pre('deleteOne', {document: true},async function() {
    await postModel.deleteMany({category:this._id.toString()})
})

export const categoryModel=model("category", categorySchema)