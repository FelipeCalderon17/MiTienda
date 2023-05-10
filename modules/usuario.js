//Modulo para el crud de la tabla pedidos
const express = require("express");
const cors = require("cors"); //Para evitar restricciones entre sitio
const usuario = express.Router();
const cnn = require("./bdatos");
//middlewares requeridos
//middlewares: traductor de datos entre aplicaciones distribuidas
usuario.use(express.json()); //serializa la data en json
usuario.use(cors()); //permite acceso de otras direcciones IP distintas a mi servicio
usuario.options("*", cors()); //Configura las ip admitidas por cors, * == todas

//codificamos los verbos HTTP

//Verbo GET LISTAR
usuario.get("/usuarios", (req, res) => {
  cnn.query("SELECT * FROM usuario", (error, response) => {
    if (error) {
      throw error;
    } else {
      res.send(response);
    }
  });
});

//verbo POST INSERTAR
usuario.post("/usuarios", (req, res) => {
  let data = {
    nombre: req.body.nombre,
    email: req.body.email,
    password: req.body.password,
    direccion: req.body.direccion,
    ciudad: req.body.ciudad,
    zonaPostal: req.body.zonaPostal,
    telefono: req.body.telefono,
    esAdmin: req.body.esAdmin,
  };
  cnn.query("INSERT INTO usuario set ?", data, (error, respuesta) => {
    if (error) {
      console.log("Error!");
    } else {
      res.status(201).send(respuesta);
    }
  });
});

//verbo PUT ACTUALIZAR
usuario.put("/usuarios/:id", (req, res) => {
  let id = req.params.id;
  let data = {
    nombre: req.body.nombre,
    email: req.body.email,
    password: req.body.password,
    direccion: req.body.direccion,
    ciudad: req.body.ciudad,
    zonaPostal: req.body.zonaPostal,
    telefono: req.body.telefono,
    esAdmin: req.body.esAdmin,
  };
  cnn.query(
    "UPDATE usuario SET ? where id = ?",
    [data, id],
    (error, respuesta) => {
      if (error) {
        console.log("Error!");
      } else {
        res.status(201);
      }
    }
  );
});

//verbo DELETE BORRAR
usuario.delete("/usuarios/:id", (req, res) => {
  let id = req.params.id;
  cnn.query("delete from usuario where id = ?", id),
    (error, respuesta) => {
      if (error) {
        console.log("Error!");
      } else {
        res.status(201).send(respuesta);
      }
    };
});

module.exports = usuario;
