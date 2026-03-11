const FollowModel=require("../models/follow.model");


async function followController(req,res) {
    const FollowerUsername=req.user.username;
    const FolloweeUsername=req.params.username;

    const follow=await FollowModel.create({
        follower:FollowerUsername,
        followee:FolloweeUsername
    });

    res.status(201).json({
        message:`You now follow ${FollowerUsername}`,
        follow
    });
    
}

module.exports={
    followController
}