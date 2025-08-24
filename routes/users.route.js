const express=require('express')
const router=express.Router()
const userController=require("../controllers/usercontroller")
const verifyToken=require("../validator/verifyToken")
const multer  = require('multer')
const { createAppError } = require('../utils/appError')
const diskStorage=multer.diskStorage({
    destination: function(req,file,cb){
        console.log("file:",file);
        cb(null,"uploads")
    },
    filename:function(req,file,cb){
        const ext=file.mimetype.split("/")[1]
        const filename=`user-${Date.now()}.${ext}`
        cb(null,filename)
    }
})
const fileFilter = function(req,file,cb){
    const imageType= file.mimetype.split("/")[0]
    if (imageType==='image'){
        return cb(null,true)
    }else{
        return cb(createAppError("the file must be image",400),false)
    }
}
const upload = multer({ 
    storage: diskStorage,
    fileFilter})

router.route("/")
    .get(verifyToken,userController.getAllUsers)

router.route("/register")
    .post(upload.single("avatar"),userController.register)

router.route("/login")
    .post(userController.login)
    

module.exports= router;