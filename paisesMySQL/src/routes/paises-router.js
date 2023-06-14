const _EXPRESS = require("express");
const _ROUTER = _EXPRESS.Router();
const _PAIS_CTRL = require("../controllers/paises-controller");

_ROUTER.get("/", _PAIS_CTRL.mostrar_paises);
_ROUTER.get("/error", _PAIS_CTRL.pagina_error);
_ROUTER.post("/crear", _PAIS_CTRL.registrar_pais);
_ROUTER.get("/editar/:id", _PAIS_CTRL.editar_pais);
_ROUTER.put("/actualizar", _PAIS_CTRL.actualizar_pais);
_ROUTER.delete("/eliminar/:id", _PAIS_CTRL.eliminar_pais);

module.exports = _ROUTER;