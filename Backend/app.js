//Opportune – A place to discover career opportunities.

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app=express()

app.use(cors())
app.use(express.json())

//connect with mongoDB database
async function main(){
    await mongoose.connect(process.env.MONGO_URL)
}

main().then(()=>{
    console.log('connected to database')
}).catch((err)=>{
    console.log(err)
})

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})