function retonar() {
  let confim = confirm("¿Estás seguro de empezar a jugar?");
  if (confim) {
    alert("Iniciando el juego");
  } else {
    alert("Juego cancelado");
  }
}

function reiniciar() {
  let rei = confirm("¿Estás seguro de reiniciar?");
  if (rei) {
    alert("Reiniciando");
    window.location.reload();
  } else {
    alert("No reiniciando");
  }
}

function salir() {
  let men = confirm("¿Estás seguro de salir?");
  if (men) {
    alert("Saliendo");
    window.location.href = "/SRC/PAGES/index.html";
  } else {
    alert("No saliendo");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btnStart").addEventListener("click", retonar);
  document.getElementById("btnRestar").addEventListener("click", reiniciar);
  document.getElementById("btnClose").addEventListener("click", salir);
});
