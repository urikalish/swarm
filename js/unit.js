import { Helper } from './helper.js';

const maxA = [1, 1, 1];
const randomA = [1.5, 1.5, 1.5];
const maxV = [3, 3, 3];

export class Unit {

    constructor(id, army, board, ...p) {
        this.id = id,
        this.army = army;
        this.board = board;
        this.p = p;
        this.v = [0,0,0];
        this.a = [0,0,0];
        this.color = army.color;        
    }

    distance(otherUnit) {
        return Math.sqrt(
            Math.pow(this.p[0] - otherUnit.p[0], 2) +
            Math.pow(this.p[1] - otherUnit.p[1], 2) +
            Math.pow(this.p[2] - otherUnit.p[2], 2));
    }

    accelerateToTarget(target) {
        for (let i = 0; i < 3; i++) {
            if (target[i] >= this.p[i]) {
                this.a[i] = Helper.random(0, maxA[i]);
            } else {
                this.a[i] = Helper.random(-maxA[i], 0);
            }
            this.a[i] += Helper.random(-randomA[i], randomA[i]);
            this.a[i] = Helper.clamp(this.a[i], -maxA[i], maxA[i]);
        }
    }

    move() {
        for (let i = 0; i < 3; i++) {
            this.v[i] += this.a[i];
            this.v[i] = Helper.clamp(this.v[i], -maxV[i], maxV[i]);
            this.p[i] += this.v[i];
            this.p[i] = Helper.clamp(this.p[i], 0, this.board.sizes[i]);
            if (this.p[i] === 0) {
                this.a[i] = maxA[i];
                this.v[i] = maxV[i];
            } else if (this.p[i] === this.board.sizes[i]) {
                this.a[i] = -maxA[i];
                this.v[i] = -maxV[i];
            }
        }
    }

}
