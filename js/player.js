import { Helper } from './helper.js';
import { Army } from './army.js';

const playerColors = ['#11ffcc', '#ff3333'];

export class Player {

    constructor(id, name, board) {
        this.id = id;
        this.name = name;
        this.color = Helper.rgbToHsl(...Helper.strToRgb(playerColors[id]));
        this.army = new Army(id, name, this.color, board);
    }

    step() {
        this.army.step();
    }
}
