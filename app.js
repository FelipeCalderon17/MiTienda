//Puerta de entrada de la APP ::: Principio SRP Single Responsability Protocol
const express = require("express");
const app = express(); //creamos nuestra aplicacion lamando el metodo construtor de express
const cors = require("cors");
require("dotenv/config");
const authJwt = require("./helpers/jwt");
app.use(cors());
app.options("*", cors());

app.use(express.json()); //Serializa los datos en json
app.use(authJwt());
//======================================================

//routes
const productosRuta = require("./modules/productos");
const usuariosRuta = require("./modules/usuario");
const api = process.env.API_URL;

app.use(`${api}/productos`, productosRuta);
app.use(`${api}/usuario`, usuariosRuta);
app.listen(4000, () => {
  console.log("Aplicacion ejecutandose en: http://localhost:4000");
});
