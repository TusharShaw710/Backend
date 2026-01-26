const express=require("express");

const app=express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello World");
});

let notes=[];

app.post("/notes",(req,res)=>{

    notes.push(req.body);
    res.send("notes created");

});
app.get("/notes",(req,res)=>{

    res.send(notes);

});

app.listen(3000);