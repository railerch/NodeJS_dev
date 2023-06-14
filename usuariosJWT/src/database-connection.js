const _MONG = require("mongoose");
const _CONN = _MONG.connect("mongodb://localhost:27017/usersDB")
    .then(res => console.log("DB Connection OK"))
    .catch(err => console.log("ERROR: " + err));
module.exports = _CONN;