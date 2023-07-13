const mongoose=require("mongoose");

const productSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter name of the product"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Description is missing!"]
    },
    price:{
        type:Number,
        required:[true ,"Enter the price of product!"],
        maxLength:[8, "Price can not be greater than 8 figures"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }],
    category:{
        type:String,
        required:[true, "Enter category"]
    },
    stock:{
        type:Number,
        required:[true, "Enter stock value"],
        maxLength:[4,"Stock cannot exceed 4 characters"],
        default:1
    },
    numberOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model("Product",productSchema);