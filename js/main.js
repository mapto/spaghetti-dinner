
function preload() {
	loadLevel();
	// initCoordinates();
	// initTiles();
	// scaleTiles(cellSide);
	loadCharacter();
	// loadMonster();
	
	// preloads audio
	song = loadSound('../audio/loop1.0.mp3'); 
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
	
	
	// TEXT TIMER
	textAlign(CENTER, TOP);
	textSize(40);
	text(timer, width/2, height/2);


	
	// TIMER
	
	if (started) {
	if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer --;
  }
  if (timer == 0) {
    text("GAME OVER", width/2, height*0.7);
  }
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