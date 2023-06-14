const _EXPRESS = require("express");
const _ROUTER = _EXPRESS.Router();
const _PERSONAS = require("../controllers/personas-controller");

_ROUTER.get("/", _PERSONAS.consultar_personas);
_ROUTER.post("/registrar", _PERSONAS.registrar_persona);
_ROUTER.put("/actualizar", _PERSONAS.actualizar_persona);
_ROUTER.delete("/eliminar/:id", _PERSONAS.eliminar_persona);

module.exports = _ROUTER;