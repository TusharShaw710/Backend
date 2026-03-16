const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required!"],
        unique:[true,"Username already exists"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"Email already exists"]
    },
    password:{
        type:String,
        select:false,
        required:[true,"password is required"]
    }
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;