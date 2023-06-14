const express = require("express");
const router = express.Router();
const canvasCtrl = require("../controllers/canvas-ctrl");

router.get("/", canvasCtrl.canvas_render);

module.exports = router;