//create and config server
//create api

const express=require("express");
const userModel=require("./models/user.model");
const noteModel = require("./models/user.model");
const cors=require("cors");

const app=express();

app.use(express.json());
app.use(cors());

//create note
app.post("/api/notes",async(req,res)=>{
    let { title,description }=req.body;

    const note=await userModel.create({
        title,description
    });

    res.status(201).json({
        message:"Note created",
        note
    });

});

//view notes

app.get("/api/notes",async (req,res)=>{
    let notes=await userModel.find();

    res.status(200).json({
        message:"List of all notes",
        notes
    })
});

//delete note

app.delete("/api/notes/:id",async (req,res)=>{
    let {id}=req.params;

    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        message:"Note Deleted"
    });
});

//Update note

app.patch("/api/notes/:id",async (req,res)=>{
    let {description}=req.body;
    let id=req.params.id;

    await userModel.findByIdAndUpdate(id, { description });

    res.status(201).json({
        message:"Done"
    });
});


module.exports=app;