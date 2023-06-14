const _URL = require("url");

const _METHOD_OVERRIDE = (req, res, next) => {
    let path = _URL.parse(req.url);
    console.log(path)
    if (path.pathname.match("/actualizar")) {
        req.method = "PUT";
        console.log("METHOD: " + req.method);
        next();
    } else if (path.pathname.match("/eliminar")) {
        req.method = "DELETE";
        console.log("METHOD: " + req.method);
        next();
    } else if (path.pathname.match("/limpiar")) {
        req.method = "DELETE";
        console.log("METHOD: " + req.method);
        next();
    } else {
        next();
    }
}

module.exports = _METHOD_OVERRIDE;