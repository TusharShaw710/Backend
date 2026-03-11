
const jwt=require("jsonwebtoken");

async function tokenVerify(req,res,next){
    let token=req.cookies.token;
    let decoded=null;
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET);
    }catch(err){
        res.status(401).json({
        error:"Token is not authentic."
        })
    }

    req.user=decoded;

    next();
}

module.exports=tokenVerify;