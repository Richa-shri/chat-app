const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server} = require('socket.io');

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
})

io.on("connection", (socket)=>{
    console.log("userconnected", socket.id)
    socket.on("join", (data)=>{
        socket.join(data);
    });
    socket.on("send_msg", (data)=>{
        socket.to(data.room).emit("recieve_msg", data);
    })
    socket.on("disconnect", ()=>{
        console.log("userdiscoonect", socket.id)
    })

})
server.listen(4001, () => {
    console.log("SERVER RUNNING");
  });