function min(a,b) {
	return a > b ? b : a;
}

function grid2screen(pos) {
	return [cellSide * pos[0] - cellSide/2, cellSide * pos[1] - cellSide/2];
}

function screen2grid(pos) {

	return [Math.floor((pos[0] + cellSide/2) % cellSide),
		Math.floor((pos[1] + cellSide/2) % cellSide)];
}

// declare shared/global variables
var gridWidth = 0; // depends on level
var gridHeight = 0; // depends on level
var controlHeight = 200;
var controlWidth = window.innerWidth;
var levelWidth = window.innerWidth;
var levelHeight = window.innerHeight - controlHeight;
var minDim = min(levelWidth, levelHeight);
var gridXZero = 0;
var gridYZero = 0;
var cellSide = Math.floor(min(minDim / gridHeight, minDim / gridWidth));

var level = {};
var gridSprites = [];
var mapImages = [];
var tileTypes = ['O', 'I', 'L', 'T', 'X'];
var tiles = {};

var canvas;

function initCoordinates() {
	if (!gridHeight || !gridWidth) {
		return;
	}
	// cellSide = min(minDim / gridHeight, minDim / gridWidth);

	controlWidth = window.innerWidth;
	levelWidth = window.innerWidth;
	levelHeight = window.innerHeight - controlHeight;

	minDim = min(levelWidth, levelHeight) - 100;  // margin
	cellSide = Math.floor(min(minDim / gridHeight, minDim / gridWidth));

	if (gridHeight && gridWidth) {
		levelHeight = cellSide * gridHeight;
		levelWidth = cellSide * gridWidth;
		controlWidth = levelWidth;		
	}
}

function scaleTile(img) {
	img.resize(cellSide, 0);
}

