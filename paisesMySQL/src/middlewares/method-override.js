const method_override = (req, res, next) => {
    if (req.url.match("/actualizar")) {
        req.method = "PUT";
        next();
    } else if (req.url.match("/eliminar")) {
        req.method = "DELETE";
        next();
    } else {
        next();
    }
}

module.exports = method_override;