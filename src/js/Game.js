import Board from './Board';
import Goblin from './Goblin';
import Score from './Score';

export default class Game {
  constructor(container, goblinImg, maxMisses = 5) {
    this.container = container;
    this.board = new Board(4, container);
    this.goblin = new Goblin(goblinImg);
    this.score = new Score(maxMisses);
    this.intervalId = null;
    this.isRunning = false;
    this.infoElement = this.createInfoPanel();
    this.handleCellClick = this.handleCellClick.bind(this);
    this.attachClickListeners();
  }

  createInfoPanel() {
    const info = document.createElement('div');
    info.className = 'info';
    info.innerHTML = `
      <div>Счёт: <span id="scoreDisplay">0</span></div>
      <div>Пропуски: <span id="missesDisplay">0</span> / ${this.score.maxMisses}</div>
    `;
    document.body.append(info);
    return info;
  }

  updateInfo() {
    const stats = this.score.getStats();
    document.getElementById('scoreDisplay').textContent = stats.score;
    document.getElementById('missesDisplay').textContent = stats.misses;
  }

  attachClickListeners() {
    this.board.cells.forEach(cell => {
      cell.addEventListener('click', this.handleCellClick);
    });
  }

  handleCellClick(e) {
    if (!this.isRunning || this.score.gameOver) return;
    const cell = e.currentTarget;
    if (this.goblin.currentCell === cell) {
      this.score.addScore();
      this.goblin.remove();
      this.updateInfo();
    }
  }

  showGoblin() {
    if (this.score.gameOver) return;
    if (this.goblin.isPlaced()) {
      this.score.addMiss();
      this.goblin.remove();
      this.updateInfo();
      if (this.score.gameOver) {
        this.stopGame();
        alert('Игра окончена! Вы промазали 5 раз.');
        return;
      }
    }
    const cell = this.board.getRandomCell();
    this.goblin.place(cell);
    this.updateInfo();
  }

  startGame() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.score.reset();
    this.goblin.remove();
    this.isRunning = true;
    this.updateInfo();
    this.showGoblin();
    this.intervalId = setInterval(() => this.showGoblin(), 1000);
  }

  stopGame() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    this.goblin.remove();
  }
}