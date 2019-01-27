var started = false;

var swap = [1,-1];

var speed = framerate * .01;

function recalculateControl() {
  controlWidth = levelWidth;
  centerX = controlWidth/2;
  centerY = levelHeight + controlHeight/2;
  joystickIdleArea = cellSide/2;	
}

function collisionTile(delta, dir) {
	// console.log(delta);
	// console.log(dir);
	// console.log(character.pos);
	result = screen2grid(character.pos);
	// console.log(result);

	if (!dir) { // x
		return [result[0]-Math.sign(delta),result[1]];
	} else { // y
		return [result[0],result[1]-Math.sign(delta)];
	}
}

function blocked(pos, delta, dir) {
	let type = level.cell[pos[0]][pos[1]];
	let rot = level.rot[pos[0]][pos[1]];
	// console.log(type);
	// console.log(character.pos);
	// console.log(pos);
	// console.log("delta: " + Math.sign(delta));
	// console.log("dir: " + dir);
	// let shift = shiftMap[""+Math.sign(delta)][dir];
	let shift = Math.sign(delta) - dir + 2;
	// console.log("shift: " + shift);
	// console.log("block: " + blocks[type][shift%4]);
	return blocks[type][shift%4];
}

function canGoOut(delta, dir) {
	pos = screen2grid(character.pos);
	// console.log("canGoOut");
	return !blocked(pos, delta, dir);
}

function canGoIn(delta, dir) {
	col = collisionTile(delta, dir);
	// console.log("canGoIn");
	return !blocked(col, -delta, dir);
}

function canMove(delta, dir) {
	tilePos = screen2grid(character.pos);
	return canGoOut(delta, dir) && canGoIn(delta, dir);
	// character.sprite.collide()
}

function endGame() {

}

function mousePressed(event) {
  console.log(event);
  console.log([centerX, centerY]);
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

  if (Math.abs(d[dir]) > joystickIdleArea) {
  	delta = d[dir] * speed;
	console.log("delta: " + Math.sign(delta));

  	mapCenter = Math.floor(levelDim[dir]/2);
  	if (canMove(delta, dir)) {
	  	if (Math.abs(character.pos[dir] - delta - mapCenter) < mapCenter) {
		  	character.pos[dir] -= delta;
	  	}  		
  	}

  	// if (!collide(delta, dir)) {
  	// 	character.pos[dir] += delta;	
  	// }
  	// myPos = screen2grid(character.pos);
	
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
	console.log(event);
	mouseDragged(event.touches[0]);
}
