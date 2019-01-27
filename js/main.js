function preload() {
	loadLevel();
	// initCoordinates();
	// initTiles();
	// scaleTiles(cellSide);
	loadCharacter();
	loadMonster();
}

function setup() {
	recalculateSizes();
	frameRate(framerate);
	// initControl();
	canvas = createCanvas(minDim, minDim + controlHeight);
	initMapSprites(gridXZero, gridYZero, gridWidth, gridHeight, cellSide);
	// console.log(tiles);
	// console.log(gridSprites);
	// if (level && gridSprites && gridSprites.length) {
	initLevel(level);
	initCharacter();
	// resizeCanvas(minDim, minDim + controlHeight);
}

function draw() {
	background(155);
	drawLevel(level);
	// drawSprites();
	drawCharacter();

  	fill(204, 101, 192, 127);
  	stroke(127, 63, 120);
  	strokeWeight(2);
	rect(0, levelHeight, levelWidth, levelHeight + controlHeight);
    circle(centerX, centerY, joystickIdleArea);
    if (started) {
    	circle(mouseX, mouseY, 10);    	
    }
}

window.onresize = function() {
	recalculateSizes();
	// initControl();
	resizeCanvas(levelWidth, levelHeight + controlHeight);

	//canvas.size(minDim,minDim);
	// console.log(cellSide);
	// scaleTiles(cellSide);
	//initSprites(gridXZero, gridYZero, gridWidth, gridHeight, cellSide);
	// console.log(tiles);
	// console.log(gridSprites);
	// if (level && gridSprites && gridSprites.length) {
	// 	drawLevel(level);
	// }
}