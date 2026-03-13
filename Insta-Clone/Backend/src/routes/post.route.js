const express=require("express");
const postRouter=express.Router();
const multer=require("multer");
const storage=multer.memoryStorage();
const upload=multer({storage});
const {createPostController,getPostController,getPostDetailsController,likePostController,getFeedController}=require("../controllers/post.controller");
const tokenVerify=require("../middlewares/auth.middleware");

/**
 * POST api/post [protected]
 */

postRouter.post("/",upload.single('image'),tokenVerify,createPostController);
/**
 *GET api/post [Protected]
 */
postRouter.get("/",tokenVerify,getPostController);
/** 
 * GET api/post/details/:postId [protected]
 * This api provide the details of the post to the user whose posts belongs to and return no access to the user if post does not belong to him/her.
*/
postRouter.get("/details/:postId",tokenVerify,getPostDetailsController);
/** 
 * @route POST api/post/likes/:postId [Protected]
 * @description This api allows user to like another user's post
 * @access Private
*/
postRouter.post("/likes/:postId",tokenVerify,likePostController);
/** 
 * @route POST api/post/getFeed [Protected]
 * @description This api allows user to see their feed
 * @access Private
*/
postRouter.get("/getFeed",tokenVerify,getFeedController);


module.exports=postRouter;