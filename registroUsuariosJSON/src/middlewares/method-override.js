const method_override = (req, res, next) => {
    if (req.method === "POST" && req.body.metodo === "PUT") {
        req.method = "PUT";
        next();
    } else if (req.method === "GET" && req.url.match("/eliminar")) {
        req.method = "DELETE";
        next();
    } else {
        next();
    }
}

module.exports = method_override;