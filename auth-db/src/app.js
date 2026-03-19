const express=require("express");
const app=express();
const authRouter=require("./routers/auth.route");
const cookieParser=require("cookie-parser");
const {handleError}=require("./middleware/error.middleware")

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter);

app.use(handleError);

module.exports=app;