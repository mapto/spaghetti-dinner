var started = false;

var swap = [1,-1];

var speed = framerate * .005;

function recalculateControl() {
  controlWidth = levelWidth;
  centerX = window.innerWidth/2;	
  centerY = levelHeight + (controlHeight/2);
  // joystickIdleArea = cellSide/2;	
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

function calcShift(delta, dir) {
	return delta > 0 ? (dir ? 0 : 3) : (dir ? 2 : 1);
}

function blocked(pos, delta, dir) {
	let type = level.cell[pos[1]][pos[0]];
	let rot = level.rot[pos[1]][pos[0]];
	// console.log(type);
	// console.log(character.pos);
	// console.log(level);
	// console.log(pos);
	// console.log("delta: " + Math.sign(delta));
	// console.log("dir: " + dir);
	let shift = calcShift(delta, dir);
	// let shift = shiftMap[""+Math.sign(delta)][dir];
	// let shift = Math.sign(delta) - dir + 2;
	// let shift = Math.sign(delta) > 0 ? (dir ? 0 : 3) : (dir ? 2 : 1);

	// console.log("rot: " + rot);
	// console.log("shift: " + shift);
	// console.log("block: " + blocks[type]);
	// console.log("block: " + blocks[type][(shift-rot)%4]);
	return blocks[type][(shift-rot)%4];
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
	let tilePos = screen2grid(character.pos);

	if (tilePos[0] === Math.floor(gridWidth/2) && tilePos[1] === gridHeight - 1
		&& dir === 1 && Math.sign(delta) === -1) {
		reinit();
	}
	if (tilePos[1] === 0 && (tilePos[0] === gridHeight - 1 || tilePos[0] === 0)
		&& dir === 1 && Math.sign(delta) === 1) {
		nextLevel();
	}

	let tileCoord = grid2canvasc(tilePos);
	// console.log(tileCoord);
	// console.log(character.pos)
	if (Math.abs(character.pos[dir] - tileCoord[dir]) > 2/3 * cellSide) {
		return true;
	}
	/*
	console.log("Coords:");
	console.log(character.pos);
	console.log(screen2canvas(character.pos));
	console.log(screen2grid(character.pos));
	console.log(grid2canvas(screen2grid(character.pos)));
	let tileCoord = grid2canvas(screen2grid(character.pos));
	console.log(cellSide);
	console.log(character.pos[dir] - tileCoord[dir]);
	if (delta > 0 && cellSide < (character.pos[dir] - tileCoord[dir])) {
		return true;
	}
	// if (delta < 0 && )
	*/
	return canGoOut(delta, dir) && canGoIn(delta, dir);
	// character.sprite.collide()
}

function reinit() {
	location.href = "index.html";
}

function nextLevel() {
	// console.log("Next level");
	let url = new URL(location.href);
	let ch = url.searchParams.get("c") || "pirate";
	let lvl =  url.searchParams.get("l") || 0;
	location.href = "next.html?c=" + ch + "&l=" + (parseInt(lvl)+1);
}

function endGame() {
	// console.log("Game over");
	location.href = "game-over.html";
}

function mousePressed(event) {
  // console.log([event.pageX, event.pageY]);
  // console.log([centerX, centerY]);
	started = true;
	
	
	// audio check
	if ( song.isPlaying() ) { // .isPlaying() returns a boolean
    song.stop();
    
  } else {
    song.play();
    
  }
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
  // console.log([event.pageX, event.pageY]);
  // console.log([centerX, centerY]);

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
	// console.log("delta: " + Math.sign(delta));

	// console.log(character.pos);
	// console.log(character.sprite);

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
	/*
	var closer = character.pos[other] % cellSide;
	if (closer > cellSide/2) {
		character.pos[other] = Math.ceil(character.pos[other]/cellSide)*cellSide + cellSide/2;
	} else {
		character.pos[other] = Math.floor(character.pos[other]/cellSide)*cellSide + cellSide/2;
	}
	*/
	// console.log(character.pos);
	let newCoord = grid2canvasc(canvas2grid(character.pos));
	character.pos[other] = newCoord[other] + cellSide/2;
	// console.log(character.pos);

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
