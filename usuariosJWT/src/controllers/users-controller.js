const _USER = require("../model/users");
const _BCRYPT = require("bcrypt");
const _JWT = require("jsonwebtoken");

const show_users = (req, res) => {
    _USER.find({}, (err, result) => {
        if (err) {
            console.log("ERROR: " + err);
        } else {
            res.render("users", { users: result, token: req.params.tkn });
        }
    })
}

const add_user = (req, res) => {
    let data = req.body;
    const _REG = new _USER({
        nombre: data.nombre,
        apellido: data.apellido,
        cedula: data.cedula,
        email: data.email,
        usuario: data.usuario.toLowerCase(),
        clave: _BCRYPT.hashSync(data.clave, 10)
    })

    _REG.save((err, result) => {
        if (err) {
            console.log("ERROR" + err);
        } else {
            res.redirect("/");
        }
    })
}

const delete_user = (req, res) => {
    let id = req.params.id;
    let token = req.params.tkn;

    // VALIDAR EL TOKEN PARA CONTINUAR
    if (_JWT.verify(token, "SecretKey")) {
        _USER.deleteOne({ _id: id }, (err, result) => {
            if (err) {
                console.log("ERROR: " + err);
            } else {
                console.log(req.method);
                console.log("Usuario: " + id + "eliminado");
                res.redirect("/users/all/" + token);
            }
        })
    }

}

module.exports = { show_users, add_user, delete_user };