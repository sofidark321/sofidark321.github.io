class Particle {
    constructor(x, y) {
      this.pos = createVector(x, y);
      this.vel = p5.Vector.random2D().mult(random(1, 3));
      this.alpha = 255;
    }
  
    update() {
      this.pos.add(this.vel);
      this.alpha -= 5;
    }
  
    show() {
      noStroke();
      fill(255, this.alpha);
      ellipse(this.pos.x, this.pos.y, 10);
    }
  
    isFinished() {
      return this.alpha <= 0;
    }
  }
  