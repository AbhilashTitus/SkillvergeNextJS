/**
 * Validation Module
 * Handles form validation for all forms in the platform
 */

export const Validation = {
  /**
   * Initialize validation for all forms
   */
  init() {
    this.setupFormValidation();
  },

  /**
   * Set up validation for all forms on the page
   */
  setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
        }
      });
      
      // Real-time validation on input
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          this.validateField(input);
        });
        
        input.addEventListener('input', () => {
          if (input.classList.contains('error')) {
            this.validateField(input);
          }
        });
      });
    });
  },

  /**
   * Validate entire form
   */
  validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  },

  /**
   * Validate individual field
   */
  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    
    // Clear previous errors
    this.clearError(field);
    
    // Check if required field is empty
    if (required && value === '') {
      this.showError(field, 'This field is required');
      return false;
    }
    
    // Skip validation if field is empty and not required
    if (value === '' && !required) {
      return true;
    }
    
    // Email validation
    if (type === 'email' || field.name === 'email') {
      if (!this.isValidEmail(value)) {
        this.showError(field, 'Please enter a valid email address');
        return false;
      }
    }
    
    // Password validation
    if (type === 'password') {
      if (value.length < 8) {
        this.showError(field, 'Password must be at least 8 characters');
        return false;
      }
    }
    
    // Phone validation
    if (field.name === 'phone') {
      if (!this.isValidPhone(value)) {
        this.showError(field, 'Please enter a valid phone number');
        return false;
      }
    }
    
    // File upload validation
    if (type === 'file') {
      const file = field.files[0];
      if (file) {
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
          this.showError(field, 'File size must be less than 5MB');
          return false;
        }
      }
    }
    
    return true;
  },

  /**
   * Show error message for a field
   */
  showError(field, message) {
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    
    let errorSpan = field.nextElementSibling;
    if (!errorSpan || !errorSpan.classList.contains('error-message')) {
      errorSpan = document.createElement('span');
      errorSpan.className = 'error-message';
      field.parentNode.insertBefore(errorSpan, field.nextSibling);
    }
    
    errorSpan.textContent = message;
    errorSpan.classList.add('visible');
  },

  /**
   * Clear error message for a field
   */
  clearError(field) {
    field.classList.remove('error');
    field.removeAttribute('aria-invalid');
    
    const errorSpan = field.nextElementSibling;
    if (errorSpan && errorSpan.classList.contains('error-message')) {
      errorSpan.textContent = '';
      errorSpan.classList.remove('visible');
    }
  },

  /**
   * Validate email format
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate phone number format (Indian format)
   */
  isValidPhone(phone) {
    // Remove spaces, dashes, and parentheses
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    
    // Check for Indian phone number format
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
    return phoneRegex.test(cleaned);
  }
};
