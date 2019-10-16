import { Game } from './game.js';

const game = new Game(
    document.getElementById('canvas'),
    ['Player0', 'Player1']
);

const step = () => {
    game.step();
    window.requestAnimationFrame(step);
}

step();
