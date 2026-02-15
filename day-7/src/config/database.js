const mongoose=require("mongoose");
require("dotenv").config();

function connectToDb(){
    mongoose.connect(process.env.MonGoDb)
        .then(()=>{
            console.log("DataBase is connected...")
        })
}


module.exports=connectToDb;