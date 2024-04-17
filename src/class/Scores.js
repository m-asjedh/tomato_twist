//Singleton pattern for managing the score
export class Scores {
  constructor() {
    if (!Scores.instance) {
      this.score = 0;
      Scores.instance = this;
    }
  }

  //method to increase score
  increaseScore() {
    this.score += 1;
  }

  // method to rest score
  resetScore() {
    this.score = 0;
  }

  //method to get current score
  getScore() {
    return this.score;
  }
}
