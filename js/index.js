import { Helper } from './helper.js';
import { Game } from './game.js';

let game;

const initGame = () => {
    game = new Game(
        document.getElementById('canvas'),
        [
            {
                id: 0,
                name: 'Player0',
                color: Helper.strToHsl('#00ffcc')
            },
            {
                id: 1,
                name: 'Player1',
                color: Helper.strToHsl('#ff33ff')
            }
        ]
    );
}

const step = () => {
    game.step();
    window.requestAnimationFrame(step);
}

initGame();
step();
