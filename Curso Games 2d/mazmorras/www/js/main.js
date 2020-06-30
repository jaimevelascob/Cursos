"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const FPS = 50;

const imgBart = new Image();
imgBart.src = "img/rex.png";

// Create protagonist //
class protagonist {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocidad = 25;
    // DIBUJAR
    this.dibuja = function dibujaProta() {
      ctx.drawImage(imgBart, this.x, this.y);
    };
    // TEXTO
    this.text = function() {
      ctx.font = "20px impact";
      ctx.fillStyle = "#555555";
      ctx.fillText("X: " + this.x, 100, 100);
    };
    // MOVER
    this.arriba = function() {
      this.y -= this.velocidad;
    };
    this.abajo = function() {
      this.y += this.velocidad;
    };
    this.izquierda = function() {
      this.x -= this.velocidad;
    };
    this.derecha = function() {
      this.x += this.velocidad;
    };
  }
}

// Create enemys //
class Personaje {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.derecha = true;

    // funcion que dibuja //

    this.dibuja = function dibuja() {
      // color //
      ctx.fillStyle = "#FF0000";
      // anchura y altura //
      ctx.fillRect(this.x, this.y, 50, 50);
    };
    // funcion mover //
    this.mueve = function moverDerecha(velocidad) {
      if (this.derecha == true) {
        if (this.x < 400) this.x += velocidad;
        else {
          this.derecha = false;
        }
      } else {
        if (this.x > 50) this.x -= velocidad;
        else {
          this.derecha = true;
        }
      }
    };
  }
}

// enlazar teclado mover prota//
document.addEventListener("keydown", function(tecla) {
  //ARRIBA
  if (tecla.keyCode == 38) {
    prota.arriba();
  }

  //ABAJO
  if (tecla.keyCode == 40) {
    prota.abajo();
  }

  //IZQUIERDA
  if (tecla.keyCode == 37) {
    prota.izquierda();
  }
  //DERECHA
  if (tecla.keyCode == 39) {
    prota.derecha();
  }
});

// funcion que carga el canvas //

function chrono() {
  setInterval(() => {
    principal();
  }, 1000 / FPS);
}

// funcion que borra el canvas //
function borraCanvas() {
  canvas.width = 500;
  canvas.height = 400;
}
// declaracion de los personajes //

const personaje1 = new Personaje(10, 50);
const personaje2 = new Personaje(10, 120);
const personaje3 = new Personaje(10, 230);

const prota = new protagonist(200, 100);
// llamar a los personajes y sus funciones //
chrono();
function principal() {
  //console.log("hola ");
  borraCanvas();
  personaje1.dibuja();
  personaje2.dibuja();
  personaje3.dibuja();

  personaje1.mueve(1);
  personaje2.mueve(3);
  personaje3.mueve(7);

  prota.dibuja();
  prota.text();
}
