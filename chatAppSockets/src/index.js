// MODULOS
const express = require("express");
const app = express();
const path = require("path");

// SOCKETS PASO #1 => Importar los modulos necesarios
const http = require("http");
const socketio = require("socket.io");
const socket = require("./socket");

// SOCKETS PASO #2 => Crear el servidor
// CREAR SOCKET => Se requiere un servidor http para crear el socket y a este se le pasa el servidor express
const httpServer = http.createServer(app);
const io = socketio(httpServer);
socket(io);

// CONFIG
app.set("host", "localhost");
app.set("port", 3000);

// MIDDLEWARES
app.use(express.static("src/public"));

// ROUTES
app.get("/server", (req, res) => {
    res.status(200).header("content-type", "text/html");
    res.send("<hr><h2>NODE.JS SERVER OK</h2><hr>");
})

// SERVER START => Se usa el servidor HTTP creado ya que es el que tiene la escucha de puertos habilitada
httpServer.listen(app.get("port"), () => {
    console.log(`Server at http://${app.get("host")}:${app.get("port")}`);
})