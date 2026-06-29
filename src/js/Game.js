import Board from './Board';
import Goblin from './Goblin';
import Score from './Score';

const FIELD_SIZE = 4;
const INTERVAL_MS = 1000;

export default class Game {
  constructor(container, goblinImg, maxMisses = 5) {
    this.container = container;
    this.board = new Board(FIELD_SIZE, container);
    this.goblin = new Goblin(goblinImg);
    this.score = new Score(maxMisses);
    this.intervalId = null;
    this.isRunning = false;
    this.lastCell = null;
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

    // Если гоблин уже есть – это пропуск
    if (this.goblin.isPlaced()) {
      this.score.addMiss();
      this.goblin.remove();
      this.updateInfo();
      if (this.score.gameOver) {
        this.stopGame();
        alert('Игра окончена! Вы пропустили 5 раз.');
        return;
      }
    }

     let newCell;
    do {
      newCell = this.board.getRandomCell();
    } while (newCell === this.lastCell);

    this.goblin.place(newCell);
    this.lastCell = newCell;
    this.updateInfo();
  }

  startGame() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.score.reset();
    this.goblin.remove();
    this.lastCell = null;
    this.isRunning = true;
    this.updateInfo();
    this.showGoblin();
    this.intervalId = setInterval(() => this.showGoblin(), INTERVAL_MS);
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