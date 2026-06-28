# Expert Cosmetic Solutions — Website Handover Guide

## 📋 Project Overview

**Project Name:** Expert Cosmetic Solutions Homepage Redesign  
**Status:** Ready for Production  
**Version:** v2 (Design Component)  
**Last Updated:** June 2026

---

## 🎨 Brand Color System

All colors are CSS variables in the root `:root` selector. Update these in the stylesheet to change the entire brand appearance globally.

### Primary Colors

| Token | Hex Value | Use Case | RGB |
|-------|-----------|----------|-----|
| `--primary` | `#003A59` | Header, CTAs, primary text | rgb(0, 58, 89) |
| `--accent` | `#C5A053` | Highlights, buttons, badges | rgb(197, 160, 83) |

### Neutral Colors

| Token | Hex Value | Use Case | RGB |
|-------|-----------|----------|-----|
| `--light` | `#FBF9F5` | Primary background | rgb(251, 249, 245) |
| `--pale` | `#F2EEE5` | Secondary backgrounds, sections | rgb(242, 238, 229) |
| `--border` | `#E3DED2` | Borders, dividers, grids | rgb(227, 222, 210) |

### Text Colors

| Token | Hex Value | Use Case |
|-------|-----------|----------|
| `--text-dark` | `#1C242B` | Primary text, headings |
| `--text-light` | `#5C6B73` | Secondary text, descriptions |
| `--text-lighter` | `#B9C6CE` | Tertiary text, placeholders |

---

## 🔤 Typography System

### Font Stack

All fonts are imported from **Google Fonts** via CDN in the `<helmet>` section.

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Sacramento&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### Font Families

#### 1. **Cormorant Garamond** (Serif)
- **Use:** Headings (h1, h2, h3), prominent statements
- **Weights:** 400, 500, 600 (Regular, Medium, SemiBold)
- **Styles:** Normal, Italic
- **CSS:** `font-family: 'Cormorant Garamond', serif;`

#### 2. **Jost** (Sans-serif)
- **Use:** Body text, labels, navigation, UI elements
- **Weights:** 300, 400, 500, 600 (Light, Regular, Medium, SemiBold)
- **CSS:** `font-family: 'Jost', sans-serif;`

#### 3. **Sacramento** (Script)
- **Use:** Accent text, decorative headings, "Ready?", "New Clients" labels
- **Weight:** 400 (Regular only)
- **CSS:** `font-family: 'Sacramento', cursive;`

### Sizing & Spacing

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| h1 (Hero) | 54px | 500 | 1.08 |
| h2 (Sections) | 42px | 500 | 1.07 |
| h3 (Cards) | 21px | 500 | 1.25 |
| Body Text | 15.5px | 400 | 1.8 |
| Small Text | 13.5px | 400 | 1.65 |
| Labels | 11px–12px | 600 | 1.4 |

---

## 🎯 Component Guide

### Buttons

#### Primary Button (`.btn-primary`)
- **Background:** `var(--primary)` (#003A59)
- **Color:** White
- **Padding:** 15px 34px
- **Font:** 12px, uppercase, letter-spacing 0.08em
- **Border Radius:** 3px
- **Hover:** Transparent bg, primary border with 2px inset shadow

#### Secondary Button (`.btn-secondary`)
- **Background:** `var(--accent)` (#C5A053)
- **Color:** `var(--primary)`
- **Padding:** 15px 34px
- **Hover:** Transparent bg, accent border

#### Outline Button (`.btn-outline`)
- **Border:** 1px solid `var(--border)`
- **Color:** `var(--text-light)`
- **Hover:** Primary border + primary color

### Navigation

- **Header Background:** Dark primary (`--primary`)
- **Sticky:** Yes (position: sticky, top: 0)
- **Desktop Menu:** Flex layout, 28px gap
- **Mobile Menu:** Hidden by default, max-height transitions on toggle
- **Breakpoint:** 900px (toggle to mobile menu)

### Cards & Grids

All content grids use:
- **Gap:** 2px (creates visual separation)
- **Background:** Border color between cards
- **Border:** 1px solid `var(--border)`
- **Card Padding:** 24px–38px (varies by card type)

---

## 📱 Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop** | Full layout, all features visible |
| **Tablet (≤768px)** | Single-column grids, reduced padding, adjusted font sizes |
| **Mobile (≤480px)** | Further font reductions, 2–3 column grids become single column |

---

## 🏗 File Structure

```
project/
├── ECS Homepage v2.dc.html          (Main Design Component)
├── images/
│   ├── logo.png                     (44×44px)
│   ├── hero-placeholder.png         (Full-width hero image)
│   ├── about-placeholder.png        (3/4 aspect ratio)
│   ├── service-1.png through        (6 service images, 190px height)
│   └── service-6.png
├── HANDOVER - Branding Guide.md     (This file)
├── HANDOVER - Font Files.zip        (Downloaded Google Fonts)
└── HANDOVER - Development Notes.md  (Technical details)
```

---

## 🎬 Animations & Transitions

### Keyframe Animations

#### `fadeUp` (0.7s)
- Entrance animation for hero text elements
- Staggered delays: 0s, 0.1s, 0.2s, 0.3s, 0.4s

#### `scaleIn` (0.6s)
- Scale from 0.96 to 1.0, fade in
- Used for trust badge

### Transition Timings

- **Button hover:** 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)
- **Service card hover:** 0.3s (lift + image scale)
- **FAQ panel expand:** 0.32s ease
- **Mobile menu:** 0.35s ease

---

## 🔗 Key Links & URLs

### Booking System
- **Platform:** Timely
- **URL:** `https://bookings.gettimely.com/expertcosmeticsolutions1/book`

### Live Website
- **Main Site:** https://expertcosmeticsolutions.com.au
- **About:** `/about-us/`
- **Services:** Various (see dropdown in nav)

### Social Media
- **Instagram:** https://www.instagram.com/expertcosmeticsolutions/
- **Facebook:** https://web.facebook.com/expertcosmeticsolutions/

---

## 📞 Contact Information

### Pakenham Clinic
- **Address:** 1A 9-17 Lakeside Blvd, Pakenham VIC 3810
- **Phone:** +61 3 5918 4777
- **Hours:** Sun/Mon Closed | Tues–Fri 9am–5pm | Sat 9am–3pm

### Warragul Clinic
- **Address:** 17 Williams Square, Warragul VIC 3820
- **Phone:** +61 432 323 494
- **Hours:** Sun/Mon/Tues Closed | Wed 9am–5:30pm | Thurs 9am–8pm | Fri 9am–5:30pm | Sat 9am–3pm

---

## 🛠 Development Notes

### CSS Architecture
- All styles are inline in the `<helmet>` section
- CSS variables (custom properties) handle theming
- Mobile-first responsive design with media queries
- No external stylesheets or CSS frameworks

### JavaScript Logic
- Vanilla JavaScript (no frameworks)
- Mobile navigation toggle with hamburger animation
- FAQ accordion with max-height transitions
- Window resize handler for responsive nav

### Component Structure
- Single `ECS Homepage v2.dc.html` Design Component
- Fully self-contained with no external dependencies
- Supports Design System import/export

---

## 🚀 Deployment Checklist

- [ ] All images optimized and in `images/` folder
- [ ] Logo files updated (44×44px, 40×40px for footer)
- [ ] Hero image dimensions correct (1920×1080 recommended)
- [ ] Service images all 190px height, consistent aspect ratio
- [ ] Font links verified (Google Fonts CDN)
- [ ] All external links tested (booking, social, phone)
- [ ] Mobile navigation tested on devices
- [ ] FAQ content reviewed and updated
- [ ] Form submissions configured (if applicable)
- [ ] Analytics/tracking code added (if needed)
- [ ] Lighthouse audit run (performance, accessibility)

---

## 📝 Content Updates

### To Update Text
- Edit directly in the HTML template
- Search for the section (e.g., "Hero", "About Us", "Services")
- Modify paragraph, heading, or label text

### To Update Images
1. Replace image file in `images/` folder
2. Keep same filename (or update `src` attribute)
3. Maintain aspect ratios for consistency

### To Update Colors
- Find `:root { --variable: #hex; }` in `<helmet>`
- Change hex value
- All components using that variable update automatically

---

## ❓ FAQ for Developers

**Q: How do I change the primary color?**  
A: Find `--primary: #003A59;` in the `:root` selector and change the hex value.

**Q: Where are the fonts downloaded?**  
A: Google Fonts are loaded via CDN. To use locally, download from `HANDOVER - Font Files.zip` and update the `<link>` tag.

**Q: How do I add a new service?**  
A: Duplicate a `.service-card` div in the Services section, update the image `src`, title, description, and link.

**Q: Why is the header sticky?**  
A: For better navigation accessibility. Remove `position: sticky; top: 0;` from `header` CSS if not desired.

**Q: Can I change the grid layout?**  
A: Yes — update `grid-template-columns` values (e.g., `repeat(3, 1fr)` for 3 columns).

---

## 📞 Support & Questions

For technical questions or updates, refer to the `HANDOVER - Development Notes.md` file or the inline code comments in the HTML file.

**Last Updated:** June 23, 2026  
**Version:** 2.0
