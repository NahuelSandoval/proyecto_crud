const { Router } = require("express");
const router = new Router();

const mysql = require("mysql");

//aca se crea la coneccion con la base de datos

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud_node"
})

conn.connect((err) => {
    if (err) throw err;
    console.log("CONEXION ESTABLECIDA");
})

//SELECT

router.get("/", (req, res) => {
    let sql = "SELECT * FROM producto";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render("../views/productos.hbs", {
            results: results
        })
    })
})

//INSERT (maneja solicitud post para guardar un nuevo producto en la base de datos utilizando los datos enviados en el cuerpo de la solicitud(body))
//y luego redirige al usuario a la pagina principal
router.post("/save", (req, res) => {
    let data = { producto_nombre: req.body.producto_nombre, producto_precio: req.body.producto_precio }
    let sql = "INSERT INTO producto SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect("/");
    });
});

//EDITAR // UPDATE

router.post("/update", (req, res) => {
    let sql = "UPDATE producto SET producto_nombre='" + req.body.producto_nombre + "', producto_precio='" + req.body.producto_precio + "' WHERE producto_id =" + req.body.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect("/");
    });
});


//DELETE // BORRAR

router.post("/delete", (req, res) => {
    let sql = "DELETE FROM producto WHERE producto_id = "+req.body.producto_id +"";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect("/");
    });
});

module.exports = router;