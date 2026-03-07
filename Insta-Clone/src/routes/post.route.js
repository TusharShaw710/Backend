const express=require("express");
const postRouter=express.Router();
const multer=require("multer");
const storage=multer.memoryStorage();
const upload=multer({storage});
const {createPostController,getPostController,getPostDetailsController}=require("../controllers/post.controller");

/**
 * POST post/api [protected]
 */

postRouter.post("/",upload.single('image'),createPostController);
/**
 *GET post/api [Protected]
 */
postRouter.get("/",getPostController);
/** 
 * GET post/api/details/:postId [protected]
*/
postRouter.get("/details/:postId",getPostDetailsController);


module.exports=postRouter;