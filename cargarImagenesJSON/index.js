const _EXPRESS = require("express");
const app = _EXPRESS();
const _EFU = require("express-fileupload");
const _PATH = require("path");
const _URL = require("url");
const _FS = require("fs");

// MIDD
app.use(_EFU());
app.use(_EXPRESS.static("src/public"));

// CONFIG
app.set("port", 3000);
app.set("view engine", "ejs");
app.set("views", _PATH.join(__dirname, "src/views"));

// RUTAS

app.get("/", (req, res) => {
    console.log(_URL.parse(req.url));
    res.render("inicio");
});

app.get("/imagenes", (req, res) => {
    let temp = _FS.readdirSync("./src/public/uploads/");
    let imagenes = [];
    temp.forEach(img => {
        imagenes.push("/uploads/" + img);
    })

    res.render("imagenes", { imagenes: imagenes });
})

app.post("/imagen", (req, res) => {
    let img = req.files.imagen;
    img.mv(`./src/public/uploads/${img.name}`, err => {
        if (err) {
            return res.status(500).send("Error al cargar imagen");
        } else {
            res.render("inicio");
        }
    })
})

app.listen(app.get("port"), (err) => {
    if (err) console.log(err);
    console.log("Server at http://localhost:" + app.get("port"));
})