function min(a,b) {
	return a > b ? b : a;
}

function grid2screen(pos) {
	return [cellSide * pos[0] - cellSide/2, cellSide * pos[1] - cellSide/2];
}

function screen2grid(pos) {
	return [Math.floor((pos[0]) / cellSide),
		Math.floor((pos[1]) / cellSide)];
}

// four directions: top, right, bottom, left
var blocks = {
	'O': [true, true, true, true],
	'I': [false, true, false, true],
	'L': [false, false, true, true],
	'T': [true, false, false, false],
	'X': [false, false, false, false],
}

var framerate = 10;

// declare shared/global variables
var gridWidth = 3; // depends on level
var gridHeight = 3; // depends on level
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
// var tileTypes = Object.keys(blocks);
var tileTypes = ['O', 'I', 'L', 'T', 'X'];
var tiles = {};

var centerX = 0;
var centerY = 0;
var joystickIdleArea = 0;

var canvas;

function recalculateSizes() {
	if (!gridHeight || !gridWidth) {
		return;
	}
	// cellSide = min(minDim / gridHeight, minDim / gridWidth);

	// controlWidth = window.innerWidth;
	// levelWidth = window.innerWidth;
	// levelHeight = window.innerHeight - controlHeight;

	minDim = min(window.innerWidth, window.innerHeight - controlHeight); // - 100;  // margin
	cellSide = Math.floor(min(minDim / gridHeight, minDim / gridWidth));

	levelHeight = cellSide * gridHeight;
	levelWidth = cellSide * gridWidth;

	recalculateControl();
}

