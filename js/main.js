
function preload() {
	loadLevel();
	// initCoordinates();
	// initTiles();
	// scaleTiles(cellSide);
	loadCharacter();
	// loadMonster();
	
	// preloads audio
	song = loadSound('../audio/loop1.0.mp3', function(){console.log("loaded")}, function(){console.log("failed")}); 
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
	// initLevel(level);
	// initCharacter();

	// resizeCanvas(minDim, minDim + controlHeight);
	window.onresize();
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
    circle(centerX - (window.innerWidth - levelWidth)/2, centerY, joystickIdleArea);
	// circle(character.pos[0], character.pos[1], 5);

    if (started) {
    	circle(mouseX, mouseY, 10);    	
    }
}

window.onresize = function() {
	recalculateSizes();
	// initControl();
	
	// console.log(cellSide);
	scaleTiles();
	scaleChar();

	initLevel(level);
	initCharacter();

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