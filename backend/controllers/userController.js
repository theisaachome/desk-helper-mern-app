const asyncHandler = require("express-async-handler");

// @desc Register a new User
// @Routes /api/users/
//  @access /Public
//  @action POST method
const registerUser=asyncHandler(async(req,res,next)=>{
    // destructure the request body
    const {username,email,password} = req.body;
    // validation
    
});



// @desc login with email User
// @Routes /api/users/
//  @access /Public
//  @action POST method
const loginUser = asyncHandler(async(req,res,next)=>{})

// @desc get current logined User profile
// @Routes /api/users/
//  @access Private
//  @action GET method
const getProfileMe = asyncHandler(async(req,res,next)=>{

})
module.exports ={
    registerUser,
    loginUser,

}