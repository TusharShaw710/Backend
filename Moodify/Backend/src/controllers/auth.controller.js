const userModel = require("../models/user.model.js");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const blackListModel=require("../models/blacklist.model.js")


async function registerController(req,res) {
    const {username,email,password}=req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message:"Invalid Inputs"
        })
    }

    let user=await userModel.findOne({
        $or:[
            {
                username:username
            },
            {
                email:email
            }
        ]
    });


    if(user){
        return res.status(409).json({
            message:"User with these credentials already exists"
        })
    }
    let hash=await bcrypt.hash(password,10);

    

    let registerUser=await userModel.create({
        username,email,password:hash
    });

    let token=jwt.sign({
        username:username,
        id:registerUser._id
    },process.env.JWT_SECRET,{expiresIn:"1d"});

    res.cookie("token",token);

    res.status(201).json({
        message:"You are registered",
        user:registerUser
    })

}

async function loginController(req,res) {
    const {username,email,password}=req.body;

    if(!username && !email){
        return res.status(400).json({
            message:"Please provide email or username for login"
        })
    }

    let user=await userModel.findOne({
        $or:[
            {
                username:username
            },
            {
                email:email
            }
        ]
    }).select("+password");

    if(!user){
        return res.status(404).json({
            message:"No user exists with these credentials"
        })
    }

    try{
        let isPassWordMatched=await bcrypt.compare(password,user.password);

        if(!isPassWordMatched){
            return res.status(401).json({
                message:"Incorrect Password"
            })
        }
    }catch(err){
        console.log(err);
    }



    let token=jwt.sign({
        username:user.username,
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"1d"});

    res.cookie("token",token);

    res.status(201).json({
        message:"User has logged in",
        user:{
            username:user.username,
            email:user.email
        }
    });
    
}

async function getMecontroller(req,res){
    let {username,id}=req.user;
    const token=req.cookies.token;

    const user=await userModel.findOne({
        username:username
    });

    res.status(200).json({
        message:"Your accounts details",
        user:user
    });

}

async function logoutController(req,res) {
    const token=req.cookies.token;

    if(!token){
        return res.status(400).json({
            message:"You have to first login"
        })
    }

    await blackListModel.create({
        token:token
    });

    res.clearCookie("token");

    res.status(200).json({
        message:"Yoh have logout successfully"
    })
    
}

module.exports={
    registerController,
    loginController,
    getMecontroller,
    logoutController
};