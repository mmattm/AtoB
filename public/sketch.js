let socket;
let sprites = [];
let text_size = 246;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  socket = io("http://10.192.234.70:3000");

  // Je reçois l'information des autres
  socket.on("sprite update", data => {
    // Si je n'existe pas encore…
    if (sprites[data.id] == undefined) {
      sprites.push(new Module(data.id, width / 2, height / 2));
    }
    // sinon je met juste à jour mes attributs
    sprites[data.id].position.x = data.x;
    sprites[data.id].position.y = data.y;
    sprites[data.id].velocity.x = data.vx;
    sprites[data.id].velocity.y = data.vy;
    sprites[data.id].screen = data.screen;
  });

  // Callback function
  socket.on("screen update", data => {
    if (data.a_width != undefined) a_width = data.a_width;
    if (data.a_height != undefined) a_height = data.a_height;
    if (data.b_width != undefined) b_width = data.b_width;
    if (data.b_height != undefined) b_height = data.b_height;
  });

  let font = loadFont("assets/CircularXX-Book.otf");
  textSize(text_size);
  textAlign(CENTER, CENTER);
  fill(255);
}

function draw() {
  screensUpdate();
  background(0, 0, 0, 100);

  text(screen, width / 2, height / 2);

  // Boucle sur tous mes objets
  sprites.forEach(sprite => {
    if (screen == sprite.screen) {
      sprite.display();
      sprite.update();
    }
  });
}

function mouseReleased() {
  let sprite = new Module(sprites.length, mouseX, mouseY);
  sprites.push(sprite);

  spriteUpdate(sprite);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);

  if (screen == "A") {
    a_width = windowWidth;
    a_height = windowHeight;
  } else if (screen == "B") {
    b_width = windowWidth;
    b_height = windowHeight;
  }

  screensUpdate();
}

function spriteUpdate(sprite) {
  // j'envoie l'information aux autres
  let data = {
    id: sprite.id,
    x: sprite.position.x,
    y: sprite.position.y,
    vx: sprite.velocity.x,
    vy: sprite.velocity.y,
    screen: sprite.screen
  };

  socket.emit("sprite update", data);
}

// Sending data to the socket
function screensUpdate() {
  const data = {
    a_width: a_width,
    a_height: a_height,
    b_width: b_width,
    b_height: b_height
  };

  socket.emit("screen update", data);
}
