// MODULOS
// =======
const _EXPRESS = require("express");
const app = _EXPRESS();
const _URL = require("url");
const _PATH = require("path");
const _FS = require("fs");
const _FU = require("express-fileupload");
const _QS = require("querystring");
const _USUARIOS = require("./routes/usuarios-router");
const _METHOD_OVERRIDE = require("./middlewares/method-override");

// CONFIGURACIONES
// ===============
app.set("port", 7000);
app.set("view engine", "ejs");
app.set("views", _PATH.join(__dirname, "views"));

// URL POST
// ========
app.use(_EXPRESS.urlencoded({ extended: false }));

// MIDDLEWARES
// ===========

// Method override
app.use(_METHOD_OVERRIDE);

// Archivos publicos
app.use(_EXPRESS.static(_PATH.join(__dirname, "public")));

// Cargar archivos
app.use(_FU());

// RUTAS
// =====

// Inicio
app.get("/", (req, res) => {
    res.render("index");
})

// Gestion de usuarios
app.use("/usuarios", _USUARIOS);

// ACTIVAR SERVIDOR
// ================
app.listen(app.get("port"), () => {
    console.log("Server at http://localhost:" + app.get("port"));
})