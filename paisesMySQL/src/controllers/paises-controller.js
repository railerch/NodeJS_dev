const _FS = require("fs");
const _SQ = require("querystring");
const _PATH = require("path");
const _CONN = require("../mysql-connection.js");

const mostrar_paises = (req, res) => {
    const sql = "SELECT * FROM paises";
    _CONN.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.render("inicio", { paises: result });
        }
    })
}

const pagina_error = (req, res) => {
    res.render("error");
}

const registrar_pais = (req, res) => {
    let paisDat = req.body;
    let paisImg = req.files;

    // Validar que el pais no este registrado
    let sql = `SELECT nombre FROM paises WHERE nombre = '${paisDat.nombre}'`;
    _CONN.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result != "") {
                console.log("Pais ya registrado");
            } else {
                // cargar imagenes
                for (img in paisImg) {
                    paisImg[img].mv(`./src/public/img/${paisImg[img].name}`, err => {
                        if (err) throw err;
                    })
                };

                // Insertar datos
                let sql = `INSERT INTO paises (nombre, ubicacion, descripcion, bandera, mapa) VALUES ('${ paisDat.nombre }', '${paisDat.ubicacion}', '${paisDat.descripcion}', '/img/${paisImg.bandera.name}', '/img/${paisImg.mapa.name}')`;
                _CONN.query(sql, (err, result) => {
                    // Validar error / Insercion
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result);
                        res.redirect("/");
                    }
                })
            }
        }
    });

}

const editar_pais = (req, res) => {
    let id = req.params.id;
    const sql = `SELECT * FROM paises WHERE id = '${id}'`;
    _CONN.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(JSON.stringify(result));
        }
    })
}

const actualizar_pais = (req, res) => {
    let data = req.body;
    const sql = `UPDATE paises SET nombre = '${data.nombre}', ubicacion = '${data.ubicacion}', descripcion = '${data.descripcion}' WHERE id = '${data.id}'`
    _CONN.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    })
}

const eliminar_pais = (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM paises WHERE id = '${id}'`;
    _CONN.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
}

module.exports = { mostrar_paises, registrar_pais, editar_pais, pagina_error, eliminar_pais, actualizar_pais }