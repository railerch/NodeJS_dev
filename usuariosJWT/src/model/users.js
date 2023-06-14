const _MONG = require("mongoose");
const _SCHEMA = _MONG.Schema;

const _USERS_SCHEMA = new _SCHEMA({
    nombre: String,
    apellido: String,
    cedula: Number,
    email: String,
    usuario: String,
    clave: String
})

const _USERS_MOD = _MONG.model("users", _USERS_SCHEMA);

module.exports = _USERS_MOD;