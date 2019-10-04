const canvasWidth = 1600;
const canvasHeight = 800;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const items = [];
const itemSize = 10;

const init = () => {
    for (let i = 0; i < 100; i++) {
        items.push(
        {
            w: itemSize,
            h: itemSize,
            x: canvasWidth/2 - itemSize/2,
            y: canvasHeight/2 - itemSize/2,
            vx: 0,
            vy: 0,
            ax: 0,
            ay: 0,
            c: {
                    h: Math.trunc(360*Math.random()),
                    s: 100,
                    l: 25 + Math.trunc(50*Math.random())
                }            
        });
    }
};

const clear = () => {
    items.forEach(item => {
        ctx.fillStyle = "black";
        ctx.fillRect(Math.round(item.x), Math.round(item.y), item.w, item.h);
    })
};

const move = () => {
    items.forEach(item => {
        item.ax = Math.random() * 1 - 0.5;
        item.ay = Math.random() * 1 - 0.5;
        item.vx += item.ax;
        item.vy += item.ay;
        item.vx = Math.max(-3, Math.min(3, item.vx));
        item.vy = Math.max(-3, Math.min(3, item.vy));
        item.x += item.vx;
        item.y += item.vy;
        item.x = Math.max(0, Math.min(canvasWidth-itemSize, item.x));
        item.y = Math.max(0, Math.min(canvasHeight-itemSize, item.y));
    })
};

const draw = () => {
    items.forEach(item => {
        ctx.fillStyle = `hsl(${item.c.h}, ${item.c.s}%, ${item.c.l}%)`;
        ctx.fillRect(Math.round(item.x), Math.round(item.y), item.w, item.h);
    })
};

const step = () => {
    clear();
    move();
    draw();
    window.requestAnimationFrame(step);
};

init();
window.requestAnimationFrame(step);
