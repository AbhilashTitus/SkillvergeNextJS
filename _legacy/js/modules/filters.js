/**
 * Filters Module
 * Handles course filtering and sorting functionality
 */

export const Filters = {
  courses: [],
  filteredCourses: [],
  
  /**
   * Initialize filter functionality
   */
  init() {
    this.setupFilterListeners();
    this.setupSortListeners();
    this.loadCourses();
  },

  /**
   * Load courses from the page
   */
  loadCourses() {
    const courseCards = document.querySelectorAll('.course-card');
    this.courses = Array.from(courseCards).map(card => ({
      element: card,
      title: card.querySelector('.course-title')?.textContent || '',
      price: parseFloat(card.querySelector('.course-price')?.textContent.replace('₹', '').replace(',', '') || 0),
      category: card.dataset.category || '',
      level: card.dataset.level || '',
      rating: parseFloat(card.querySelector('.rating')?.dataset.rating || 0)
    }));
    
    this.filteredCourses = [...this.courses];
  },

  /**
   * Set up filter event listeners
   */
  setupFilterListeners() {
    // Category filters
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    categoryCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => this.applyFilters());
    });
    
    // Price range filter
    const priceSlider = document.querySelector('.price-slider');
    if (priceSlider) {
      priceSlider.addEventListener('input', (e) => {
        const priceDisplay = document.querySelector('.price-display');
        if (priceDisplay) {
          priceDisplay.textContent = `₹100 - ₹${e.target.value}`;
        }
      });
      
      priceSlider.addEventListener('change', () => this.applyFilters());
    }
    
    // Level filters
    const levelRadios = document.querySelectorAll('input[name="level"]');
    levelRadios.forEach(radio => {
      radio.addEventListener('change', () => this.applyFilters());
    });
    
    // Clear filters button
    const clearBtn = document.querySelector('.clear-filters');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearFilters());
    }
  },

  /**
   * Set up sort event listeners
   */
  setupSortListeners() {
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortCourses(e.target.value);
      });
    }
  },

  /**
   * Apply all active filters
   */
  applyFilters() {
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
      .map(cb => cb.value);
    
    const maxPrice = document.querySelector('.price-slider')?.value || 5000;
    
    const selectedLevel = document.querySelector('input[name="level"]:checked')?.value;
    
    this.filteredCourses = this.courses.filter(course => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(course.category);
      const priceMatch = course.price <= maxPrice;
      const levelMatch = !selectedLevel || course.level === selectedLevel;
      
      return categoryMatch && priceMatch && levelMatch;
    });
    
    this.displayCourses();
  },

  /**
   * Sort courses by selected criterion
   */
  sortCourses(sortBy) {
    switch(sortBy) {
      case 'price-low':
        this.filteredCourses.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredCourses.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        this.filteredCourses.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Keep original order for newest
        break;
    }
    
    this.displayCourses();
  },

  /**
   * Display filtered and sorted courses
   */
  displayCourses() {
    const container = document.querySelector('.courses-grid');
    if (!container) return;
    
    // Hide all courses
    this.courses.forEach(course => {
      course.element.style.display = 'none';
    });
    
    // Show filtered courses
    if (this.filteredCourses.length === 0) {
      this.showNoResults();
    } else {
      this.hideNoResults();
      this.filteredCourses.forEach(course => {
        course.element.style.display = 'block';
      });
    }
  },

  /**
   * Show no results message
   */
  showNoResults() {
    let noResults = document.querySelector('.no-results');
    if (!noResults) {
      noResults = document.createElement('div');
      noResults.className = 'no-results';
      noResults.innerHTML = `
        <p>No courses match your criteria. Try adjusting your filters.</p>
      `;
      document.querySelector('.courses-grid')?.appendChild(noResults);
    }
    noResults.style.display = 'block';
  },

  /**
   * Hide no results message
   */
  hideNoResults() {
    const noResults = document.querySelector('.no-results');
    if (noResults) {
      noResults.style.display = 'none';
    }
  },

  /**
   * Clear all filters
   */
  clearFilters() {
    // Uncheck all checkboxes
    document.querySelectorAll('input[name="category"]').forEach(cb => cb.checked = false);
    
    // Reset price slider
    const priceSlider = document.querySelector('.price-slider');
    if (priceSlider) {
      priceSlider.value = 5000;
      document.querySelector('.price-display').textContent = '₹100 - ₹5000';
    }
    
    // Uncheck level radios
    document.querySelectorAll('input[name="level"]').forEach(radio => radio.checked = false);
    
    // Reset filtered courses
    this.filteredCourses = [...this.courses];
    this.displayCourses();
  }
};
