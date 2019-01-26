/*
. - empty
I - line
L - angle
T - fork
X cross
*/

function min(a,b) {
	return a > b ? b : a;
}


// declare shared/global variables
var gridWidth = 0; // depends on level
var gridHeight = 0; // depends on level
var controlHeight = 200;
var controlWidth = window.innerWidth;
var levelWidth = window.innerWidth;
var levelHeight = window.innerHeight - controlHeight;
var minDim = min(levelWidth, levelHeight) - 100; // margin
var gridXZero = 0;
var gridYZero = 0;
var cellSide = min(minDim / gridHeight, minDim / gridWidth);

var level = {};
var gridSprites = [];
var tileTypes = ['O', 'I', 'L', 'T', 'X'];
var tiles = {};

function initCoordinates() {
	if (!gridHeight || !gridWidth) {
		return;
	}
	// cellSide = min(minDim / gridHeight, minDim / gridWidth);

	controlWidth = window.innerWidth;
	levelWidth = window.innerWidth;
	levelHeight = window.innerHeight - controlHeight;

	minDim = min(levelWidth, levelHeight) - 100;  // margin
	cellSide = min(minDim / gridHeight, minDim / gridWidth);
}

function initTiles() {
	for (let next of tileTypes) {
		// console.log("tiles/" + next + ".png");
		tiles[next] = loadImage("tiles/" + next + ".png", scaleTile);
	}	
}

function scaleTile(img) {
	img.resize(cellSide, 0);
}

/*
function scaleTiles(cellSide) {
	if (!tiles || !cellSide || cellSide === Infinity) {
		return;
	}
	console.log(tiles);
	console.log(cellSide);
	for (let next in tiles) {
		console.log(next);
		console.log(tiles[next]);
		console.log(tiles[next].width);
		// console.log(tiles[next].scale);
		// tiles[next].resize(cellSide / 5, cellSide / 5); //5px is the size of the image raster
	}

}
*/
function initSprites(gridXZero, gridYZero, gridWidth, gridHeight, cellSide) {
	for (let i = 0; i < gridWidth; i++ ) {
			gridSprites[i] = [];
		for (let j = 0; j < gridHeight; j++ ) {
			gridSprites[i][j] = createSprite(cellSide / 2 + i * cellSide, cellSide / 2 + j * cellSide, cellSide, cellSide);
		}
	}
}

function loadLevel(data) {
	var cell = [], rot = [];
	var rows = 0, rot_rows = 0;
	gridWidth = data[0].length;
	for (let i = 0; data[i]; i++) {
		cell[i] = [];
		for (let j = 0; j < data[i].length; j++) {
			cell[i][j] = data[i][j];
		}
		rows = i + 1;
	}
	gridHeight = rows;
	for (let i = rows + 1; data[i]; i++) {
		rot[i-rows-1] = [];
		for (let j = 0; j < data[i].length; j++) {
			rot[i-rows-1][j] = data[i][j];
		}
		rot_rows = i-rows;
	}
	if (rot_rows !== rows) { // data validation check
		alert("Rotations rows " + rot_rows + " do not match tile rows " + rows);
	}

	level = {cell: cell, rot: rot};
	console.log(level);
	initCoordinates();
	// scaleTiles(cellSide);
}

function drawLevel(level) {
	for (let i in level.cell) {
		// console.log(i);		
		for (let j in level.cell[i]) {
			//gridSprites[i][j] = createSprite(gridXZero, gridYZero, cellSide, cellSide);
			//gridSprites[i][j] = 
			// console.log(gridXZero);
			// console.log(gridYZero);
			// console.log(cellSide);
			// console.log(j);
			// console.log(level.cell[i][j]);
			// console.log(tiles[level.cell[i][j]]);
			// console.log(tiles);
			// image(tiles[level.cell[i][j]], gridXZero + i * cellSide, gridYZero + j * cellSide);
			gridSprites[j][i].addImage("grid" + i + j, tiles[level.cell[i][j]]);  // coordinates swapped to match level file
		}
	}
}

function preload() {
	loadStrings("level/2.level", loadLevel);
	initTiles();
	// initCoordinates();
	// scaleTiles(cellSide);
}

function setup() {

	canvas = createCanvas(minDim, minDim);
	initSprites(gridXZero, gridYZero, gridWidth, gridHeight, cellSide);
	console.log(tiles);
	console.log(gridSprites);
	if (level && gridSprites && gridSprites.length) {
		drawLevel(level);
	}
}

function draw() {
	background(155);	
	drawSprites();
}

window.onresize = function() {
	initCoordinates();

	//canvas.size(minDim,minDim);
	console.log(cellSide);
	scaleTiles(cellSide);
	//initSprites(gridXZero, gridYZero, gridWidth, gridHeight, cellSide);
	// console.log(tiles);
	// console.log(gridSprites);
	// if (level && gridSprites && gridSprites.length) {
	// 	drawLevel(level);
	// }
}