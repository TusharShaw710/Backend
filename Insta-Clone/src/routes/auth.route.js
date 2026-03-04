const express=require("express");
const authRouter=express.Router();
const {loginController,registerController}=require("../controllers/auth.controllers");

//post
authRouter.post("/register",registerController);
//login
authRouter.post("/login",loginController)
module.exports=authRouter;