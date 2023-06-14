const _EXPRESS = require("express");
const _ROUTER = _EXPRESS.Router();
const _USRCTRL = require("../controllers/users-controller");
const _VERFTOK = require("../middlewares/verify-token");

_ROUTER.get("/all/:tkn", _VERFTOK, _USRCTRL.show_users);
_ROUTER.post("/add", _USRCTRL.add_user);
_ROUTER.delete("/del/:id/:tkn", _USRCTRL.delete_user);

module.exports = _ROUTER;