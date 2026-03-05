const express=require("express");
const cookieParser=require("cookie-parser");
const app=express();
const authRouter=require("./routes/auth.route");
const postRouter=require("./routes/post.route");

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRouter);
app.use("/post/api",postRouter);

module.exports=app;