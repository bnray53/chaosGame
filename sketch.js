//Tracks number of user selected fixed points
var pointTracker = 0;

//Number of fixed point, eventually have this be set by user
var numPoints=3;

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
    if (pointTracker <= (numPoints-1)) {
      var arrayElement = pointArray[pointTracker];
      var arrayElement = new CreatePoint(mouseX, mouseY);
      stroke(255);
      ellipse(arrayElement.posX, arrayElement.posY, 15, 15);
      fill(255);
      pointTracker++;
    } else {
      console.log("Too many fixed points");
    }
  }else{
    if(pointTracker<=(numPoints-1)){
      console.log("Please click inside the canvas area");
    }  
  }
}

function myFunction() {
  if (pointTracker > (numPoints-1)) {
    for (i = 0; i < 10000; i++) {
      //Put halving logic in here
      //Time out with seperate function to generate points for cool factor?
      var x = random(0, 920);
      var y = random(0, 500);
      point(x, y);
    }
  } else {
    console.log("Pelect initial fixed points first");
  }
}
