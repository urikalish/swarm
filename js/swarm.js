import { helper } from './helper.js';

const canvasWidth = 800;
const canvasHeight = 400;
const numParticles = 100;
const pSize = 5;
const maxX = canvasWidth - pSize;
const maxY = canvasHeight - pSize;
const maxA = 0.5;
const maxV = 3.0;

const particles = [];
const distances = [];
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const init = () => {
    for (let i = 0; i < numParticles; i++) {
        particles.push(
        {
            id: i,
            w: pSize,
            h: pSize,
            x: Math.trunc(Math.random() * maxX),
            y: Math.trunc(Math.random() * maxY),
            //x: Math.trunc(canvasWidth/2 + pSize/2),
            //y: Math.trunc(canvasHeight/2 + pSize/2),
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

const computeA = (p) => {
    distances.length = 0;
    particles.forEach(n => {
        if (n.id !== p.id) {
            distances.push({
                id: n.id,
                distance: Math.abs(n.x - p.x) + Math.abs(n.y - p.y)    
            });
        }
    });
    distances.sort((a,b) => a.distance - b.distance);
    let targetX = 0;
    let targetY = 0;
    let distancesCount = Math.trunc(helper.rnd(5, 10));
    for (let i = 0; i < distancesCount; i++) {
        targetX += particles[distances[i].id].x;
        targetY += particles[distances[i].id].y;
    }
    targetX = targetX / distancesCount;
    targetY = targetY / distancesCount;
    if (targetX >= p.x) {
        p.ax = helper.rnd(0, maxA);
    } else {
        p.ax = helper.rnd(-maxA, 0);
    }
    if (targetY >= p.y) {
        p.ay = helper.rnd(0, maxA);
    } else {
        p.ay = helper.rnd(-maxA, 0);
    }
    p.ax += helper.rnd(-1, 1);
    p.ay += helper.rnd(-1, 1);

};

const move = () => {    
    particles.forEach(p => {
        computeA(p);
        p.vx += p.ax;
        p.vy += p.ay;
        p.vx = helper.clamp(p.vx, -maxV, maxV);
        p.vy = helper.clamp(p.vy, -maxV, maxV);
        p.x += p.vx;
        p.y += p.vy;
        p.x = helper.clamp(p.x, 0, maxX);
        p.y = helper.clamp(p.y, 0, maxY);
        if (p.x === 0) {
            p.ax = maxA;
            p.vx = maxV;
        } else if (p.x === maxX) {
            p.ax = -maxA;
            p.vx = -maxV;
        }
        if (p.y === 0) {
            p.ay = maxA;
            p.vy = maxV;
        } else if (p.y === maxY) {
            p.ay = -maxA;
            p.vy = -maxV;
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
