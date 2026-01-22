const express=require("express");

const app=express();

app.listen(3000);

app.get("/",(req,res)=>{
    res.send("Hello World");
})
app.get("/about",(req,res)=>{
    res.send("This is About Page");
})
app.get("/home",(req,res)=>{
    res.send("This is Home Page");
})
