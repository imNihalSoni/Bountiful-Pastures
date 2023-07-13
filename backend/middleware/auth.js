const ErrorHander = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt=require("jsonwebtoken");
const User=require("../models/userModel");


exports.isAuthenticatedUser=catchAsyncError(async (req,res,next)=>{
    const {token }=req.cookies;

    
    //console.log(req);
    if(!token){
        return next(new ErrorHander("Please login to access",401));
    }


    const decodedData=jwt.verify(token,process.env.SECRET_KEY);
    
    req.user=await User.findById(decodedData.id);
    //console.log(decodedData.id);
    next();
});

exports.authorizedRoles =(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHander(`Role :${req.user.role} is not allowed to acces this resource`,403));
        }
        next();
    };
}