# Design Document

## Overview

Skillverge is a modern EdTech marketplace platform built with pure HTML, CSS, and vanilla JavaScript. The platform serves two primary user groups: learners who purchase courses and creators who sell courses. The design emphasizes responsive layouts, modern aesthetics inspired by leading EdTech platforms, and seamless user experiences across all devices.

The architecture follows a static, client-side approach with no backend dependencies in this phase. All interactivity is handled through vanilla JavaScript, with a focus on progressive enhancement and accessibility.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Skillverge Platform                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Learner    │  │   Creator    │  │    Guest     │ │
│  │  Interface   │  │  Interface   │  │  Interface   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│         │                 │                  │          │
│         └─────────────────┴──────────────────┘          │
│                          │                               │
│         ┌────────────────┴────────────────┐             │
│         │                                  │             │
│    ┌────▼─────┐                    ┌──────▼──────┐     │
│    │   HTML   │                    │     CSS     │     │
│    │  Pages   │                    │   Styles    │     │
│    └────┬─────┘                    └──────┬──────┘     │
│         │                                  │             │
│         └────────────────┬─────────────────┘             │
│                          │                               │
│                   ┌──────▼──────┐                       │
│                   │  JavaScript │                       │
│                   │   Modules   │                       │
│                   └─────────────┘                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Component Architecture

The platform is organized into modular components:

1. **Page Layer**: Individual HTML pages for different routes
2. **Style Layer**: Modular CSS with design system variables
3. **Interaction Layer**: Vanilla JavaScript modules for dynamic behavior
4. **Asset Layer**: Images, icons, and media resources

### Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern layouts using Flexbox and Grid, custom properties for theming
- **Vanilla JavaScript (ES6+)**: Modular scripts for interactivity
- **Google Fonts**: Montserrat font family
- **Icon Library**: Bootstrap Icons / Lucide Icons / Remix Icons

## Components and Interfaces

### 1. Navigation Component

**Purpose**: Provides consistent navigation across all pages with responsive behavior.

**Structure**:
```html
<header class="navbar">
  <div class="navbar-container">
    <a href="/" class="logo">Skillverge</a>
    <nav class="nav-menu">
      <ul class="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/courses.html">Courses</a></li>
        <li><a href="/sell-with-us.html">Sell With Us</a></li>
        <li><a href="/about.html">About</a></li>
        <li><a href="/contact.html">Contact</a></li>
      </ul>
    </nav>
    <div class="nav-actions">
      <a href="/login.html" class="btn-secondary">Login</a>
      <a href="/register.html" class="btn-primary">Sign Up</a>
    </div>
    <button class="mobile-toggle" aria-label="Toggle menu">
      <span class="hamburger"></span>
    </button>
  </div>
</header>
```

**Responsive Behavior**:
- Desktop: Horizontal navigation with all links visible
- Tablet: Condensed spacing, maintained horizontal layout
- Mobile: Hamburger menu with slide-in navigation drawer

### 2. Course Card Component

**Purpose**: Displays course information in a consistent, reusable format.

**Structure**:
```html
<div class="course-card">
  <div class="course-thumbnail">
    <!-- Placeholder: Course thumbnail image -->
    <img src="/images/placeholder.jpg" alt="Course title">
  </div>
  <div class="course-content">
    <h3 class="course-title">Course Title</h3>
    <p class="course-instructor">By Instructor Name</p>
    <div class="course-meta">
      <div class="course-rating">
        <span class="stars">★★★★★</span>
        <span class="rating-count">(4.5)</span>
      </div>
      <div class="course-price">₹2,999</div>
    </div>
    <button class="btn-enroll">Enroll Now</button>
  </div>
</div>
```

**Variants**:
- Standard card (courses page)
- Featured card (homepage, larger size)
- Compact card (related courses slider)

### 3. Filter Sidebar Component

**Purpose**: Allows users to refine course search results.

**Structure**:
```html
<aside class="filter-sidebar">
  <div class="filter-section">
    <h3>Category</h3>
    <div class="filter-options">
      <label><input type="checkbox" value="development"> Development</label>
      <label><input type="checkbox" value="business"> Business</label>
      <!-- More categories -->
    </div>
  </div>
  <div class="filter-section">
    <h3>Price Range</h3>
    <div class="price-range">
      <input type="range" min="100" max="5000" class="price-slider">
      <div class="price-display">₹100 - ₹5000</div>
    </div>
  </div>
  <div class="filter-section">
    <h3>Level</h3>
    <div class="filter-options">
      <label><input type="radio" name="level" value="beginner"> Beginner</label>
      <label><input type="radio" name="level" value="intermediate"> Intermediate</label>
      <label><input type="radio" name="level" value="advanced"> Advanced</label>
    </div>
  </div>
</aside>
```

### 4. Hero Section Component

**Purpose**: Creates impactful first impression with key messaging and CTAs.

**Structure**:
```html
<section class="hero">
  <div class="hero-container">
    <div class="hero-content">
      <h1 class="hero-title">Upgrade Your Skills With Skillverge</h1>
      <p class="hero-subtitle">Affordable online learning starting from ₹100.</p>
      <div class="hero-actions">
        <a href="/courses.html" class="btn-primary">Browse Courses</a>
        <a href="/sell-with-us.html" class="btn-secondary">Become a Seller</a>
      </div>
    </div>
    <div class="hero-image">
      <!-- Placeholder: EdTech hero banner with students learning online -->
      <img src="/images/hero-banner.jpg" alt="Students learning online">
    </div>
  </div>
</section>
```

### 5. Form Components

**Purpose**: Handles user input for authentication and seller onboarding.

**Common Form Structure**:
```html
<form class="form-container">
  <div class="form-group">
    <label for="input-id">Label</label>
    <input type="text" id="input-id" name="field-name" required>
    <span class="error-message"></span>
  </div>
  <button type="submit" class="btn-primary">Submit</button>
</form>
```

**Form Types**:
- Login form (email, password)
- Registration form (name, email, password, user type)
- Contact form (name, email, subject, message)
- Seller onboarding form (name, email, phone, category, experience, file upload)

### 6. Footer Component

**Purpose**: Provides consistent site-wide navigation and information.

**Structure**:
```html
<footer class="footer">
  <div class="footer-container">
    <div class="footer-column">
      <h4>Skillverge</h4>
      <p>Affordable online learning for everyone.</p>
    </div>
    <div class="footer-column">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="/courses.html">Courses</a></li>
        <li><a href="/about.html">About</a></li>
        <li><a href="/contact.html">Contact</a></li>
        <li><a href="/sell-with-us.html">Sell With Us</a></li>
      </ul>
    </div>
    <div class="footer-column">
      <h4>Follow Us</h4>
      <div class="social-icons">
        <!-- Social media icons -->
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>Copyright © Skillverge 2025</p>
  </div>
</footer>
```

## Data Models

### Course Data Structure

```javascript
const course = {
  id: "course-001",
  title: "Complete MERN Stack Development",
  instructor: "Rahul Sharma",
  price: 2999,
  currency: "INR",
  rating: 4.5,
  ratingCount: 1250,
  thumbnail: "/images/courses/mern-stack.jpg",
  category: "development",
  level: "intermediate",
  description: "Learn MongoDB, Express, React, and Node.js",
  curriculum: [
    { module: 1, title: "Introduction to MERN", lessons: 5 },
    { module: 2, title: "MongoDB Basics", lessons: 8 }
  ],
  requirements: ["Basic JavaScript knowledge", "HTML & CSS fundamentals"],
  learningOutcomes: [
    "Build full-stack web applications",
    "Master React hooks and state management",
    "Create RESTful APIs with Express"
  ]
};
```

### Seller Data Structure

```javascript
const seller = {
  id: "seller-001",
  name: "Priya Patel",
  email: "priya@example.com",
  phone: "+91-9876543210",
  category: "development",
  experience: "intermediate",
  status: "pending", // pending, approved, rejected
  submittedAt: "2025-12-01T10:30:00Z",
  courses: []
};
```

### User Data Structure

```javascript
const user = {
  id: "user-001",
  name: "Amit Kumar",
  email: "amit@example.com",
  userType: "learner", // learner, creator
  enrolledCourses: [],
  createdAt: "2025-12-01T10:30:00Z"
};
```

### Filter State Structure

```javascript
const filterState = {
  categories: [],
  priceRange: { min: 100, max: 5000 },
  level: null,
  sortBy: "newest" // newest, price-low, price-high, rating
};
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Responsive layout adaptation
*For any* viewport width, when the page is rendered, all content should be visible without horizontal scrolling and layout should adapt to the appropriate breakpoint (mobile, tablet, or desktop).
**Validates: Requirements 1.1, 1.2**

### Property 2: Navigation menu toggle consistency
*For any* navigation state (open or closed), clicking the mobile toggle button should invert the state exactly once, and the menu visibility should match the state.
**Validates: Requirements 1.3, 12.1**

### Property 3: Course grid column adaptation
*For any* screen width, the number of course card columns should equal 1 for mobile (<768px), 2-3 for tablet (768px-1024px), and 4 for desktop (>1024px).
**Validates: Requirements 1.4**

### Property 4: Image aspect ratio preservation
*For any* image element, when rendered at different viewport sizes, the aspect ratio should remain constant and no distortion should occur.
**Validates: Requirements 1.5**

### Property 5: Font family consistency
*For any* text element on any page, the computed font-family should include "Montserrat" as the primary font.
**Validates: Requirements 2.1**

### Property 6: Icon rendering consistency
*For any* icon element, the icon should render using vector graphics (SVG) from the specified icon library and maintain clarity at all sizes.
**Validates: Requirements 2.2**

### Property 7: Border radius application
*For any* UI component with rounded corners, the border-radius value should be between 8px and 20px inclusive.
**Validates: Requirements 2.3**

### Property 8: Hover effect smoothness
*For any* interactive element, when hovered, the transition duration should be between 200ms and 400ms for smooth visual feedback.
**Validates: Requirements 2.5, 12.3**

### Property 9: Homepage section presence
*For any* homepage load, the page should contain exactly one hero section, one feature highlights section, one popular categories section, and one top courses section in that order.
**Validates: Requirements 3.1, 3.3, 3.4, 3.5**

### Property 10: Hero section CTA count
*For any* hero section render, exactly two CTA buttons should be present with distinct labels and actions.
**Validates: Requirements 3.1**

### Property 11: Course card count on homepage
*For any* homepage top courses section, exactly 25 course cards should be rendered.
**Validates: Requirements 3.5**

### Property 12: Category count display
*For any* popular categories section render, exactly 8 category options should be displayed with icons.
**Validates: Requirements 3.4**

### Property 13: Filter application correctness
*For any* set of filter criteria applied on the courses page, all displayed courses should match every active filter condition.
**Validates: Requirements 4.3**

### Property 14: Sort order correctness
*For any* sort option selected (price, rating, newest), the displayed courses should be ordered according to that criterion in the correct direction.
**Validates: Requirements 4.4**

### Property 15: Course detail completeness
*For any* course detail page, all required sections (banner, title, rating, instructor, price, curriculum, learning outcomes, requirements, description, related courses) should be present.
**Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5**

### Property 16: Form field validation
*For any* form submission with invalid data, the form should prevent submission and display error messages for all invalid fields.
**Validates: Requirements 6.5, 8.3, 8.4, 12.5**

### Property 17: Required field enforcement
*For any* form with required fields, submission should be blocked if any required field is empty or contains only whitespace.
**Validates: Requirements 6.5, 8.3**

### Property 18: Placeholder comment presence
*For any* image placeholder element, an HTML comment should exist within 3 lines describing the required image content.
**Validates: Requirements 13.1, 13.2, 13.3, 13.4**

### Property 19: Color scheme consistency
*For any* page element using brand colors, the color values should match exactly: primary (#2D6DF6), secondary (#1A1F36), accent (#00B894), or light gray (#F8F9FB).
**Validates: Requirements 14.1, 14.2, 14.3, 14.4**

### Property 20: Typography weight consistency
*For any* heading element, the font-weight should be between 600-700, and for any body text element, the font-weight should be between 400-500.
**Validates: Requirements 14.5**

### Property 21: Header and footer presence
*For any* page in the platform, exactly one header element and exactly one footer element should be present in the DOM.
**Validates: Requirements 15.1, 15.2**

### Property 22: Footer link completeness
*For any* footer render, links to Courses, About, Contact, and Sell With Us should all be present and functional.
**Validates: Requirements 15.4**

### Property 23: Semantic HTML structure
*For any* page, the document should contain semantic HTML5 elements (header, nav, main, section, article, footer) in a logical hierarchy.
**Validates: Requirements 11.1**

### Property 24: Image alt attribute presence
*For any* img element, an alt attribute should be present with descriptive text.
**Validates: Requirements 11.2**

### Property 25: Keyboard navigation support
*For any* interactive element, it should be reachable via keyboard Tab navigation and activatable via Enter or Space key.
**Validates: Requirements 11.3**

### Property 26: Form label association
*For any* form input element, a corresponding label element should exist with a matching for/id attribute pair.
**Validates: Requirements 11.4**

## Error Handling

### Client-Side Validation Errors

**Form Validation**:
- Empty required fields: Display "This field is required" message
- Invalid email format: Display "Please enter a valid email address"
- Password too short: Display "Password must be at least 8 characters"
- File upload size exceeded: Display "File size must be less than 5MB"
- Invalid phone format: Display "Please enter a valid phone number"

**Error Display Strategy**:
```javascript
function showError(inputElement, message) {
  const errorSpan = inputElement.nextElementSibling;
  errorSpan.textContent = message;
  errorSpan.classList.add('visible');
  inputElement.classList.add('error');
  inputElement.setAttribute('aria-invalid', 'true');
}

function clearError(inputElement) {
  const errorSpan = inputElement.nextElementSibling;
  errorSpan.textContent = '';
  errorSpan.classList.remove('visible');
  inputElement.classList.remove('error');
  inputElement.removeAttribute('aria-invalid');
}
```

### Navigation Errors

**Broken Links**: All internal links should be validated to ensure they point to existing pages. If a page doesn't exist, display a friendly 404 message.

**Mobile Menu State**: If the mobile menu fails to toggle, reset the menu state and log the error to console for debugging.

### Filter and Sort Errors

**No Results Found**: When filters produce zero results, display a message: "No courses match your criteria. Try adjusting your filters."

**Invalid Filter Values**: If filter values are out of range, reset to default values and notify the user.

### Asset Loading Errors

**Missing Images**: Use CSS to display a placeholder background color and icon when images fail to load.

```css
.course-thumbnail img {
  background: #f0f0f0;
  position: relative;
}

.course-thumbnail img[alt]::after {
  content: attr(alt);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

## Testing Strategy

### Unit Testing Approach

Unit tests will verify specific functionality and edge cases:

**Navigation Tests**:
- Mobile menu toggle opens and closes correctly
- Active page link receives correct styling
- Navigation links point to correct URLs

**Form Validation Tests**:
- Empty email field shows error
- Invalid email format shows error
- Valid form submission clears all errors
- File upload validates file type and size

**Filter Tests**:
- Selecting category checkbox filters courses
- Price range slider updates displayed range
- Multiple filters combine with AND logic
- Clear filters button resets all filters

**Responsive Tests**:
- Grid columns adjust at breakpoints
- Mobile menu appears below 768px
- Images scale proportionally

### Property-Based Testing Approach

Property-based tests will verify universal properties across many inputs using **fast-check** (JavaScript property-based testing library).

**Configuration**: Each property test will run a minimum of 100 iterations to ensure thorough coverage.

**Test Tagging**: Each property-based test will include a comment in this exact format:
```javascript
// **Feature: skillverge-edtech-marketplace, Property 1: Responsive layout adaptation**
```

**Property Test Examples**:

**Property 1: Responsive layout adaptation**
```javascript
// Generate random viewport widths
// Render page at each width
// Assert no horizontal scroll exists
// Assert correct breakpoint styles applied
```

**Property 13: Filter application correctness**
```javascript
// Generate random course datasets
// Generate random filter combinations
// Apply filters
// Assert all displayed courses match filter criteria
```

**Property 16: Form field validation**
```javascript
// Generate random invalid form data
// Submit form
// Assert submission blocked
// Assert error messages displayed for all invalid fields
```

**Property 19: Color scheme consistency**
```javascript
// Query all elements with brand colors
// Extract computed color values
// Assert colors match brand palette exactly
```

### Integration Testing

Integration tests will verify component interactions:

- Course card click navigates to correct detail page
- Filter sidebar updates course grid
- Form submission triggers validation and feedback
- Mobile menu toggle affects navigation visibility

### Manual Testing Checklist

- Visual regression testing across browsers (Chrome, Firefox, Safari, Edge)
- Responsive testing on real devices (iOS, Android)
- Accessibility testing with screen readers
- Performance testing (page load times, animation smoothness)
- Cross-browser compatibility verification

### Test Execution Strategy

1. **Development Phase**: Run unit tests after each component implementation
2. **Integration Phase**: Run integration tests after connecting components
3. **Pre-Deployment**: Run full test suite including property-based tests
4. **Continuous**: Run tests on any code changes

## Implementation Notes

### CSS Architecture

**Design System Variables**:
```css
:root {
  /* Colors */
  --color-primary: #2D6DF6;
  --color-secondary: #1A1F36;
  --color-accent: #00B894;
  --color-light-gray: #F8F9FB;
  
  /* Typography */
  --font-family: 'Montserrat', sans-serif;
  --font-weight-heading: 600;
  --font-weight-body: 400;
  
  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  
  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  
  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 8px rgba(0,0,0,0.12);
  --shadow-lg: 0 8px 16px rgba(0,0,0,0.15);
  
  /* Transitions */
  --transition-fast: 200ms ease;
  --transition-normal: 300ms ease;
}
```

**Responsive Breakpoints**:
```css
/* Mobile: < 768px */
/* Tablet: 768px - 1024px */
/* Desktop: > 1024px */

@media (max-width: 767px) { /* Mobile styles */ }
@media (min-width: 768px) and (max-width: 1024px) { /* Tablet styles */ }
@media (min-width: 1025px) { /* Desktop styles */ }
```

### JavaScript Module Organization

**File Structure**:
```
/js
  /modules
    navigation.js      // Mobile menu toggle, active link highlighting
    filters.js         // Course filtering and sorting logic
    validation.js      // Form validation utilities
    animations.js      // Scroll animations, hover effects
  main.js             // Entry point, module initialization
```

**Module Pattern**:
```javascript
// navigation.js
export const Navigation = {
  init() {
    this.setupMobileToggle();
    this.highlightActivePage();
  },
  
  setupMobileToggle() {
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.nav-menu');
    
    toggle?.addEventListener('click', () => {
      menu.classList.toggle('active');
      toggle.setAttribute('aria-expanded', 
        menu.classList.contains('active'));
    });
  },
  
  highlightActivePage() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      }
    });
  }
};
```

### Accessibility Considerations

- Use ARIA labels for icon-only buttons
- Implement focus visible styles for keyboard navigation
- Ensure color contrast ratios meet WCAG AA standards (4.5:1 for normal text)
- Provide skip navigation links for screen readers
- Use semantic HTML to convey document structure
- Include form field descriptions with aria-describedby
- Implement proper heading hierarchy (h1 → h2 → h3)

### Performance Optimization

- Minimize CSS and JavaScript files for production
- Use CSS containment for independent components
- Implement lazy loading for images below the fold
- Optimize images (WebP format with fallbacks)
- Use CSS transforms for animations (GPU-accelerated)
- Defer non-critical JavaScript loading
- Minimize DOM manipulation in JavaScript

### Browser Compatibility

Target browsers:
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

Use CSS autoprefixer for vendor prefixes and feature detection for progressive enhancement.
