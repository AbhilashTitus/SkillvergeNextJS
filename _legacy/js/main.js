/**
 * Skillverge Platform - Main JavaScript Entry Point
 * Initializes all modules and sets up event listeners
 */

// Import modules
import { Navigation } from './modules/navigation.js';
import { Filters } from './modules/filters.js';
// import { Validation } from './modules/validation.js';
// import { Animations } from './modules/animations.js';

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('Skillverge Platform Initialized');
  
  // Initialize navigation module
  Navigation.init();
  
  // Handle page-specific initialization
  const currentPage = window.location.pathname;
  
  // Initialize filters on courses page
  if (currentPage.includes('courses.html')) {
    console.log('Courses page loaded');
    Filters.init();
  }
  
  // Initialize other modules (will be uncommented as needed)
  // Validation.init();
  // Animations.init();
});

