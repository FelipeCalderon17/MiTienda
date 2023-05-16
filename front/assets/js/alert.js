const urlApi = "http://localhost:4000/login";
const btnEnviar = document.querySelector("#btnEnviar");
const email = document.querySelector("#email");
const constraseña = document.querySelector("#constraseña");
btnEnviar.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(urlApi, {
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
      return res.json();
    })
    .then((res) => {
      console.log(res);
    });
});
