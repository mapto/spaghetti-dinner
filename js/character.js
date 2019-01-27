var charImage;
var character = {};

var charSize = cellSide*.7;

function loadCharacter() {
	let url = new URL(location.href);
	let ch = url.searchParams.get("c") || "pirate";
	// charImage = loadImage("images/" + ch + ".png", scaleChar); // TODO: scale not charSize - dependent
	charImage = loadImage("images/" + ch + ".png");
}

function initCharacter() {
	character.sprite = createSprite(0, 0, charSize, charSize);
	charImage.resize(charSize, 0);
	character.sprite.addImage("3", charImage);
	character.pos = grid2screen([Math.ceil(gridWidth/2), gridHeight]);
	character.draw = character.sprite.draw;
}

function scaleChar() {
	charSize = cellSide*.7;
	charImage.resize(charSize, 0);
}

function drawCharacter() {
	push();
	translate(character.pos[0], character.pos[1]);
	// rotate(level.rot[i][j] * PI/2);
	character.draw();
	pop();
}