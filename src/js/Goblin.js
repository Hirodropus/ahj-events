export default class Goblin {
  constructor(imagePath) {
    this.element = document.createElement('img');
    this.element.src = imagePath;
    this.element.alt = 'Goblin';
    this.currentCell = null;
  }

  place(cell) {
    if (this.currentCell) {
      this.currentCell.removeChild(this.element);
    }
    cell.append(this.element);
    this.currentCell = cell;
  }

  remove() {
    if (this.currentCell) {
      this.currentCell.removeChild(this.element);
      this.currentCell = null;
    }
  }

  isPlaced() {
    return this.currentCell !== null;
  }
}