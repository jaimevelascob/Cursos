"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const FPS = 50;

// ancho y alto canvas
const anchoCanvas = 400;
const altoCanvas = 640;

// tamaño real del tablero
const anchoTablero = 10;
const altoTablero = 20;

// medidas pixels
const anchoF = 40;
const altoF = 40;

// margensuperior

const margenSuperior = 4;
// tablero (12x17)
const tablero = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const tableroCopia = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// colores de las piezas
const rojo = "#FF0000";
const morado = "#800000";
const naranja = "#FF8C00";
const amarillo = "#FFD700";
const verde = "#000000";
const cyan = "#00CED1";
const azul = "#0000CD";

// todas las piezas con sus rotaciones

const fichaGrafico = [
  [
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
  ],

  [
    [
      [0, 0, 0, 0],
      [2, 2, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0],
    ],

    [
      [0, 0, 0, 0],
      [2, 2, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0],
    ],
  ],

  [
    [
      [0, 0, 0, 0],
      [0, 0, 3, 3],
      [0, 3, 3, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 3, 0],
      [0, 0, 3, 3],
      [0, 0, 0, 3],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0],
      [0, 0, 3, 3],
      [0, 3, 3, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 3, 0],
      [0, 0, 3, 3],
      [0, 0, 0, 3],
      [0, 0, 0, 0],
    ],
  ],

  [
    [
      [0, 0, 0, 0],
      [0, 4, 4, 0],
      [0, 0, 4, 4],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 4],
      [0, 0, 4, 4],
      [0, 0, 4, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0],
      [0, 4, 4, 0],
      [0, 0, 4, 4],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 4],
      [0, 0, 4, 4],
      [0, 0, 4, 0],
      [0, 0, 0, 0],
    ],
  ],

  [
    [
      [0, 0, 0, 0],
      [0, 5, 5, 5],
      [0, 5, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 5, 0],
      [0, 0, 5, 0],
      [0, 0, 5, 5],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 5],
      [0, 5, 5, 5],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 5, 5, 0],
      [0, 0, 5, 0],
      [0, 0, 5, 0],
      [0, 0, 0, 0],
    ],
  ],

  [
    [
      [0, 0, 0, 0],
      [0, 6, 6, 6],
      [0, 0, 0, 6],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 6, 6],
      [0, 0, 6, 0],
      [0, 0, 6, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 6, 0, 0],
      [0, 6, 6, 6],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 6, 0],
      [0, 0, 6, 0],
      [0, 6, 6, 0],
      [0, 0, 0, 0],
    ],
  ],

  [
    [
      [0, 0, 0, 0],
      [0, 7, 7, 7],
      [0, 0, 7, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 7, 0],
      [0, 0, 7, 7],
      [0, 0, 7, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 7, 0],
      [0, 7, 7, 7],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 7, 0],
      [0, 7, 7, 0],
      [0, 0, 7, 0],
      [0, 0, 0, 0],
    ],
  ],
];

// resetear tablero

function reseteaTablero() {
  for (let py = 0; py < 21; py++) {
    for (let px = 0; px < 12; px++) {
      tablero[py][px] = tableroCopia[py][px];
    }
  }
}

// clase piezas

class objPieza {
  constructor() {
    this.x = 1;
    this.y = 1;

    // ELEGIR TIPO
    this.angulo = 1;
    this.tipo = 0;

    // frames para que caiga
    this.retraso = 50;
    this.fotograma = 0;

    // generar nuevos
    this.nueva = function () {
      this.tipo = Math.floor(Math.random() * 7);
      this.y = 0;
      this.x = 4;
    };

    // perder
    this.compruebaSiPierde = function () {
      let pierde = false;
      for (let px = 1; px < anchoTablero + 1; px++) {
        if (tablero[2][px] > 0) {
          pierde = true;
        }
      }
      return pierde;
    };

    // limpiar tablero

    this.limpia = function () {
      let filaCompleta = true;

      for (let py = margenSuperior; py < altoTablero; py++) {
        filaCompleta = true;

        for (let px = 1; px < anchoTablero + 1; px++) {
          if (tablero[py][px] == 0) {
            filaCompleta = false;
          }
        }
        if (filaCompleta == true) {
          for (let px = 1; px < anchoTablero + 1; px++) {
            tablero[py][px] == 0;
          }
        }
      }
    };
    // caer
    this.caer = function () {
      if (this.fotograma < this.retraso) {
        this.fotograma++;
      } else {
        if (this.colision(this.angulo, this.y + 1, this.x) == false) {
          this.y++;
        } else {
          this.fijar();
          this.limpia();
          this.nueva();

          if (this.compruebaSiPierde() == true) {
            reseteaTablero();
          }
        }
        this.fotograma = 0;
      }
    };

    // fijar

    this.fijar = function () {
      for (let py = 0; py < 4; py++) {
        for (let px = 0; px < 4; px++) {
          if (fichaGrafico[this.tipo][this.angulo][py][px] > 0) {
            tablero[this.y + py][this.x + px] =
              fichaGrafico[this.tipo][this.angulo][py][px];
          }
        }
      }
    };

    // colision

    this.colision = function (anguloNuevo, yNueva, xNueva) {
      let resultado = false;

      // bucle para recorrer la imagen
      for (let py = 0; py < 4; py++) {
        for (let px = 0; px < 4; px++) {
          if (fichaGrafico[this.tipo][anguloNuevo][py][px] > 0) {
            if (tablero[yNueva + py][xNueva + px] > 0) {
              resultado = true;
            }
          }
        }
      }
      return resultado;
    };

    // DIBUJAR TIPO
    this.dibuja = function () {
      for (let py = 0; py < 4; py++) {
        for (let px = 0; px < 4; px++) {
          if (fichaGrafico[this.tipo][this.angulo][py][px] != 0) {
            ctx.fillStyle = "#777777";
            ctx.fillRect(
              (this.x + px - 1) * anchoF,
              (this.y + py - margenSuperior) * altoF,
              anchoF,
              altoF
            );
          }
          if (fichaGrafico[this.tipo][this.angulo][py][px] == 1) {
            ctx.fillStyle = rojo;
            ctx.fillRect(
              (this.x + px - 1) * anchoF,
              (this.y + py - margenSuperior) * altoF,
              anchoF,
              altoF
            );
          }
          if (fichaGrafico[this.tipo][this.angulo][py][px] == 2) {
            ctx.fillStyle = naranja;
            ctx.fillRect(
              (this.x + px - 1) * anchoF,
              (this.y + py - margenSuperior) * altoF,
              anchoF,
              altoF
            );
          }
          if (fichaGrafico[this.tipo][this.angulo][py][px] == 3) {
            ctx.fillStyle = amarillo;
            ctx.fillRect(
              (this.x + px - 1) * anchoF,
              (this.y + py - margenSuperior) * altoF,
              anchoF,
              altoF
            );
          }
          if (fichaGrafico[this.tipo][this.angulo][py][px] == 4) {
            ctx.fillStyle = verde;
            ctx.fillRect(
              (this.x + px - 1) * anchoF,
              (this.y + py - margenSuperior) * altoF,
              anchoF,
              altoF
            );
          }
          if (fichaGrafico[this.tipo][this.angulo][py][px] == 5) {
            ctx.fillStyle = cyan;
            ctx.fillRect(
              (this.x + px - 1) * anchoF,
              (this.y + py - margenSuperior) * altoF,
              anchoF,
              altoF
            );
          }
          if (fichaGrafico[this.tipo][this.angulo][py][px] == 6) {
            ctx.fillStyle = azul;
            ctx.fillRect(
              (this.x + px - 1) * anchoF,
              (this.y + py - margenSuperior) * altoF,
              anchoF,
              altoF
            );
          }
          if (fichaGrafico[this.tipo][this.angulo][py][px] == 7) {
            ctx.fillStyle = morado;
            ctx.fillRect(
              (this.x + px - 1) * anchoF,
              (this.y + py - margenSuperior) * altoF,
              anchoF,
              altoF
            );
          }
        }
      }
    };

    this.rotar = function () {
      let anguloNuevo = this.angulo;
      if (anguloNuevo < 3) {
        anguloNuevo++;
      } else {
        anguloNuevo = 0;
      }
      if (this.colision(anguloNuevo, this.y, this.x) == false) {
        this.angulo = anguloNuevo;
      }
    };

    // comprobar colision

    this.abajo = function () {
      if (this.colision(this.angulo, this.y + 1, this.x) == false) {
        this.y++;
        console.log("abajo");
      }
    };
    this.derecha = function () {
      if (this.colision(this.angulo, this.y, this.x + 1) == false) {
        this.x++;
        console.log("derecha");
      }
    };
    this.izquierda = function () {
      if (this.colision(this.angulo, this.y, this.x - 1) == false) {
        this.x--;
        console.log("abajo");
      }
    };
    this.nueva();
  }
}

// dibujar tablero
function dibujaTablero() {
  for (let py = margenSuperior; py < altoTablero; py++) {
    for (let px = 1; px < anchoTablero + 1; px++) {
      if (tablero[py][px] != 0) {
        if (tablero[py][px] == 1) ctx.fillStyle = rojo;

        if (tablero[py][px] == 2) ctx.fillStyle = naranja;

        if (tablero[py][px] == 3) ctx.fillStyle = amarillo;

        if (tablero[py][px] == 4) ctx.fillStyle = verde;

        if (tablero[py][px] == 5) ctx.fillStyle = cyan;

        if (tablero[py][px] == 6) ctx.fillStyle = azul;

        if (tablero[py][px] == 7) ctx.fillStyle = morado;

        ctx.fillRect(
          (px - 1) * anchoF,
          (py - margenSuperior) * altoF,
          anchoF,
          altoF
        );
      }
    }
  }
}
// enlazar teclado

// pillamos id de canvas
function inicializa() {
  canvas.style.width = anchoCanvas;
  canvas.style.height = altoCanvas;
}

const pieza = new objPieza();
// creamos funcion donde metemos el interval
function chrono() {
  setInterval(() => {
    principal();
  }, 1000 / FPS);
}

// TECLADO
document.addEventListener("keydown", function (tecla) {
  // ARRIBA
  if (tecla.keyCode == 38) {
    pieza.rotar();
  }
  // ABAJO
  if (tecla.keyCode == 40) {
    pieza.abajo();
  }
  // IZQ
  if (tecla.keyCode == 37) {
    pieza.izquierda();
  }
  // DERECHA
  if (tecla.keyCode == 39) {
    pieza.derecha();
  }
});

// BORRAR CANVAS
function borraCanvas() {
  canvas.width = anchoCanvas;
  canvas.height = altoCanvas;
}

chrono();
// funcion principal
function principal() {
  borraCanvas();
  pieza.caer();
  pieza.dibuja();
  dibujaTablero();
}
