const express=require("express");

const app=express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello world");
});

let notes=[];

app.post("/notes",(req,res)=>{
    notes.push(req.body);
    res.send("notes created");
});
app.get("/notes",(req,res)=>{
    res.send(notes);
});
app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description=req.body.description;
    console.log(req.body);
    res.send("Done");
});
app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index];
    res.send("Done");
});




module.exports=app;