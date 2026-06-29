import goblinImg from '../img/goblin.png';
import Game from './Game';

const app = document.getElementById('app');
if (!app) {
  throw new Error('Элемент #app не найден');
}

const game = new Game(app, goblinImg);
game.startGame();

window.game = game;