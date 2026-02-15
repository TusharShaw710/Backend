const express=require("express");
const noteModel=require("./models/notes.model");
const app=express();

app.use(express.json());

//post Api

app.post("/notes",async(req,res)=>{
    let {title,description}=req.body;

    let note=await noteModel.create({
        title,description
    })

    res.status(201).json({
        message:"Note is created",
        note
    })
})


app.get("/notes",async(req,res)=>{
    let notes= await noteModel.find();

    res.status(200).json({
        message:"List of all notes",
        notes
    });
})


module.exports=app;