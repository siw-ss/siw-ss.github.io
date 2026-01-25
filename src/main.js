/* ===========================
   MAIN APPLICATION ENTRY POINT
   =========================== */

import { initNavigation } from './components/navigation.js';
import { initThemeToggle } from './components/theme-toggle.js';
import { initAnimations } from './components/animations.js';
import { initHero } from './sections/hero.js';
import { initWorksFilter } from './utils/works-filter.js';

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initThemeToggle();
    initAnimations();
    initHero();
    initWorksFilter();
});
