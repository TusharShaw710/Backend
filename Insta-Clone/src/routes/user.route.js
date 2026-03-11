const express=require("express");
const userRouter=express.Router();
const tokenVerify=require("../middlewares/auth.middleware");
const userController=require("../controllers/user.controller");

userRouter.post("/follow/:username",tokenVerify,userController.followController);

module.exports=userRouter;