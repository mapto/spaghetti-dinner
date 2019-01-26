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
var mapImages = [];
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

