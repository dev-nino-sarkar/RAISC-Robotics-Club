import './styles/main.css';

import { initLoader, completeLoader } from './js/loader.js';
import { initNavbar } from './js/navbar.js';
import { initScrollReveal } from './js/scroll-reveal.js';
import { initCanvas } from './js/canvas.js';
import { animateCounters } from './js/counter.js';
import { initFilters } from './js/filter.js';
import { initForm } from './js/form.js';

const sections = ['hero', 'mentors', 'members', 'projects', 'contact'];

async function loadSections() {
    const app = document.getElementById('app');
    
    try {
        for (const section of sections) {
            const response = await fetch(`/sections/${section}.html`);
            if (!response.ok) throw new Error(`Failed to load ${section}`);
            const html = await response.text();
            app.insertAdjacentHTML('beforeend', html);
        }
        
        // Initialize modules after DOM injection
        initCanvas();
        initScrollReveal();
        initNavbar();
        initFilters();
        initForm();
        
        completeLoader(() => {
            // Trigger initial reveal-up animations for hero
            document.querySelectorAll('.hero-section .reveal-up').forEach(el => {
                el.classList.add('in-view');
            });
            // Delay counter animation slightly for better effect
            setTimeout(animateCounters, 1000);
        });

    } catch (error) {
        console.error('Error loading sections:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    loadSections();
});
