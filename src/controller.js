export default class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.isPlaying = false;
    this.intervalId = nullж

    document.addEventListener('keydown', this.handleKeyDown.bind(this));

    this.view.renderStartScreen();
  }

  update() {
    this.game.movePieceDown();
    updateView();
  }

  play() {
    this.isPlaying = true;
    this.startTimer();
    updateView();
  }

  pause() {
    this.isPlaying = false;
    this.stopTimer();
    updateView();
  }

  updateView() {
    this.view.renderMainScreen(this.game.getState());
  }

  startTimer() {
    if (!this.IntervalId) {
      this.intervalId = setInterval(() => {
        update();
      }, 1000)
    }
  }

  stopTimer() {
    if (this.IntervalId) {
      clearInterval(this.IntervalId);
      this.intervalId = null;
    }
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
      case 13: // ENTER
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
      break;
      case 37: // left
        this.game.movePieceLeft();
        this.view.renderMainScreen(this.game.getState());
        break;
        case 38: // up
          this.game.rotatePiece();
          this.view.renderMainScreen(this.game.getState());
          break;
        case 39: // right
            this.game.movePieceRight();
            this.view.renderMainScreen(this.game.getState());
            break;
        case 40: // down
            this.game.movePieceDown();
            this.view.renderMainScreen(this.game.getState());
            break;
    }
  }
}
