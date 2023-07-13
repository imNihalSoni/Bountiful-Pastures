const Order=require("../models/orderModel");
const Product=require("../models/productModel");
const ErrorHander = require("../utils/errorhandler");
const catchAsyncError=require("../middleware/catchAsyncError");


//Create New Order
exports.createOrder=catchAsyncError(async (req,res,next)=>{
    const {shippingInfo
        ,orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    }=req.body;

    const order= await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    });

    res.status(201).json({
        success:true,
        order
    })
})


//Get Single Order
exports.getSingleOrder=catchAsyncError(async (req,res,next)=>{
    const order=await Order.findById(req.params.id).populate("user","name email");
    if(!order){
        return next(new ErrorHander("Order not found with this id",404));
    }

    res.status(200).json({
        success:true,
        order
    })

})


//Get loggedin user order
exports.myOrders=catchAsyncError(async (req,res,next)=>{
    const orders=await Order.find({user:req.user._id});

    res.status(200).json({
        success:true,
        orders
    })

})


//Get all order by admin
exports.getAllOrders=catchAsyncError(async (req,res,next)=>{
    const orders=await Order.find();

    let totalAmount=0;
    orders.forEach((order)=>{
        totalAmount+=order.totalPrice;
    });
    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })

});

//update order status by admin
exports.updateOrder =catchAsyncError(async (req,res,next)=>{
    const order=await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHander("Order not found with this id",404));
    }

    if(order.orderStatus==="Delivered"){
        return next(new ErrorHander("Order delivered",400));
    }

    order.orderItems.forEach(async (order)=>{
        await updateStock(order.product,order.quantity);
    });
    order.orderStatus=req.body.status;

    if(req.body.status==="Delivered"){
        order.deliveredAt=Date.now();
    }

    await order.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
    })

});

async function updateStock(id,quantity){
    const product=await Product.findById(id);

    product.stock-=quantity;
    await product.save({validateBeforeSave:false});
}



//Delete order 
exports.deleteOrder=catchAsyncError(async (req,res,next)=>{
    const order=await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHander("Order not found with this id",404));
    }

    await order.deleteOne();

    res.status(200).json({
        success:true,
    })

});