const ImageKit=require("@imagekit/nodejs");
const {toFile}=require('@imagekit/nodejs');
const jwt=require("jsonwebtoken");
const userModel=require("../models/user.model");
const postModel = require("../models/post.model");

const imagekit=new ImageKit({
  privateKey:process.env.IMAGEKIT_KEY
});

async function createPostController(req,res) {
  console.log(req.body,req.file);
  let token=req.cookies.token;
  let decoded=null;
  try{
    decoded=jwt.verify(token,process.env.JWT_SECRET);
  }catch(err){
    res.status(401).json({
      error:"Token is not authentic."
    })
  }
  console.log(decoded);
  let user=await userModel.findOne({_id:decoded.id});
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
  let token=req.cookies.token;
  if(!token){
    return res.status(401).json({
      message:"Unauthorized Access"
    })
  }
  let decoded=null;

  try{
    decoded=jwt.verify(token,process.env.JWT_SECRET);
  }catch(err){
    res.status(401).json({
      error:"Token is not authentic"
    });
  }

  let posts=await postModel.find({userId:decoded.id});

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
  let token=req.cookies.token;
  if(!token){
    return res.status(401).json({
      message:"Unauthorized Access"
    })
  }
  let decoded=null;

  try{
    decoded=jwt.verify(token,process.env.JWT_SECRET);
  }catch(err){
    res.status(401).json({
      error:"Token is not authentic"
    });
  }
  let postId=req.params.postId;
  let userId=decoded.id;

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