//Modulo para el crud de la tabla pedidos
const express = require("express");
const cors = require("cors"); //Para evitar restricciones entre sitio
const usuario = express.Router();
const cnn = require("./bdatos");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); //Librería genera un token con el algoritmo sha256 ::: jwt.io
require("dotenv/config");
const secreto = process.env.secret;
const { promisify } = require("util"); //la trae por defecto node js, me permite usar async/await opcion a fetch
const { error } = require("console");
const { CLIENT_RENEG_LIMIT } = require("tls");
//middlewares requeridos
//middlewares: traductor de datos entre aplicaciones distribuidas
usuario.use(express.json()); //serializa la data en json
usuario.use(cors()); //permite acceso de otras direcciones IP distintas a mi servicio
usuario.options("*", cors()); //Configura las ip admitidas por cors, * == todas

//codificamos los verbos HTTP

//Verbo GET LISTAR
usuario.get("/", (req, res) => {
  try {
    cnn.query("SELECT idUsuario,nombre,apellidos,email FROM usuario", async (error, response) => {
      console.log(response);
      res.send(response);
    });
  } catch (error) {
    //throw error;
    console.log(error);
  }
});
/* usuario.get("/usuarios", (req, res) => {
  cnn.query("SELECT * FROM usuario", (error, response) => {
    if (error) {
      throw error;
    } else {
      res.send(response);
    }
  });
}); */

//verbo POST INSERTAR
usuario.post("/usuarios", async (req, res) => {
  try {
    let data = {
      nombre: req.body.nombre,
      email: req.body.email,
      constraseña: bcrypt.hashSync(req.body.constraseña, 7),
      direccion: req.body.direccion,
      cuidad: req.body.cuidad,
      zonaPostal: req.body.zonaPostal,
      telefono: req.body.telefono,
      esAdmin: req.body.esAdmin,
      apellidos: req.body.apellidos,
    };
    cnn.query("INSERT INTO usuario set ?", data, (error, respuesta) => {
      res.send(true);
      //res.sendStatus(200); Para no enviar un string si no un status
    });
  } catch (error) {
    console.log(error);
    res.send(false);
  }
});

//Login de usuario
usuario.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const constraseña = req.body.constraseña;
    if (!email || !constraseña) {
      console.log("Debe enviar los datos completos");
    } else {
      cnn.query("SELECT * FROM usuario where email = ?", [email], async (error, respuesta) => {
        if (respuesta.length == 0 || !(await bcrypt.compare(constraseña, respuesta[0].constraseña))) {
          /* console.log("El usuario o la clave ingresada no esta registrado"); */
          /* res.send({
            estado: true,
            nombre: "juanito",
          }); */
          /* res.sendStatus(200); */
          res.send(false);
        } else {
          //Enviamos las variaboles al front end para que cargue la pagina correspondiente
          /* console.log("BIENVENIDO AL SISTEMA DE INFORMACION " + respuesta[0].email + respuesta[0].constraseña); */
          /* res.send(true); */
          const token = jwt.sign({ userId: respuesta[0].idUsuario }, secreto, { expiresIn: "1d" });
          res.send({ user: respuesta[0].email, token: token });
        }
      });
    }
  } catch (error) {
    console.log("Hay un error en la conexión con el server" + error);
  }
});

module.exports = usuario;
