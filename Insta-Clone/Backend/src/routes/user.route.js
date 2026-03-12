const express=require("express");
const userRouter=express.Router();
const tokenVerify=require("../middlewares/auth.middleware");
const userController=require("../controllers/user.controller");

/**
 * @route POST api/users/follow-req/:username [Protected]
 * @description For sending Follow Request
 * @access Private
 */

userRouter.post("/follow-req/:username",tokenVerify,userController.followRequestController);
/**
 * @route POST api/users/follow-list [Protected]
 * @description For seeing Follow Request List
 * @access Private
 */

userRouter.post("/follow-list",tokenVerify,userController.followListController);
/**
 * @route POST api/users/follow-req-accept/:username [Protected]
 * @description For sending Follow Request
 * @access Private
 */

userRouter.post("/follow-req-accept/:username",tokenVerify,userController.followReqAcceptController);
/**
 * @route POST api/users/follow-req-reject/:username [Protected]
 * @description For sending Follow Request
 * @access Private
 */

userRouter.post("/follow-req-reject/:username",tokenVerify,userController.followReqRejectController);

module.exports=userRouter;