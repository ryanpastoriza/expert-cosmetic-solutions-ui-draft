# ECS Homepage — Source (pre-bundle)

Raw HTML/CSS/JS for **Expert Cosmetic Solutions** homepage. Apply changes here before re-running the bundler.

## Brand tokens (from style guide)

| Token | Value | Usage |
|-------|-------|--------|
| Primary | `#003A59` | Headers, nav, hero overlay |
| Accent | `#C5A053` | Labels, CTAs, highlights |
| Background | `#FBF9F5` | Page surface |
| Serif | Grande Regular → `Cormorant Garamond` (web fallback) |
| Script | Tosca Beauty → `Sacramento` (web fallback) |

## Structure

```
ecs-homepage-src/
├── index.html
├── css/main.css          # Design system + components + motion
├── js/main.js            # Nav, FAQ, scroll reveal, header scroll
└── assets/services/      # 6 contextual SVG placeholders
```

## Motion (minimal)

- Hero: single fade-up on load (~420ms)
- Sections: scroll-triggered fade (~420ms, 40ms stagger on service cards)
- Hovers: 260ms transform/shadow on cards and buttons
- `prefers-reduced-motion`: animations disabled

## Preview locally

Open `index.html` in a browser, or:

```powershell
cd "C:\Users\Pc1\Downloads\ecs-homepage-src"
python -m http.server 8080
```

Then visit `http://localhost:8080`

## Rebuild from bundle

If you have a new `ECS Homepage - Standalone.html`:

```powershell
python ecs-extract.py
python ecs-homepage-src/build.py
```

Then re-apply brand/motion overrides in `css/main.css` if the build script has not been updated.
