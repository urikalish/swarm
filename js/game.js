import { Board } from './board.js';
import { Player } from './player.js';

export class Game {

    constructor(canvas, playerInfos) {
        this.board = new Board(canvas);
        this.players = [
            new Player(playerInfos[0], this.board),
            new Player(playerInfos[1], this.board)
        ];
    }

    step() {
        this.players.forEach(player => {
            player.step();
        })
    };

}
