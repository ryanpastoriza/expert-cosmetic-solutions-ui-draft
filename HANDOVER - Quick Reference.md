# ECS Website — Quick Reference Card

## 🎨 Brand Colors (Update in :root)

```
Primary:     #003A59 (Navy)
Accent:      #C5A053 (Gold)
Light BG:    #FBF9F5 (Cream)
Pale BG:     #F2EEE5 (Beige)
Text Dark:   #1C242B
Text Light:  #5C6B73
```

## 🔤 Fonts

- **Headings:** Cormorant Garamond (serif, wght 400–600)
- **Body:** Jost (sans-serif, wght 300–600)
- **Accents:** Sacramento (script)

Loaded from: `fonts.googleapis.com`

## 📐 Key Dimensions

- Hero Min Height: 680px
- Hero Grid: 2 columns (desktop), 1 column (mobile)
- Service Cards: 190px image height
- About Image: 3/4 aspect ratio
- Header Height: 74px (desktop), 60px (tablet), 56px (mobile)

## 📱 Breakpoints

- **900px:** Nav switches to mobile hamburger
- **768px:** Layouts collapse to 1 column
- **480px:** Further font reductions

## 🔗 Key Links

- **Booking:** `https://bookings.gettimely.com/expertcosmeticsolutions1/book`
- **Main Site:** `https://expertcosmeticsolutions.com.au`
- **Instagram:** `@expertcosmeticsolutions`

## 📞 Contact

**Pakenham:**  +61 3 5918 4777  
**Warragul:** +61 432 323 494

## 🚀 Quick Edits

### Change Header Background
Find: `header { background: var(--primary); }`  
Change primary color in :root

### Add Service
Duplicate `.service-card` block, update image/title/link

### Add FAQ
Add to `faqs` array: `{ q: 'Question?', a: 'Answer.' }`

### Update Copy
Find section heading, edit text directly

---

**Version:** 2.0 | **Updated:** June 23, 2026
