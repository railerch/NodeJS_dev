const _METHOD_OVERRIDE = (req, res, next) => {
    if (req.url.match("/del")) {
        req.method = "DELETE";
        next();
    } else {
        next();
    }
}

module.exports = _METHOD_OVERRIDE;