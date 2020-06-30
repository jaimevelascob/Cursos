"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const FPS = 50;

const anchoF = 50;
const altoF = 50;

// COLORES
const muro = "#044f14";
const puerta = "#3a1700";
const tierra = "#c6892f";
const llave = "#c6bc00";

const colorProta = "#820c01";

const escenario = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0],
  [0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 0, 0],
  [0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
  [0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0],
  [0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 1, 0, 0, 2, 0],
  [0, 2, 2, 3, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// funcion dibujar escenario

function dibujaEscenario() {
  let color;
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 15; x++) {
      if (escenario[y][x] == 0) {
        color = muro;
      }
      if (escenario[y][x] == 1) {
        color = puerta;
      }
      if (escenario[y][x] == 2) {
        color = tierra;
      }
      if (escenario[y][x] == 3) {
        color = llave;
      }
      ctx.fillStyle = color;
      ctx.fillRect(x * anchoF, y * altoF, anchoF, altoF);
    }
  }
}

// OBJETO PROTAGONISTA

const jugador = function () {
  this.x = 1;
  this.y = 1;
  this.color = "#820c01";
  this.llave = false;

  this.dibuja = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * anchoF, this.y * altoF, anchoF, altoF);
  };

  this.margenes = function (x, y) {
    const colision = false;
    if (escenario[y][x] == 0) {
      colision = true;
    }
    return colision;
  };

  // MOVER

  this.arriba = function () {
    if (this.margenes(this.x, this.y - 1) == false) this.y--;
    this.logicaObjetos();
  };

  this.abajo = function () {
    if (this.margenes(this.x, this.y + 1) == false) this.y++;
    this.logicaObjetos();
  };
  this.izquierda = function () {
    if (this.margenes(this.x - 1, this.y) == false) this.x--;
    this.logicaObjetos();
  };
  this.derecha = function () {
    if (this.margenes(this.x + 1, this.y) == false) this.x++;
    this.logicaObjetos();
  };

  // ACABAR EL JUEGO

  this.victoria = function () {
    console.log("Has ganado!");
    this.x = 1;
    this.y = 1;
    this.llave = false; //el jugador ya no tiene la llave
    escenario[8][3] = 3; //reinicio
  };
  //LLAVE
  this.logicaObjetos = function () {
    const objeto = escenario[this.y][this.x];
    // obtiene llave
    if (objeto == 3) {
      this.llave = true;
      escenario[this.y][this.x] = 2;
      console.log("Has obtenido la llave!!!");
    }

    // ABRIMOS PUERTA
    if (objeto == 1) {
      if (this.llave == true) this.victoria();
      else {
        console.log("No tienes la llave, no puedes pasar!");
      }
    }
  };
};

// CREAMOS AL JUGADOR
const protagonista = new jugador();
// funcion que carga el canvas //

function chrono() {
  setInterval(() => {
    principal();
  }, 1000 / FPS);
}
// LECTURA TECLADO
document.addEventListener("keydown", function (tecla) {
  // ARRIBA
  if (tecla.keyCode == 38) {
    protagonista.arriba();
  }
  // ABAJO
  if (tecla.keyCode == 40) {
    protagonista.abajo();
  }
  // IZQ
  if (tecla.keyCode == 37) {
    protagonista.izquierda();
  }
  // DERECHA
  if (tecla.keyCode == 39) {
    protagonista.derecha();
  }
});
// funcion que borra el canvas //
function borraCanvas() {
  canvas.width = 750;
  canvas.height = 500;
}

// llamar a los personajes y sus funciones //
chrono();
function principal() {
  //console.log("hola ");
  borraCanvas();
  dibujaEscenario();
  protagonista.dibuja();
}
