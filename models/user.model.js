const mongoose=require('mongoose')
const validator=require("validator")
const userRoles=require("../utils/userRoles")


const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    LastName:{
        type:String,
        required:true,

    },
    email: {
        type:String,
        required:true,
        unique:true,
        validate: [validator.isEmail,"filed must be a valid email"]
    },
     Password:{
        type:String,
        required:true,

     },
     token:{
        type:String
     },
     role:{
        type:String,
        enum:[userRoles.ADMIN,userRoles.USER,userRoles.MANAGER],
        default:userRoles.USER
     },
     avatar:{
        type:String,
        default:"uploads/BATMAN.jpeg"

     }
})

module.exports=mongoose.model("user",userSchema)