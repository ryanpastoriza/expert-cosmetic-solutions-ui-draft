"""Apply homepage improvements to extracted ECS bundle source."""
from pathlib import Path
import re

SRC = Path(r"C:\Users\Pc1\Downloads\ecs-homepage-source.html")
OUT_DIR = Path(r"C:\Users\Pc1\Downloads\ecs-homepage-src")
OUT_HTML = OUT_DIR / "index.html"
OUT_CSS = OUT_DIR / "css" / "main.css"

html = SRC.read_text(encoding="utf-8")

# Extract component CSS (second style block)
css_match = re.search(r"<style>\s*\n(\s*:root \{.*?</style>)", html, re.DOTALL)
if not css_match:
    raise SystemExit("Could not find component CSS block")
css = css_match.group(1).replace("</style>", "").strip()

# --- 1. Design system :root extension ---
css = css.replace(
    """  :root {
    --primary: #003A59;
    --accent: #C5A053;
    --light: #FBF9F5;
    --pale: #F2EEE5;
    --border: #E3DED2;
    --text-dark: #1C242B;
    --text-light: #5C6B73;
    --text-lighter: #B9C6CE;
  }""",
    """  :root {
    /* Legacy tokens (existing bundle) */
    --primary: #003A59;
    --accent: #C5A053;
    --light: #FBF9F5;
    --pale: #F2EEE5;
    --border: #E3DED2;
    --text-dark: #1C242B;
    --text-light: #5C6B73;
    --text-lighter: #B9C6CE;

    /* Design system */
    --color-primary: #003A59;
    --color-accent: #C5A053;
    --color-background: #FBF9F5;
    --color-text-main: #333333;
    --color-text-muted: #666666;

    --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --font-serif: Georgia, "Times New Roman", serif;

    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 2rem;
    --spacing-xl: 4rem;

    --shadow-sm: 0 1px 4px rgba(0, 0, 0, 0.12);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.05);
    --shadow-hover: 0 12px 24px rgba(0, 58, 89, 0.15);

    --radius-md: 8px;
  }""",
)

css = css.replace(
    "  html { scroll-behavior: smooth; }",
    "  html { scroll-behavior: smooth; font-size: 16px; }",
)
css = css.replace(
    "  body { font-family: 'Jost', sans-serif; color: var(--text-dark); background: var(--light); -webkit-font-smoothing: antialiased; line-height: 1.65; }",
    "  body { font-family: 'Jost', var(--font-sans); color: var(--color-text-main, var(--text-dark)); background: var(--color-background, var(--light)); -webkit-font-smoothing: antialiased; line-height: 1.65; }",
)

# --- Hero gradient overlay ---
css = css.replace(
    "  .hero-img { width: 100%; height: 100%; object-fit: cover; display: block; }",
    """  .hero-image-wrap {
    position: relative;
    overflow: hidden;
    min-height: 100%;
  }

  .hero-image-wrap::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 58, 89, 0.3) 0%,
      rgba(0, 58, 89, 0.8) 100%
    );
    z-index: 1;
    pointer-events: none;
  }

  .hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    position: relative;
    z-index: 0;
  }""",
)

css = css.replace(
    "  .trust-badge { position: absolute; bottom: 28px; left: 28px;",
    "  .trust-badge { position: absolute; bottom: 28px; left: 28px; z-index: 2;",
)

# --- Services grid + card hover ---
css = css.replace(
    """  .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: var(--border); border: 1px solid var(--border); }
  .service-card { background: var(--light); overflow: hidden; transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); cursor: pointer; }
  .service-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0, 58, 89, 0.14); }
  
  .service-card img { width: 100%; height: 190px; object-fit: cover; display: block; transition: all 0.35s ease; }
  .service-card:hover img { transform: scale(1.04); }""",
    """  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-lg);
    padding: var(--spacing-lg);
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .service-card {
    background-color: #ffffff;
    border-radius: var(--radius-md);
    overflow: hidden;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: var(--shadow-md);
    cursor: pointer;
  }

  .service-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-hover);
  }

  .service-card img,
  .service-card svg {
    width: 100%;
    height: 190px;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }

  .service-card:hover img,
  .service-card:hover svg {
    transform: scale(1.05);
  }""",
)

# Responsive: typography + services grid padding
css = css.replace(
    "  @media (max-width: 768px) {\n    header > div { padding: 0 16px; height: 60px; }",
    "  @media (max-width: 768px) {\n    html { font-size: 14px; }\n    .services-grid { gap: 1.5rem; padding: 1.5rem; }\n    header > div { padding: 0 16px; height: 60px; }",
)

# Remove redundant manual services-grid column overrides (auto-fit handles it)
css = re.sub(
    r"\n    \.services-grid \{ grid-template-columns: 2fr !important; \}",
    "",
    css,
)
css = re.sub(
    r"\n    \.services-grid \{ grid-template-columns: 1fr !important; \}",
    "",
    css,
)

css = css.replace(
    "    .hero-img { min-height: 300px; }",
    "    .hero-image-wrap { min-height: 300px; }\n    .hero-img { min-height: 300px; }",
)

OUT_CSS.parent.mkdir(parents=True, exist_ok=True)
OUT_CSS.write_text(css, encoding="utf-8")

# --- HTML patches ---
body_match = re.search(r"(<!-- .*HEADER / NAV.*)", html, re.DOTALL)
if not body_match:
    raise SystemExit("Could not find body content")
body = body_match.group(1)

# Hero: wrap image + trust badge
body = re.sub(
    r'<div class="trust-badge" style="[^"]*">',
    '<div class="hero-image-wrap">\n  <div class="trust-badge">',
    body,
    count=1,
)
body = body.replace(
    '  </div><img class="hero-img"',
    '  </div>\n  <img class="hero-img"',
    1,
)
body = body.replace(
    'style="background-color: #003a59; position: static; object-fit: cover">',
    'style="background-color: #003a59; object-fit: cover">\n</div>',
    1,
)

# Service card placeholder SVGs
replacements = [
    (
        'src="af40bee6-fcb5-4b81-8511-08ee6d07411d"',
        'src="assets/services/laser-hair-removal.svg"',
    ),
    (
        'src="c48ed544-fcdf-45e0-a92b-c7ccbe2a1068"',
        'src="assets/services/cosmetic-injectables.svg"',
    ),
    (
        'src="9dc249a3-4a9f-4315-89c7-488f32e15145"',
        'src="assets/services/skin-needling.svg"',
    ),
    (
        'src="03ee4903-ed74-409c-9374-6bbef97e3d8a"',
        'src="assets/services/laser-skin-rejuvenation.svg"',
    ),
    (
        'src="2be95b9d-2999-4cee-b08b-6a6b528b51e2"',
        'src="assets/services/facials-peels.svg"',
    ),
    (
        'src="e223b2a7-b22e-4d06-b8da-813a3e19752b"',
        'src="assets/services/double-chin-treatment.svg"',
    ),
]
for old, new in replacements:
    body = body.replace(old, new)

# Build index.html with external CSS
head_fonts = re.search(r"<link rel=\"preconnect\".*?</style>", html, re.DOTALL)
fonts_block = head_fonts.group(0) if head_fonts else ""

out_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Expert Cosmetic Solutions</title>
{fonts_block}
<link rel="stylesheet" href="css/main.css">
</head>
<body>
{body}
</body>
</html>
"""

OUT_HTML.write_text(out_html, encoding="utf-8")
print(f"Wrote {OUT_CSS}")
print(f"Wrote {OUT_HTML}")

# Quick verification
checks = [
    ("hero-image-wrap::before", "hero-image-wrap::before" in css),
    ("auto-fit grid", "repeat(auto-fit, minmax(300px, 1fr))" in css),
    ("--color-primary", "--color-primary" in css),
    ("translateY(-8px)", "translateY(-8px)" in css),
    ("svg hover", ".service-card:hover svg" in css),
    ("placeholder svgs", body.count("assets/services/") == 6),
    ("hero wrap html", "hero-image-wrap" in body),
]
for name, ok in checks:
    print(f"  {'OK' if ok else 'FAIL'}: {name}")
