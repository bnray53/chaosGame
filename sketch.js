//Tracks number of user selected fixed points
var pointTracker = 0;

//Array of five variables name to be used as reference variables for fixed point objects
var pointArray = [
  "pointOne",
  "pointTwo",
  "pointThree",
  "pointFour",
  "pointFive"
];

function setup() {
  // put setup code here
  createCanvas(920, 500);
  background(100);
}

function draw() {}

//Constructor for fixed points
function CreatePoint(posX, posY) {
  this.posX = posX;
  this.posY = posY;
}

function mousePressed() {
  if (mouseX < width && mouseY < height) {
    if (pointTracker <= 4) {
      var arrayElement = pointArray[pointTracker];
      var arrayElement = new CreatePoint(mouseX, mouseY);
      stroke(255);
      console.log("Inside mousePressed");
      ellipse(arrayElement.posX, arrayElement.posY, 15, 15);
      fill(255);
      pointTracker++;
      //point(100, 100);
    } else {
      console.log("Too many ellipses");
    }
  }
}

function myFunction() {
  if (pointTracker > 4) {
    for (i = 0; i < 1000; i++) {
      console.log("Activated");
      var x = random(0, 920);
      var y = random(0, 500);
      point(x, y);
    }
  } else {
    console.log("select initial fixed point first");
  }
}
