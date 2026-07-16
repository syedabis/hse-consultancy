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

# 5. /accreditation/ and the 6 /services/<slug>/ detail pages are bespoke
#    (no template source to mirror) - built from services/body.html's
#    already-processed header/footer, so run them before step 6
python -c "import sys; sys.path.insert(0,'tools'); import gasco_content as g; g.build_accreditation_page(); [g.build_service_detail_page(s) for s in g.SERVICE_DETAILS]"

# 6. strip the big photo breadcrumb banner from every non-home page, replacing
#    it with a compact breadcrumb + heading + 2-line description - must run
#    LAST, after step 5, or accreditation/service-detail pages would copy an
#    already-stripped header from services and lose their own title/description
python -c "import sys; sys.path.insert(0,'tools'); import gasco_content as g; g.strip_all_banners()"
node tools/normalize.js about-us services contact-us projects our-team accreditation engineering-consultancy integrated-epc-services pipeline-construction operations-maintenance rental-compression-production outsource-warehousing
```

Then add the route to `content/routes.json` (`"/about-us/": "about-us"`). Slugs
under `content/` are the clean route names (`projects`, `our-team`, ...) — keep
them in sync with `routes.json` and the `NAV`/`PAGE_MAP` tables in
`tools/gasco_content.py` if you rename a page.

`_mirror/` holds the raw downloaded HTML and is kept only as source material.
`tools/normalize.js` needs Playwright available on `node`'s resolution path.

## Pages

`/` (home), `/about-us/`, `/services/`, `/contact-us/`,
`/projects/` (Flagship Projects), `/our-team/` (Our Team),
`/accreditation/` (Our Certifications), and 6 service detail pages under
`/services/<slug>/` (one per division - `engineering-consultancy`,
`integrated-epc-services`, `pipeline-construction`, `operations-maintenance`,
`rental-compression-production`, `outsource-warehousing`), linked from the
Services grid's "Learn more".

Content is mapped from **gascoengineering.com.pk**. Demo-only template pages
(price-plan, faqs, request-quote) were removed per the brief. The GASCO logo is
at `public/gasco/gepl-white.png`.

Every page except Home used the BuildGo template's big full-bleed photo +
breadcrumb banner. Client asked for it gone site-wide, replaced with a small
breadcrumb line + heading + a real 2-line description of that page (matching
the reference layout). Handled by `strip_breadcrumb_banner()` /
`strip_all_banners()` in `tools/gasco_content.py` — run **last**, after
`build_accreditation_page()`/`build_service_detail_page()`, since those two
copy their header from `services/body.html` and expect the original banner
format still intact at that point (see the ordering note in the function's
docstring-comment).

The 8 cards on `/projects/`, the 4-card image-accordion strip and the 3
"Flagship Projects" teaser cards on Home now link out to GASCO's real project
pages on gascoengineering.com.pk (`target="_blank"`) — the demo theme's
`/portfolio/<slug>` detail pages and WordPress blog permalinks were never real
routes here and 404'd. The two rotating "text slider" marquee widgets
(Home + About Us) had the same dead-link problem; both now point to
`/projects/` and show GASCO's 6 business divisions instead of the template's
construction-industry words.

## Known placeholders (need real values)

- Brand accent color is still the template amber `#FFBF43` (awaiting GASCO colors).
- Home counters (6 divisions / 10+ projects / 5 pillars) and the skill-bar
  percentages are derived/placeholder figures — replace with real numbers.
- Section/team/project **photos** are still the template's stock images
  (Services page cards are placeholder stock photos too).
- Home's "Our Certifications" section and the `/accreditation/` page use
  GASCO's real certificate scans (ISO 9001:2015, ISO 14001:2015, ISO
  45001:2018, PEC license) at `public/gasco/cert-*.jpg` (resized/compressed
  for web). The original high-res scans (5-7MB each) are kept at
  `_cert-originals/` - tracked in git (unlike `_mirror/`, these came from the
  client and can't be regenerated) but outside `public/` so they aren't
  deployed with the site.
