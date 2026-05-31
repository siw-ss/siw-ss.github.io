import { aiProjectsData } from '../data/ai-projects-data.js';

export function initAiShowcase() {
  const section = document.querySelector('.ai-showcase');
  if (!section) return;

  const grid = section.querySelector('.ai-showcase-grid');
  if (!grid) return;

  // Render all AI project cards.
  // Each card has a meta bar (title, tags, links) above a full-bleed iframe sandbox.
  grid.innerHTML = aiProjectsData.map(project => `
    <div class="ai-card">

      <!-- Meta bar — stays inside the container flow -->
      <div class="ai-card-meta">
        <div class="ai-card-info">
          <h3 class="ai-card-title">${project.title}</h3>
          <p class="ai-card-description">${project.description}</p>
          <div class="ai-card-tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </div>
        <div class="ai-card-actions">
          ${project.liveUrl ? `
            <a href="${project.liveUrl}" target="_blank" class="ai-action-btn" aria-label="Open full page" data-tooltip="Open full page">
              <i class="bx bx-link-external"></i>
              <span>Open full page</span>
            </a>
          ` : ''}
          ${project.github ? `
            <a href="${project.github}" target="_blank" class="ai-action-btn" aria-label="View source" data-tooltip="View source">
              <i class="bx bxl-github"></i>
              <span>Source</span>
            </a>
          ` : ''}
        </div>
      </div>

      <!-- Full-bleed sandbox — breaks out of the container -->
      <div class="ai-sandbox-wrapper">
        <iframe
          src="${project.iframeUrl}"
          class="ai-sandbox-iframe"
          title="${project.title}"
          allowfullscreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>

    </div>
  `).join('');

  // Entrance animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 60px 0px' });

  grid.querySelectorAll('.ai-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`;
    observer.observe(card);
  });
}
