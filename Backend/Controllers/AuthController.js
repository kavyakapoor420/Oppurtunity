import ProfileModel from "../Models/ProfileModel";
import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt'
import crypto from 'crypto'

export const register=async(req,res)=>{

   try{
      const {userName,email,password}=req.body ;
      if(!userName || !email || !password){
        return res.status(400).json({message:'all fields are required'})
      }
      const existinguser=await UserModel.findOne({email})
      if(existinguser){
        return res.status(400).json({message:'user already exists with given email'})
      }
      const hashPass=await bcrypt.hash(password,10)
      const newUser=new UserModel({
        userName,email,password:hashPass
      })
      await newUser.save() 
      const profile=new ProfileModel({userId:newUser._id})
      await profile.save() 

      return res.json({message:'new user created successfully'})

   }catch(err){
      return res.status(500).json({message:err.message})
   }
}


export const login=async(req,res)=>{
    try{
        const {email,password}=req.body ;
        if(!email || !password){
            return res.status(400).json({message:'all fields are required'})
        }
        const user=await UserModel.findOne({email})
        if(!user){
            return res.status(404).json({message:'user does not exist with this email'})
        }
        const isMatchPass=await bcrypt.compare(password,user.password)

        const tokenGenerate=crypto.randomBytes(32).toString('hex')

        await UserModel.updateOne({_id:user._id},{token})

        return res.json({token})

    }catch(err){
        return res.status(500).json({message:err.message})
    }
}