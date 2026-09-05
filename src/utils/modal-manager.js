/* ===========================
   MODAL MANAGER UTILITY
   Handles all modal lifecycle and interactions
   =========================== */

export class ModalManager {
  constructor() {
    this.activeModal = null;
    this.modalsMap = new Map();
    this.setupGlobalListeners();
  }

  /**
   * Register a modal in the manager
   * @param {string} modalId - Unique modal identifier
   * @param {HTMLElement} modalElement - The modal DOM element
   */
  registerModal(modalId, modalElement) {
    this.modalsMap.set(modalId, modalElement);
  }

  /**
   * Open a specific modal
   * @param {string} modalId - Modal identifier to open
   */
  openModal(modalId) {
    const modal = this.modalsMap.get(modalId);
    if (!modal) {
      console.warn(`Modal ${modalId} not found`);
      return;
    }

    // Close previous modal if any
    if (this.activeModal) {
      this.closeModal(this.activeModal);
    }

    modal.classList.add('active');
    this.activeModal = modalId;
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close a specific modal
   * @param {string} modalId - Modal identifier to close
   */
  closeModal(modalId) {
    const modal = this.modalsMap.get(modalId);
    if (!modal) return;

    modal.classList.remove('active');
    if (this.activeModal === modalId) {
      this.activeModal = null;
      document.body.style.overflow = 'auto';
    }
  }

  /**
   * Close currently active modal
   */
  closeActiveModal() {
    if (this.activeModal) {
      this.closeModal(this.activeModal);
    }
  }

  /**
   * Setup global keyboard and click listeners
   */
  setupGlobalListeners() {
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeActiveModal();
      }
    });

    // Close modal on outside click (delegated to body for efficiency)
    document.addEventListener('click', (e) => {
      // Check if click is on a modal backdrop
      if (e.target.classList.contains('work-modal') && e.target.classList.contains('active')) {
        this.closeActiveModal();
      }
    });
  }
}

// Export singleton instance
export const modalManager = new ModalManager();
