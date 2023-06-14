const _EXPRESS = require("express");
const _ROUTER = _EXPRESS.Router();
const _SESSIONCTRL = require("../controllers/session-controller");

_ROUTER.get("/", _SESSIONCTRL.login_screen);
_ROUTER.get("/register", _SESSIONCTRL.register_screen);
_ROUTER.post("/login", _SESSIONCTRL.login);
_ROUTER.get("/logout", _SESSIONCTRL.logout);

module.exports = _ROUTER;