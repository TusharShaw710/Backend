const express=require("express");
const postRouter=express.Router();
const multer=require("multer");
const storage=multer.memoryStorage();
const upload=multer({storage});
const {createPostController,getPostController,getPostDetailsController,likePostController}=require("../controllers/post.controller");
const tokenVerify=require("../middlewares/auth.middleware");

/**
 * POST post/api [protected]
 */

postRouter.post("/",upload.single('image'),tokenVerify,createPostController);
/**
 *GET post/api [Protected]
 */
postRouter.get("/",tokenVerify,getPostController);
/** 
 * GET post/api/details/:postId [protected]
 * This api provide the details of the post to the user whose posts belongs to and return no access to the user if post does not belong to him/her.
*/
postRouter.get("/details/:postId",tokenVerify,getPostDetailsController);
/** 
 * @route POST follow/api/likes/:postId [Protected]
 * @description This api allows user to like another user's post
 * @access Private
*/
postRouter.post("/likes/:postId",tokenVerify,likePostController);


module.exports=postRouter;