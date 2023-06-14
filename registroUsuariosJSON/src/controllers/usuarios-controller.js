const _FS = require("fs");
const _PATH = require("path");
const _URL = require("url");
const _QS = require("querystring");
const _BD = _FS.readFileSync(_PATH.join(__dirname, "../model/usuariosDb.json"));
const usuariosDb = JSON.parse(_BD);

const usuariosTabla = (req, res) => {
    res.render("usuarios-tabla", { usuarios: usuariosDb });
}

const usuariosRegistro = (req, res) => {
    res.render("usuarios-registro", { alerta: "" });
}

const usuariosCrear = (req, res) => {
    const _TYPE = { st: "" };
    if (req.body.nombre !== "") {

        // Validar que el usuario no este registrado
        let registrado = false;
        usuariosDb.forEach(usuario => {
            if (usuario.nombre === req.body.nombre && usuario.apellido === req.body.apellido) {
                console.log("Usuario ya registrado");
                registrado = true;
                _TYPE.st = "warning";
            }
        })

        // Si el usuario no existe se registra
        if (!registrado) {
            // Datos recibidos por POST
            let datos = req.body;

            // Funcion de actualizacion
            function actualizar_registros(datos) {
                // Agregar el registro al archivo
                usuariosDb.push(datos);
                _FS.writeFileSync(_PATH.join(__dirname, "../model/usuariosDb.json"), JSON.stringify(usuariosDb));
            }

            // ID de registro
            let arrId = [];
            const L = usuariosDb.length;
            if (L > 0) {
                for (let i = 0; i < usuariosDb.length; i++) {
                    arrId.push(usuariosDb[i].id);
                }

                // Agregar ID al registro entrante
                datos.id = Math.max(...arrId) + 1;
            } else {
                datos.id = 1;
            }

            // Validar la recepcion de imagen de perfil
            if (!req.files) {
                console.log("SIN IMAGEN DE PERFIL");

                // Imagen por defecto
                datos.imagen = "/img/user.png";
                actualizar_registros(datos);
                _TYPE.st = "success";
            } else {
                let img = req.files.imagen;

                // Mover imagen a la carpeta Uploads
                img.mv(`./src/public/uploads/${img.name}`, err => {
                    if (err) {
                        console.log("ERROR: IMAGEN DE PERFIL NO CARGADA");
                        console.log(err);
                    } else {
                        console.log("IMAGEN DE PERFIL CARGADA");
                        // Agregar URL de imagen a los datos
                        datos.imagen = `/uploads/${img.name}`;
                        actualizar_registros(datos);
                    }
                })

                _TYPE.st = "success";
            }
        }
    } else {
        _TYPE.st = "error";
    }

    res.render("usuarios-registro", { alerta: _TYPE.st });
}

const usuariosDetalles = (req, res) => {
    let userId = req.params.id;
    let usuario = usuariosDb.filter(user => {
        if (user.id == userId) {
            return user;
        }
    })

    res.render("usuarios-detalles", { user: usuario[0] });
}

const usuariosEditar = (req, res) => {
    let temp = usuariosDb.filter(user => user.id === parseInt(req.params.id));
    res.render("usuarios-editar", { user: temp[0] });
}

const usuariosActualizar = (req, res) => {
    usuariosDb.forEach(usuario => {
        if (usuario.id === parseInt(req.params.id)) {
            usuario.nombre = req.body.nombre
            usuario.apellido = req.body.apellido
            usuario.edad = req.body.edad
            usuario.telefono = req.body.telefono
            usuario.correo = req.body.correo
            usuario.direccion = req.body.direccion
            usuario.ocupacion = req.body.ocupacion
        }
    })

    _FS.writeFileSync(_PATH.join(__dirname, "../model/usuariosDb.json"), JSON.stringify(usuariosDb));
    res.render("usuarios-tabla", { usuarios: usuariosDb });
}

const usuariosEliminar = (req, res) => {
    let userId = parseInt(req.params.id);
    for (let i = 0; i < usuariosDb.length; i++) {
        if (usuariosDb[i].id === userId) {
            usuariosDb.splice(i, 1);
        }
    }

    _FS.writeFileSync(_PATH.join(__dirname, "../model/usuariosDb.json"), JSON.stringify(usuariosDb));
    res.render("usuarios-tabla", { usuarios: usuariosDb });
}

module.exports = { usuariosTabla, usuariosRegistro, usuariosCrear, usuariosDetalles, usuariosEditar, usuariosActualizar, usuariosEliminar };