import {app} from "./src/app.js";
import {createServer} from "http";
import {Server} from "socket.io";

const httpServer=createServer(app);
const io=new Server(httpServer,{/**options */});

io.on("connection",(socket)=>{
    console.log("user is connected");
    socket.on("message",(msg)=>{
        socket.broadcast.emit("abc",msg);
    })
    
});


httpServer.listen(3000,()=>{
    console.log("Server is listening...");
});
