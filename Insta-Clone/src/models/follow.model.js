const mongoose=require("mongoose");

const followSchema=mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"Follower is Required"]
    },
    followee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"Followee is Required"]
    }
},{
    timestamps:true
});

const FollowModel=await mongoose.model("follow",followSchema);
module.exports=FollowModel;