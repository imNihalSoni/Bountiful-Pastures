const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt=require("bcryptjs");
const jwt =require("jsonwebtoken");
const crypto=require("crypto");


const userSchema=new mongoose.Schema({
    name:{
        type :String,
        required:[true,"Please enter name"],
        maxLength:[30,"Name cannot exceed 30 charcters"],
        minLength:[3,"Name should be greater than 3 characters"]
    },
    email:{
        type:String,
        required:[true, "Please enter email"],
        unique:true,
        validate:[validator.isEmail,"Please enter valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter pasword"],
        minLength:[8,"Password should be greater than or equal to 8 characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:false
        },
        url:{
            type:String,
            default:"",
            required:false
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password= await bcrypt.hash(this.password,10);
})

//JWT TOKEN
userSchema.methods.getJWTToken=function(){
    return jwt.sign( {id:this._id} ,process.env.SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE
    });
};

//Password AUthentication
userSchema.methods.comparePassword=async function(pass){
    return await bcrypt.compare(pass,this.password);
}


//Password Reset
userSchema.methods.getResetPasswordToken=function(){
    const resetToken=crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire=Date.now()+15*60*1000;
    return resetToken;
}

module.exports=mongoose.model("User",userSchema);
