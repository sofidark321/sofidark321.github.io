let vehicles = [];
let target;
let carImage, ballImage;
let particles = [];
let sliders = {};

function preload() {
  carImage = loadImage('assets/car.png');
  ballImage = loadImage('assets/ball.png');
}

function setup() {
  createCanvas(800, 800);
  target = new Target(random(width), random(height), 50);

  for (let i = 0; i < 10; i++) {
    vehicles.push(new Vehicle(random(width), random(height), carImage));
  }

  createSliderUI();
}

function draw() {
  background(20);

  // Target behaviors
  target.applyBehaviors(vehicles);
  target.update();
  target.edges();

  // Vehicles behaviors
  vehicles.forEach((vehicle) => {
    vehicle.applyBehaviors(target.pos);
    vehicle.update();
    vehicle.edges();
    vehicle.show();

    // Check for collision between the target and vehicles
    target.rebound(vehicle);

    // If target collides with vehicle, respawn the target (optional)
    if (vehicle.pos.dist(target.pos) < vehicle.r + target.r) {
      target.respawn();
    }
  });

  target.show();
}


function createSliderUI() {
  sliders.maxSpeed = createSlider(1, 20, 10, 1).position(10, 10);
  sliders.maxForce = createSlider(0.1, 5, 0.25, 0.1).position(10, 40);
}
