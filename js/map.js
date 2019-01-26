function initTiles() {
	for (let next of tileTypes) {
		// console.log("tiles/" + next + ".png");
		tiles[next] = loadImage("images/tiles/" + next + ".png", scaleTile);
	}	
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
function initMapSprites(gridXZero, gridYZero, gridWidth, gridHeight, cellSide) {
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
	console.log(level);
	initCoordinates();
	// scaleTiles(cellSide);
}

function initLevel(level) {
	for (let i in level.cell) {
		for (let j in level.cell[i]) {
			push();
			var m = createImage(cellSide, cellSide);
			mw = m.width; mh = m.height;
			// m.copy(tiles[level.cell[i][j]], 0, 0, mw, mh, 0, 0, mw, mh);
			let candidate = level.cell[i][j] + level.rot[i][j];
			if (candidate in tiles) {
				m.copy(tiles[level.cell[i][j] + level.rot[i][j]], 0, 0, mw, mh, 0, 0, mw, mh);				
			} else {
				m.copy(tiles[level.cell[i][j]], 0, 0, mw, mh, 0, 0, mw, mh);				
			}
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