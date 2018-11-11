//Used as index value for pointArray, tracks number of large points placed by user
var lgPointTracker = 0;

//Number of large fixed points this is set by user by adjusting the slider
var numLgPoints;

//Initial number of loop iterations for the loop generating the small points 
var iterations = 20;

//Flag for when to change number of string points to iteration count
var plotterStarted = false;

//Flag for only allowing one starting point to be placed
var initialPointFlag = true;

//Array to be used for reference variables for large fixed point objects
var pointArray = [];

var numSlider;


function setup() {
  //Creating canvas and setting html element id
  var myCanvas = createCanvas(1200, 475);
  myCanvas.parent("myContainer");
  background(100);
  
 

  //Generating the grid
  //If adjusted lines need to be in even number increments
  var numVertLines = 20;
  var numHorLines = 10;
  for (var x = 0; x < width; x += width / numVertLines) {
    line(x, 0, x, height);
    if (x == (width / numVertLines) * (numVertLines / 2 - 1)) {
      stroke(200);
      strokeWeight(1);
    } else {
      stroke(0);
      strokeWeight(1);
    }
  }
  for (var y = 0; y < height; y += height / numHorLines) {
    line(0, y, width, y);
    if (y == (height / numHorLines) * (numHorLines / 2 - 1)) {
      stroke(200);
      strokeWeight(1);
    } else {
      stroke(0);
      strokeWeight(1);
    }
  }

   //Starting points slider
   numSlider=document.getElementById("startingPtSlider");
}

function draw() {
  //Getting user selected number for large fixed points  
  numLgPoints = numSlider.value-1;

  //Changing number of points to current iterations when user has started the plotting function
  if (plotterStarted) {
    document.getElementById("cell1").innerHTML = "Current Iterations";
    document.getElementById("cell2").innerHTML = iterations - 20;
  } else {
    document.getElementById("cell2").innerHTML = numLgPoints;
  }
}

//Constructor for fixed points
function CreatePoint(posX, posY) {
  this.posX = posX;
  this.posY = posY;
}

//Creating initial small point
function CreateInitialPoint(posX, posY) {
  point(posX, posY);
  //set currentpt object's x and y
  currentPoint.x = posX;
  currentPoint.y = posY;
  return;
}

//currentPoint is used as a storage object where the current x and y values
//of small points are held for the next calculation
var currentPoint = {
  x: 0,
  y: 0
};

//Based on mouse-press event
function mousePressed() {
  //If the user is inside canvas  
  if (mouseX < width && mouseY < height) {
    //If the user has not picked enough large fixed points
    if (lgPointTracker <= numLgPoints - 1) {
      //Creating new large point object and storing in pointArray  
      var i = lgPointTracker;
      pointArray.push(new CreatePoint(mouseX, mouseY));
      stroke(255);
      ellipse(pointArray[i].posX, pointArray[i].posY, 15, 15);
      fill(255);
      lgPointTracker++;
      //If the user has picked enough large fixed points
    } else if (lgPointTracker >= numLgPoints) {
      //If the user has picked all large fixed points but not small initial point 
      if (initialPointFlag) {
        CreateInitialPoint(mouseX, mouseY);
        initialPointFlag = false;
      }
      //If user has picked all points large and small
      console.log("Too many fixed points");
    }
  } else {
    //If user is outside canvas and has not picked enough points  
    if (lgPointTracker <= numLgPoints - 1) {
      console.log("Please click inside the canvas area");
    }
  }
}


//Based on button press
function plotterFunction() {
  //If all large fixed points and one small fixed point have been picked  
  if (lgPointTracker > numLgPoints - 1 && !initialPointFlag) {
    //Flag for changing number of starting points to current iterations  
    plotterStarted = true;
    for (i = 0; i < iterations; i++) {
      //Math Logic
      //Picking a random large fixed point
      var randomNum = floor(random(1, numLgPoints + 1));
      //Using midpoint formula to place new small point between large point and current small point
      var x = (pointArray[randomNum - 1].posX + currentPoint.x) / 2;
      var y = (pointArray[randomNum - 1].posY + currentPoint.y) / 2;
      point(x, y);
      //Saving these x and y values in currentPoint storage object for next iteration
      currentPoint.x = x;
      currentPoint.y = y;
    }
    //If current iteration less than 24000 re-run plotter loop with increased iteration amount after 1.5 seconds
    //This is done purely for effect and if needed you could change "iterations" in the for loop to 24000 and
    //get rid of this if statement to get much faster results.
    if (iterations <= 24000) {
      iterations = iterations + 200;
      setTimeout(plotterFunction, 1500);
    }
    //If user has not selected all points big and small
  } else {
    console.log("Select initial fixed points first");
  }
}
