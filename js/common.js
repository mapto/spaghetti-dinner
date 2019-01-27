function min(a,b) {
	return a > b ? b : a;
}

function grid2canvas(pos) {
	return [cellSide * pos[0] - cellSide/2, cellSide * pos[1] - cellSide/2];
}

function grid2canvasc(pos) {
	return [cellSide * pos[0], cellSide * pos[1]];
}

function screen2canvas(pos) {
	// console.log(pos);
	return [Math.floor(pos[0] - (window.innerWidth - levelWidth)/2), pos[1]];
}

function screen2grid(pos) {
	return [Math.floor((pos[0]) / cellSide),
		Math.floor((pos[1]) / cellSide)];
}

function canvas2grid(pos) {
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

/*
var blocks = {
	'O0': [true, true, true, true],
	'O1': [true, true, true, true],
	'O2': [true, true, true, true],
	'O3': [true, true, true, true],
	'I0': [false, true, false, true],
	'I1': [true, false, true, false],
	'I2': [false, true, false, true],
	'I3': [true, false, true, false],
	'L0': [false, false, true, true],
	'L1': [true, false, false, true],
	'L2': [true, true, false, false],
	'L3': [false, true, true, false],
	'T0': [true, false, false, false],
	'T1': [false, true, false, false],
	'T2': [false, false, true, false],
	'T3': [false, false, false, true],
	'X0': [false, false, false, false],
	'X1': [false, false, false, false],
	'X2': [false, false, false, false],
	'X3': [false, false, false, false],
}
*/

var framerate = 60;

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
var joystickIdleArea = 20;

var canvas;


// audio variable
var song;


// timer initialization

let timer = 32



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

