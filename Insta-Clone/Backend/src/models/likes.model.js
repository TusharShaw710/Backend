const mongoose=require("mongoose");

const likeSchema=mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:[true,"Post Id is required"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"User Id is required"]
    },
},{  timestamp:true });

likeSchema.index({post:1,user:1},{unique:true});

const likeModel=mongoose.model("like",likeSchema);

module.exports=likeModel;