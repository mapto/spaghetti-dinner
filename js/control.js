var centerX = 0;
var centerY = 0;

var started = false;

var swap = [1,-1];

var speed = .1;

function initControl() {
  centerX = window.innerWidth/2;
  centerY = minDim + controlHeight/2;
	
}

function endGame() {

}

function mousePressed(event) {
  // console.log(event);
	started = true;
}

function mouseReleased(event) {
	endGame();
	started = false;
  // console.log(event);
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
  levelDim = [levelWidth, levelHeight];
  d = [centerX - event.pageX, centerY - event.pageY];
  dir = 2;
  if (Math.abs(d[0]) > Math.abs(d[1])) {
  	dir = 0;
  } else {
  	dir = 1;
  }

  var joystickIdleArea = cellSide/2;
  if (Math.abs(d[dir]) > joystickIdleArea) {
  	delta = d[dir] * speed;
  	mapCenter = Math.floor(levelDim[dir]/2);
  	if (Math.abs(character.pos[dir] - delta - mapCenter) < mapCenter + cellSide/2) {
	  	character.pos[dir] -= delta;
  	}

  		
	var other = 1 - dir;
	var closer = character.pos[other] % cellSide;
	if (closer > cellSide/2) {
		character.pos[other] = Math.ceil(character.pos[other]/cellSide)*cellSide + cellSide/2;
	} else {
		character.pos[other] = Math.floor(character.pos[other]/cellSide)*cellSide + cellSide/2;
	}
  }
}

touchStarted = mousePressed;
//touchMoved = mouseDragged;
touchEnded = mouseReleased;

function touchMoved(event) {
	mouseDragged(event.touches[0]);
}