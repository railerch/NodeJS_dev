const _FS = require("fs");
const _PATH = require("path");
const _JWT = require("jsonwebtoken");

const _VERIFY_TOKEN = (req, res, next) => {
    // OBTENER EL TOKEN DE LA CABECERA HTTP
    // const _AUTH_HEADER = req.headers.authorization;
    const token = req.params.tkn;
    console.log("Verificando token");
    console.log("Autorizacion:");

    // VALIDAR TOKEN
    if (token !== undefined) {
        if (_JWT.verify(token, "SecretKey")) {
            console.log("TOKEN DE USUARIO APROBADO");
            next();
        } else {
            console.log("TOKEN INVALIDO");
        };
    } else {
        var archivo = _FS.readFileSync(_PATH.join(__dirname, "../views/error.ejs"), "utf8");
        var data = archivo.replace("{%ERROR%}", "Session no autorizada");
        data = data.replace("{%TYPE%}", "danger");
        res.status(300);
        res.setHeader("content-type", "text/html");
        res.write(data);
        res.end();
    };
}

module.exports = _VERIFY_TOKEN;