require("dotenv").config();
const express=require("express");
const app=express();
const authRouter=require("./routes/auth.route");
const cookieParser=require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

/**
 * Routes
 */

app.use("/api/auth",authRouter);

module.exports=app;