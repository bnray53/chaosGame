//Tracks number of user selected fixed points
var pointTracker = 0;

//Number of fixed point, eventually have this be set by user
var numPoints = 5;

iterations=20;

processStarted=false;

//flag for only allowing one starting point to be placed
var initialPointFlag=true;

//Array to be used for reference variables for fixed point objects
var pointArray=[];

function setup() {
  // put setup code here
  var myCanvas=createCanvas(1200, 475);
  myCanvas.parent('myContainer');
  background(100);

  //Creating Slider
  numSlider = createSlider(2, 8, 3, 0);
  numSlider.position(width/2-40,height+50);
  numSlider.style('width', '150px');

  //Grid Layout
  var z=0
  for (var x = 0; x < width; x += width / 20) {
    for (var y = 0; y < height; y += height / 10) {
        stroke(0);
        strokeWeight(1);
        line(x, 0, x, height);
        line(0, y, width, y);
    }
}
}

function draw() {
    numPoints= floor(numSlider.value());
    
    if(processStarted){
        document.getElementById("cell1").innerHTML="Current Iterations";
        document.getElementById("cell2").innerHTML=iterations-20;
    }else{
        document.getElementById("cell2").innerHTML=numPoints;
    }
}

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
    processStarted=true;
    for (i = 0; i < iterations; i++) {
	 //Put halving logic in here
	 var randomNum= floor(random(1, numPoints+1));
	 //Time out with seperate function to generate points for cool factor?
	 var x = (pointArray[randomNum-1].posX + currentPoint.x) / 2;
     var y = (pointArray[randomNum-1].posY + currentPoint.y) / 2;
	 point(x, y);
	 currentPoint.x=x;
	 currentPoint.y=y;
     //console.log(randomNum);
    }
    if(iterations<=24000){
        iterations=iterations+200;
        setTimeout(myFunction, 1500);
    }
       
  } else {
    console.log("Select initial fixed points first");
  }
}
