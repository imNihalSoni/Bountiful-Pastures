module.exports= newfunc=>(req,res,next)=>{
    Promise.resolve(newfunc(req,res,next)).catch(next);
};