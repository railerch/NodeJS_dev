const _PERSONA = require("../model/personas-model.js");
const _URL = require("url");

function request(req) {
    console.log("REQUEST:");
    console.log(_URL.parse(req.url));
}

const consultar_personas = (req, res) => {
    console.log("METHOD: " + req.method)
        // request(req);
    _PERSONA.find({}, (err, result) => {
        if (err) {
            console.log("ERROR: " + err);
        } else {
            res.render("index", { personas: result });
        }
    })
}

const registrar_persona = (req, res) => {
    console.log("METHOD: " + req.method)
        // request(req);
    let data = req.body;
    let persona = new _PERSONA({
        nombre: data.nombre,
        apellido: data.apellido,
        cedula: data.cedula,
        telefono: data.telefono,
        correo: data.correo,
        direccion: data.direccion
    });

    persona.save((err, result) => {
        if (err) {
            console.log("ERROR: " + err);
        } else {
            console.log(result);
            res.redirect("/");
        }
    })
}

const actualizar_persona = (req, res) => {
    // request(req);
    let id = req.body.id;
    let data = req.body;
    _PERSONA.findOneAndUpdate({ _id: id }, data, (err, result) => {
        if (err) {
            console.log("ERROR: " + err);
        } else {
            res.redirect("/");
        }
    })
}

const eliminar_persona = (req, res) => {
    _PERSONA.deleteOne({ id: req.params.id }, (err, result) => {
        if (err) {
            console.log("ERROR: " + err);
        } else {
            console.log("Registro eliminado");
            res.redirect("/");
        }
    })
}

module.exports = { consultar_personas, registrar_persona, actualizar_persona, eliminar_persona };