require("dotenv").config();
const mongoose=require("mongoose");

function connectTodb(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("DataBase is connected...");
    })
}

module.exports=connectTodb;