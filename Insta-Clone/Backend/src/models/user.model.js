const mongoose=require("mongoose");

let userSchema= mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username Already exists"],
        required:[true,"Username is required"]
    },
    email:{
        type:String,
        unique:[true,"Email Already exists"],
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        select:false
    },
    bio:{
        type:String
    },
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/Tushack/Default%20Image.avif"
    }
});


const userModel=mongoose.model("user",userSchema);

module.exports=userModel;