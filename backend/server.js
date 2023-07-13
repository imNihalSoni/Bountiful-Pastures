const { log } = require("console");
const app= require("./app");
const dotenv=require("dotenv");
const connectDatabase=require("./config/database");
const cloudinary = require("cloudinary");


//Uncaught exception handling
process.on("uncaughtException",err=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught exception");
    server.close(()=>{
        process.exit(1);
    });
})



//config
dotenv.config({path:"backend/config/config.env"})


//connecting to database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const server=app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejections
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.stack}`);
    console.log("Shutting down the server due to unhandled promise rejections");
    server.close(()=>{
        process.exit(1);
    });
})