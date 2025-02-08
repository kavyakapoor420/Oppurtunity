import ProfileModel from "../Models/ProfileModel";
import UserModel from "../Models/UserModel";


export const uploadProfilePicture=async(req,res)=>{

    const {token}=req.body ;

    try{
      const user=await UserModel.findOne({token:token})
      if(!user){
        return res.status(404).json({message:'user not found'})
      }
      user.profilePicture=req.file.filename 
      await user.save()

      return res.json({message:'profile picture updated'})
    }catch(err){
      return res.status(500).json({message:err.message})
    }
}

export const updateUserProfile=async(req,res)=>{
    try{
      const {token,...newUserData}=req.body ;

      const user=await UserModel.findOne({token:token})
      if(!user){
        return res.status(404).json({message:'user not found'})
      }
      const {username,email}=newUserData

      const existinguser=await UserModel.findOne({$or:[{username},{email}]})

      if(existinguser ){
        if(existinguser && existinguser._id.toString() !== user._id.toString()){
            return res.status(400).json({message:'user already exists'})
        }     
      }
      Object.assign(user,newUserData)

      await user.save() 

      return res.json({message:'user updated'})

    }catch(err){
     return res.status(500).json({message:err.message})
    }
}

export const getUserAndProfile=async(req,res)=>{
    
    try{
        const {token}=req.body ;
        
        const user=await UserModel.findOne({token:token})

        if(!user){
            return res.status(404).json({message:'user not found'})
        }
        const userProfile=await ProfileModel.findOne({userId:user._id}).populate('userId','userName email profilePicture')
        
        return res.json(userProfile)
    }catch(err){
         return res.status(500).json({message:err.message})
    }
}

export const updateProfileData=async(req,res)=>{
    try{
         const {token,...newProfileData}=req.body ;

         const userProfile=await UserModel.findOne({token:token})
         if(!userProfile){
            return res.status(404).json({message:"User not found"})
         }
         const profile_to_update=await ProfileModel.findOne({userId:userProfile._id})

         Object.assign(profile_to_update,newProfileData)
         
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}