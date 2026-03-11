const mongoose=require("mongoose");

const followSchema=mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"Follower is Required"]
    },
    followee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"Followee is Required"]
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending"
    }
},{
    timestamps:true
});

followSchema.index({follower:1,followee:1},{unique:true});

const FollowModel=mongoose.model("follow",followSchema);
module.exports=FollowModel;