const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// generate token to response
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}
// @desc Register a new User
// @Routes /api/users/
//  @access /Public
//  @action POST method
const registerUser=asyncHandler(async(req,res,next)=>{
    // destructure the request body
    const {username,email,password} = req.body;
    // validation
    if(!username || ! email || ! password){
        return next(new ErrorResponse("Please fill all the fields",400));
    }
    // check user exist or not with given email
    const existingUser = await User.findOne({email});
    if(existingUser)return next(new ErrorResponse(`User already exist with given email : ${email}`,400));

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);
    //  create new user
    const user = await User.create({
        username,
        email,
        password:hashPassword,
    });

    if(user){
        res.status(201).json({
            _id:user._id,
            username:user.username,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
       return next(new ErrorResponse('Invalid User data',400))
    }
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
    getProfileMe

}