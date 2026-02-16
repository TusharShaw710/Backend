const mongoose=require("mongoose");


function connectToDb(){
    mongoose.connect("mongodb+srv://Tushar:B5Yr0VI45F2sElab@cluster0.tinxreo.mongodb.net/?appName=Cluster0/day-9")
        .then(()=>{
            console.log("DataBase is connected...");
        })
}

module.exports=connectToDb;