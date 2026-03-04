const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"Already this email exists"]
    },
    password:String
})

const userModel=mongoose.model("user",userSchema);

module.exports=userModel;