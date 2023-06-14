// MySQL Module
const _MYSQL = require("mysql");
const _FS = require("fs");
const _PATH = require("path");

// Config File
const _DATA = JSON.parse(_FS.readFileSync(_PATH.join(__dirname, "./config.json")));

// Server create connection
const _CONNECTION = _MYSQL.createConnection(_DATA.mysql);

// Server connection
_CONNECTION.connect((err, conn) => {
    if (err) {
        console.log("ERROR DE CONEXION: \n" + err);
    } else {
        console.log("Conexion MYSQL exitosa");
        return conn;
    }
})

module.exports = _CONNECTION;