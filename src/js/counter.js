export function animateCounters() {
    document.querySelectorAll('.stat-num[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count, 10);
        const duration = 1400;
        const start = performance.now();

        function update(ts) {
            const elapsed = ts - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target);
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }
        requestAnimationFrame(update);
    });
}
