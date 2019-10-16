import { Board } from './board.js';
import { Player } from './player.js';

// let stepCount;
// let startTime;
let board;
let players;

const init = () => {
    board = new Board(document.getElementById('canvas'));
    players = [
        new Player(0, 'Player0', '#1fc', board),
        new Player(1, 'Player1', '#f33', board)
    ];
    // stepCount = 0;
    // startTime = (new Date()).getTime();
};

const step = () => {
    // stepCount++;
    // if (stepCount === 1000) {
    //     console.log((new Date()).getTime() - startTime);
    // }
    players.forEach(player => {
        player.step();
    })
    // window.requestAnimationFrame(step);
    setTimeout(() => {
        step();
    }, 0);
};

init();
step();
