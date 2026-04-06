import express from "express";
import useGraph from "./services/graph.ai.service.js";

const app = express();

app.get("/health",(req,res)=>{
    res.status(200).json({message:"Server is healthy"});
});

app.post("/use-graph",async (req,res)=>{
    await useGraph("Write a java program to find the factorial of a number");
    res.status(200).json({message:"Graph invoked successfully"});
});

export default app;

