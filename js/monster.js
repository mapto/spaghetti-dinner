var monster = {};
var monsterFrames = [0,1];
var monsterImages = []; 

var monsterSize = cellSide*2;

function loadMonster() {
	for (let i of monsterFrames) {
		// monsterImages[i] = loadImage("images/monster" + i + ".png", scaleMonster);
		monsterImages[i] = loadImage("images/monster" + i + ".png");
	}
}

function initMonster() {
	monster.sprite = createSprite(0, 0, monsterSize, monsterSize);
	for (let i in monsterImages) {
		monster.sprite.addImage("" + i, charImage[i]);
	}
	monster.pos = grid2screen([Math.ceil(gridWidth/2), gridHeight]);
	monster.draw = character.sprite.draw;
}

function scaleMonster() {
	monsterSize = cellSide*2;
	for (let img of monsterImages) {
		img.resize(monsterSize, 0);		
	}
}

function drawMonster() {
	push();
	translate(monster.pos[0], monster.pos[1]);
	monster.draw();
	pop();
}