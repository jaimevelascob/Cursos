"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const FPS = 50;

const anchoF = 50;
const altoF = 50;

// imagen
const tileMap = new Image();
tileMap.src = "img/tibia.png";

// para la camara (que no se salga)
const anchoEscenario = 25;
const altoEScenario = 20;

// ememigos

const enemigos = [];

const colorProta = "#820c01";

const escenario = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

// camara -clase (coordenadas y tamaño)
const objCamara = function (x, y, tamX, tamY, posX, posY) {
  this.x = x;
  this.y = y;

  this.tamX = tamX;
  this.tamY = tamY;

  this.posX = posX;
  this.posY = posY;

  this.dibuja = function () {
    for (let y = this.y; y < this.tamY + this.y; y++) {
      for (let x = this.x; x < this.tamX + this.x; x++) {
        let tile = escenario[y][x];
        ctx.drawImage(
          tileMap,
          tile * 32,
          0,
          32,
          32,
          anchoF * (x - this.x + this.posX),
          altoF * (y - this.y + this.posY),
          anchoF,
          altoF
        );
      }
    }
  };

  this.arriba = function () {
    if (this.y > 0) {
      this.y--;
    }
  };
  this.abajo = function () {
    if (this.y < altoEScenario - tamY) {
      this.y++;
    }
  };
  this.izquierda = function () {
    if (this.x > 0) {
      this.x--;
    }
  };
  this.derecha = function () {
    if (this.x < anchoEscenario - this.tamX) {
      this.x++;
    }
  };
};

// funcion dibujar escenario

/*function dibujaEscenario() {
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
*/

// clase enemigos
const malo = function (x, y) {
  this.x = x;
  this.y = y;

  this.direccion = Math.floor(Math.random() * 4);

  this.retraso = 50;
  this.fotograma = 0;

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

// creamos camara
const camara = new objCamara(2, 2, 5, 5, 1, 1);
const camara2 = new objCamara(3, 4, 4, 6, 8, 2);

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
    camara.arriba();
  }
  // ABAJO
  if (tecla.keyCode == 40) {
    camara.abajo();
  }
  // IZQ
  if (tecla.keyCode == 37) {
    camara.izquierda();
  }
  // DERECHA
  if (tecla.keyCode == 39) {
    camara.derecha();
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
  // dibujaEscenario();
  protagonista.dibuja();
  camara.dibuja();
  camara2.dibuja();

  for (let c = 0; c < enemigos.length; c++) {
    enemigos[c].mueve();
    enemigos[c].dibuja();
  }
}
