export function initCanvas() {
    const heroCanvas = document.getElementById('hero-canvas');
    if (!heroCanvas) return;

    const ctx = heroCanvas.getContext('2d');
    let W, H, particles, animFrame;
    const PARTICLE_COUNT = 60;
    const MAX_DIST = 130;
    const CYAN = '0,240,255';
    const AMBER = '255,184,48';

    function resize() {
        W = heroCanvas.width = heroCanvas.offsetWidth;
        H = heroCanvas.height = heroCanvas.offsetHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: Math.random() * 1.6 + 0.4,
            color: Math.random() > 0.8 ? AMBER : CYAN,
            alpha: Math.random() * 0.5 + 0.15,
        };
    }

    function init() {
        resize();
        particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.hypot(dx, dy);
                if (dist < MAX_DIST) {
                    const alpha = (1 - dist / MAX_DIST) * 0.12;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(${CYAN},${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
            ctx.fill();

            p.x += p.vx;
            p.y += p.vy;
            if (p.x < -10) p.x = W + 10;
            if (p.x > W + 10) p.x = -10;
            if (p.y < -10) p.y = H + 10;
            if (p.y > H + 10) p.y = -10;
        });

        animFrame = requestAnimationFrame(draw);
    }

    init();
    draw();

    const ro = new ResizeObserver(() => { resize(); });
    ro.observe(heroCanvas);
}
