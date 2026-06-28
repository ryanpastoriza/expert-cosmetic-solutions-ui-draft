# Expert Cosmetic Solutions — Technical Development Notes

## Architecture Overview

This is a **Design Component (DC)** — a single self-contained HTML file that:
- Opens directly in any browser
- Contains all CSS inline (no external stylesheets)
- Uses vanilla JavaScript (no frameworks or build tools)
- Supports real-time editing in the design tool

---

## File Structure & Key Sections

### Document Head (`<helmet>`)
```html
<helmet>
  <!-- Google Fonts import -->
  <link href="..." rel="stylesheet">
  
  <!-- All CSS in one <style> block -->
  <style>
    :root { /* CSS variables */ }
    * { /* reset */ }
    @keyframes { /* animations */ }
    /* Component styles */
  </style>
</helmet>
```

### Document Body
- **Header:** Sticky navigation with desktop/mobile variants
- **Sections:** 10 main sections with `id` and `data-screen-label` attributes
- **Script:** `<script type="text/x-dc">` contains the DCLogic class

---

## CSS Variables & Theming

All colors are defined in `:root` and can be updated in one place:

```css
:root {
  --primary: #003A59;        /* Navy blue */
  --accent: #C5A053;         /* Gold */
  --light: #FBF9F5;          /* Cream */
  --pale: #F2EEE5;           /* Light beige */
  --border: #E3DED2;         /* Border gray */
  --text-dark: #1C242B;      /* Dark text */
  --text-light: #5C6B73;     /* Medium gray */
  --text-lighter: #B9C6CE;   /* Light gray */
}
```

**Update Colors Globally:**
1. Find `:root {` in the `<style>` block
2. Change hex values
3. All components automatically reflect changes

---

## Responsive Design

### Media Query Strategy

```css
@media (max-width: 900px) {
  /* Hide desktop nav, show mobile menu */
}

@media (max-width: 768px) {
  /* Single-column layouts, reduced padding/fonts */
}

@media (max-width: 480px) {
  /* Mobile-optimized sizing */
}
```

### Key Breakpoints
- **900px:** Navigation switches to mobile hamburger
- **768px:** Grid layouts collapse to single column
- **480px:** Further font reductions for very small screens

---

## JavaScript Logic Class

The component uses a custom `DCLogic` class:

```javascript
class Component extends DCLogic {
  faqs = [ /* FAQ data */ ];
  
  componentDidMount() {
    this._initNav();
    this._renderFAQ();
    window.addEventListener('resize', () => this._handleResize());
    this._handleResize();
  }
  
  _initNav() { /* Mobile nav toggle */ }
  _handleResize() { /* Responsive nav switching */ }
  _renderFAQ() { /* Dynamically render FAQ items */ }
  
  renderVals() { return {}; }
}
```

### Key Methods

#### `_initNav()`
- Toggles mobile menu on button click
- Animates hamburger icon
- Closes menu when a link is clicked

#### `_handleResize()`
- Switches nav layout at 900px breakpoint
- Shows/hides desktop vs mobile navigation

#### `_renderFAQ()`
- Loops through `this.faqs` array
- Creates accordion buttons and panels
- Binds click handlers for expand/collapse

---

## Component Styling Reference

### Header & Navigation

**Sticky header:**
```css
header {
  position: sticky;
  top: 0;
  z-index: 200;
  background: var(--primary);
  backdrop-filter: blur(8px);
}
```

**Mobile hamburger menu:**
```css
#navToggle {
  display: none; /* Shows at 900px breakpoint */
  width: 38px;
  height: 38px;
  cursor: pointer;
}
```

### Hero Section

**Grid layout:**
```css
.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 680px;
}
```

**Entrance animations (staggered):**
```css
.hero-text h1 { animation: fadeUp 0.7s 0.1s ease both; }
.hero-text > p { animation: fadeUp 0.7s 0.2s ease both; }
```

### Service Cards

**Hover effects:**
```css
.service-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(0, 58, 89, 0.14);
}

.service-card:hover img {
  transform: scale(1.04);
}
```

### FAQ Accordion

**Toggle mechanism:**
```css
.faq-panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.32s ease;
}

/* When open: max-height: 300px */
```

---

## Customization Guide

### Change Primary Color
**File:** `ECS Homepage v2.dc.html`  
**Find:** `:root { --primary: #003A59; }`  
**Change to:** `--primary: #YOUR_HEX_VALUE;`  
**Result:** All primary elements update (header, buttons, text)

### Add a New Service Card
1. Duplicate this block in the Services section:
```html
<div class="service-card">
  <img src="images/service-X.png" alt="Service Name">
  <div class="service-card-body">
    <h3>Service Name</h3>
    <p>Service description text.</p>
    <a href="service-url" target="_blank">Learn More →</a>
  </div>
</div>
```
2. Update image path, title, description, and link
3. Ensure image is 190px tall

### Add a New FAQ
1. Find the `faqs` array in the logic class
2. Add a new object:
```javascript
{
  q: 'Your question here?',
  a: 'Your answer here in complete sentences.'
}
```
3. The `_renderFAQ()` method automatically creates the UI

### Change Font
1. **To use a different Google Font:**
   - Update the `<link>` tag in `<helmet>`
   - Update `font-family` values in CSS

2. **To use local fonts:**
   - Download TTF files
   - Add `@font-face` rules in `<style>`
   - Update `font-family` references

### Adjust Section Padding
**Find:** `#about { padding: 104px 0; }`  
**Change to:** `#about { padding: 80px 0; }` (or your preference)

---

## Performance Optimization

### Current Approach
- **Inline CSS:** No render-blocking external requests
- **Google Fonts CDN:** Cached by browser on repeat visits
- **Images:** Lazy-loadable with `loading="lazy"` (optional)
- **No JavaScript frameworks:** Minimal bundle size

### Recommended Optimizations
1. **Image Optimization:**
   - Use WebP format for modern browsers
   - Implement srcset for responsive images
   - Compress PNG/JPG to <100KB per image

2. **Font Loading:**
   - Consider `font-display: swap` for faster rendering
   - Pre-connect to Google Fonts: `<link rel="preconnect" href="https://fonts.googleapis.com">`

3. **Code Splitting:**
   - Not necessary for current size (single file)
   - Consider if adding major features

---

## Browser Compatibility

- **Chrome/Edge:** Full support (latest 2 versions)
- **Firefox:** Full support (latest 2 versions)
- **Safari:** Full support (latest 2 versions)
- **Mobile:** iOS Safari 12+, Chrome Android 90+

**CSS Features Used:**
- CSS Grid & Flexbox ✓
- CSS Variables (Custom Properties) ✓
- CSS Transitions & Animations ✓
- Backdrop Filter (blurred header) ✓
- `aspect-ratio` property ✓

---

## Accessibility Notes

### Current Implementation
- Semantic HTML (`<header>`, `<nav>`, `<section>`, `<footer>`)
- ARIA attributes on interactive elements
- Color contrast ratios meet WCAG AA standards
- Button and link focus states (via `:focus` styling)

### Recommendations
1. Add alt text to all images (currently placeholders)
2. Test with screen readers (NVDA, JAWS, VoiceOver)
3. Ensure keyboard navigation works throughout
4. Consider adding skip links for accessibility

---

## Common Issues & Solutions

### Mobile Menu Not Opening
**Issue:** Hamburger button doesn't toggle menu  
**Solution:** Check that `#navToggle` button and `#mobileMenu` div IDs are correct in HTML

### Images Not Showing
**Issue:** Placeholder images display as broken  
**Solution:** Ensure image files exist in `images/` folder with correct filenames

### Fonts Not Loading
**Issue:** Georgia/serif fonts display instead of Cormorant  
**Solution:** Check Google Fonts CDN link in `<helmet>` — ensure HTTPS and correct query string

### Responsive Breakpoint Not Working
**Issue:** Layout doesn't change at 900px  
**Solution:** Check that media query CSS is present and not overridden by inline styles

---

## Deployment Checklist

- [ ] All images optimized and placed
- [ ] Google Fonts CDN link verified
- [ ] All external links tested (booking, social, phone)
- [ ] Mobile menu tested on real devices
- [ ] FAQ accordion tested (expand/collapse)
- [ ] Form submissions configured (if applicable)
- [ ] Analytics code added (GA4, etc.)
- [ ] Favicon added to `<head>`
- [ ] Meta tags updated (title, description, og:image)
- [ ] 404 page set up (if on custom domain)
- [ ] SSL certificate valid
- [ ] Lighthouse audit: >90 for all metrics

---

## Support Resources

- **Google Fonts:** https://fonts.google.com/
- **CSS Reference:** https://developer.mozilla.org/en-US/docs/Web/CSS
- **Design Components Docs:** See project documentation
- **Color Contrast Checker:** https://webaim.org/resources/contrastchecker/

---

**Last Updated:** June 23, 2026  
**Version:** 2.0
