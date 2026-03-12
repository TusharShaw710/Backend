require("dotenv").config();
const express=require("express");
const cookieParser=require("cookie-parser");
const app=express();
const cors=require("cors");

/**Routes are required here  */
const authRouter=require("./routes/auth.route");
const postRouter=require("./routes/post.route");
const userRouter=require("./routes/user.route");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

/**Routes are used here */
app.use("/api/auth",authRouter);
app.use("/api/post",postRouter);
app.use("/api/users",userRouter);

module.exports=app;