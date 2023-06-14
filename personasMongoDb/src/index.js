// MODULOS
const _EXPRESS = require("express");
const app = _EXPRESS();
const _FS = require("fs");
const _PATH = require("path");
const _CONFIG = JSON.parse(_FS.readFileSync(_PATH.join(__dirname, "config.json")));
const _PERSONAS = require("./routes/personas-router");
const _CONN = require("./mongodb-conexion.js");
const _METOVR = require("./middlewares/method-override");

// CONFIG
app.set("view engine", "ejs");
app.set("views", _PATH.join(__dirname, "views"));

// MIDDLEWARES
app.use(_EXPRESS.urlencoded({ extended: false }));
app.use(_EXPRESS.static(_PATH.join(__dirname, "public")));
app.use(_EXPRESS.json({ limit: "1mb" }));
app.use(_METOVR);

// ROUTES
app.get("/server", (req, res) => {
    res.setHeader("content-type", "text/html");
    res.status(200).send("<h1>SERVER NODE.JS => St:<span style='color:green'>UP</span></h1>");
})

app.use("/", _PERSONAS);

// SERVER
app.listen(_CONFIG[0].port, () => {
    console.log(`Server at http://localhost:${_CONFIG[0].port}`);
})