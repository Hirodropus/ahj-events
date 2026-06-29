export default class Board {
  constructor(size, container) {
    this.size = size;
    this.container = container;
    this.cells = [];
    this.createBoard();
  }

  createBoard() {
    for (let i = 0; i < this.size * this.size; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      this.container.append(cell);
      this.cells.push(cell);
    }
  }

  getCell(index) {
    return this.cells[index];
  }

  getRandomCell() {
    return this.cells[Math.floor(Math.random() * this.cells.length)];
  }
}