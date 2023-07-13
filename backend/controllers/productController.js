const Product=require("../models/productModel");
const ErrorHander = require("../utils/errorhandler");
const catchAsyncError=require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");

//Create Product
exports.createProduct=catchAsyncError(async (req,res,next)=>{

    req.body.user=req.user.id;
    const product=await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    });
});

//Get all products
module.exports.getAllProducts=catchAsyncError(async (req,res)=>{

    const resultPerPage=9;
    const productCount=await Product.countDocuments();
    const apiFeatures=new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products=await apiFeatures.query;

    res.status(201).json({
        success:true,
        products,
        productCount
    });
});

//Update Product
exports.updateProduct=catchAsyncError(async (req,res,next)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("Did not find product",404));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
    })
    res.status(200).json({
        success:true,
        product
    });
});

//Delete Product
exports.deleteProduct=catchAsyncError(async (req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("Did not find product",404));
    }
    await product.deleteOne();


    res.status(200).json({
        success:true,
        message:"Product deleted"
    });
});

//Create or update review
exports.createProductReview=catchAsyncError( async (req,res,next)=>{
    const {rating,comment,productId}=req.body;
    console.log(req.user);
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    };

    const product =await Product.findById(productId);


    const isReviewed=product.reviews.find(rev=>rev.user.toString()===req.user._id.toString());

    if(isReviewed){
        product.reviews.forEach((rev)=>{
            rev.rating=rating,
            rev.comment=comment
        })
    }
    else{
        product.reviews.push(review);
        product.numberOfReviews=product.reviews.length
    }
    let t=0;
    product.reviews.forEach((rev)=>{
        t+=rev.rating
    })
    product.ratings=t/product.reviews.length;

    //console.log(product.ratings);
    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true
    })
});



//Get single product details
exports.getProductDetails=catchAsyncError(async (req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("Did not find product",404));
    }

    res.status(200).json({
        success:true,
        product
    });
});


//Get all reviews of a single product
exports.getSingleReview=catchAsyncError(async (req,res,next)=>{
    const product=await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHander("Produt not found",404));
    }

    res.status(200).json({
        success:true,
        reviews:product.reviews
    });
  });

  //Delete review
  exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
      return next(new ErrorHander("Product not found", 400));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.reviewId.toString()
    );
  
    let t = 0;
    reviews.forEach((rev) => {
      t += rev.rating;
    });
    
    let ratings = 0;
    let numberOfReviews = 0;
    
    if (reviews.length !== 0) {
      ratings = t / reviews.length;
      numberOfReviews = reviews.length;
    }
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      { reviews, ratings, numberOfReviews },
      {
        new: true,
        runValidators: true,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });
  