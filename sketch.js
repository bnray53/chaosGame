//Tracks number of user selected fixed points
var pointTracker = 0;

//Number of fixed point, eventually have this be set by user
var numPoints = 3;

//flag for only allowing one starting point to be placed
var initialPointFlag=true;

//Array to be used for reference variables for fixed point objects
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

function CreateInitialPoint(posX, posY){
	console.log("inside create initial point method");
	point(posX, posY);
	//set currentpt object's x and y
	currentPoint.x=posX;
	currentPoint.y=posY;
	return;
}

var currentPoint={
	x: 0,
	y: 0
}

function mousePressed() {
  if (mouseX < width && mouseY < height) {
    if (pointTracker <= numPoints - 1) {
	 var i=pointTracker;
	 pointArray.push(new CreatePoint(mouseX, mouseY));
	 stroke(255);
	 ellipse(pointArray[i].posX, pointArray[i].posY, 15, 15);
	 fill(255);
	 console.log(pointArray[i]);
	 pointTracker++;
	 
    } else if(pointTracker>=numPoints) {
	 if(initialPointFlag){
		 //initial point logic
		 //console.log("Pretending to call initial point method");
		 CreateInitialPoint(mouseX, mouseY);
		 initialPointFlag=false;
	 }
	 console.log("Too many fixed points");
	 console.log(initialPointFlag);
	 console.log(pointArray);
    }
  } else {
    if (pointTracker <= numPoints - 1) {
	 console.log("Please click inside the canvas area");
    }
  }
}

function myFunction() {
  if ((pointTracker > numPoints - 1)&& !(initialPointFlag)) {
    for (i = 0; i < 5; i++) {
	 //Put halving logic in here
	 //Time out with seperate function to generate points for cool factor?
	 var x = (pointArray[0].posX + currentPoint.x) / 2;
	 var y = (pointArray[0].posY + currentPoint.y) / 2;
	 point(x, y);
	 currentPoint.x=x;
	 currentPoint.y=y;
    }
  } else {
    console.log("Select initial fixed points first");
  }
}
