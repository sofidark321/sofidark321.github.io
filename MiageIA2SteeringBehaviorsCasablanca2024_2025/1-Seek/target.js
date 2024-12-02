class Target {
    constructor(x, y, r) {
      this.pos = createVector(x, y);
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.r = r; // radius of the target
      this.maxSpeed = 5; // maximum speed
      this.maxForce = 0.3; // maximum steering force
    }
  
    applyForce(force) {
      this.acc.add(force);
    }
  
    applyBehaviors(vehicles) {
      let fleeForce = createVector(0, 0);
  
      // Combine flee forces for all vehicles in range
      vehicles.forEach((vehicle) => {
        let d = p5.Vector.dist(this.pos, vehicle.pos);
        if (d < 250) { // Adjust the perception range as needed
          let force = this.flee(vehicle.pos);
          fleeForce.add(force);
        }
      });
  
      // Apply the combined fleeing force
      fleeForce.limit(this.maxForce);
      this.applyForce(fleeForce);
    }
  
    flee(vehiclePos) {
      // Calculate the desired velocity to flee
      let desired = p5.Vector.sub(this.pos, vehiclePos);
      desired.setMag(this.maxSpeed);
  
      // Calculate the steering force
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxForce);
      return steer;
    }
  
    update() {
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel);
      this.acc.set(0, 0); // Reset acceleration for the next frame
    }
  
    edges() {
        // Check if the ball goes beyond the left or right edges
        if (this.pos.x > width - this.r || this.pos.x < this.r) {
          this.vel.x *= -1; // Rebound horizontally
          this.pos.x = constrain(this.pos.x, this.r, width - this.r); // Ensure the ball stays within bounds
        }
      
        // Check if the ball goes beyond the top or bottom edges
        if (this.pos.y > height - this.r || this.pos.y < this.r) {
          this.vel.y *= -1; // Rebound vertically
          this.pos.y = constrain(this.pos.y, this.r, height - this.r); // Ensure the ball stays within bounds
        }
      
        // If the ball goes beyond the corner (both X and Y), reflect the velocity on both axes
        if (this.pos.x > width - this.r || this.pos.x < this.r) {
          if (this.pos.y > height - this.r || this.pos.y < this.r) {
            this.vel.mult(-1); // Rebound in all directions (diagonal)
            this.pos.x = constrain(this.pos.x, this.r, width - this.r); // Ensure the ball stays within bounds
            this.pos.y = constrain(this.pos.y, this.r, height - this.r); // Ensure the ball stays within bounds
          }
        }
      }
      
  
    show() {
      noStroke();
      fill(0, 100, 155, 50);
      imageMode(CENTER);
      image(ballImage, this.pos.x, this.pos.y, this.r * 1, this.r * 1);
    }
  
    // Rebound when colliding with a vehicle
    rebound(vehicle) {
      // Calculate the vector from the ball to the vehicle
      let collisionVector = p5.Vector.sub(this.pos, vehicle.pos);
      let distance = collisionVector.mag();
  
      // If the distance is less than the sum of the radii, we have a collision
      if (this.pos.x > width - this.r || this.pos.x < this.r) {
        this.vel.x *= -1; // Rebond horizontal
      }
      if (this.pos.y > height - this.r || this.pos.y < this.r) {
        this.vel.y *= -1; // Rebond vertical
      }
    }
  
    respawn() {
      this.pos = createVector(random(width), random(height));
      this.vel = p5.Vector.random2D().mult(random(1, 3));
    }
  }
  