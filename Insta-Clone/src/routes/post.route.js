const express=require("express");
const postRouter=express.Router();
const createPost=require("../controllers/post.controller");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

/*
    post/api [Protected]
*/

postRouter.post("/",upload.single("image"),createPost);

module.exports=postRouter;