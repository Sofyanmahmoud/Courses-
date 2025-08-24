const {validationResult}=require("express-validator");
const Course = require("../models/course.model")
const httpsatutstxt=require("../utils/httpstautstxt");
const asyncWrapper = require("../validator/asyncWrapper");
const {createAppError}=require("../utils/appError")
const GetAllCourses =asyncWrapper(async(req,res)=>{
    const query=req.query
     const limit = Number(query.limit) || 10;  // ✅ cast to number
    const page = Number(query.page) || 1;
    const skip=(page-1)*limit

    const courses= await Course.find({},{"__v":false}).limit(limit).skip(skip);
    res.json({status:httpsatutstxt.SUCCESS,data:{courses}})
})


const GetCourse=asyncWrapper(
    async(req,res,next)=>{
  
      const course= await Course.findById(req.params.courseId)
  if (!course){
    const error=createAppError("Course not found",404,httpsatutstxt.FAIL)
     return next(error)
  }
  return res.json({status:httpsatutstxt.SUCCESS,data:{course}})
  }
)
  
  


const CreateCourse=asyncWrapper(async(req,res,next)=>{
{
     const errors =validationResult(req);
     if (!errors.isEmpty()){
        const error=createAppError(errors.array(),400,httpsatutstxt.FAIL)
        return next(error)
     }
     const newCourse =new Course(req.body)
     await newCourse.save()
     res.status(201).json({status:httpsatutstxt.SUCCESS,data:{course:newCourse}})
}
})



const UpdateCourse=asyncWrapper(async(req,res)=>{
        const courseId= req.params.courseId
        const updatedCourse=await Course.findByIdAndUpdate(courseId,{$set:{...req.body}})
        res.status(200).json({status:httpsatutstxt.SUCCESS,data:{Course:updatedCourse}})
    })




const DeleteCourse=asyncWrapper(async(req,res)=>{
   await Course.deleteOne({_id: req.params.courseId})
  res.status(200).json({success:httpsatutstxt.SUCCESS,data:null})
})


module.exports={
    GetAllCourses,
    GetCourse,
    CreateCourse,
    UpdateCourse,
    DeleteCourse
}