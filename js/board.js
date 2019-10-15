const boardSizes = [1200, 600, 100];
const clearColor = '#000';

export class Board {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.sizes = boardSizes;
    }

    clear(p) {
        const size = Math.trunc(p[2] / 10);
        this.ctx.fillStyle = clearColor;        
        this.ctx.fillRect(Math.trunc(p[0]), Math.trunc(p[1]), size, size);    
    }

    draw(p, color) {
        const size = Math.trunc(p[2] / 10);
        this.ctx.fillStyle = color;
        this.ctx.fillRect(Math.trunc(p[0]), Math.trunc(p[1]), size, size);
    }
    
}
