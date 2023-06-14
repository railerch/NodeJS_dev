// Modules
const _EXPRESS = require("express");
const app = _EXPRESS();
const _PATH = require("path");
const _LOCROUT = require("./routes/location-router");

// Config
app.set("host", "localhost");
app.set("port", 3000);
app.set("view engine", "ejs");
app.set("views", _PATH.join(__dirname, "views"));

// Middlewares
app.use(_EXPRESS.urlencoded({ extended: false }));
app.use(_EXPRESS.static("src/public"));
app.use(_EXPRESS.json({ limit: "1mb" }));

// Routes
app.use("/", _LOCROUT);
app.get("/server", (req, res) => {
    res.status(200).header("content-type", "text/html");
    res.send("<h1>Server NODE.JS <span style='color:red'>=></span> <span style='color:green'>OK</span></h1>")
})

// Server
app.listen(app.get("port"), () => {
    console.log(`Server at http://${app.get("host")}:${app.get("port")}`);
})