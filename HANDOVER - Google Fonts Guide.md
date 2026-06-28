# Google Fonts — Download & Local Setup Guide

## Fonts Used in ECS Homepage

This project uses three Google Fonts families. You can use them via CDN (current setup) or download them locally.

### 1. Cormorant Garamond
**Link:** https://fonts.google.com/specimen/Cormorant+Garamond  
**Usage:** Headings (h1, h2, h3), premium typography  
**Weights Needed:** 400, 500, 600 (Regular, Medium, SemiBold)  
**Styles:** Normal + Italic  

**Download:**
- Visit https://fonts.google.com/specimen/Cormorant+Garamond
- Click "Download family"
- Extract ZIP file

**Local Setup (Optional):**
```css
@font-face {
  font-family: 'Cormorant Garamond';
  src: url('fonts/CormorantGaramond-Regular.ttf') format('truetype');
  font-weight: 400;
}

@font-face {
  font-family: 'Cormorant Garamond';
  src: url('fonts/CormorantGaramond-SemiBold.ttf') format('truetype');
  font-weight: 600;
}
```

---

### 2. Jost
**Link:** https://fonts.google.com/specimen/Jost  
**Usage:** Body text, labels, UI elements  
**Weights Needed:** 300, 400, 500, 600 (Light, Regular, Medium, SemiBold)  

**Download:**
- Visit https://fonts.google.com/specimen/Jost
- Click "Download family"
- Extract ZIP file

---

### 3. Sacramento
**Link:** https://fonts.google.com/specimen/Sacramento  
**Usage:** Script accents ("Ready?", "New Clients", etc.)  
**Weights Needed:** 400 (Regular only)  

**Download:**
- Visit https://fonts.google.com/specimen/Sacramento
- Click "Download family"
- Extract ZIP file

---

## Current CDN Setup (Recommended)

The website currently loads fonts from Google's CDN:

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Sacramento&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">
```

**Advantages:**
✓ No extra files to maintain  
✓ Cached globally by browsers  
✓ Automatic updates from Google  
✓ Works offline if cached  

**Disadvantages:**
✗ Requires internet connection first load  
✗ Depends on Google's uptime  

---

## Self-Hosting Fonts (Optional)

If you prefer to self-host fonts locally:

### Step 1: Download Files
1. Go to https://fonts.google.com/
2. Find each font (Cormorant Garamond, Jost, Sacramento)
3. Click "Download family"
4. Extract all ZIP files

### Step 2: Organize Files
Create a folder structure:
```
project/
├── fonts/
│   ├── CormorantGaramond-Regular.ttf
│   ├── CormorantGaramond-Medium.ttf
│   ├── CormorantGaramond-SemiBold.ttf
│   ├── CormorantGaramond-Italic.ttf
│   ├── Jost-Light.ttf
│   ├── Jost-Regular.ttf
│   ├── Jost-Medium.ttf
│   ├── Jost-SemiBold.ttf
│   └── Sacramento-Regular.ttf
└── styles.css
```

### Step 3: Add @font-face Rules
```css
@font-face {
  font-family: 'Cormorant Garamond';
  src: url('fonts/CormorantGaramond-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Cormorant Garamond';
  src: url('fonts/CormorantGaramond-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Cormorant Garamond';
  src: url('fonts/CormorantGaramond-SemiBold.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: 'Cormorant Garamond';
  src: url('fonts/CormorantGaramond-Italic.ttf') format('truetype');
  font-weight: 400;
  font-style: italic;
}

/* Repeat for Jost and Sacramento */
```

### Step 4: Update HTML
Remove the Google Fonts `<link>` and replace with your own stylesheet:
```html
<link rel="stylesheet" href="fonts.css">
```

---

## Font Fallbacks

If fonts fail to load, these fallbacks are in place:

```css
font-family: 'Cormorant Garamond', serif;     /* Falls back to Georgia, serif */
font-family: 'Jost', sans-serif;              /* Falls back to Helvetica, sans-serif */
font-family: 'Sacramento', cursive;           /* Falls back to Comic Sans, cursive */
```

---

## File Sizes (For Reference)

Approximate font file sizes when self-hosted:

| Font | Weight | Style | Size |
|------|--------|-------|------|
| Cormorant Garamond | 400 | Normal | ~45KB |
| Cormorant Garamond | 500 | Normal | ~45KB |
| Cormorant Garamond | 600 | Normal | ~48KB |
| Cormorant Garamond | 400 | Italic | ~48KB |
| Jost (all weights) | All | Normal | ~280KB |
| Sacramento | 400 | Normal | ~12KB |

**Total:** ~530KB when self-hosted  
**Via CDN:** Shared across millions of sites (much faster)

---

## Testing Font Loading

### Via Browser DevTools
1. Open DevTools (F12)
2. Go to Network tab
3. Reload page
4. Search for "fonts.googleapis.com"
5. Check request status (should be 200 OK)

### Visual Check
- Headings should display in Cormorant Garamond (serif, elegant)
- Body text should display in Jost (clean sans-serif)
- Accent text should display in Sacramento (handwritten style)

---

## Recommendations

**For Production:**
- ✓ Use CDN (Google Fonts) for best performance
- ✓ Add `<link rel="preconnect">` for faster loading
- ✓ Monitor Google Fonts uptime

**For Self-Hosting:**
- ✓ Only if CDN access is restricted
- ✓ Use WOFF2 format for best compression
- ✓ Implement font-display: swap strategy

**Font Display Strategy:**
```html
<link href="https://fonts.googleapis.com/css2?family=...&display=swap" rel="stylesheet">
```
This shows system fonts while custom fonts load, preventing "flash of unstyled text" (FOUT).

---

**Last Updated:** June 23, 2026
