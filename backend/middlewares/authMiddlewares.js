const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const requiredSignin =asyncHandler(async(req,res,next)=>{
     let token;
    //   check the token from request
     if( req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')){
                // get token from the request
                token = req.headers.authorization.split(" ")[1];
                // verify token 
                // const decoded =  jwt.verify(token,process.env.JWT_SECRET);
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if(!decoded) return next(new ErrorResponse('Not Valid Token',401));
                //  get user from the request
                req.user = await User.findById(decoded.id).select("-password");
                next();
        }else{
            return next(new ErrorResponse('Not Authorized',401));
        }
})

module.exports = requiredSignin;