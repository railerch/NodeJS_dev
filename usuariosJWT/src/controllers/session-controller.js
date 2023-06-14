const _USER = require("../model/users");
const _BCRYPT = require("bcrypt");
const _FS = require("fs");
const _PATH = require("path");
const _JWT = require("jsonwebtoken");

const register_screen = (req, res) => {
    res.render("register");
}

const login_screen = (req, res) => {
    res.render("login");
}

const login = (req, res) => {

    _USER.findOne({ usuario: req.body.usuario.toLowerCase() }, (err, result) => {
        if (err) {
            // EN CASO DE ERROR
            console.log("ERROR: " + err);
            res.redirect("/")
        } else {
            // SIN ERRORES: USUARIO ENCONTRADO
            if (result) {
                if (_BCRYPT.compareSync(req.body.clave, result.clave)) {
                    // SI LA CLAVE ES CORRECTA
                    // Generar Token y redirigir a la pagina de resgistros
                    _JWT.sign({ user: result }, "SecretKey", (err, token) => {
                        res.redirect("/users/all/" + token);
                    })
                } else {
                    // CLAVE INCORRECTA
                    var archivo = _FS.readFileSync(_PATH.join(__dirname, "../views/error.ejs"), "utf8");
                    var data = archivo.replace("{%ERROR%}", "Clave incorrecta");
                    data = data.replace("{%TYPE%}", "warning");
                    res.status(300);
                    res.setHeader("content-type", "text/html");
                    res.write(data);
                    res.end();
                }
            } else {
                // USUARIO NO ENCONTRADO
                var archivo = _FS.readFileSync(_PATH.join(__dirname, "../views/error.ejs"), "utf8");
                var data = archivo.replace("{%ERROR%}", "Usuario no encontrado");
                data = data.replace("{%TYPE%}", "danger");
                res.status(200);
                res.setHeader("content-type", "text/html");
                res.write(data);
                res.end();
            }
        }
    })
}

const logout = (req, res) => {
    res.redirect("/");
}

module.exports = { register_screen, login_screen, login, logout };