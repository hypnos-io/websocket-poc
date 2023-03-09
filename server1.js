const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const http = require("http");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  socket.on("web server1", (images) => {
    console.log("Mensagem recebida. Encaminhando para server 2");
    io.emit("server1 server2", images);
  });

  socket.on("server2 server1", (images) => {
    console.log("Mensagem recebida. Encaminhando para web");
    io.emit("server1 web", images);
  });
});

server.listen(3333);
