const {body} = require("express-validator")

const validationSchema=()=>{
    return [
    body("title")
      .notEmpty()
      .isLength({min:2})
      .withMessage('Title is required'),
    body("price")
      .notEmpty()
      .withMessage('Price is required')
    ]
}
module.exports={
validationSchema
}