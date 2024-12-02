class Obstacle {
    constructor(x, y, w, h) {
      this.pos = createVector(x, y);
      this.w = w;
      this.h = h;
    }
  
    show() {
      fill(100);
      rect(this.pos.x, this.pos.y, this.w, this.h);
    }
  
    contains(vehicle) {
      let v = vehicle.pos;
      return v.x > this.pos.x && v.x < this.pos.x + this.w &&
             v.y > this.pos.y && v.y < this.pos.y + this.h;
    }
  }
  