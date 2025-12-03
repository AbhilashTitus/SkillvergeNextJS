/**
 * Navigation Module
 * Handles mobile menu toggle and active page highlighting
 */

export const Navigation = {
  /**
   * Initialize navigation functionality
   */
  init() {
    this.setupMobileToggle();
    this.highlightActivePage();
    this.handleMobileMenuClose();
  },

  /**
   * Set up mobile menu toggle functionality
   */
  setupMobileToggle() {
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', () => {
      const isExpanded = menu.classList.contains('active');
      
      menu.classList.toggle('active');
      toggle.classList.toggle('active');
      toggle.setAttribute('aria-expanded', !isExpanded);
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });
  },

  /**
   * Highlight the current active page in navigation
   */
  highlightActivePage() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      
      // Check if current page matches link
      if (currentPath.endsWith(href) || 
          (currentPath === '/' && href === 'index.html') ||
          (currentPath.endsWith('/') && href === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  },

  /**
   * Close mobile menu when clicking outside or on a link
   */
  handleMobileMenuClose() {
    const menu = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.mobile-toggle');
    const links = document.querySelectorAll('.nav-links a');
    
    if (!menu || !toggle) return;
    
    // Close menu when clicking on a link
    links.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
};
