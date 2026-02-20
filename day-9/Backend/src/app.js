//create and config server
//create api

const express=require("express");
// noteModel represents the Note schema
const noteModel=require("./models/user.model");
const path=require("path");
const cors=require("cors");

const app=express();

app.use(express.json());
app.use(cors());
app.use(express.static("./public"));//express.static makes a dir or a file publicly available so that any one especially browser can access the file

//create note
app.post("/api/notes",async(req,res)=>{
    try {
        let { title,description }=req.body;

        const note=await noteModel.create({
            title,description
        });

        res.status(201).json({
            message:"Note created",
            note
        });
    } catch (err) {
        console.error("POST /api/notes error", err);
        res.status(500).json({ error: "Unable to create note" });
    }
});

//view notes

app.get("/api/notes",async (req,res)=>{
    try {
        let notes=await noteModel.find();
        res.status(200).json({
            message:"List of all notes",
            notes
        });
    } catch (err) {
        console.error("GET /api/notes error", err);
        res.status(500).json({ error: "Unable to fetch notes" });
    }
});

//delete note

app.delete("/api/notes/:id",async (req,res)=>{
    try {
        let {id}=req.params;
        await noteModel.findByIdAndDelete(id);
        res.status(200).json({
            message:"Note Deleted"
        });
    } catch (err) {
        console.error("DELETE /api/notes/:id error", err);
        res.status(500).json({ error: "Unable to delete note" });
    }
});

//Update note

app.patch("/api/notes/:id",async (req,res)=>{
    try {
        let {description}=req.body;
        let id=req.params.id;
        await noteModel.findByIdAndUpdate(id, { description });
        res.status(201).json({
            message:"Done"
        });
    } catch (err) {
        console.error("PATCH /api/notes/:id error", err);
        res.status(500).json({ error: "Unable to update note" });
    }
});

//wildcard

app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"));
})


module.exports=app;