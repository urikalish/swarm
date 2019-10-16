import { Board } from './board.js';
import { Player } from './player.js';

export class Game {

    constructor(canvas, playerNames) {
        this.board = new Board(canvas);
        this.players = [
            new Player(0, playerNames[0], this.board),
            new Player(1, playerNames[1], this.board)
        ];
    }

    step() {
        this.players.forEach(player => {
            player.step();
        })
    };

}
