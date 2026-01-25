import { projectsData } from '../data/projects-data.js';

// Initialize animations for work cards
function initWorkCardAnimations() {
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

  const workCards = document.querySelectorAll('.work-card');
  workCards.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s ease ${index * 0.1}s`;    
    fadeObserver.observe(el);
  });

  // Work card tilt effect
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
}

export function initWorksFilter() {
  const worksGrid = document.querySelector('.works-grid');
  const filterContainer = document.querySelector('.works-filter');
  
  if (!worksGrid || !filterContainer) return;

  // Create modals for all projects
  function createModals() {
    const modalsContainer = document.createElement('div');
    modalsContainer.innerHTML = projectsData.map(project => `
      <div id="modal-${project.id}" class="work-modal">
        <div class="work-modal-content">
          <span class="work-modal-close">&times;</span>
          <h2>${project.title}</h2>
          <p>${project.modalContent.subtitle}</p>
          <ul>
            ${project.modalContent.points.map(point => `
              <li><strong>${point.label}:</strong> ${point.text}</li>
            `).join('')}
          </ul>
        </div>
      </div>
    `).join('');
    document.body.appendChild(modalsContainer);
  }

  createModals();

  // Extract unique values for filters
  const years = [...new Set(projectsData.map(p => new Date(p.date).getFullYear()))].sort((a, b) => b - a);
  
  const techStacks = new Set();
  const types = new Set();
  
  projectsData.forEach(project => {
    project.tags.forEach(tag => {
      // Categorize tags
      if (['Internship', 'University', 'Hackathon', 'Professional', 'Certification', 'Leadership', 'Winner'].includes(tag)) {
        types.add(tag);
      } else if (!['Full-Stack', 'Frontend', 'Backend', 'Mobile', 'E-commerce', 'Web Design', 'Corporate', 'Data Platform', 'Product Showcase', 'Community', 'Gamification', 'Performance', 'Authentication', 'Vanilla'].includes(tag)) {
        techStacks.add(tag);
      }
    });
  });

  const sortedTechStacks = Array.from(techStacks).sort();
  const sortedTypes = Array.from(types).sort();

  // Create filter dropdowns
  const filterHTML = `
    <div class="filter-dropdowns">
      <select class="filter-select" id="year-filter">
        <option value="all">All Years</option>
        ${years.map(year => `<option value="${year}">${year}</option>`).join('')}
      </select>
      
      <select class="filter-select" id="tech-filter">
        <option value="all">All Technologies</option>
        ${sortedTechStacks.map(tech => `<option value="${tech.toLowerCase()}">${tech}</option>`).join('')}
      </select>
      
      <select class="filter-select" id="type-filter">
        <option value="all">All Types</option>
        ${sortedTypes.map(type => `<option value="${type.toLowerCase()}">${type}</option>`).join('')}
      </select>
      
      <button class="filter-reset-btn" id="reset-filters">
        <i class="bx bx-reset"></i> Reset
      </button>
    </div>
  `;
  
  filterContainer.innerHTML = filterHTML;

  // Sort projects by date (newest first)
  const sortedProjects = [...projectsData].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  // Current filter state
  let currentFilters = {
    year: 'all',
    tech: 'all',
    type: 'all'
  };

  // Render projects
  function renderProjects() {
    const filtered = sortedProjects.filter(project => {
      const projectYear = new Date(project.date).getFullYear().toString();
      const projectTags = project.tags.map(t => t.toLowerCase());
      
      const yearMatch = currentFilters.year === 'all' || projectYear === currentFilters.year;
      const techMatch = currentFilters.tech === 'all' || projectTags.includes(currentFilters.tech);
      const typeMatch = currentFilters.type === 'all' || projectTags.includes(currentFilters.type);
      
      return yearMatch && techMatch && typeMatch;
    });

    worksGrid.innerHTML = filtered.map(project => `
      <div class="work-card" data-tags="${project.tags.map(t => t.toLowerCase()).join(' ')}">
        <div class="work-image">
          <img src="${project.image}" alt="${project.title}" />
          <div class="work-overlay">
            ${project.links.github ? `
              <a href="${project.links.github}" target="_blank" class="work-link">
                <i class="bx bx-link-external"></i>
              </a>
            ` : ''}
            ${project.links.live ? `
              <a href="${project.links.live}" target="_blank" class="work-link">
                <i class="bx bx-link-external"></i>
              </a>
            ` : ''}
            <button class="work-link work-info-btn" data-modal="modal-${project.id}">
              <i class="bx bx-info-circle"></i>
            </button>
          </div>
        </div>
        <div class="work-content">
          <h3 class="work-title">${project.title}</h3>
          <p class="work-date">${new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</p>
          <div class="work-tags">
            ${project.tags.slice(0, 2).map(tag => `<span class="tag">${tag}</span>`).join('')}
            ${project.tags.length > 2 ? `<span class="tag">+${project.tags.length - 2}</span>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    // Re-attach modal listeners
    attachModalListeners();
    
    // Re-initialize animations for new work cards
    initWorkCardAnimations();
  }

  // Filter change listeners
  document.getElementById('year-filter').addEventListener('change', (e) => {
    currentFilters.year = e.target.value;
    renderProjects();
  });

  document.getElementById('tech-filter').addEventListener('change', (e) => {
    currentFilters.tech = e.target.value;
    renderProjects();
  });

  document.getElementById('type-filter').addEventListener('change', (e) => {
    currentFilters.type = e.target.value;
    renderProjects();
  });

  document.getElementById('reset-filters').addEventListener('click', () => {
    currentFilters = { year: 'all', tech: 'all', type: 'all' };
    document.getElementById('year-filter').value = 'all';
    document.getElementById('tech-filter').value = 'all';
    document.getElementById('type-filter').value = 'all';
    renderProjects();
  });

  // Modal functionality
  function attachModalListeners() {
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
  }

  // Initial render
  renderProjects();
}
