import { initWorksFilter } from './src/works-filter.js';

// Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Dark Mode Toggle
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

// Toggle menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typing animation for hero title
const typingText = document.querySelector('.typing-text');
const texts = ['Software Engineer', 'React Developer', 'Frontend Specialist', 'AI Enthusiast'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeText, typeSpeed);
}

if (typingText) {
    setTimeout(typeText, 1000);
}

// Animate skill bars on scroll
const skillObserverOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, skillObserverOptions);

const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    skillObserver.observe(card);
});

// Parallax effect for hero orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.1);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Fade in animations on scroll
const fadeObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px 100px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, fadeObserverOptions);

// Add fade-in class to elements
const fadeElements = document.querySelectorAll('.work-card, .skill-card, .info-card, .exp-card, .timeline-item, .contact-card, .techs-slider');
fadeElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s ease ${index * 0.1}s`;    
    fadeObserver.observe(el);
});

// Work card tilt effect
const workCards = document.querySelectorAll('.work-card');
workCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Work modal functionality
const infoButtons = document.querySelectorAll('.work-info-btn');
const modals = document.querySelectorAll('.work-modal');
const closeButtons = document.querySelectorAll('.work-modal-close');

infoButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = e.target.closest('.work-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    });
});

modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Cursor effect (optional - creates a custom cursor)
let cursor = null;
let cursorFollower = null;

function createCursor() {
    cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--primary);
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
    
    cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    cursorFollower.style.cssText = `
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 2px solid var(--primary);
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        transition: all 0.3s ease;
        opacity: 0.5;
    `;
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
}

// Uncomment to enable custom cursor
// createCursor();

// if (cursor && cursorFollower) {
//     document.addEventListener('mousemove', (e) => {
//         cursor.style.left = e.clientX - 5 + 'px';
//         cursor.style.top = e.clientY - 5 + 'px';
//         
//         cursorFollower.style.left = e.clientX - 15 + 'px';
//         cursorFollower.style.top = e.clientY - 15 + 'px';
//     });
//     
//     document.querySelectorAll('a, button, .work-card, .skill-card').forEach(el => {
//         el.addEventListener('mouseenter', () => {
//             cursor.style.transform = 'scale(1.5)';
//             cursorFollower.style.transform = 'scale(1.5)';
//         });
//         
//         el.addEventListener('mouseleave', () => {
//             cursor.style.transform = 'scale(1)';
//             cursorFollower.style.transform = 'scale(1)';
//         });
//     });
// }

// Smooth page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Initialize Works Filter
document.addEventListener('DOMContentLoaded', () => {
    initWorksFilter();
});
