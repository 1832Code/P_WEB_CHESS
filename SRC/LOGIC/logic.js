// Obtener todas las casillas
const casillas = document.querySelectorAll(".Casilla");

// Función para obtener movimientos válidos
function obtenerMovimientos(pieza, fila, columna) {
  const movimientos = [];

  switch (pieza) {
    case "♖":
    case "♜": // Torre blanca
      for (let i = 1; i <= 8; i++) {
        if (i !== fila) movimientos.push({ row: i, col: columna }); // Movimiento vertical
        if (i !== columna) movimientos.push({ row: fila, col: i }); // Movimiento horizontal
      }
      break;

    case "♘":
    case "♞": // Caballo blanco
      const movimientosCaballo = [
        { row: fila - 2, col: columna - 1 },
        { row: fila - 2, col: columna + 1 },
        { row: fila - 1, col: columna - 2 },
        { row: fila - 1, col: columna + 2 },
        { row: fila + 1, col: columna - 2 },
        { row: fila + 1, col: columna + 2 },
        { row: fila + 2, col: columna - 1 },
        { row: fila + 2, col: columna + 1 },
      ];
      movimientos.push(...movimientosCaballo);
      break;

    case "♗": // Alfil blanco
    case "♝": // Alfil negro
      const direcciones = [
        { row: 1, col: 1 }, // Diagonal inferior derecha
        { row: 1, col: -1 }, // Diagonal inferior izquierda
        { row: -1, col: 1 }, // Diagonal superior derecha
        { row: -1, col: -1 }, // Diagonal superior izquierda
      ];

      direcciones.forEach((dir) => {
        let nuevaFila = fila;
        let nuevaColumna = columna;

        // Moverse en la dirección hasta que se salga del tablero o encuentre una pieza
        while (true) {
          nuevaFila += dir.row;
          nuevaColumna += dir.col;

          // Verificar si la nueva posición está dentro de los límites del tablero
          if (
            nuevaFila > 0 &&
            nuevaFila <= 8 &&
            nuevaColumna > 0 &&
            nuevaColumna <= 8
          ) {
            movimientos.push({ row: nuevaFila, col: nuevaColumna });
          } else {
            break; // Salir si se sale del tablero
          }
        }
      });
      break;

    case "♕":
    case "♛": // reyna
      const direccionesReina = [
        { row: 1, col: 0 }, // Movimiento vertical hacia abajo
        { row: -1, col: 0 }, // Movimiento vertical hacia arriba
        { row: 0, col: 1 }, // Movimiento horizontal hacia la derecha
        { row: 0, col: -1 }, // Movimiento horizontal hacia la izquierda
        { row: 1, col: 1 }, // Diagonal inferior derecha
        { row: -1, col: -1 }, // Diagonal superior izquierda
        { row: 1, col: -1 }, // Diagonal inferior izquierda
        { row: -1, col: 1 }, // Diagonal superior derecha
      ];

      direccionesReina.forEach((dir) => {
        let nuevaFila = fila;
        let nuevaColumna = columna;

        // Moverse en la dirección hasta que se salga del tablero o encuentre una pieza
        while (true) {
          nuevaFila += dir.row;
          nuevaColumna += dir.col;

          // Verificar si la nueva posición está dentro de los límites del tablero
          if (
            nuevaFila > 0 &&
            nuevaFila <= 8 &&
            nuevaColumna > 0 &&
            nuevaColumna <= 8
          ) {
            movimientos.push({ row: nuevaFila, col: nuevaColumna });
          } else {
            break; // Salir si se sale del tablero
          }

          // Aquí podrías agregar una verificación para detenerse si hay una pieza en el camino.
          const casillaBloqueada = document.querySelector(
            `.Casilla[data-row="${nuevaFila}"][data-col="${nuevaColumna}"]`
          );
          if (casillaBloqueada && casillaBloqueada.textContent.trim()) {
            break; // Detenerse si hay una pieza en el camino
          }
        }
      });
      break;

    case "♔": // Rey blanco
    case "♚": // Rey negro
      const movimientosRey = [
        { row: fila - 1, col: columna - 1 }, // Diagonal superior izquierda
        { row: fila - 1, col: columna }, // Arriba
        { row: fila - 1, col: columna + 1 }, // Diagonal superior derecha
        { row: fila, col: columna - 1 }, // Izquierda
        { row: fila, col: columna + 1 }, // Derecha
        { row: fila + 1, col: columna - 1 }, // Diagonal inferior izquierda
        { row: fila + 1, col: columna }, // Abajo
        { row: fila + 1, col: columna + 1 }, // Diagonal inferior derecha
      ];

      movimientos.push(...movimientosRey);
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

    case "♟": // Peón negro
      // Movimiento hacia adelante
      if (fila > 1) {
        movimientos.push({ row: fila - 1, col: columna }); // Movimiento normal
        // Primer movimiento (dos espacios)
        if (fila === 7) {
          movimientos.push({ row: fila - 2, col: columna });
        }
      }
      // Capturas diagonales
      if (fila > 1) {
        if (columna > 1) {
          // Diagonal izquierda
          movimientos.push({ row: fila - 1, col: columna - 1 });
        }
        if (columna < 8) {
          // Diagonal derecha
          movimientos.push({ row: fila - 1, col: columna + 1 });
        }
      }
      break;
  }

  return movimientos.filter(
    (m) => m.row > 0 && m.row <= 8 && m.col > 0 && m.col <= 8
  );
}

// Evento de clic en cada casilla
casillas.forEach((casilla) => {
  casilla.addEventListener("click", () => {
    const fila = parseInt(casilla.getAttribute("data-row"));
    const columna = parseInt(casilla.getAttribute("data-col"));
    const pieza = casilla.textContent.trim();

    if (pieza) {
      const movimientos = obtenerMovimientos(pieza, fila, columna);
      console.log("Movimientos válidos:", movimientos);

      // Resaltar casillas válidas
      casillas.forEach((c) => c.classList.remove("valid-move"));
      movimientos.forEach((m) => {
        const casillaValida = document.querySelector(
          `.Casilla[data-row="${m.row}"][data-col="${m.col}"]`
        );
        if (casillaValida) casillaValida.classList.add("valid-move");
      });
    }
  });
});
