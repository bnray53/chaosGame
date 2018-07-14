//Tracks number of user selected fixed points
var pointTracker = 0;

//Number of fixed point, eventually have this be set by user
var numPoints = 3;

var initialPointFlag=true;

//Array of five variables name to be used as reference variables for fixed point objects
/*var pointArray = [
  "pointOne",
  "pointTwo",
  "pointThree",
  "pointFour",
  "pointFive"
];*/
var pointArray=[];

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
    if (pointTracker <= numPoints - 1) {
	 var i=pointTracker;
	 //pointArray[pointTracker]= "point"+pointTracker;
	 //var arrayElement = pointArray[pointTracker-1];
	 //var arrayElement = new CreatePoint(mouseX, mouseY);
	 pointArray.push(new CreatePoint(mouseX, mouseY));
	 stroke(255);
	 ellipse(pointArray[i].posX, pointArray[i].posY, 15, 15);
	 fill(255);
	 console.log(pointArray[i]);
	 pointTracker++;
	 //console.log(arrayElement);
	 
    } else if(pointTracker>=numPoints) {
	 //initial point logic

	 if(initialPointFlag){
		 console.log("Pretending to call initial point method");
		 initialPointFlag=false;
	 }
	 console.log("Too many fixed points");
	 console.log(pointArray);
    }
  } else {
    if (pointTracker <= numPoints - 1) {
	 console.log("Please click inside the canvas area");
    }
  }
}

function myFunction() {
  if (pointTracker > numPoints - 1) {
    for (i = 0; i < 5; i++) {
	 //Put halving logic in here
	 //Time out with seperate function to generate points for cool factor?
	 var x = (pointArray[0].posX + pointArray[1].posX) / 2;
	 var y = (pointArray[0].posY + pointArray[1].posY) / 2;
	 point(x, y);
	 /* var x = random(0, 920);
  	var y = random(0, 500);
  	point(x, y);*/
    }
  } else {
    console.log("Select initial fixed points first");
  }
}
