const mongoose=require("mongoose");
require("dotenv").config();

function connectToDB(){

    mongoose.connect(process.env.MONGODB_URL)
     .then(()=>{
        console.log("DataBase is connected");
     });
}

module.exports=connectToDB;