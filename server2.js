const express = require("express");
const { io } = require("socket.io-client");
const axios = require("axios");
const cors = require("cors");
const sharp = require("sharp");
const fs = require("fs");

const app = express();
const iosocket = io("http://localhost:3333");

iosocket.on("connect", () => {
  iosocket.on("server1 server2", async (data) => {
    console.log("Processando imagem...");
    const colorImages = [];
    const { id, images } = data;

    for (let image of images) {
      try {
        const { data } = await axios.get(image); // Busca imagem enviando requisição para retorno do Buffer
        colorImages.push(data);
      } catch (error) {}
    }

    const result = [];
    for (let image of colorImages) {
      const newImage = await sharp(image).grayscale().toBuffer(); // Realiza o processamento em cada imagem
      result.push(newImage);
    }

    console.log("Processo finalizado. Enviando imagem de volta...");
    iosocket.emit(
      "server2 server1",
      { id, images: result.map((i) => i.toString("base64")) } // Envia imagens no formato base64
    );
  });
});

app.listen(3334);
