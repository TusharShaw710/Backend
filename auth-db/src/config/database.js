const mongoose=require("mongoose");
require("dotenv").config();

const dns=require("dns");

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

function connectToDB(){

    mongoose.connect(process.env.MONGODB_URL)
     .then(()=>{
        console.log("DataBase is connected");
     });
}

module.exports=connectToDB;