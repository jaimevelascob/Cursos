"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const FPS = 30;

// variables relacionadas con el tablero de juego
const filas = 100;
const columnas = 100;
// colores
const blanco = "#000fff";
const negro = "#000000";

// canvas
const canvasX = 500;
const canvasY = 500;

// tamaño tiles
const tileX = Math.floor(canvasX / filas);
const tileY = Math.floor(canvasY / columnas);

// creamos tablero
const tablero = creaArray2D(filas, columnas);

function creaArray2D(f, c) {
  const obj = new Array(c);
  for (let y = 0; y < c; y++) {
    obj[y] = new Array(f);
  }
  return obj;
}

//Objeto agente
class agente {
  constructor(x, y, estado) {
    this.x = x;
    this.y = y;
    this.estado = estado; //vivo = 1, muerto = 2
    this.estadoProx = this.estado; //estado siguiente ciclo

    this.vecino = []; // guardamos el listado de vecinos

    //Metodo que añade los vecinos del objeto actual
    this.addVecinos = function () {
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          const xVecino = (this.x + j + columnas) % columnas;
          const yVecino = (this.y + i + filas) % filas;

          //descartamos el agente actual (yo no puedo ser mi propio vecino)
          if (i != 0 || j != 0) {
            this.vecino.push(tablero[yVecino][xVecino]);
          }
        }
      }
    };
    this.dibuja = function () {
      let color;
      if (this.estado == 1) {
        color = blanco;
      } else {
        color = negro;
      }
      ctx.fillStyle = color;
      ctx.fillRect(this.x * tileX, this.y * tileY, tileX, tileY);
    };
  }

  //Programamaos las leyes de conway
  nuevoCiclo = function () {
    let suma = 0;
    //calculamos la cantidad de vecinos vivos
    for (let i = 0; i < this.vecino.length; i++) {
      suma += this.vecino[i].estado;
    }

    //aplicamos normas
    this.estadoProx = this.estado; //por defecto lo dejamos igual

    //MUerte : tiene menos de 2 o mas de 3
    if (suma < 2 || suma > 3) {
      this.estadoProx = 0;
    }
    // vida / reproduccion tiene 3 vecinos
    if (suma == 3) {
      this.estadoProx = 1;
    }

    this.mutacion = function () {
      this.estado = this.estadoProx;
    };
  };
}
// inicializar tablero
function inicializaTablero(obj) {
  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      const estado = Math.floor(Math.random() * 2);
      obj[y][x] = new agente(x, y, estado);
    }
  }
  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      obj[y][x].addVecinos();
    }
  }
}
function chrono() {
  setInterval(() => {
    principal();
  }, 1000 / FPS);
}

// BORRAR CANVAS
function borraCanvas() {
  canvas.width = canvasX;
  canvas.height = canvasY;
}

//funcion dibujar
function dibujaTablero(obj) {
  //DIBUJA LOS AGENTES
  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      obj[y][x].dibuja();
    }
  }

  //CALCULA EL SIGUIENTE CICLO
  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      obj[y][x].nuevoCiclo();
    }
  }
  //APLICA LA MUTACION
  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      obj[y][x].mutacion();
    }
  }
}

// declaramos
inicializaTablero(tablero);

chrono();
// funcion principal
function principal() {
  borraCanvas();
  dibujaTablero(tablero);
}
