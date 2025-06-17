const jwt=require('jsonwebtoken');

const authenticate=(req,res,next)=>{

    const token=req.cookies.jwt;

    if(!token){
        return res.status(401).json({
            success:false,
            message:"Access denied"
        })
    }
    
   try{

    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    console.log("Decoded : ",decoded);
    req.user=decoded;
    next();

   }
   catch(error){

    res.status(500).json({
        success:false,
        message:"Invalid token"
    });
   }
}

module.exports=authenticate;