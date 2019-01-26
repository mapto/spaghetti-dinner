var centerX = 0;
var centerY = 0;

var started = false;

var swap = [1,-1];

var speed = framerate * .01;

function initControl() {
  centerX = window.innerWidth/2;
  centerY = minDim + controlHeight/2;
	
}

function collisionTile(delta, dir) {
	// console.log(delta);
	// console.log(dir);
	// console.log(character.pos);
	result = screen2grid(character.pos);
	console.log(result);
	let cell = level.cell[result[0]][result[1]];
	let rot = level.rot[result[0]][result[1]];
	return result;
}

function collide(delta, dir) {
	tilePos = screen2grid(character.pos);
	if (tilePos[0] < 0 || tilePos[0] >= gridWidth
		|| tilePos[1] < 0 || tilePos[1] >= gridHeight) {
		return false;
	}
	collisionTile(delta, dir);
	// character.sprite.collide()
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
  	if (Math.abs(character.pos[dir] - delta - mapCenter) < mapCenter) {
	  	character.pos[dir] -= delta;
  	}
  	console.log(screen2grid(character.pos));
  	// if (!collide(delta, dir)) {
  	// 	character.pos[dir] += delta;	
  	// }
  	// collisionTile(delta, dir);
	
	// get other dimension back on track
	var other = 1 - dir;
	var closer = character.pos[other] % cellSide;
	if (closer > cellSide/2) {
		character.pos[other] = Math.ceil(character.pos[other]/cellSide)*cellSide + cellSide/2;
	} else {
		character.pos[other] = Math.floor(character.pos[other]/cellSide)*cellSide + cellSide/2;
	}

	// do not go out of map
	if (character.pos[other] > levelDim[other]) {
		character.pos[other] = levelDim[other] - Math.floor(cellSide/2);
	} else if (character.pos[other] < 0) {
		character.pos[other] = Math.ceil(cellSide/2);
	}
  }
}

touchStarted = mousePressed;
//touchMoved = mouseDragged;
touchEnded = mouseReleased;

function touchMoved(event) {
	mouseDragged(event.touches[0]);
}
