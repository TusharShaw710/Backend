const express=require("express");
const authRouter=express.Router();
const userModel=require("../model/user.model");
const jwt=require("jsonwebtoken");
require("dotenv").config();



authRouter.post("/register",async (req,res)=>{
    let { name,email,password }=req.body;

    let isUserAlready=await userModel.findOne({email});

    if(isUserAlready){
        return res.status(409).json({
            message:"User with this email Already exists",
        });
    }
    let user=await userModel.create({
        name,email,password
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

module.exports=authRouter;