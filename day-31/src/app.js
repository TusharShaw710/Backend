import express from "express";

export const app=express();

app.get("/",(req,res)=>{
    res.send("Connected to the server");
})

