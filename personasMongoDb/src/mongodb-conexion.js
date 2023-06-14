const _MONGOOOSE = require("mongoose");
const _CONFIG = require("./config.json");

const _CONN = _MONGOOOSE.connect(`mongodb://${_CONFIG[1].host}:${_CONFIG[1].port}/${_CONFIG[1].database}`)
    .then(res => {
        console.log("Conexion exitosa");
    }).catch(err => {
        console.log("ERROR: " + err);
    });

module.exports = _CONN;