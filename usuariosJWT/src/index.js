// MODULES
const _EXPRESS = require("express");
const app = _EXPRESS();
const _PATH = require("path");
const _CONN = require("./database-connection");
const _USERS = require("./routes/users-router");
const _SESSION = require("./routes/session-router");
const _METHOD_OVERRIDE = require("./middlewares/method-override");

// CONFIG
app.set("port", 3000);
app.set("view engine", "ejs");
app.set("views", _PATH.join(__dirname, "views"));

// MIDDLEWARES
app.use(_EXPRESS.urlencoded({ extended: false }));
app.use(_EXPRESS.static("src/public"));
app.use(_EXPRESS.json({ limit: "1mb" }));
app.use(_METHOD_OVERRIDE);

// ROUTES
app.get("/server", (req, res) => {
    res.setHeader("content-type", "text/html");
    res.status(200).send("<h1>Server Node.JS OK</h1>");
})

app.use("/", _SESSION);
app.use("/users", _USERS);

// SERVER
app.listen(app.get("port"), () => {
    console.log("Server at http://localhost:" + app.get("port"));
})