let piezaSeleccionada = null; // Almacenar pieza seleccionada
let posicionInicial = null; // Almacenar posición inicial {row, col}

// Evento de clic en cada casilla
casillas.forEach((casilla) => {
  casilla.addEventListener("click", () => {
    const fila = parseInt(casilla.getAttribute("data-row"));
    const columna = parseInt(casilla.getAttribute("data-col"));

    // Si no hay pieza seleccionada, seleccionamos una
    if (!piezaSeleccionada && casilla.textContent.trim() !== "") {
      piezaSeleccionada = casilla.textContent.trim();
      posicionInicial = { row: fila, col: columna };

      // Resaltar movimientos válidos
      const movimientos = obtenerMovimientos(piezaSeleccionada, fila, columna);
      casillas.forEach((c) => c.classList.remove("valid-move"));
      movimientos.forEach((m) => {
        const casillaValida = document.querySelector(
          `.Casilla[data-row="${m.row}"][data-col="${m.col}"]`
        );
        if (casillaValida) casillaValida.classList.add("valid-move");
      });
    } else if (casilla.classList.contains("valid-move")) {
      // Si clicamos en una casilla válida, movemos la pieza
      casilla.textContent = piezaSeleccionada;

      // Limpiar la casilla original
      const casillaInicial = document.querySelector(
        `.Casilla[data-row="${posicionInicial.row}"][data-col="${posicionInicial.col}"]`
      );
      casillaInicial.textContent = "";

      // Limpiar estados
      piezaSeleccionada = null;
      posicionInicial = null;
      casillas.forEach((c) => c.classList.remove("valid-move"));
    } else {
      // Si no es una casilla válida, limpiar la selección
      piezaSeleccionada = null;
      posicionInicial = null;
      casillas.forEach((c) => c.classList.remove("valid-move"));
    }
  });
});

function obtenerMovimientos(pieza, fila, columna) {
  const movimientos = [];

  switch (pieza) {
    case "♖": // Torre
      for (let i = 1; i <= 8; i++) {
        if (i !== fila) movimientos.push({ row: i, col: columna }); // Vertical
        if (i !== columna) movimientos.push({ row: fila, col: i }); // Horizontal
      }
      break;

    case "♙": // Peón blanco
      // Movimiento hacia adelante
      if (fila < 8) {
        movimientos.push({ row: fila + 1, col: columna }); // Movimiento normal
        // Primer movimiento (dos espacios)
        if (fila === 2) {
          movimientos.push({ row: fila + 2, col: columna });
        }
      }
      // Capturas diagonales
      if (fila < 8) {
        if (columna > 1) {
          // Diagonal izquierda
          movimientos.push({ row: fila + 1, col: columna - 1 });
        }
        if (columna < 8) {
          // Diagonal derecha
          movimientos.push({ row: fila + 1, col: columna + 1 });
        }
      }
      break;
  }

  return movimientos.filter((m) => {
    if (m.row > 0 && m.row <= 8 && m.col > 0 && m.col <= 8) {
      const casillaDestino = document.querySelector(
        `.Casilla[data-row="${m.row}"][data-col="${m.col}"]`
      );
      const contenido = casillaDestino.textContent.trim();

      if (contenido === "") return true; // Casilla vacía

      // Detectar aliados/enemigos
      const esBlanca =
        pieza.charCodeAt(0) >= 9812 && pieza.charCodeAt(0) <= 9817;
      const esEnemigo = esBlanca
        ? contenido.charCodeAt(0) >= 9818 && contenido.charCodeAt(0) <= 9823
        : contenido.charCodeAt(0) >= 9812 && contenido.charCodeAt(0) <= 9817;

      return esEnemigo; // Solo permite capturar enemigos
    }
    return false;
  });
}

let turno = "blancas"; // Turno inicial

casillas.forEach((casilla) => {
  casilla.addEventListener("click", () => {
    const fila = parseInt(casilla.getAttribute("data-row"));
    const columna = parseInt(casilla.getAttribute("data-col"));
    const pieza = casilla.textContent.trim();

    // Validar turno
    if (
      (pieza &&
        turno === "blancas" &&
        pieza.charCodeAt(0) >= 9812 &&
        pieza.charCodeAt(0) <= 9817) ||
      (turno === "negras" &&
        pieza.charCodeAt(0) >= 9818 &&
        pieza.charCodeAt(0) <= 9823)
    ) {
      piezaSeleccionada = pieza;
      posicionInicial = { row: fila, col: columna };

      const movimientos = obtenerMovimientos(piezaSeleccionada, fila, columna);
      casillas.forEach((c) => c.classList.remove("valid-move"));
      movimientos.forEach((m) => {
        const casillaValida = document.querySelector(
          `.Casilla[data-row="${m.row}"][data-col="${m.col}"]`
        );
        if (casillaValida) casillaValida.classList.add("valid-move");
      });
    } else if (casilla.classList.contains("valid-move")) {
      casilla.textContent = piezaSeleccionada;

      // Limpiar la casilla inicial
      const casillaInicial = document.querySelector(
        `.Casilla[data-row="${posicionInicial.row}"][data-col="${posicionInicial.col}"]`
      );
      casillaInicial.textContent = "";

      // Cambiar turno
      turno = turno === "blancas" ? "negras" : "blancas";

      // Limpiar estados
      piezaSeleccionada = null;
      posicionInicial = null;
      casillas.forEach((c) => c.classList.remove("valid-move"));
    } else {
      piezaSeleccionada = null;
      posicionInicial = null;
      casillas.forEach((c) => c.classList.remove("valid-move"));
    }
  });
});
