const canvasWidth = 1600;
const canvasHeight = 800;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const particles = [];
const particleSize = 4;

const init = () => {
    for (let i = 0; i < 100; i++) {
        particles.push(
        {
            w: particleSize,
            h: particleSize,
            x: Math.trunc(Math.random() * (canvasWidth - particleSize)),
            y: Math.trunc(Math.random() * (canvasHeight - particleSize)),
            vx: 0,
            vy: 0,
            ax: 0,
            ay: 0,
            c: {
                    h: Math.trunc(Math.random() * 360),
                    s: 100,
                    l: 25 + Math.trunc(Math.random() * 50)
                }            
        });
    }
};

const clear = () => {
    particles.forEach(p => {
        ctx.fillStyle = "black";
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.w, p.h);
    })
};

const move = () => {
    particles.forEach(p => {
        p.ax = Math.random() * 1 - 0.5;
        p.ay = Math.random() * 1 - 0.5;
        p.vx += p.ax;
        p.vy += p.ay;
        p.vx = Math.max(-3, Math.min(3, p.vx));
        p.vy = Math.max(-3, Math.min(3, p.vy));
        p.x += p.vx;
        p.y += p.vy;
        p.x = Math.max(0, Math.min(canvasWidth-particleSize, p.x));
        p.y = Math.max(0, Math.min(canvasHeight-particleSize, p.y));
    })
};

const draw = () => {
    particles.forEach(p => {
        ctx.fillStyle = `hsl(${p.c.h}, ${p.c.s}%, ${p.c.l}%)`;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.w, p.h);
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
