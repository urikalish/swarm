import { Helper } from './helper.js';
import { Unit } from './unit.js';

const armySize = 100;
const neighborsMinMax = [10, 50];

export class Army {

    constructor(id, name, color, board) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.board = board;
        this.units = [];
        for (let i = 0; i < armySize; i++) {
            this.units.push(new Unit(
                i,
                this,
                board,
                Helper.random(0, board.sizes[0]),
                Helper.random(0, board.sizes[1]),
                Helper.random(0, board.sizes[2])));
        }
    }

    computeUnitTarget(u) {
        let distances = [];
        this.units.forEach(n => {
            if (n.id !== u.id) {
                distances.push({
                    id: n.id,
                    distance: u.distance(n)
                });
            }
        });
        distances.sort((a,b) => a.distance - b.distance);
        const target = [0,0,0];
        let neighborCount = Math.trunc(Helper.random(neighborsMinMax[0], neighborsMinMax[1]));
        for (let n = 0; n < neighborCount; n++) {
            for (let i = 0; i < 3; i++) {
                target[i] += this.units[distances[n].id].p[i];
            }
        }
        for (let i = 0; i < 3; i++) {
            target[i] /= neighborCount;
        }        return target;              
    }

    step() {
        this.units.forEach(u => {
            const target = this.computeUnitTarget(u);
            u.accelerateToTarget(target);
        });
        this.units.forEach(u => {
            const oldP = [...u.p];
            const oldColor = u.color;
            u.move();
            if (u.p.join() !== oldP.join() || u.color.join() !== oldColor.join()) {
                this.board.clear(oldP);
                this.board.draw(u.p, u.color);
            }
        });
    }
}
