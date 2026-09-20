export function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const memberCards = document.querySelectorAll('.member-card');
    const memberCountEl = document.getElementById('member-count');

    if (!filterBtns.length || !memberCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            let visible = 0;

            memberCards.forEach(card => {
                const match = filter === 'all' || card.dataset.category === filter;
                if (match) {
                    card.classList.remove('hidden');
                    card.style.animation = 'none';
                    requestAnimationFrame(() => {
                        card.style.animation = '';
                        card.classList.add('in-view');
                    });
                    visible++;
                } else {
                    card.classList.add('hidden');
                }
            });

            if (memberCountEl) memberCountEl.textContent = visible;
        });
    });
}
