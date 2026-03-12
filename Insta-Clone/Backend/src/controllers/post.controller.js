const ImageKit=require("@imagekit/nodejs");
const {toFile}=require('@imagekit/nodejs');
const jwt=require("jsonwebtoken");
const userModel=require("../models/user.model");
const postModel = require("../models/post.model");
const likeModel=require("../models/likes.model");
const mongoose=require("mongoose");
const imagekit=new ImageKit({
  privateKey:process.env.IMAGEKIT_KEY
});

async function createPostController(req,res) {
  
  let user=await userModel.findOne({_id:req.user.id});

  if(!user){
      return res.status(404).json({
      message:"User is not registered"
    })
  }

  const file=await imagekit.files.upload({
    file:await toFile(req.file.buffer, 'file'),
    fileName:"file",
    folder:"Insta-posts"
  });

  const post=await postModel.create({
    caption:req.body.caption,
    imageUrl:file.url,
    userId:req.user.id
  });

  res.send(post);
}



async function getPostController(req,res){


  let posts=await postModel.find({userId:req.user.id});

  if(posts.length==0){
    res.status(404).json({
      message:"No post yet."
    })
  }

  res.status(200).json({
    message:"All your posts.",
    posts
  });
}

async function getPostDetailsController(req,res) {
  
  let postId=req.params.postId;
  let userId=req.user.id;

  let post=await postModel.findById(postId);
  let isUserValid=userId.toString()===post.userId.toString();
  
  if(!isUserValid){
    return res.status(403).json({
      message:"Forbidden Access"
    })
  }

  return res.status(200).json({
    message:"Post Fetched Successfully",
    post
  })
}

async function likePostController(req,res){
    const postId=req.params.postId;
    const user=req.user;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        message:"Not a valid Post Id"
      })
    }

    const post=await postModel.findById(postId);

    if(!post){
      return res.status(404).json({
        message:"Post does not exists in our database."
      })
    }

    if(post.userId.toString() === user.id){
      return res.status(400).json({
        message:"You cannot like your own post!"
      })

    }

    const isLiked=await likeModel.findOne({
      post:postId,
      user:user.id
    });

    if(isLiked){
      return res.status(409).json({
        message:"You have already Liked the post"
      })
    };

    await likeModel.create({
      post:postId,
      user:user.id
    });

    res.status(200).json({
      message:"You have liked the post!!!",
      post:postId,
      user:user.id
    })
}



module.exports={createPostController,getPostController,getPostDetailsController,likePostController};