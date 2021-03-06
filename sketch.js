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

//Variable for current slider value
var numSlider;

//Flag to turn off cross-hair system once all large points have been placed
var crossHairFlag=false;

function setup() {
    //Creating canvas that is responsive to screen dimensions
    var myCanvas = createCanvas((floor(window.innerWidth-50)), (floor(window.innerHeight-145)));
    myCanvas.parent("myContainer");
    background(100);

    //Starting points slider
    numSlider = document.getElementById("startingPtSlider");
}

function draw() {
    //Getting user selected number for large fixed points before the plotter starts   
    numLgPoints = numSlider.value - 1;

    //Changing cell2 and cell1 to appropriate data
    if (plotterStarted&&(iterations>24000)) {
        document.getElementById("cell2").innerHTML = "Program Complete";
    } else if(plotterStarted) {
        document.getElementById("cell1").innerHTML = "Current Iterations";
        document.getElementById("cell2").innerHTML = iterations - 20;
    } else if(crossHairFlag&&initialPointFlag) {
        document.getElementById("cell2").innerHTML = "Please Place Starting Point";
    } else {
        document.getElementById("cell2").innerHTML = numLgPoints;
    }

    //Cross-Hair system
    //If large points still need to be placed
    if(lgPointTracker<numLgPoints){
        //Redraw background and replace any existing large points
        background(100);
        if(lgPointTracker>0){
            for(var i=0;i<lgPointTracker;i++){
                stroke(255);
                ellipse(pointArray[i].posX, pointArray[i].posY, 15, 15);
                fill(255);
            }
        }
        //If mouse is inside grid
        if((mouseX>0&&(mouseX<width))&&(mouseY>0&&(mouseY<height))){
            
            //Vertical cross-hair Line
            
            //If any large points exist on this line in x direction
            if(checkMatchX(mouseX)){
                stroke("green");
                line(mouseX,0,mouseX,height);   
            }else{
                stroke(255);
                line(mouseX,0,mouseX,height);   
            }

            //Horizontal cross-hair Line

            //If any large points exist on this line in y direction
            if(checkMatchY(mouseY)){
                stroke("green");
                line(0,mouseY,width,mouseY);   
            }else{
                stroke(255);
                line(0,mouseY,width,mouseY); 
            }
        }      
    }
    //If all large points have been placed
    if(lgPointTracker==numLgPoints){
        //Flag used so code is exucted only once
        if(!crossHairFlag){
            //Final redraw of background and large points to clear cross-hair lines
            background(100);
            for(var i=0;i<lgPointTracker;i++){
                stroke(255);
                ellipse(pointArray[i].posX, pointArray[i].posY, 15, 15);
                fill(255);
            }
            crossHairFlag=true;
        }
    }
}

/*windowResized() is a P5.js function, this calls setup() when screen/browser size changes. This in turn causes
the program to be drawn responsively to new screen/browser size*/
function windowResized(){
    setup();
}

//Constructor for fixed points
function CreatePoint(posX, posY) {
    this.posX = posX;
    this.posY = posY;
}

//Creating initial small point
function CreateInitialPoint(posX, posY) {
    point(posX, posY);
    //Set currentpt object's x and y
    currentPoint.x = posX;
    currentPoint.y = posY;
    return;
}

/*CurrentPoint is used as a storage object where the current x and y values
of small points are held for the next calculation*/
var currentPoint = {
    x: 0,
    y: 0
};

//Based on mouse-press event
function mousePressed() {
    //If the user is inside canvas  
    if((mouseX>0&&(mouseX<width))&&(mouseY>0&&(mouseY<height))){ 
        //If the user has not picked enough large fixed points
        if (lgPointTracker <= numLgPoints - 1) {
            //Disable slider to prevent numLgPoints changing
            document.getElementById("startingPtSlider").disabled = true; 
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

//Based on start button press
function plotterFunction() {
    //If all large fixed points and one small fixed point have been picked  
    if (lgPointTracker > numLgPoints - 1 && !initialPointFlag) {
        //Disable start button
        document.getElementById("startButton").disabled = true; 
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
        //If current iteration less than 24000 re-run plotter loop with increased iteration amount after .5 seconds
        //This is done purely for effect and if needed you could change "iterations" in the for loop to 24000 and
        //get rid of this if statement to get much faster results.
        if (iterations <= 24000) {
            iterations = iterations + 200;
            setTimeout(plotterFunction, 500);
        }

    //If user has not selected all points big and small
    } else {
        console.log("Select initial fixed points first");
    }
}

//Checks if any large points exist on a given x axis line
//Returns true if point exists, false if no points exist
function checkMatchX(x){
    var x=x;
    for(var i=0;i<lgPointTracker;i++){
        if(x==pointArray[i].posX){
            return true;
        }
    }
    return false;
}

//Checks if any large points exist on a given y axis line
//Returns true if point exists, false if no points exist
function checkMatchY(y){
    var y=y;
    for(var i=0;i<lgPointTracker;i++){
        if(y==pointArray[i].posY){
            return true;
        }
    }
    return false;
}