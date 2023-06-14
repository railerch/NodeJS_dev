const _EXPRESS = require("express");
const _ROUTER = _EXPRESS.Router();
const _USR_CTRL = require("../controllers/usuarios-controller");

_ROUTER.get("/todos", _USR_CTRL.usuariosTabla);
_ROUTER.get("/registro", _USR_CTRL.usuariosRegistro);
_ROUTER.get("/detalles/:id", _USR_CTRL.usuariosDetalles);
_ROUTER.post("/crear", _USR_CTRL.usuariosCrear);
_ROUTER.get("/editar/:id", _USR_CTRL.usuariosEditar);
_ROUTER.put("/actualizar/:id", _USR_CTRL.usuariosActualizar);
_ROUTER.delete("/eliminar/:id", _USR_CTRL.usuariosEliminar);

module.exports = _ROUTER;