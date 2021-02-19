class Module {
  constructor(id, x, y) {
    this.id = id;
    this.diameter = text_size;
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D().mult(random(5, 10));
    this.rotation = 0;
    this.screen = "A";
  }

  update() {
    // Tester pour l'écran A
    if (this.screen == "A") {
      // Bord gauche
      if (this.position.x <= this.diameter / 2) {
        this.velocity.x *= -1;
        // Bord droite
      } else if (this.position.x > width + this.diameter / 2) {
        this.screen = "B";
        this.position.x = 0;

        spriteUpdate(this);
      }
      // Tester pour l'écran B
    } else if (this.screen == "B") {
      // Bord gauche
      if (this.position.x <= -this.diameter / 2) {
        this.screen = "A";
        this.position.x = a_width;

        spriteUpdate(this);
        // Bord droite
      } else if (this.position.x >= width - this.diameter / 2) {
        this.velocity.x *= -1;
      }
    }

    // Checker les bords haut et bas
    if (
      this.position.y <= this.diameter / 2 ||
      this.position.y >= height - this.diameter / 2
    ) {
      this.velocity.y *= -1;
    }

    // Mettre à jour la position / vélocité
    this.position.add(this.velocity);
    this.rotation += 0.01;
  }

  display() {
    // affiche le sprite
    push();
    translate(this.position);
    rotate(this.rotation);
    text("🛹", 0, 0);
    pop();
  }
}
