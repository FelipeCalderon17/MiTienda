//Modulo para el crud de la tabla pedidos
const express = require("express");
const cors = require("cors"); //Para evitar restricciones entre sitio
const producto = express.Router();
const cnn = require("./bdatos");
//middlewares requeridos
//middlewares: traductor de datos entre aplicaciones distribuidas
producto.use(express.json()); //serializa la data en json
producto.use(cors()); //permite acceso de otras direcciones IP distintas a mi servicio
producto.options("*", cors()); //Configura las ip admitidas por cors, * == todas

//codificamos los verbos HTTP

//Verbo GET LISTAR
producto.get("/", (req, res) => {
  cnn.query("SELECT * FROM producto", (error, response) => {
    if (error) {
      throw error;
    } else {
      res.send(response);
    }
  });
});

//verbo POST INSERTAR
producto.post("/productos", (req, res) => {
  let data = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen,
    imagenes: req.body.imagenes,
    marca: req.body.marca,
    precio: req.body.precio,
    stock: req.body.stock,
    calificacion: req.body.calificacion,
    estado: req.body.estado,
    fechaCreacion: req.body.fechaCreacion,
  };
  cnn.query("INSERT INTO producto set ?", data, (error, respuesta) => {
    if (error) {
      console.log("Error!");
    } else {
      res.status(201).send(respuesta);
    }
  });
});

//verbo PUT ACTUALIZAR
producto.put("/productos/:id", (req, res) => {
  let id = req.params.id;
  let data = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen,
    imagenes: req.body.imagenes,
    marca: req.body.marca,
    precio: req.body.precio,
    stock: req.body.stock,
    calificacion: req.body.calificacion,
    estado: req.body.estado,
    fechaCreacion: req.body.fechaCreacion,
  };
  cnn.query("UPDATE producto SET ? where idproducto = ?", [data, id], (error, respuesta) => {
    if (error) {
      console.log("Error!");
    } else {
      res.status(201);
    }
  });
});

//verbo DELETE BORRAR
producto.delete("/productos/:id", (req, res) => {
  let id = req.params.id;
  cnn.query("delete from producto where idproducto = ?", id),
    (error, respuesta) => {
      if (error) {
        console.log("Error!");
      } else {
        res.status(201).send(respuesta);
      }
    };
});

module.exports = producto;
