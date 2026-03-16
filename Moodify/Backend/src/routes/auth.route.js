const express=require("express");
const authRouter=express.Router();
const {registerController, loginController,getMecontroller, logoutController}=require("../controllers/auth.controller");
const identifyToken=require("../middleware/auth.middleware.js")


/**
 * @path POST api/auth/register
 * @defination This api allows user to register
 */
authRouter.post("/register",registerController);
/**
 * @path POST api/auth/login
 * @defination This api allows user to login
 */
authRouter.post("/login",loginController);
/**
 * @path POST api/auth/login
 * @defination This api allows user to login
 */
authRouter.get("/get-me",identifyToken,getMecontroller);
/**
 * @path POST api/auth/logout
 * @defination This api allows user to login
 */
authRouter.get("/logout",logoutController);


module.exports=authRouter;