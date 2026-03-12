const express=require("express");
const authRouter=express.Router();
const {loginController,registerController,getmeController}=require("../controllers/auth.controller");
const tokenVerify=require("../middlewares/auth.middleware");

/**
 * @route api/auth/register
 * @description For user registration
 * @access Private
 */
authRouter.post("/register",registerController);
/**
 * @route api/auth/login
 * @description For user login
 * @access Private
 */
authRouter.post("/login",loginController);

authRouter.get("/get-me",tokenVerify,getmeController);
module.exports=authRouter;