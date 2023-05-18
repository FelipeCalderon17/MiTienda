const urlApi = "http://localhost:4000/";
const btnEnviar = document.querySelector("#btnEnviar");
const email = document.querySelector("#email");
const constraseña = document.querySelector("#constraseña");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const emailRegistro = document.querySelector("#emailRegistro");
const constraseñaRegistro = document.querySelector("#constraseñaRegistro");
const direccion = document.querySelector("#direccion");
const ciudad = document.querySelector("#ciudad");
const zonaPostal = document.querySelector("#zonaPostal");
const telefono = document.querySelector("#telefono");
const esAdmin = document.querySelector("#esAdmin");
const btnEnviarRegistro = document.querySelector("#btnEnviarRegistro");
btnEnviar.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(urlApi + "login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      constraseña: constraseña.value,
    }),
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      if (res === "true") {
        window.location = "http://127.0.0.1:5500/MiTienda/front/dashboard.html";
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Usuario o contraseña incorrectos",
        });
      }
    });
});

btnEnviarRegistro.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(urlApi + "usuarios", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre.value,
      email: emailRegistro.value,
      constraseña: constraseñaRegistro.value,
      direccion: direccion.value,
      cuidad: ciudad.value,
      zonaPostal: zonaPostal.value,
      telefono: telefono.value,
      esAdmin: esAdmin.value,
      apellidos: apellido.value,
    }),
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      if (res === "true") {
        Swal.fire("Felicitaciones!", "Usuario registrado satisfactoriamente", "success");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error en la insercion",
        });
      }
    });
});
