const ImageKit=require("@imagekit/nodejs");
const {toFile}=require('@imagekit/nodejs');
const jwt=require("jsonwebtoken");
const userModel=require("../models/user.model");
const postModel = require("../models/post.model");

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
    userId:decoded.id
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



module.exports={createPostController,getPostController,getPostDetailsController};