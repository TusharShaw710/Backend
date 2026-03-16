const jwt=require("jsonwebtoken");

async function identifyToken(req,res,next) {
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"You have to first login!"
        })
    }
    const isTokenBlackListed=await blackListModel.findOne({
        token:token
    });
    
    if(isTokenBlackListed){
        return res.status(403).json({
            message:"Token has expired"
        })
    }

    let decoded;

    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET);
    }catch(err){
        res.status(401).json({
            error:"Token is not authentic!"
        })
    }

    req.user=decoded;

    next();
    
}

module.exports=identifyToken;