"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const FPS = 50;

// medidas pixels (casillas)
const anchoF = 50;
const altoF = 50;

// colores
const muro = "#044f14";
const tierra = "#c6892f";

// Escenario
const escenario = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
  [0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0],
  [0, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// clase jugador

const jugador = function () {
  // ATRIBUTOS

  // posicion
  this.x = 100;
  this.y = 100;

  // velocidad
  this.vx = 0;
  this.vy = 0;

  // fuerzas
  this.gravedad = 0.5;
  this.friccion = 0.4;
  // fuerzas jugador
  this.salto = 10;
  this.velocidad = 1;
  this.velocidadMax = 5;
  //suelo
  this.suelo = false;

  // teclado
  this.pulsaIzquierda = false;
  this.pulsaDerecha = false;

  this.colision = function (x, y) {
    let colisiona = false;

    if (escenario[parseInt(y / altoF)][parseInt(x / anchoF)] == 0) {
      colisiona = true;
    }
    return colisiona;
  };

  //CORREGIR LOS BLOQUES

  this.correccion = function (lugar) {
    //ABAJO
    if (lugar == 1) {
      this.y = parseInt(this.y / altoF) * altoF;
    }
    // ARRIBA
    if (lugar == 2) {
      this.y = parseInt(this.y / altoF + 1) * altoF;
    }
    //IZQUIERDA
    if (lugar == 3) {
      this.x = parseInt(this.x / anchoF) * anchoF;
    }
    //DERECHA
    if (lugar == 3) {
      this.x = parseInt(this.x / anchoF + 1) * anchoF;
    }
  };

  this.fisica = function () {
    // gravedad
    if (this.suelo == false) {
      this.vy += this.gravedad;
    }

    // movimiento horizontal
    if (this.pulsaDerecha == true && this.vx <= this.velocidadMax) {
      this.vx += this.velocidad;
    }
    if (this.pulsaIzquierda == true && this.vx >= 0 - this.velocidadMax) {
      this.vx -= this.velocidad;
    }

    // FRICCION

    // derecha
    if (this.vx > 0) {
      this.vx -= this.friccion;

      if (this.vx < 0) {
        this.vx = 0;
      }
    }
    // izquierda
    if (this.vx < 0) {
      this.vx += this.friccion;

      if (this.vx > 0) {
        this.vx = 0;
      }
    }

    //COLISIONES

    //DERECHA
    if (this.vx > 0) {
      if (
        this.colision(this.x + anchoF + this.vx, this.y + 1) == true ||
        this.colision(this.x + anchoF + this.vx, this.y + altoF - 1) == true
      ) {
        if (this.x != parseInt(this.x / anchoF) * anchoF) {
          this.correccion(4);
          this.vx = 0;
        }
      }
    }

    // IZQUIERDA
    if (this.vx < 0) {
      if (
        this.colision(this.x + this.vx, this.y + 1) == true ||
        this.colision(this.x + this.vx, this.y + altoF - 1) == true
      ) {
        if (this.x != parseInt(this.x / anchoF) * anchoF) {
          this.correccion(4);
          this.vx = 0;
        }
      }
    }

    // Asigne valores
    this.y += this.vy;
    this.x += this.vx;

    //colision techo
    if (this.vy < 0) {
      if (
        this.colision(this.x + 1, this.y) == true ||
        this.colision(this.x + anchoF - 1, this.y) == true
      ) {
        this.vy = 0;
        this.correccion(2);
      }
    }

    //colision suelo
    if (this.vy >= 0) {
      if (
        this.colision(this.x + 1, this.y + altoF) == true ||
        this.colision(this.x + anchoF - 1, this.y + altoF) == true
      ) {
        this.suelo = true;
        this.vy = 0;
        this.correccion(1);
      } else {
        this.suelo = false;
      }
    }
  };

  // mover
  this.arriba = function () {
    if (this.suelo == true) {
      this.vy -= this.salto;
      this.suelo = false;
    }
  };

  // PULSA DERECHA
  this.derecha = function () {
    this.pulsaDerecha = true;
  };

  // PULSA IZQUIERDA
  this.izquierda = function () {
    this.pulsaIzquierda = true;
  };

  // SUELTA DERECHA
  this.sueltaDerecha = function () {
    this.pulsaDerecha = false;
  };

  // SUELTA IZQUIERDA
  this.sueltaIzquierda = function () {
    this.pulsaIzquierda = false;
  };

  this.dibuja = function () {
    this.fisica();
    ctx.fillStyle = "#D262E6";
    ctx.fillRect(this.x, this.y, anchoF, altoF);
  };
};

// Dibujar escenario
function dibujaEscenario() {
  let color;
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 15; x++) {
      if (escenario[y][x] == 0) color = muro;
      if (escenario[y][x] == 2) color = tierra;

      ctx.fillStyle = color;
      ctx.fillRect(x * anchoF, y * altoF, anchoF, altoF);
    }
  }
}
// TECLADO
document.addEventListener("keydown", function (tecla) {
  // ARRIBA
  if (tecla.keyCode == 38) {
    protagonista.arriba();
  }
  // ABAJO
  if (tecla.keyCode == 40) {
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

//-------------------------------------

// funcion dinamica crear bloques

function creaBloque(x, y) {
  let xBloque = parseInt(x / anchoF);
  let yBloque = parseInt(y / altoF);

  let colorBloque = escenario[yBloque][xBloque];

  if (colorBloque == 0) {
    colorBloque = 2;
  } else {
    colorBloque = 0;
  }
  escenario[yBloque][xBloque] = colorBloque;
}

// dibujar bloque
function dibujarBloque(x, y) {
  ctx.fillStyle = "#777777";
  ctx.fillRect(
    parseInt(x / anchoF) * anchoF,
    parseInt(y / altoF) * altoF,
    anchoF,
    altoF
  );
}
// funciones raton
let ratonX = 0;
let ratonY = 0;
function clickRaton(objeto) {
  console.log("aprieta");
}
function sueltaRaton(objeto) {
  creaBloque(ratonX, ratonY);
  console.log("suelta");
}
function mueveRaton(objeto) {
  ratonX = objeto.pageX;
  ratonY = objeto.pageY;

  console.log(ratonX, ratonY);
}
// LECTURA RATON
canvas.addEventListener("mousedown", clickRaton, false);
canvas.addEventListener("mouseup", sueltaRaton, false);
canvas.addEventListener("mousemove", mueveRaton, false);

// LIBERACION TECLAS

document.addEventListener("keyup", function (tecla) {
  // IZQ
  if (tecla.keyCode == 37) {
    protagonista.sueltaIzquierda();
  }
  // DERECHA
  if (tecla.keyCode == 39) {
    protagonista.sueltaDerecha();
  }
});
// crear al protagonista
const protagonista = new jugador();

// funcion chrono
function chrono() {
  setInterval(() => {
    principal();
  }, 1000 / FPS);
}

// BORRAR CANVAS
function borraCanvas() {
  canvas.width = 750;
  canvas.height = 500;
}

chrono();
// funcion principal
function principal() {
  borraCanvas();
  dibujaEscenario();
  dibujarBloque(ratonX, ratonY);
  protagonista.dibuja();
}
