const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const protect=async(req,res,next)=>{
    const token=req.headers.authorization;
    console.log('token >> ',token)
    if(!token){
        return res.json({success:false,message:'not authorized'})
    }
    try{
        const userId=jwt.decode(token,process.env.JWT_SECRET);
        if(!userId){
            return res.json({success:false,message:'not authorized'})
        }
        req.user=await UserModel.findById(userId).select("-password")
        next();
    }catch(error){
        console.log(error.message)
        return res.json({success:false,message:'not authorized'})
    }
}

module.exports=protect