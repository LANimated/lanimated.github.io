// declare variables here
/* multiline comment
 */

let birds = 3;
// this is a variable

//Position of left hand side of floor
var base1

//Position of right hand side of floor
var base2;
//Length of floor
//var baseLength;

// Variables related to moving ball
var position;
var velocity;
var r = 6;
var speed = 3.5;


function setup() {
  // put setup code here --> this runs once upon launch

/*  createCanvas(500, 500);
  background(100);

  console.log ("I am in the setup funcion");

  //shape(left,up,right,down) (-x,y,x,-y)
  fill(130,80,210);
  stroke(255,255,255);
  strokeWeight(10);
//  rectMode(CENTER);
rect(80,200,80,200);

//rect(100,100,100,300);
fill(50,50,255);
stroke(255,180,50);
strokeWeight(5);
ellipse(400,150,150,100);
*/
createCanvas(710, 400);
//background(50,250,50);

fill(128);
base1 = createVector(0, height-150);
base2 = createVector(width, height);
//createGround();

//start ellipse at middle top of screen
position = createVector(width/2, 0);

//calculate initial random velocity
velocity = p5.Vector.random2D();
velocity.mult(speed);

}


function draw() {
  // put drawing code here --> this loops every frame
/*birds = birds + 1;

console.log("there are " + birds + " birds");
*/
//draw background
fill(0, 12);
noStroke();
rect(0, 0, width, height);

//draw base
fill(10,100,200);
quad(base1.x, base1.y, base2.x, base2.y, base2.x, height, 0, height);

//calculate base top normal
var baseDelta = p5.Vector.sub(base2, base1);
baseDelta.normalize();
var normal = createVector(-baseDelta.y, baseDelta.x)
var intercept = p5.Vector.dot(base1, normal);

//draw ellipse
noStroke();
fill(255,position.y,150);
ellipse(position.x, position.y, r*2, r*2);

//move ellipse
position.add(velocity);

//normalized incidence vector
incidence = p5.Vector.mult(velocity, -1);
incidence.normalize();

// detect and handle collision with base
if (p5.Vector.dot(normal, position) > intercept) {
  //calculate dot product of incident vector and base top
  var dot = incidence.dot(normal);

  //calculate reflection vector
  //assign reflection vector to direction vector
  velocity.set(2*normal.x*dot - incidence.x, 2*normal.y*dot - incidence.y, 0);
  velocity.mult(speed);

  // draw base top normal at collision point
  stroke(255, 128, 0);
  line(position.x, position.y, position.x - normal.x*100, position.y - normal.y * 100);
}
//}

// detect boundary collision
// right
if (position.x > width - r) {
  position.x = width - r;
  velocity.x *= -1;
}
// left
if (position.x < r) {
  position.x = r;
  velocity.x *= -1;
}
// top
if ( position.y < r ) {
  position.y = r;
  velocity.y *= -1;

  //randomize base top
  base1.y = random(height - 100, height);
  base2.y = random(height - 100, height);
}


}


// write custom functions here
