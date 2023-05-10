//Puerta de entrada de la APP ::: Principio SRP Single Responsability Protocol
const express = require("express");
const app = express(); //creamos nuestra aplicacion lamando el metodo construtor de express
app.use("/", require("./modules/productos")); //redirigimos al modulo producto
app.use("/", require("./modules/usuario"));
app.listen("4000", () => {
  console.log("Aplicacion ejecutandose en: http://localhost:4000");
});
