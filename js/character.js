var charImage;
var character = {};


function preloadCharacter() {
	charImage = loadImage("images/pirate.png", scaleTile);
}

function initCharacter() {
	character.sprite = createSprite(0, 0, cellSide, cellSide);
	character.sprite.addImage("3", charImage);
	character.pos = grid2screen([Math.ceil(gridWidth/2), gridHeight + 1]);
	character.draw = character.sprite.draw;
}

function drawCharacter() {
	push();
	translate(character.pos[0], character.pos[1]);
	// rotate(level.rot[i][j] * PI/2);
	character.draw();
	pop();
}