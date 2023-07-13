const express= require("express");
const app=express();
const cookieParser= require("cookie-parser");
const errorMiddleware=require("./middleware/error");
const cors = require('cors');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");


const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));




app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Route Imports
const product=require("./routes/productRoute");
const user=require("./routes/userRoute");
const order=require("./routes/orderRoute");


app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);


//Middleware for errors
app.use(errorMiddleware);

module.exports=app;