import { Board } from './board.js';
import { Player } from './player.js';

let board;
let players;

const init = () => {
    board = new Board(document.getElementById('canvas'));
    players = [
        new Player(0, 'Player0', board),
        new Player(1, 'Player1', board)
    ];
};

const step = () => {
    players.forEach(player => {
        player.step();
    })
    window.requestAnimationFrame(step);
    // setTimeout(() => {
    //     step();
    // }, 0);
};

init();
step();
