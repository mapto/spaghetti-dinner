
function preload() {
	loadStrings("level/2.level", loadLevel);
	initTiles();
	// initCoordinates();
	// scaleTiles(cellSide);
}

function setup() {
	frameRate(1);
	canvas = createCanvas(minDim, minDim);
	initMapSprites(gridXZero, gridYZero, gridWidth, gridHeight, cellSide);
	// console.log(tiles);
	// console.log(gridSprites);
	// if (level && gridSprites && gridSprites.length) {
	initLevel(level);
	// }
}

function draw() {
	// background(155);
	drawLevel(level);
	// drawSprites();
}

window.onresize = function() {
	initCoordinates();

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