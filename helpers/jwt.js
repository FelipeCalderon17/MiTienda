//La clase que valida que todos los request a la API validen el token
const { expressjwt: expressJwt } = require("express-jwt");

let authJwT = () => {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return expressJwt({ secret, algorithms: ["HS256"] }).unless({ path: ["/api/v1/usuarios/login", "/api/v1/usuarios/registro"] });
};
//Unless permite las url sin token
module.exports = authJwT;
