const _EXPRESS = require("express");
const app = _EXPRESS();
const _FS = require("fs");
const _PATH = require("path");
const _EFU = require("express-fileupload");
const _CONN = require("./mysql-connection");
const _PAISES = require("./routes/paises-router");
const _METHOD_OVERRIDE = require("./middlewares/method-override");

// CONFIG
const _CONFIG = JSON.parse(_FS.readFileSync(_PATH.join(__dirname, "config.json")));
app.set("view engine", "ejs");
app.set("views", _PATH.join(__dirname, "views"));

// MIDDLEAWARES
app.use(_EXPRESS.urlencoded({ extended: false }));
app.use(_EXPRESS.static(_PATH.join(__dirname, "public")));
app.use(_EFU());
app.use(_METHOD_OVERRIDE);

// ROUTES
app.get("/server", (req, res) => {
    res.status("200");
    res.setHeader("content-type", "text/html");
    res.write("<h1>Servidor NODE.JS activo</h1>");
    res.end();
})

app.use("/", _PAISES);

// SERVER
app.listen(_CONFIG.server.port, () => {
    console.log("Server at http:localhost:" + _CONFIG.server.port);
})