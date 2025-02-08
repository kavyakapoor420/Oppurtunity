import mongoose from 'mongoose'

const connectionSchema=new mongoose.Schema({
 
    //who is sending the request
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel"
    },
    //who is receiving the request
    connectionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel"
    },
    status_accepted:{
        type:Boolean,
        default:null
   }
})