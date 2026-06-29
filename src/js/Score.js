export default class Score {
  constructor(maxMisses = 5) {
    this.score = 0;
    this.misses = 0;
    this.maxMisses = maxMisses;
    this.gameOver = false;
  }

  addScore() {
    if (!this.gameOver) {
      this.score++;
    }
  }

  addMiss() {
    if (!this.gameOver) {
      this.misses++;
      if (this.misses >= this.maxMisses) {
        this.gameOver = true;
      }
    }
  }

  reset() {
    this.score = 0;
    this.misses = 0;
    this.gameOver = false;
  }

  getStats() {
    return {
      score: this.score,
      misses: this.misses,
      gameOver: this.gameOver
    };
  }
}