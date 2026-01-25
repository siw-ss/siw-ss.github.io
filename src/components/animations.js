/* ===========================
   ANIMATIONS COMPONENT
   =========================== */

export function initAnimations() {
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

    // Interactive cursor effect for gradient orbs
    const heroSection = document.querySelector('.hero');
    const orbs = document.querySelectorAll('.gradient-orb');
    
    if (heroSection && orbs.length > 0) {
        let isMouseInHero = false;
        
        heroSection.addEventListener('mousemove', (e) => {
            isMouseInHero = true;
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            orbs.forEach((orb, index) => {
                const speed = 0.15 + (index * 0.08);
                const moveX = (x - rect.width / 2) * speed;
                const moveY = (y - rect.height / 2) * speed;
                
                orb.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.2)`;
                orb.style.opacity = '0.8';
            });
        });
        
        heroSection.addEventListener('mouseleave', () => {
            isMouseInHero = false;
            orbs.forEach((orb) => {
                orb.style.transform = 'translate(0, 0) scale(1)';
                orb.style.opacity = '0.6';
            });
        });
        
        // Update scroll parallax only when mouse is not in hero
        window.addEventListener('scroll', () => {
            if (!isMouseInHero) {
                const scrolled = window.pageYOffset;
                orbs.forEach((orb, index) => {
                    const speed = 0.5 + (index * 0.1);
                    orb.style.transform = `translateY(${scrolled * speed}px)`;
                });
            }
        });
    }

    // Parallax effect for hero orbs (initial setup)
    const initialScrolled = window.pageYOffset;
    const initialOrbs = document.querySelectorAll('.gradient-orb');
    initialOrbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.1);
        orb.style.transform = `translateY(${initialScrolled * speed}px)`;
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
    const fadeElements = document.querySelectorAll('.work-card, .skill-card, .info-card, .exp-card, .timeline-item, .techs-slider');
    fadeElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;    
        fadeObserver.observe(el);
    });

    // Contact cards with slightly faster animation
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.5s ease ${index * 0.08}s`;    
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

    // Smooth page load
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
}
