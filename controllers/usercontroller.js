const asyncWrapper= require("../validator/asyncWrapper")
const user=require("../models/user.model")
const httpsatutstxt=require("../utils/httpstautstxt")
const {createAppError}=require("../utils/appError")
const bcrypt=require("bcrypt")
const jwt = require('jsonwebtoken');
const generateJWT = require("../utils/generateJWT")
const userRoles = require("../utils/userRoles")

const getAllUsers=asyncWrapper(async(req,res)=>{
    // console.log(req.headers);
    
    
    const query=req.query
    const limit=query.limit ||10;
    const page=query.page||1;
    const skip=(page-1)*limit

    const Users = await user.find({}, {"__v": 0, 'Password': 0}).limit(limit).skip(skip);
    
    res.json({status:httpsatutstxt.SUCCESS,data:{Users}})
})
const register=asyncWrapper(async(req,res,next)=>{
    const{firstName,LastName,email,Password,role} = req.body;
    
    const oldUser=await user.findOne({email:email})
    
    if (oldUser){
    const Error=createAppError("User already exists",400,httpsatutstxt.FAIL)
         return next(Error)
   }
   const hashedPassword = await bcrypt.hash(Password,7)


    const newUser =new user({
    firstName,
    LastName,
    email,
    Password:hashedPassword,
    role,
    avatar:req.file.filename
})
// generate JWT token
const token = await generateJWT({email:newUser.email , id : newUser._id,role:newUser.role})
newUser.token=token

await newUser.save();
res.status(201).json({status:httpsatutstxt.SUCCESS,data:{user:newUser}})

})
const login = asyncWrapper(async (req, res, next) => {
    const { email, Password } = req.body;

if (!email || !Password) {
const Error = createAppError("email and password are required", 400, httpsatutstxt.FAIL);
     return next(Error);
}

const user1 = await user.findOne({ email: email });
if (!user1) {
    const Error = createAppError("User not found", 404, httpsatutstxt.FAIL);
        return next(Error);
    }

const matchedPassword = await bcrypt.compare(Password, user1.Password);

if (user1 && matchedPassword) {
    const token = await generateJWT({email:user1.email , id : user1._id,role:user1.role})    
    return res.json({ status: httpsatutstxt.SUCCESS, data: { token } });
} else {
     const Error = createAppError("Wrong email or password", 401, httpsatutstxt.FAIL);
        return next(Error);
    }
});

    
module.exports={
    getAllUsers,
    register,
    login
}