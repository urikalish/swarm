import { Army } from './army.js';

export class Player {

    constructor({id, name, color}, board) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.army = new Army(id, name, color, board);
    }

    step() {
        this.army.step();
    }
}
