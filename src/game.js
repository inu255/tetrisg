export default class Game {
	score = 0;
	lines = 0;
	level = 0;
	playfield = this.createPlayfield();
	activePiece = this.createPiece();
	nextPiece = this.createPiece();

	getState() {
		const playfield = this.createPlayfield(); // пустое поле
		const {y: pieceY, x: pieceX, blocks} = this.activePiece;

		for (let y = 0; y < this.playfield.length; y++) {
			playfield[y] = [];

			for (let x = 0; x < this.playfield[y].length; x++) {
				playfield[y][x] = this.playfield[y][x]; // наполняет новый массив значениями из главного массива
			}
		}

		for (let y = 0; y < blocks.length; y++) { // вставляет нужную фигуру в нужное место
			for (let x = 0; x < blocks[y].length; x++) {
				if (blocks[y][x]) {
					playfield[pieceY + y][pieceX + x] = blocks;
				}
			}

		}

		return playfield;
	}

	createPlayfield() { // создаёт пустое поле
		const playfield = [];

		for (var y = 0; y < 20; y++) {
			playfield[y] = [];

			for (let x = 0; x < 10; x++) {
				playfield[y][x] = 0;
			}
		}

		return playfield;
	}

	createPiece() {
		const index = Math.floor(Math.random() * 7);
		const type = 'IJLOSTZ'[index];
		const piece = {x: 0, y: 0};

		switch (type) {
			case 'I':
				piece.blocks = [
					[0, 0, 0, 0],
					[1, 1, 1, 1],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				];
				break;
			case 'J':
				piece.blocks = [
					[0, 0, 0],
					[2, 2, 2],
					[0, 0, 2]
				];
				break;
			case 'L':
				piece.blocks = [
					[0, 0, 0],
					[3, 3, 3],
					[3, 0, 0]
				];
				break;
			case 'O':
				piece.blocks = [
					[0, 0, 0, 0],
					[0, 4, 4, 0],
					[0, 4, 4, 0],
					[0, 0, 0, 0]
				];
				break;
			case 'S':
				piece.blocks = [
					[0, 0, 0],
					[0, 5, 5],
					[5, 5, 0]
				];
				break;
			case 'T':
				piece.blocks = [
					[0, 0, 0],
					[6, 6, 6],
					[0, 6, 0]
				];
				break;
			case 'Z':
				piece.blocks = [
					[0, 0, 0],
					[7, 7, 0],
					[0, 7, 7]
				];
				break;
			default:
				throw new Error('Неизвестный тип фигуры');
		}

		return piece;
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
			this.updatePieces();
		}
	}

	rotatePiece() {
		const blocks = this.activePiece.blocks;
		const length = blocks.length;

		const temp = [];
		for (let i = 0; i < length; i++) {
			temp[i] = new Array(length).fill(0);
		}

		for (let y = 0; y < length; y++) {
			for (let x = 0; x < length; x++) {
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
			for (let x = 0; x < blocks[y].length; x++) {
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
			for (let x = 0; x < blocks[y].length; x++) {
				if (blocks[y][x]) {
					this.playfield[pieceY + y][pieceX + x] = blocks[y][x];

				}
			}
		}
	}

	updatePieces() {
		this.activePiece = this.nextPiece; // добавляет новую фигуру
		this.nextPiece = this.createPiece();
	}
}
















console.log(1)
