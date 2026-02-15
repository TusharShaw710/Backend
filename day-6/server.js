const app=require("./src/app");
const mongoose=require("mongoose");

function connectToDB(){
    //"mongodb+srv://Tushar:B5Yr0VI45F2sElab@cluster0.tinxreo.mongodb.net/?appName=Cluster0"->address of the cluster && day-6 is the name of the database and if the database is not present then it will be automatically created.
    mongoose.connect("mongodb+srv://Tushar:B5Yr0VI45F2sElab@cluster0.tinxreo.mongodb.net/?appName=Cluster0/day-6")
        .then(()=>{
            console.log("DataBase is Connected");
        });
}

connectToDB();

app.listen(3000,()=>{
    console.log("Server is listening...");
});

