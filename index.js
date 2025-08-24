require('dotenv').config()
const cors = require("cors")
const express = require ("express");
const app= express();
const path=require("path")

app.use('/uploads',express.static(path.join(__dirname,'uploads')))

const mongoose =require("mongoose")
const url =process.env.mongo_url
const httpsatutstxt=require("./utils/httpstautstxt")
mongoose.connect(url).then(()=>{
    console.log("mongoose connected")
})
app.use(cors())
app.use(express.json());

const UsersRouter=require('./routes/users.route')
const CourseRouter=require('./routes/courses.route')
app.use("/api/users",UsersRouter)// /api/users
app.use('/api/courses',CourseRouter)// /api/users

// app.all('*',(req,res)=>{
//    return res.status(404).json({status:httpsatutstxt.E,data:{course:"Course not found"}
// })})

app.use((error,req,res,next)=>{
    res.status(error.statusCode||500).json({status:error.statusText||httpsatutstxt.ERROR,message: error.message,code:error.statusCode||500,data:null})
})


app.listen(process.env.port || 5002,()=>{
    console.log("listening on port 5002")
})
