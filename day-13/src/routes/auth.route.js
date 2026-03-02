const express=require("express");
const authRouter=express.Router();
const userModel=require("../model/user.model");
const jwt=require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();



authRouter.post("/register",async (req,res)=>{
    let { name,email,password }=req.body;

    let isUserAlready=await userModel.findOne({email});

    if(isUserAlready){
        return res.status(409).json({
            message:"User with this email Already exists",
        });
    }

    let hash=crypto.createHash("md5").update(password).digest("hex");
    let user=await userModel.create({
        name,email,password:hash
    });

    const token=jwt.sign({
        id:user._id,
        email:user.email
    },process.env.JWT_SECRET);

    res.cookie("jwt_token",token);

    res.status(201).json({
        message:"User Created  Successfully",
        user,token
    });
});

/*
    LOGIN-REQUEST
*/

authRouter.post("/login",async (req,res)=>{
    let { email , password }=req.body;
    let user=await userModel.findOne({email});

    if(!user){
        res.status(404).json({
            message:"This email is not registered"
        })
    }

    let hash=crypto.createHash("md5").update(password).digest("hex");
    if(hash != user.password){
        res.status(401).json({
            message:"Incorrect password"
        })
    }
    let token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET);

    res.cookie("jwt_token",token);
    res.status(200).json({
        message:"Request executed successfully"
    })
})

module.exports=authRouter;