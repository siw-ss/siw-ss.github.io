/* ===========================
   THEME TOGGLE COMPONENT
   =========================== */

export function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', currentTheme);

    // Update icon based on current theme
    function updateThemeIcon() {
        const icon = themeToggle.querySelector('i');
        if (html.getAttribute('data-theme') === 'dark') {
            icon.classList.remove('bx-moon');
            icon.classList.add('bx-sun');
        } else {
            icon.classList.remove('bx-sun');
            icon.classList.add('bx-moon');
        }
    }

    // Update tech logos based on theme
    function updateTechLogos() {
        const theme = html.getAttribute('data-theme');
        const techLogos = document.querySelectorAll('.tech-logo');
        
        techLogos.forEach(logo => {
            const lightSrc = logo.getAttribute('data-light');
            const darkSrc = logo.getAttribute('data-dark');
            
            if (theme === 'dark' && darkSrc) {
                logo.src = darkSrc;
            } else if (lightSrc) {
                logo.src = lightSrc;
            }
        });
    }

    updateThemeIcon();
    updateTechLogos();

    // Toggle theme
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
        updateTechLogos();
    });
}
