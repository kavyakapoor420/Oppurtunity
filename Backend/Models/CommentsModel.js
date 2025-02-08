import mongoose from 'mongoose'

const commentSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel"
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"PostModel"
    },
    body:{
        type:String,
        required:true
    }

})

const CommentModel=mongoose.model("CommentModel",commentSchema)

export default CommentModel