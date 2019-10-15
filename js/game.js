import { Board } from './board.js';
import { Player } from './player.js';

let board;
let players;

const init = () => {
    board = new Board(document.getElementById('canvas'));
    players = [
        new Player(0, 'Player0', '#1fc', board),
        new Player(1, 'Player1', '#f33', board)
    ];
};

const step = () => {
    players.forEach(player => {
        player.step();
    })
    window.requestAnimationFrame(step);
};

init();
step();
