const mongooose=require("mongoose");

const userSchema=mongooose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"Account with this emailId already exists"]
    },
    password:String
});

const userModel=mongooose.model("user",userSchema);

module.exports=userModel;