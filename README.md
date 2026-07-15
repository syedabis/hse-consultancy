# GASCO Website (Next.js)

An exact, pixel-for-pixel clone of the **BuildGo / home-04** template, rebuilt as
a **Next.js 15 (App Router)** application. It reuses the original theme's compiled
CSS, fonts, images and JavaScript so the layout and animations (Swiper sliders,
counters, progress bars, marquee, sticky header) are identical to the source,
then serves each page through Next.js. Being rebranded to **GASCO**.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

## How it works

Each cloned page is stored as three parts under `content/<slug>/`:

- `body.html` – the page's exact body markup (scripts removed, browser-normalized)
- `page.json` – `lang`, `title`, `bodyClass`, ordered `headAssets` (CSS links +
  inline styles), and the ordered list of `scripts` to replay

At request time:

1. `app/layout.js` sets the exact `<body>` class and injects the theme's CSS
   (in original order → identical cascade). The current route is resolved via
   `middleware.js` (`x-pathname` header) + `content/routes.json`.
2. `app/page.js` (home) and `app/[...slug]/page.js` (everything else) load the
   matching page and render `components/RawContent.js`.
3. `RawContent` injects the body HTML, then **replays the page's `<script>` tags
   in original order** (external awaited, inline run in place) and re-fires
   `load`/`DOMContentLoaded` so the theme's jQuery/Elementor/Swiper code
   initializes the animations.

Internal links stay plain `<a href="/...">`, so navigation is a full page load —
each page starts with clean script state (matches the original behaviour).

## Assets

All theme assets live under `public/` at their original paths
(`/wp-content/...`, `/wp-includes/...`), so the mirrored URLs resolve directly.

## Rebuild pipeline (`tools/`)

Used to (re)generate the content from the live source. Order matters:

```bash
# 1. mirror page HTML (-> _mirror/<slug>/index.html) + assets (-> public/)
python tools/mirror.py about-us services contact-us

# 2. split each page into content/<slug>/{body.html,page.json}
python tools/extract.py about-us services contact-us

# 3. normalize body markup through the browser parser (prevents hydration diffs)
node tools/normalize.js about-us services contact-us
```

```bash
# 4. GASCO rebrand: name/logo (rebrand.py) + Gasco Engineering content,
#    nav rewrite and page-specific copy (gasco_content.py)
python tools/rebrand.py
python tools/gasco_content.py home-04 about-us services contact-us projects our-team
```

Then add the route to `content/routes.json` (`"/about-us/": "about-us"`). Slugs
under `content/` are the clean route names (`projects`, `our-team`, ...) — keep
them in sync with `routes.json` and the `NAV`/`PAGE_MAP` tables in
`tools/gasco_content.py` if you rename a page.

`_mirror/` holds the raw downloaded HTML and is kept only as source material.
`tools/normalize.js` needs Playwright available on `node`'s resolution path.

## Pages

`/` (home), `/about-us/`, `/services/`, `/contact-us/`,
`/projects/` (Flagship Projects), `/our-team/` (Our Team).

Content is mapped from **gascoengineering.com.pk**. Demo-only template pages
(price-plan, faqs, request-quote) were removed per the brief. The GEPL logo is
at `public/gasco/gepl-white.png`.

The 8 cards on `/projects/`, the 4-card image-accordion strip and the 3
"Flagship Projects" teaser cards on Home now link out to GEPL's real project
pages on gascoengineering.com.pk (`target="_blank"`) — the demo theme's
`/portfolio/<slug>` detail pages and WordPress blog permalinks were never real
routes here and 404'd. The two rotating "text slider" marquee widgets
(Home + About Us) had the same dead-link problem; both now point to
`/projects/` and show GEPL's 6 business divisions instead of the template's
construction-industry words.

## Known placeholders (need real values)

- Brand accent color is still the template amber `#FFBF43` (awaiting GASCO colors).
- Home counters (6 divisions / 10+ projects / 5 pillars) and the skill-bar
  percentages are derived/placeholder figures — replace with real numbers.
- Section/team/project **photos** are still the template's stock images.
