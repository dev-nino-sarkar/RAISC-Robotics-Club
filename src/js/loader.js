export function initLoader() {
    // Initial setup if needed
}

export function completeLoader(callback) {
    const loader = document.getElementById('loader');
    if (!loader) {
        if (callback) callback();
        return;
    }
    
    // Simulate some loading time to let animations play
    setTimeout(() => {
        loader.classList.add('done');
        setTimeout(() => {
            if (callback) callback();
        }, 300);
    }, 2200);
}
