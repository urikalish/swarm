import { helper } from './helper.js';

const canvasWidth = 1600;
const canvasHeight = 800;
const particleSize = 9;
const maxX = canvasWidth - particleSize;
const maxY = canvasHeight - particleSize;

const particles = [];
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const init = () => {
    for (let i = 0; i < 100; i++) {
        particles.push(
        {
            w: particleSize,
            h: particleSize,
            x: Math.trunc(Math.random() * maxX),
            y: Math.trunc(Math.random() * maxY),
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
        ctx.fillStyle = 'black';
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.w, p.h);
    })
};

const move = () => {
    
    particles.forEach(p => {
        p.ax = helper.rnd(-0.5, 0.5);
        p.ay = helper.rnd(-0.5, 0.5);
        p.vx += p.ax;
        p.vy += p.ay;
        p.vx = helper.clamp(p.vx, -3, 3);
        p.vy = helper.clamp(p.vy, -3, 3);
        p.x += p.vx;
        p.y += p.vy;
        p.x = helper.clamp(p.x, 0, maxX);
        p.y = helper.clamp(p.y, 0, maxY);
        if (p.x === 0) {
            p.ax = 0.5;
            p.vx = 3;
        } else if (p.x === maxX) {
            p.ax = -0.5;
            p.vx = -3;
        }
        if (p.y === 0) {
            p.ay = 0.5;
            p.vy = 3;
        } else if (p.y === maxY) {
            p.ay = -0.5;
            p.vy = -3;
        }
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
