import { projectsData } from '../data/projects-data.js';
import { modalManager } from './modal-manager.js';

/**
 * Calculate duration between two dates and format it
 * @param {string} startDate - Start date in YYYY-MM format
 * @param {string} endDate - End date in YYYY-MM format
 * @returns {string} Formatted duration string (e.g., "6 mo")
 */
function calculateDuration(startDate, endDate) {
  if (!startDate || !endDate) return null;
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months += end.getMonth() - start.getMonth();
  months += 1; // Include both start and end month
  
  if (months < 1) return null;
  if (months === 1) return '1 mo';
  if (months < 12) return `${months} mo`;
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (remainingMonths === 0) {
    return years === 1 ? '1 yr' : `${years} yrs`;
  }
  return `${years} yr ${remainingMonths} mo`;
}

/**
 * Format date range and duration
 * @param {string} startDate - Start date in YYYY-MM format
 * @param {string} endDate - End date in YYYY-MM format
 * @param {Array} tags - Project tags array
 * @returns {string} Formatted string like "Feb - Jul 2024 · 6 mo" or just "Jul 2024"
 */
function formatDateRange(startDate, endDate, tags = []) {
  // Hide duration for university projects (show just date)
  const isUniversityProject = tags.some(t => t.toLowerCase() === 'university');
  
  if (!startDate || !endDate) {
    return new Date(endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
  const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
  const year = end.getFullYear();
  
  // If university project, don't show duration
  if (isUniversityProject) {
    return `${endMonth} ${year}`;
  }
  
  const duration = calculateDuration(startDate, endDate);
  
  if (startMonth === endMonth && start.getFullYear() === end.getFullYear()) {
    // Same month and year
    return duration ? `${startMonth} ${year} · ${duration}` : `${startMonth} ${year}`;
  }
  
  if (start.getFullYear() === end.getFullYear()) {
    // Same year
    return duration ? `${startMonth} - ${endMonth} ${year} · ${duration}` : `${startMonth} - ${endMonth} ${year}`;
  }
  
  // Different years
  return duration ? `${startMonth} ${start.getFullYear()} - ${endMonth} ${year} · ${duration}` : `${startMonth} ${start.getFullYear()} - ${endMonth} ${year}`;
}

/**
 * Initialize fade-in and tilt animations for work cards
 */
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
  
  // Apply fade-in animation
  workCards.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s ease ${index * 0.1}s`;
    fadeObserver.observe(el);
  });

  // Apply tilt effect on hover
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

/**
 * Initialize works filter with quick filters, dropdowns, and modal system
 */
export function initWorksFilter() {
  const worksGrid = document.querySelector('.works-grid');
  const filterContainer = document.querySelector('.works-filter');

  if (!worksGrid || !filterContainer) return;

  /**
   * Create modals for all projects
   */
  function createModals() {
    const modalsContainer = document.createElement('div');
    modalsContainer.id = 'work-modals-container';

    modalsContainer.innerHTML = projectsData.map(project =>
      renderProjectModal(project)
    ).join('');

    document.body.appendChild(modalsContainer);

    // Register all modals with manager
    projectsData.forEach(project => {
      const modal = document.getElementById(`modal-${project.id}`);
      if (modal) {
        modalManager.registerModal(`modal-${project.id}`, modal);
      }
    });
  }

  /**
   * Render modal HTML for a project
   * @param {Object} project - Project data object
   * @returns {string} Modal HTML string
   */
  function renderProjectModal(project) {
    return `
      <div id="modal-${project.id}" class="work-modal">
        <div class="work-modal-content">
          <span class="work-modal-close">&times;</span>
          <h2>${project.title}</h2>
          <p>${project.modalContent.subtitle}</p>
          <ul class="modal-points">
            ${project.modalContent.points.map(point => `
              <li><strong>${point.label}:</strong> ${point.text}</li>
            `).join('')}
          </ul>
          ${project.contributions ? `
            <div class="modal-contributions">
              <h3>My Contributions</h3>
              <ul class="contributions-list">
                ${project.contributions.map(contribution => `
                  <li>${contribution}</li>
                `).join('')}
              </ul>
            </div>
          ` : ''}
          <div class="modal-tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }

  createModals();
  attachModalEventListeners();

  // Extract unique years, tech stacks, and project types from project data
  const years = [...new Set(projectsData.map(p => new Date(p.date).getFullYear()))].sort((a, b) => b - a);

  const techStacks = new Set();
  const types = new Set();

  projectsData.forEach(project => {
    project.tags.forEach(tag => {
      // Categorize tags into types or tech stacks
      const typeIndicators = ['Internship', 'University', 'Hackathon', 'Professional', 'Certification', 'Leadership', 'Winner'];
      const descriptiveTags = ['Full-Stack', 'Frontend', 'Backend', 'Mobile', 'E-commerce', 'Web Design', 'Corporate', 'Data Platform', 'Product Showcase', 'Community', 'Gamification', 'Performance', 'Authentication'];

      if (typeIndicators.includes(tag)) {
        types.add(tag);
      } else if (!descriptiveTags.includes(tag)) {
        techStacks.add(tag);
      }
    });
  });

  const sortedTechStacks = Array.from(techStacks).sort();
  const sortedTypes = Array.from(types).sort();

  // Quick filter configuration
  let currentQuickFilter = 'all';
  const clientTags = ['e-commerce', 'corporate', 'leadership', 'client', 'freelance', 'product showcase'];
  const aiTags = ['python', 'ai', 'deep learning', 'machine learning', 'data', 'power bi'];

  // Render filter UI
  const filterHTML = `
    <div class="quick-filter-buttons">
      <button class="quick-filter-btn active" data-category="all">All</button>
      <button class="quick-filter-btn" data-category="internship">Internships</button>
      <button class="quick-filter-btn" data-category="client">Client Work</button>
      <button class="quick-filter-btn" data-category="university">Academic</button>
      <button class="quick-filter-btn" data-category="ai">AI / ML</button>
    </div>
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

  /**
   * Render filtered projects with applied filters
   */
  function renderProjects() {
    const filtered = sortedProjects.filter(project => {
      const projectYear = new Date(project.date).getFullYear().toString();
      const projectTags = project.tags.map(t => t.toLowerCase());

      const yearMatch = currentFilters.year === 'all' || projectYear === currentFilters.year;
      const techMatch = currentFilters.tech === 'all' || projectTags.includes(currentFilters.tech);
      const typeMatch = currentFilters.type === 'all' || projectTags.includes(currentFilters.type);

      // Apply quick filter logic
      let quickMatch = true;
      if (currentQuickFilter === 'internship') quickMatch = projectTags.includes('internship');
      else if (currentQuickFilter === 'client') quickMatch = clientTags.some(t => projectTags.includes(t));
      else if (currentQuickFilter === 'university') quickMatch = projectTags.includes('university') || projectTags.includes('hackathon');
      else if (currentQuickFilter === 'ai') quickMatch = aiTags.some(t => projectTags.includes(t));

      return yearMatch && techMatch && typeMatch && quickMatch;
    });

    // Render project cards
    worksGrid.innerHTML = filtered.map(project => `
      <div class="work-card" data-tags="${project.tags.map(t => t.toLowerCase()).join(' ')}">
        <div class="work-image">
          <img src="${project.image}" alt="${project.title}" />
          <div class="work-overlay">
            ${project.links.github ? `
              <a href="${project.links.github}" target="_blank" class="work-link" aria-label="View GitHub">
                <i class="bx bx-link-external"></i>
              </a>
            ` : ''}
            ${project.links.live ? `
              <a href="${project.links.live}" target="_blank" class="work-link" aria-label="View live">
                <i class="bx bx-link-external"></i>
              </a>
            ` : ''}
            ${project.modalContent.resources?.pdf ? `
              <button class="work-link pdf-viewer-link" data-pdf-path="${project.modalContent.resources.pdf}" aria-label="View PDF">
                <i class="bx bxs-file"></i>
              </button>
            ` : ''}
            <button class="work-link work-info-btn" data-modal="modal-${project.id}" aria-label="View details">
              <i class="bx bx-info-circle"></i>
            </button>
          </div>
        </div>
        <div class="work-content">
          <h3 class="work-title">${project.title}</h3>
          <p class="work-role">${project.role}</p>
          <p class="work-date">${formatDateRange(project.startDate, project.endDate, project.tags)}</p>
          <div class="work-tags">
            ${project.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
            ${project.tags.length > 3 ? `<span class="tag more-tags-trigger" data-modal="modal-${project.id}">+${project.tags.length - 3}</span>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    // Re-initialize animations for newly rendered cards
    initWorkCardAnimations();
  }

  // Attach filter event listeners
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

  // Attach quick filter button listeners
  document.querySelectorAll('.quick-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button state
      document.querySelectorAll('.quick-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentQuickFilter = btn.getAttribute('data-category');

      // Reset dropdown filters
      currentFilters = { year: 'all', tech: 'all', type: 'all' };
      document.getElementById('year-filter').value = 'all';
      document.getElementById('tech-filter').value = 'all';
      document.getElementById('type-filter').value = 'all';

      renderProjects();
    });
  });

  // Reset all filters
  document.getElementById('reset-filters').addEventListener('click', () => {
    currentFilters = { year: 'all', tech: 'all', type: 'all' };
    currentQuickFilter = 'all';
    document.getElementById('year-filter').value = 'all';
    document.getElementById('tech-filter').value = 'all';
    document.getElementById('type-filter').value = 'all';
    document.querySelectorAll('.quick-filter-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.quick-filter-btn[data-category="all"]').classList.add('active');
    renderProjects();
  });

  /**
   * Attach event listeners for modal interactions using event delegation
   */
  function attachModalEventListeners() {
    document.addEventListener('click', (e) => {
      const closeBtn = e.target.closest('.work-modal-close');
      const infoBtn = e.target.closest('.work-info-btn');
      const moreTagsBtn = e.target.closest('.more-tags-trigger');
      const pdfBtn = e.target.closest('.pdf-viewer-link');

      if (closeBtn) {
        const modal = closeBtn.closest('.work-modal');
        if (modal) {
          modalManager.closeModal(modal.id);
        }
      }

      if (infoBtn) {
        e.preventDefault();
        const modalId = infoBtn.getAttribute('data-modal');
        modalManager.openModal(modalId);
      }

      if (moreTagsBtn) {
        e.preventDefault();
        const modalId = moreTagsBtn.getAttribute('data-modal');
        modalManager.openModal(modalId);
      }

      if (pdfBtn) {
        e.preventDefault();
        const pdfPath = pdfBtn.getAttribute('data-pdf-path');
        openPdfViewer(pdfPath);
      }
    });
  }

  /**
   * Open PDF viewer in modal with page-flipping animation
   * @param {string} pdfPath - Path to the PDF file
   */
  function openPdfViewer(pdfPath) {
    let pdfModal = document.getElementById('pdf-viewer-modal');

    if (!pdfModal) {
      pdfModal = document.createElement('div');
      pdfModal.id = 'pdf-viewer-modal';
      pdfModal.className = 'pdf-viewer-modal';
      pdfModal.innerHTML = `
        <div class="pdf-modal-overlay">
          <div class="pdf-modal-container">
            <button class="pdf-modal-close" aria-label="Close PDF viewer">&times;</button>
            <div class="pdf-viewer-wrapper">
              <div id="pdf-loading" class="pdf-loading">
                <div class="pdf-spinner"></div>
                <p>Loading PDF...</p>
              </div>
              <div id="pdf-flipbook" class="pdf-flipbook" style="display: none;"></div>
              <div class="pdf-controls" style="display: none;">
                <button id="pdf-prev-btn" class="pdf-nav-btn" aria-label="Previous page">
                  <i class="bx bx-chevron-left"></i>
                </button>
                <span class="pdf-page-info">
                  <span id="pdf-current-page">1</span> / <span id="pdf-total-pages">0</span>
                </span>
                <button id="pdf-next-btn" class="pdf-nav-btn" aria-label="Next page">
                  <i class="bx bx-chevron-right"></i>
                </button>
                <div class="pdf-extra-controls">
                  <button id="pdf-open-fullscreen-btn" class="pdf-extra-btn" aria-label="Open in new window">
                    <i class="bx bx-expand"></i>
                  </button>
                  <button id="pdf-download-btn" class="pdf-extra-btn" aria-label="Download PDF">
                    <i class="bx bx-download"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(pdfModal);

      // Close button
      pdfModal.querySelector('.pdf-modal-close').addEventListener('click', () => {
        pdfModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        cleanupPdf();
      });

      // Close on background click
      pdfModal.querySelector('.pdf-modal-overlay').addEventListener('click', (e) => {
        if (e.target === pdfModal.querySelector('.pdf-modal-overlay')) {
          pdfModal.classList.remove('active');
          document.body.style.overflow = 'auto';
          cleanupPdf();
        }
      });

      // Close on Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && pdfModal.classList.contains('active')) {
          pdfModal.classList.remove('active');
          document.body.style.overflow = 'auto';
          cleanupPdf();
        }
      });
    }

    /**
     * Cleanup PDF resources to prevent memory leaks
     */
    function cleanupPdf() {
      const flipbook = document.getElementById('pdf-flipbook');
      flipbook._pdfDoc = null;
      flipbook.innerHTML = '';
    }

    // Load and render PDF
    loadPdfWithFlipAnimation(pdfPath);
    pdfModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Load PDF and create flip animation with lazy loading
   * @param {string} pdfPath - Path to PDF file
   */
  async function loadPdfWithFlipAnimation(pdfPath) {
    const flipbook = document.getElementById('pdf-flipbook');
    const loading = document.getElementById('pdf-loading');
    const controls = document.querySelector('.pdf-controls');
    
    // Show loading indicator
    loading.style.display = 'flex';
    flipbook.style.display = 'none';
    controls.style.display = 'none';

    // Clear previous content
    flipbook.innerHTML = '';

    try {
      // Check for PDF.js library
      const pdfjsLib = window.pdfjsLib;
      if (!pdfjsLib) {
        throw new Error('PDF.js library not available. Please try again or reload the page.');
      }

      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

      const pdf = await pdfjsLib.getDocument(pdfPath).promise;
      const totalPages = pdf.numPages;
      
      // Store reference for cleanup
      flipbook._pdfDoc = pdf;
      document.getElementById('pdf-total-pages').textContent = totalPages;

      // Store PDF path for download and fullscreen
      flipbook.dataset.pdfPath = pdfPath;

      // Render ONLY the first page immediately
      const pages = [];
      const firstPage = await pdf.getPage(1);
      const viewport = firstPage.getViewport({ scale: 2 });
      
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      const context = canvas.getContext('2d');
      await firstPage.render({
        canvasContext: context,
        viewport: viewport
      }).promise;

      const pageDiv = document.createElement('div');
      pageDiv.className = 'pdf-page active';
      pageDiv.appendChild(canvas);
      flipbook.appendChild(pageDiv);
      pages.push(pageDiv);

      // Create placeholder divs for other pages (lazy load on demand)
      for (let pageNum = 2; pageNum <= totalPages; pageNum++) {
        const placeholder = document.createElement('div');
        placeholder.className = 'pdf-page';
        placeholder.dataset.pageNum = pageNum;
        placeholder.innerHTML = '<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#f5f5f5;"><p style="color:var(--text-light);">Page ' + pageNum + '</p></div>';
        flipbook.appendChild(placeholder);
        pages.push(placeholder);
      }

      // Hide loading, show flipbook and controls
      loading.style.display = 'none';
      flipbook.style.display = 'flex';
      controls.style.display = 'flex';

      // Initialize page flipping with lazy loading
      setupPageFlipping(pages, pdf);

    } catch (error) {
      console.error('Error loading PDF:', error);
      loading.innerHTML = `
        <div style="text-align: center;">
          <p style="color: var(--primary); margin-bottom: 1rem; font-weight: 600;">Unable to load PDF</p>
          <p style="color: var(--text-light); margin-bottom: 1.5rem;">${error.message}</p>
          <button onclick="window.location.reload()" style="padding: 0.75rem 1.5rem; background: var(--primary); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">Reload Page</button>
        </div>
      `;
    }
  }

  let pdfKeyboardHandler = null;

  /**
   * Setup page flipping navigation with lazy loading
   * @param {Array} pages - Array of page elements
   * @param {Object} pdf - PDF document object
   */
  function setupPageFlipping(pages, pdf) {
    let currentPage = 0;
    const totalPages = pages.length;
    const renderedPages = new Set([0]); // Track which pages have been rendered

    const prevBtn = document.getElementById('pdf-prev-btn');
    const nextBtn = document.getElementById('pdf-next-btn');
    const currentPageSpan = document.getElementById('pdf-current-page');
    const flipbook = document.getElementById('pdf-flipbook');

    /**
     * Render a specific page on demand (with concurrency control)
     */
    let renderingPage = null; // Track currently rendering page

    async function renderPage(pageNum) {
      if (renderedPages.has(pageNum) || renderingPage === pageNum) return; // Already rendered or rendering
      
      renderingPage = pageNum;
      const page = pages[pageNum];
      try {
        const pdfPage = await pdf.getPage(pageNum + 1);
        const viewport = pdfPage.getViewport({ scale: 2 });
        
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        const context = canvas.getContext('2d');
        await pdfPage.render({
          canvasContext: context,
          viewport: viewport
        }).promise;

        // Only update if still the requested page
        if (renderingPage === pageNum) {
          page.innerHTML = '';
          page.appendChild(canvas);
          renderedPages.add(pageNum);
        }
      } catch (error) {
        console.error(`Error rendering page ${pageNum + 1}:`, error);
      } finally {
        renderingPage = null;
      }
    }

    function showPage(pageNum) {
      pages.forEach((page, index) => {
        page.classList.remove('active', 'flip-out', 'flip-in');
        if (index === pageNum) {
          page.classList.add('active');
          if (index > currentPage) {
            page.classList.add('flip-in');
          } else if (index < currentPage) {
            page.classList.add('flip-out');
          }
        }
      });
      currentPage = pageNum;
      currentPageSpan.textContent = currentPage + 1;
      
      prevBtn.disabled = currentPage === 0;
      nextBtn.disabled = currentPage === totalPages - 1;

      // Lazy load: render adjacent pages
      if (currentPage > 0 && !renderedPages.has(currentPage - 1)) {
        renderPage(currentPage - 1);
      }
      if (currentPage < totalPages - 1 && !renderedPages.has(currentPage + 1)) {
        renderPage(currentPage + 1);
      }
    }

    prevBtn.addEventListener('click', () => {
      if (currentPage > 0) {
        showPage(currentPage - 1);
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages - 1) {
        showPage(currentPage + 1);
      }
    });

    // Open in new window
    document.getElementById('pdf-open-fullscreen-btn').addEventListener('click', () => {
      const pdfPath = document.getElementById('pdf-flipbook').dataset.pdfPath;
      window.open(pdfPath, '_blank');
    });

    // Download PDF
    document.getElementById('pdf-download-btn').addEventListener('click', () => {
      const pdfPath = document.getElementById('pdf-flipbook').dataset.pdfPath;
      const link = document.createElement('a');
      link.href = pdfPath;
      link.download = pdfPath.split('/').pop() || 'presentation.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    // Setup keyboard navigation (reuse existing handler)
    if (pdfKeyboardHandler) {
      document.removeEventListener('keydown', pdfKeyboardHandler);
    }
    
    pdfKeyboardHandler = (e) => {
      if (document.getElementById('pdf-viewer-modal').classList.contains('active')) {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
      }
    };
    
    document.addEventListener('keydown', pdfKeyboardHandler);

    // Initialize
    showPage(0);
  }

  // Initial render
  renderProjects();
}
