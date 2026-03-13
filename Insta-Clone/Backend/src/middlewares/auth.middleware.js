
const jwt=require("jsonwebtoken");

async function tokenVerify(req,res,next){
    let token=req.cookies.token;
    console.log(token);
    if(!token){
        return res.status(401).json({
            error:"No token provided."
        })
    }
    let decoded=null;
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET);
    }catch(err){
        return res.status(401).json({
        error:"Token is not authentic."
        })
    }

    req.user=decoded;

    next();
}

module.exports=tokenVerify;