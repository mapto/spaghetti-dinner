var centerX = 0;
var centerY = 0;

var started = false;

var swap = [1,-1];

function initControl() {
  centerX = window.innerWidth/2;
  centerY = minDim + controlHeight/2;
	
}

function endGame() {

}

function mousePressed(event) {
  console.log(event);
	started = true;
}

function mouseReleased(event) {
	endGame();
	started = false;
  console.log(event);
}
/*
function mouseMove(event) {
  console.log("move");
  console.log(event);
}
*/
function mouseDragged(event) {
  // console.log("drag");
  // console.log(event);
  d = [centerX - event.pageX, centerY - event.pageY];
  dir = 2;
  if (Math.abs(d[0]) > Math.abs(d[1])) {
  	dir = 0;
  } else {
  	dir = 1;
  }

  if (Math.abs(d[dir]) > cellSide) {
  	character.pos[dir] -= d[dir]/10;
  }
}

touchStarted = mousePressed;
//touchMoved = mouseDragged;
touchEnded = mouseReleased;

function touchMoved(event) {
	mouseDragged(event.touches[0]);
}