// 0. MONGO DB: base de datos basada en colecciones de datos con estructura de obj de JS

// 1. IMPORTAR MONGOOSE
const _MONG = require("mongoose");

// 2. CREAR EL GESTOR DE ESQUEMAS
const _SCHEMA = _MONG.Schema;

// 3. CREAR EL ESQUEMA DE LA BD
const personaSchema = new _SCHEMA({
    nombre: String,
    apellido: String,
    cedula: Number,
    telefono: String,
    correo: String,
    direccion: String
})

// 4. SE CREA UN MODELO PARA PODER ACCESAR AL ESQUEMA DE LA BD
const _PERSONA = _MONG.model("persona", personaSchema);

module.exports = _PERSONA;