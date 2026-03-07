const userModel=require("../models/user.model");
// const crypto=require("crypto");//low level security package
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");



async function registerController(req,res){
    let {username,email,password,bio,profileImage}=req.body;

    let isUserExists=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    });

    if(isUserExists){
        return res.status(409).json({
            message:"User Already Exists" + (isUserExists.email == email ? " | Email ALready exists":" | Username Already Exists")
        })
    };

    let hash=await bcrypt.hash(password,10);//10-salting-->Level of hashing!
    let user=await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profileImage
    });

    let token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"1d"});

    res.cookie("token",token);


    res.status(201).json({
        message:"User is Registered",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    });
}

async function loginController(req,res){
    let {username,email,password}=req.body;

    let user=await userModel.findOne({
        $or: [
            {
                username:username
            },
            {
                email:email
            }
        ]
    });

    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }

    let isPassword=await bcrypt.compare(password,user.password);

    if(!isPassword){
        return res.status(401).json({
            message:"Incorrect Password"
        })
    };

    let token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"1d"});

    res.cookie("token",token);

    res.status(200).json({
        message:"User has Logged In",
    });

}

module.exports={
    registerController,loginController
}