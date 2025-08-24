
const express=require('express')
const router =express.Router();
const coursesController=require('../controllers/courses.controllers')
const {validationSchema} =require("../validator/validationSchema")
const verifyToken=require("../validator/verifyToken");
const userRoles = require('../utils/userRoles');
const allowedTo=require("../validator/allowedTo")
router.route("/")
    .get(coursesController.GetAllCourses)
    .post(verifyToken,coursesController.CreateCourse,validationSchema())

router.route("/:courseId")
    .get(coursesController.GetCourse)
    .patch(coursesController.UpdateCourse)
    .delete(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANAGER) ,coursesController.DeleteCourse)


module.exports= router;
