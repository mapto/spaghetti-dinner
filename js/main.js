fr = 10;


function preload() {
	loadStrings("level/2.level", loadLevel);
	initTiles();
	// initCoordinates();
	// scaleTiles(cellSide);
	preloadCharacter();
}

function setup() {
	frameRate(fr);
	initControl();
	canvas = createCanvas(minDim, minDim + controlHeight);
	initMapSprites(gridXZero, gridYZero, gridWidth, gridHeight, cellSide);
	// console.log(tiles);
	// console.log(gridSprites);
	// if (level && gridSprites && gridSprites.length) {
	initLevel(level);
	initCharacter();
	resizeCanvas(minDim, minDim + controlHeight);
}

function draw() {
	background(155);
	drawLevel(level);
	// drawSprites();
	drawCharacter();
}

window.onresize = function() {
	initCoordinates();
	initControl();
	resizeCanvas(minDim, minDim + controlHeight);

	//canvas.size(minDim,minDim);
	console.log(cellSide);
	// scaleTiles(cellSide);
	//initSprites(gridXZero, gridYZero, gridWidth, gridHeight, cellSide);
	// console.log(tiles);
	// console.log(gridSprites);
	// if (level && gridSprites && gridSprites.length) {
	// 	drawLevel(level);
	// }
}