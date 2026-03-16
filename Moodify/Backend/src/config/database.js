const mongoose=require("mongoose");
const dns=require("dns");

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("DataBase is Connected.");
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports=connectToDb;
