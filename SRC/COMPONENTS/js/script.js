function mostrarName() {
  const names = document.getElementById(`name`).value;
  document.getElementById("user").textContent = `Hello Welcome, ${names}`;
}
mostrarName();

function retonar() {
  let confim = confirm("Estas seguro de Empezar a jugar");
  if (confim) {
    alert("Inciando el Juego");
  } else {
    alert("Juego cancelado");
  }
}
retonar();

let saludo = (nami) => {
  return "Hola" + nami;
};
console.log(saludo("Dani"));

//
//
//

//
//

