const jwt = require('jsonwebtoken')
const httpsatutstxt=require("../utils/httpstautstxt")
const {createAppError}=require("../utils/appError")


const verifyToken= (req,res,next)=>{
 const authHeader= req.headers['Authorization'] || req.headers['authorization']
if(!authHeader){
     const Error=createAppError("token is required",401,httpsatutstxt.ERROR)
    return next(Error)
  
}
 const token = authHeader.split(' ')[1];
try{

    const currentUser= jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.currentUser=currentUser
    next();
}
 catch(err){
    const Error=createAppError("invalid token",401,httpsatutstxt.ERROR)
    return next(Error)
  
 }
}
module.exports= verifyToken;