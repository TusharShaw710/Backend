const mongoose=require("mongoose");

const postSchema=mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imageUrl:{
        type:String,
        required:[true,"Imagge is required"]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"User id is required to create a post"]
    }
});

const postModel=mongoose.model("post",postSchema);

module.exports=postModel;