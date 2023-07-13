const ErrorHander=require("../utils/errorhandler");

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.message=err.message||"Internal Server Error";

//monogodb id error
if(err.name==="TypeError"){
    const message=`Resource not found.Invalid : ${err.path}`;
    err=new ErrorHander(message,400);
}

//mongodb duplicate key error
if(err.code===11000){
    const message=`Duplicate ${Object.keys(err.keyValue)} entered`;
    err=new ErrorHander(message,400);
}

//JWT error
if(err.name==="JsonWebTokenError"){
    const message=`Json web token is expired , try agian`;
    err=new ErrorHander(message,400);
}

//JWT expire error
if(err.name==="TokenExpireError"){
    const message=`Json web token is invalid , try agian`;
    err=new ErrorHander(message,400);
}

    res.status(err.statusCode).json({
        success:false,
        message:err.message   
    });
};
