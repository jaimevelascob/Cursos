"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const FPS = 50;

const anchoF = 50;
const altoF = 50;

// imagen
const tileMap = new Image();
tileMap.src = "img/tibia.png";

// ememigos

const enemigos = [];

const colorProta = "#820c01";

const escenario = [
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 0, 2, 2, 2, 2, 2, 2, 0, 2, 0, 0, 2, 2, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0],
  [0, 0, 2, 2, 2, 0, 2, 2, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 0, 2, 0, 0],
  [0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0],
  [0, 2, 2, 2, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 0, 2, 0, 0],
  [0, 2, 2, 3, 0, 0, 2, 0, 0, 1, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0],
  [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
  [0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
  [0, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0],
  [0, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0],
  [0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
  [0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0],
  [0, 2, 2, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0],
  [0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0],
  [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// funcion dibujar escenario

function dibujaEscenario() {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 15; x++) {
      let tile = escenario[y][x];
      ctx.drawImage(
        tileMap,
        tile * 32,
        0,
        32,
        32,
        anchoF * x,
        altoF * y,
        anchoF,
        altoF
      );
    }
  }
}

// clase enemigos
const malo = function (x, y) {
  this.x = x;
  this.y = y;

  this.direccion = Math.floor(Math.random() * 4);

  this.retraso = 50;
  this.fotograma = 0;

  // set get

  this.getCoordenadas = function () {
    const coordenadas = [];
    coordenadas.push(this.x);
    coordenadas.push(this.y);

    return coordenadas;
  };

  // variar los datos
  this.setCoordenadas = function (x, y) {
    this.x = x;
    this.y = y;
  };

  this.dibuja = function () {
    ctx.drawImage(
      tileMap,
      0,
      32,
      32,
      32,
      this.x * anchoF,
      this.y * altoF,
      anchoF,
      altoF
    );
  };
  this.compruebaColision = function (x, y) {
    let colisiona = false;

    if (escenario[y][x] == 0) {
      colisiona = true;
    }
    return colisiona;
  };
  // MOVER ENEMIGOS
  this.mueve = function () {
    protagonista.colisionEnemigo(this.x, this.y);

    if (this.contador < this.retraso) {
      this.contador++;
    } else {
      this.contador = 0;

      // ARRIBA
      if (this.direccion == 0) {
        if (this.compruebaColision(this.x, this.y - 1) == false) {
          this.y--;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }
      // ABAJO
      if (this.direccion == 1) {
        if (this.compruebaColision(this.x, this.y + 1) == false) {
          this.y++;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }

      // IZq
      if (this.direccion == 2) {
        if (this.compruebaColision(this.x - 1, this.y) == false) {
          this.x--;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }
      // Derecha
      if (this.direccion == 3) {
        if (this.compruebaColision(this.x + 1, this.y) == false) {
          this.x++;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }
    }
  };
};
// OBJETO PROTAGONISTA

const jugador = function () {
  this.x = 1;
  this.y = 1;
  this.color = "#820c01";
  this.llave = false;

  // funcion que devuelva la informacion
  this.getCoordenadas = function () {
    const coordenadas = [];
    coordenadas.push(this.x);
    coordenadas.push(this.y);

    return coordenadas;
  };

  // variar los datos
  this.setCoordenadas = function (x, y) {
    this.x = x;
    this.y = y;
  };

  this.dibuja = function () {
    ctx.drawImage(
      tileMap,
      32,
      32,
      32,
      32,
      this.x * anchoF,
      this.y * altoF,
      anchoF,
      altoF
    );
  };

  this.colisionEnemigo = function (x, y) {
    if (this.x == x && this.y == y) {
      this.muerte();
    }
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

  // morir

  this.muerte = function () {
    console.log("Has perdido!");
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

// creamos enemigos
enemigos.push(new malo(3, 2));
enemigos.push(new malo(7, 6));
enemigos.push(new malo(6, 7));

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
  if (tecla.keyCode == 71) {
    guardarPartida();
    // guardar (g)
  }
  if (tecla.keyCode == 67) {
    cargaPartida();
    // cargar (c)
  }
  if (tecla.keyCode == 66) {
    // borrar (b)
  }
});
// funcion que borra el canvas //
function borraCanvas() {
  canvas.width = 750;
  canvas.height = 500;
}
// funcion guardar partida

function guardarPartida() {
  const coordenadas = [];
  let coordenadasJ = [];
  let coordenadasJ1 = [];
  let coordenadasJ2 = [];
  let coordenadasJ3 = [];
  coordenadasJ = protagonista.getCoordenadas();
  coordenadasJ1 = enemigos[0].getCoordenadas();
  coordenadasJ2 = enemigos[1].getCoordenadas();
  coordenadasJ3 = enemigos[2].getCoordenadas();

  // guardar datos
  // prota
  localStorage.setItem("jx", coordenadas[0]);
  localStorage.setItem("jy", coordenadas[1]);

  // enemigo1

  localStorage.setItem("e0x", coordenadasJ1[0]);
  localStorage.setItem("e0y", coordenadasJ1[1]);
  // enemigo2

  localStorage.setItem("e1x", coordenadasJ2[0]);
  localStorage.setItem("e1y", coordenadasJ2[1]);
  // enemigo3

  localStorage.setItem("e2x", coordenadasJ3[0]);
  localStorage.setItem("e2y", coordenadasJ3[1]);

  console.log("partida guardada");
}

// funcion cargar partida

function cargaPartida() {
  let jx = localStorage.getItem("jx");
  let jy = localStorage.getItem("jx");

  let e0x = localStorage.getItem("e0x");
  let e0y = localStorage.getItem("e0y");

  let e1x = localStorage.getItem("e1x");
  let e1y = localStorage.getItem("e1y");

  let e2x = localStorage.getItem("e2x");
  let e2y = localStorage.getItem("e2y");

  protagonista.setCoordenadas(jx, jy);
  enemigos[0].setCoordenadas(e0x, e0y);
  enemigos[1].setCoordenadas(e1x, e1y);
  enemigos[2].setCoordenadas(e2x, e2y);
}
// llamar a los personajes y sus funciones //
chrono();
function principal() {
  //console.log("hola ");
  borraCanvas();
  // dibujaEscenario();
  dibujaEscenario();
  protagonista.dibuja();

  for (let c = 0; c < enemigos.length; c++) {
    enemigos[c].mueve();
    enemigos[c].dibuja();
  }
}
