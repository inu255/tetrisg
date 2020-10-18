export default class Game {
	score = 0;
	lines = 0;
	level = 0;
	playfield = this.createPlayfield();
	activePiece = {
		x: 0,
		y: 0,
		blocks: [
			[0, 1, 0],
			[1, 1, 1],
			[0, 0, 0]
		]
	}

	getState() {
		const playfield = this.createPlayfield(); // пустое поле

		for (let y = 0; y < this.playfield.length; y++) {
			playfield[y] = [];

			for (let x = 0; x < this.playfield[y].length; x++) {
				playfield[y][x] = this.playfield[y][x]; // наполняет новый массив значениями из главного массива
			}
		}

		for (let y = 0; y < this.activePiece.blocks.length; y++) { // вставляет нужную фигуру в нужное место
			for (let x = 0; x < this.activePiece.blocks[y].length; x++) {
				if (this.activePiece.blocks[y][x]) {
					playfield[this.activePiece.y + y][this.activePiece.x + x] = this.activePiece.blocks;
				}
			}

		}

		return {
			playfield
		}
	}

	createPlayfield() { // создаёт пустое поле
		const playfield = [];

		for (var y = 0; y < 20; y++) {
			playfield[y] = [];

			for (var x = 0; x < 10; x++) {
				playfieldp[y][x] = 0;
			}
		}

		return playfield;
	}

	movePieceLeft() {
		this.activePiece.x -= 1;

		if (this.hasCollision()) {
			this.activePiece.x += 1;
		}
	}

	movePieceRight() {
		this.activePiece.x += 1;

		if (this.hasCollision()) {
			this.activePiece.x -= 1;
		}
	}

	movePieceDown() {
		this.activePiece.y += 1;

		if (this.hasCollision()) {
			this.activePiece.y -= 1;
			this.lockPiece();
		}
	}

	rotatePiece() {
		const blocks = this.activePiece.blocks;
		const length = blocks.length;

		const temp = [];
		for (var i = 0; i < length; i++) {
			temp[i] = new Array(length).fill(0);
		}

		for (var y = 0; y < length; y++) {
			for (var x = 0; x < length; x++) {
				temp[x][y] = blocks[length - 1 - y][x];
			}
		}

		this.activePiece.blocks = temp;
		if (this.hasCollision()) {
			this.activePiece.blocks = blocks;
		}
	}

	hasCollision() {
		const {y: pieceY, x: pieceX, blocks} = this.activePiece;

		for (let y = 0; y < blocks.length; y++) {
			for (var x = 0; x < blocks[y].length; x++) {
				if (
					blocks[y][x] &&
					((this.playfield[pieceY + y] === undefined || this.playfield[pieceY + y][pieceX + x] === undefined) ||
					this.playfield[pieceY + y][pieceX + x])) {
					return true;
				}
			}
		}

		return false;
	}

	lockPiece() {
		const {y: pieceY, x: pieceX, blocks} = this.activePiece;

		for (let y = 0; y < blocks.length; y++) {
			for (var x = 0; x < blocks[y].length; x++) {
				if (blocks[y][x]) {
					this.playfield[pieceY + y][pieceX + x] = blocks[y][x];

				}
			}
		}
	}
}
















console.log(1)
