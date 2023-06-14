// MODULES
const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const socket = require("./socket");
const canvas = require("./routes/canvas-rtr.js");

// SERVERS
const app = express();
const HttpServer = http.createServer(app);

// SOCKETS
const io = socketio(HttpServer);
socket(io);

// CONFIG
app.set("express-port", 3000);
app.set("http-port", 80);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MIDDLEWARES
app.use(express.static("src/public"));
app.use("/", canvas);

// ROUTES
app.get("/eserver", (req, res) => {
    res.status(200).header("content-type", "text/html");
    res.send("<hr><h2>Express Server Active</h2><hr>");
})

// EXPRESS SERVER OK NO-SOCKETS
app.listen(app.get("express-port"), () => {
    console.log("Express server at port: " + app.get("express-port"));
})

// HTTP SOCKETS SERVER OK
HttpServer.listen(app.get("http-port"), () => {
    console.log("HTTP server at port: " + app.get("http-port"));
})