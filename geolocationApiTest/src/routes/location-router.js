const _EXPRESS = require("express");
const _ROUTER = _EXPRESS.Router();
const _LOCCTRL = require("../controllers/location-controller");

_ROUTER.get("/", _LOCCTRL.pagina_inicial);

module.exports = _ROUTER;