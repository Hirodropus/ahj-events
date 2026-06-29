export default class Goblin {
  constructor(imagePath) {
    this.element = document.createElement('img');
    this.element.src = imagePath;
    this.element.alt = 'Goblin';
    this.currentCell = null;
  }

  place(cell) {

    cell.append(this.element);
    this.currentCell = cell;
  }

  remove() {

    if (this.element.parentNode) {
      this.element.remove();
      this.currentCell = null;
    }
  }

  isPlaced() {
    return this.currentCell !== null;
  }
}