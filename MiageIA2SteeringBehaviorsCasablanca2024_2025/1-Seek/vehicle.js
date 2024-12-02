class Vehicle {
  constructor(x, y, img) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 16;
    this.maxSpeed = 10;
    this.maxForce = 0.25;
    this.img = img;
  }

  applyBehaviors(target) {
    let seekForce = this.seek(target);
    this.applyForce(seekForce);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  edges() {
    if (this.pos.x > width - this.r || this.pos.x < this.r) {
      this.vel.x *= -1; // Rebond horizontal
    }
    if (this.pos.y > height - this.r || this.pos.y < this.r) {
      this.vel.y *= -1; // Rebond vertical
    }
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    imageMode(CENTER);
    image(this.img, 0, 0, this.r * 3, this.r * 2);
    pop();
  }
}
