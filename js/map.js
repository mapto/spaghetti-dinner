function loadLevel(argument) {
	let url = new URL(location.href);
	let lvl = url.searchParams.get("l") || 0;
	loadStrings("level/" + lvl + ".level", parseLevel, function() {
		href.location = "chrome://dino";
	});
}

function loadTiles() {
	for (let next of tileTypes) {
		// console.log("tiles/" + next + ".png");\
		for (let i = 0; i < 4; i++) {
			tiles[next + i] = loadImage("images/tiles/" + next + i + ".png", scaleTile);			
		}
	}
	// console.log(tiles);
}

function scaleTile(img) {
	img.resize(cellSide, 0);
}

function scaleTiles() {
	for (let next of Object.values(tiles)) {
		scaleTile(next);
	}
}

function initMapSprites(gridXZero, gridYZero, gridWidth, gridHeight, cellSide) {
	for (let i = 0; i < gridWidth; i++ ) {
			gridSprites[i] = [];
		for (let j = 0; j < gridHeight; j++ ) {
			gridSprites[i][j] = createSprite(cellSide / 2 + i * cellSide, cellSide / 2 + j * cellSide, cellSide, cellSide);
		}
	}
}

function parseLevel(data) {
	var cell = [], rot = [];
	var rows = 0, rot_rows = 0;
	gridWidth = data[0].length;
	if (gridWidth % 2 === 0) {
		alert("Level must have odd number of columns");
	}

	// Load shapes
	for (let i = 0; data[i]; i++) {
		cell[i] = [];
		for (let j = 0; j < data[i].length; j++) {
			cell[i][j] = data[i][j];
		}
		rows = i + 1;
	}
	gridHeight = rows;

	// Load rotations
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
	// console.log(level);
	// initCoordinates();
	// scaleTiles(cellSide);
	loadTiles();
}

function initLevel(level) {
	for (let i in level.cell) {
		for (let j in level.cell[i]) {
			push();
			var m = createImage(cellSide, cellSide);
			mw = m.width; mh = m.height;
			// m.copy(tiles[level.cell[i][j]], 0, 0, mw, mh, 0, 0, mw, mh);
			let candidate = level.cell[i][j] + (level.rot[i][j]%4);
			// console.log(candidate);
			// if (candidate in tiles) {
			// console.log(tiles);
			// console.log(tiles[candidate]);
			m.copy(tiles[candidate], 0, 0, mw, mh, 0, 0, mw, mh);				
			// } else {
				// m.copy(tiles[level.cell[i][j]], 0, 0, mw, mh, 0, 0, mw, mh);				
			// }
			gridSprites[j][i].addImage("grid" + i + j, m);  // coordinates swapped to match level file
			pop();
		}
	}
}

function drawLevel(level) {
	for (let i in level.cell) {
		// console.log(i);		
		for (let j in level.cell[i]) {
			push();
			translate(j * cellSide + cellSide/2, i * cellSide + cellSide/2);
			// rotate(level.rot[i][j] * PI/2);

			gridSprites[j][i].draw();
			pop();
		}
	}
}