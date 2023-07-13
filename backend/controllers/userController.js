const User=require("../models/userModel");
const ErrorHander = require("../utils/errorhandler");
const catchAsyncError=require("../middleware/catchAsyncError");
const sendToken=require("../utils/jwttokens");
const sendEmail=require("../utils/sendemail");
const crypto=require("crypto");
const cloudinary = require("cloudinary");

//Register our user
exports.registerUSer=catchAsyncError( async (req,res,next)=>{
  const imgPath="backend/config/default-avatar.png"
  try{
  const myCloud = await cloudinary.v2.uploader.upload(imgPath, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
    const {name,email,password}=req.body;
    const user=await User.create({
        name,email,password,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
    });

    sendToken(user,201,res);
  }
  catch(error){
    console.log(error)
  }
});


//Login User
exports.loginUser=catchAsyncError(async (req,res,next)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return next(new ErrorHander("Please enter credentials",400));
    }
    const user=await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHander("Please enter correct credentials",401));
    }

    const isAuthenticated=await user.comparePassword(password);
    if(!isAuthenticated){
        return next(new ErrorHander("Please enter correct credentials",401));
    }

    sendToken(user,200,res);
})


//Logout user
exports.logoutUser=catchAsyncError( async (req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });
    res.status(200).json({
        success:true,
        message:"Logged out"
    })
});


//Forget password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new ErrorHander("User not found", 404));
    }
  
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
  
    const getResetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
  
    const message = `Your password reset token is:\n\n${getResetPasswordUrl}\n\nIf you have not requested this mail then please ignore it.`;
  
    try {
      await sendEmail({
        email: req.body.email,
        subject: "Bountiful Pastures Password Recovery",
        message,
      });
      res.status(200).json({
        success: true,
        message: "Email sent to user's email",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new ErrorHander(error.message, 500));
    }
  });

  //Reset Password
  exports.resetPassword=catchAsyncError(async (req,res,next)=>{


    //creating token hash
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");


    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    });

    if(!user){
        return next(new ErrorHander("Reset password token is invalid or has been expired",400));
    }

    if(req.body.password!=req.body.confirmPassword){
        return next(new ErrorHander("Password mismatched",400));
    }

    user.password=req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200,res);
  });



  //Get user details
  exports.getUserDetails=catchAsyncError( async (req,res,next)=>{
    const user= await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
  })


  //Update password
  exports.updateUserPassword=catchAsyncError( async (req,res,next)=>{
    const user= await User.findById(req.user.id).select("+password");

    const isAuthenticated=await user.comparePassword(req.body.oldPassword);
    if(!isAuthenticated){
        return next(new ErrorHander("Old password is incorrect",400));
    }

    if(req.body.newPassword!=req.body.confirmPassword){
        return next(new ErrorHander("Password Mismatched",400));
    }

    user.password=req.body.newPassword;

    await user.save();

    sendToken(user,200,res);
  })


  //Update user profile
  exports.updateUserProfile=catchAsyncError( async (req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email
    }

    if (req.body.avatar !== req.user.avatar.url) {
      const userr = await User.findById(req.user.id);
  
      const imageId = userr.avatar.public_id;
  
      await cloudinary.v2.uploader.destroy(imageId);
  
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
  
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      }
    };

    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
    })
    res.status(200).json({
        success:true,
    })
  })

  //Get all users by admin
  exports.getAllUser=catchAsyncError(async (req,res,next)=>{
    const users=await User.find();

    res.status(200).json({
        success:true,
        users
    });
  });

  //Get single user by admin
  exports.getSingleUser=catchAsyncError(async (req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHander("User not found",400));
    }

    res.status(200).json({
        success:true,
        user
    });
  });


    //Update user profile by admin
    exports.updateUserProfileByAdmin=catchAsyncError( async (req,res,next)=>{
        const newUserData={
            name:req.body.name,
            email:req.body.email,
            role:req.body.role
        }
    
        const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
            new:true,
            runValidators:true,
        })
        res.status(200).json({
            success:true,
        })
      })

        //Delete user profile by admin
  exports.deleteUserProfile=catchAsyncError( async (req,res,next)=>{

    //we will remove cloudinary


    const user=await User.findById(req.params.id);


    if(!user){
        return next(new ErrorHander("User not found",400));
    }

    await user.deleteOne();
    res.status(200).json({
        success:true,
    })
  })