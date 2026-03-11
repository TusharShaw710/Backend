const FollowModel=require("../models/follow.model");
const userModel=require("../models/user.model");

async function followRequestController(req,res){
    const FolloweeUsername=req.params.username;
    const follower=req.user;

    if (!follower || !follower.id) {
        return res.status(401).json({
            message: "Unauthorized: invalid or missing token"
        });
    }

    if (!FolloweeUsername) {
        return res.status(400).json({
            message: "Missing followee username"
        });
    }

    const followee = await userModel.findOne({ username: FolloweeUsername });
    if (!followee) {
        return res.status(404).json({
            message: "User to follow does not exist"
        });
    }

    await FollowModel.create({
        follower: follower.id,
        followee: followee._id,
        status: "pending"
    });

    res.status(201).json({
        message: `Follow request sent to ${FolloweeUsername}`
    });
}

async function followListController(req,res){
    const user=req.user;

    const followList=await FollowModel.find({
        followee:user.id,
        status:"pending"
    }).populate("follower","username profileImage");

    res.status(200).json({
        message:"Follow Request List",
        followList:followList
    });

}

async function followReqAcceptController(req,res) {
    const username=req.params.username;
    const user=await userModel.findOne({username:username});
    const reqId=user._id;

    const request = await FollowModel.findOneAndUpdate(
        {
            follower:reqId,
            followee:req.user.id
        },
        { status: "accepted" },
        { new: true }
    ).populate("follower","username");

    res.status(200).json({
        message:"Follow Requested Accepted.",
        request
    })  
}

async function followReqRejectController(req,res){
     const username=req.params.username;
    const user=await userModel.findOne({username:username});
    const reqId=user._id;

    const request = await FollowModel.findOneAndUpdate(
        {
            follower:reqId,
            followee:req.user.id
        },
        { status: "rejected" },
        { new: true }
    ).populate("follower","username");

    res.status(200).json({
        message:"Follow Requested Accepted.",
        request
    })  
}



module.exports={
    followRequestController,
    followListController,
    followReqAcceptController,
    followReqRejectController
}