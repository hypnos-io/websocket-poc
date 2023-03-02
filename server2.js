const express = require("express");
const { io } = require("socket.io-client");
const cors = require("cors");

const app = express();
const iosocket = io("http://localhost:3333");

iosocket.on("server1 server2", (message) => {
  console.log("Mensagem recebida do servidor 1. Processando...");
  iosocket.emit("server2 server1", `${message} (processado)`);
});

app.listen(3334);
