import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
     
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    active:{
        type:Boolean,
        default:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:""
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    token:{
        type:String,
        default:""
    }
})

const UserModel=mongoose.model("UserModel",userSchema)

export default UserModel