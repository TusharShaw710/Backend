const express=require("express");
const crypto=require("crypto");
const userModel=require("../models/user.model");
const authRouter=express.Router();
const jwt=require("jsonwebtoken");

authRouter.post("/register",async (req,res)=>{
    let { name ,email,password}=req.body;
    let user=await userModel.findOne({email});

    if(user){
        res.status(409).json({
            message:"User with this email already exists"
        })
    }

    let hash=crypto.createHash("md5").update(password).digest("hex");
    let newUser=await userModel.create({
        name, email,password:hash
    });

    let token=await jwt.sign({
        id:newUser._id
    },process.env.SECRET_KEY,{expiresIn:"1h"});

    res.cookie("jwt_token",token);

    res.status(201).json({
        message:"User Created",
        newUser,
        token
    });
    

});

authRouter.get("/get-me",async(req,res)=>{
    const token=req.cookies.jwt_token;

    let decoded=jwt.verify(token,process.env.SECRET_KEY);
    let user=await userModel.findOne({_id:decoded.id});

    res.status(200).json({
        name:user.name,
        email:user.email
    })
});

authRouter.post("/login",async (req,res)=>{
    let { email,password}=req.body;

    let user=await userModel.findOne({email});
    if(!user){
        res.status(404).json({
            message:"User Does not exits",
        })
    }

    let hash=crypto.createHash("md5").update(password).digest("hex");
    if(hash !=user.password){
        res.status(401).json({
            message:"Incorrect password"
        });
    }

    let token=jwt.sign({
        id:user._id
    },process.env.SECRET_KEY);

    res.cookie("jwt_token",token);

    res.status(200).json({
        message:"Logged in Successfully"
    });
})


module.exports=authRouter;