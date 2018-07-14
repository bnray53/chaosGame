var x=0;
var ellipseTracker=0;

function setup() {
  // put setup code here
  createCanvas(920, 500);
  background(100);  
}

function draw() {


}

function mousePressed(){
  if(mouseX<width && mouseY<height){ 
    if(ellipseTracker<5){
      stroke(255);
      ellipse(mouseX, mouseY, 15, 15);
      x=x+1;
      console.log(x);
      console.log(mouseX);
      console.log(mouseY);
      console.log("__________________________________");
      fill(255);
      ellipseTracker++;
      //point(100, 100);
    }else{
      console.log("Too many ellipses");
    }
  }  
}
  
  function myFunction(){
    console.log("Activated");
    var x=random(0, 920);
    var y=random(0, 500);
    point(x,y);
  }
 