#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Map Gasco Engineering (GASCO) content onto the cloned theme.

- Rewrites the demo mega-menu to GASCO's real flat menu (all copies).
- Applies GLOBAL text swaps (footer/contact) to every page.
- Applies per-page copy swaps (Home first).
Replacements are applied longest-key-first so specific phrases win over
generic words (e.g. "Building Architecture" before "Architecture").
Idempotent-ish: safe to re-run after re-extract+normalize+rebrand.
"""
import os, re, glob, json

ROOT = os.path.join(os.path.dirname(__file__), "..", "content")

# ---- flat GASCO navigation (replaces the demo mega-menu everywhere) ----
# "Contact Us" deliberately left out of the flat nav - it's redundant with
# the separate Contact Us button next to the nav, and with it included the
# nav pill's 6 items don't fit on one line, so it wraps "Contact Us" onto its
# own row by itself (looked broken/unbalanced).
NAV = [("Home", "/"), ("About Us", "/about-us/"), ("Services", "/services/"),
       ("Projects", "/projects/"), ("Our Team", "/our-team/")]
def _menu_html(open_tag):
    return open_tag + "".join(
        f'<li class="menu-item menu-item-type-post_type menu-item-object-page">'
        f'<a href="{h}" class="menu-link">{l}</a></li>' for l, h in NAV) + "</ul>"

# both the desktop menu and the off-canvas/mobile menu are rewritten, keeping
# each container's original id/class so the theme's menu JS/CSS still target it
MENUS = {
    '<ul id="menu-main-menu"': _menu_html('<ul id="menu-main-menu" class="menu">'),
    '<ul id="mobilemenu"':      _menu_html('<ul id="mobilemenu" class="d-block">'),
}

def _replace_block(s, start_key, new_html, tag="ul"):
    out, i = [], 0
    open_re, close_tag = rf'<{tag}\b', f'</{tag}>'
    while True:
        j = s.find(start_key, i)
        if j < 0:
            out.append(s[i:]); break
        out.append(s[i:j])
        depth, k = 0, j
        for m in re.finditer(open_re + '|' + close_tag, s[j:]):
            if m.group(0) == close_tag:
                depth -= 1
                if depth == 0:
                    k = j + m.end(); break
            else:
                depth += 1
        out.append(new_html)
        i = k
    return "".join(out)

def replace_menus(s):
    for key, html in MENUS.items():
        s = _replace_block(s, key, html)
    return s

# ---- GLOBAL swaps (all pages) ----
GLOBAL = {
    "+123 (256) 568 58": "+92 21 34320635-36",
    "needhelp@gmail.com": "info@gascoengineering.com.pk",
    "2464 Royal Ln. Mesa, NewJersey 45463": "501 Amber Estate, Shahra-e-Faisal, Karachi 75350, Pakistan",
    "3891 Ranch view Richardson, California 62639": "501 Amber Estate, Shahra-e-Faisal, Karachi 75350, Pakistan",
    "Solutions for all construction": "your trusted Oil & Gas engineering partner",
    "Redefining the construction industry with innovative solutions, cuttin-edge technology and sustainable practices":
        "Delivering integrated engineering, EPC, pipeline construction and O&amp;M services to Pakistan's oil &amp; gas industry.",
    'href="/blog/"': 'href="/projects/"',
    'href="/blog"': 'href="/projects/"',
    'href="/portfolio-4-columns/"': 'href="/projects/"',
    'href="/team-style-1/"': 'href="/our-team/"',
    ">Blog</span>": ">Projects</span>",  # footer icon-list link text
    # repoint CTAs that pointed at removed pages to Contact
    'href="/request-quote/"': 'href="/contact-us/"',
    'href="/price-plan/"': 'href="/contact-us/"',
    'href="/faqs/"': 'href="/contact-us/"',
    'href="/company-history/"': 'href="/about-us/"',
    'href="/testimonials/"': 'href="/about-us/"',
}

GASCO_ADDR = "501 Amber Estate, Shahra-e-Faisal, Karachi 75350, Pakistan"

# regex swaps applied to EVERY page (handle whitespace / entity / <br> variants)
GLOBAL_RE = [
    (r">\s*Blog\s*</a>", ">Projects</a>"),
    (r"2464 Royal Ln\. Mesa,.*?45463", GASCO_ADDR),
    (r"3891 Ranch view Richardson,.*?62639", GASCO_ADDR),
    (r"Your Dream Project Awaits.*?Today!", "Partner With GASCO for Your Next Project"),
]

# the demo theme's rotating "text slider" widget (appears on home-04 + about-us
# only) links each pill to a fake /portfolio/<slug> page and shows dummy
# construction-industry words; both never existed as real routes here, so the
# pills 404 on click. Retarget every pill to the real Projects page and swap
# each word for one of GASCO's 6 business divisions (word text is unique to
# this widget - always immediately followed by run of whitespace + </a>).
# NOTE: applied to every page EXCEPT "projects" - that page reuses these same
# /portfolio/<slug> hrefs for its own cards, which get real external project
# links instead (see PROJECTS below), so it must run before this catch-all.
MARQUEE_RE = [(rf">\s*{re.escape(old)}(\s+</a>)", f">{new}\\1") for old, new in [
    ("Residential", "ENGINEERING &amp; CONSULTANCY"),
    ("Architecture", "RENTAL COMPRESSION"),
    ("Community", "PIPELINE CONSTRUCTION"),
    ("Healthcare", "EPC SERVICES"),
    ("Seaside Resort", "OPERATIONS &amp; MAINTENANCE"),
    ("Modern", "OUTSOURCE WAREHOUSING"),
]]
MARQUEE_RE += [(r'href="/portfolio/[^"]*"', 'href="/projects/"')]

# ---- HOME page copy ----
HOME = {
    # hero
    "Expert Solutions": "Oil & Gas Engineering",
    # single word, not "Engineering the" - the hero's top line is a fixed
    # 150px font (only shrinks below 1024px viewport width); the original
    # "Shaping Future" barely fit at common laptop widths like 1366px, and
    # the 2-word version wrapped to 2 lines there, pushing the CTA button
    # off-screen. Dropping "the" keeps it on one line at those widths.
    "Shaping Future": "Engineering",
    "Building Architecture": "Pipeline Construction",     # service card (before "Architecture")
    "Architecture": "Energy Future",
    "Construction Agency": "Gasco Engineering",           # rotating badge
    # hero mini widgets
    "Material Sourcing": "Wide Range Supplies",
    "We provide high-quality materials for every project, ensuring durability and sustainability, Let us handle the sourcing.":
        "We supply a wide range of oil & gas equipment and materials, ensuring reliability across every project.",
    "Project Journey": "Our Divisions",
    "Start Planning": "Contact Us",
    # about
    "About Our Company": "About GASCO Engineering",
    "Leading Construction Innovation": "Delivering Excellence Across the",
    "With Digital Consulting": "Oil & Gas Value Chain",
    "We focus on optimizing efficiency, managing risks, and delivering innovative solutions tailored to meet unique project needs and enhance productivity.":
        "We grow our business by delivering competitive, high-quality products and services that create added value for our customers across the oil & gas value chain.",
    # counters (labels; numbers handled by regex below)
    "Client Reviews": "Business Divisions",
    "Team Members": "Flagship Projects",
    "Complete Projects": "Responsibility Pillars",
    # clients + small feature labels
    "Our Trusted Partners": "Our Valued Clients",
    "Custom Designs": "Project Management",
    "Interior Plans": "Asset Integrity",
    # services
    "Provide Quality Services": "Our Core Services",
    "House Renovation": "Engineering & Consultancy",
    "Flooring Installation": "Integrated EPC Services",
    # advisory / skill bars
    "Construction Advices": "What We Do",
    "Building Success With Expert Advisory Services": "Delivering Integrated Oil & Gas Solutions",
    "Building Construction": "Engineering & EPC",
    "Interiors Design": "Pipeline & O&M",
    "Interior Design": "Pipeline & O&M",
    # quote CTA
    "Get Expert Construction Advice and a Free Quote": "Get Expert Oil & Gas Engineering Support",
    # client success
    "Industry Certifications": "Our Commitment",
    "We Drive Client Success with Creative Building Designs": "We Drive Client Success Across the Oil & Gas Sector",
    "Tailored building solutions that reflect your vision style": "Integrated EPFC, maintenance and project management",
    "Creating aesthetically pleasing functional interior spaces": "A diverse fleet of rental compression & production equipment",
    # dark consulting section
    "Construction design": "Our Divisions",
    "Digital Consulting The Key to Smarter Building": "Engineering Excellence, The Key to Energy Progress",
    # blog -> flagship projects
    "Join Our Community and Access Exclusive Insights Today": "Partner With GASCO for Your Next Oil & Gas Project",
    "Update News &amp; Blogs": "Our Flagship Projects",
    "Industry Insights": "Flagship Projects",
    "Key Steps to Ensure a Smooth Building Process": "Central Front-End Compression at Makori Gas Facility",
    "How Weather Can Impact a Construction Project": "Gas Pressure Boosting Compressor Station, Mari Pipeline",
    "How to Choose the Perfect Construction Company": "Truck Loading Silos & Turbo Compressor Projects",
    # these flagship-project card links still pointed at the old dummy blog
    # permalinks (never real routes here) -> send them to the Projects page
    'href="/key-steps-to-ensure-a-smooth-building-process/"': 'href="/projects/"',
    'href="/how-weather-can-impact-a-construction-project/"': 'href="/projects/"',
    'href="/how-to-choose-the-perfect-construction-company/"': 'href="/projects/"',
    "wpboss": "GASCO",
    # image-accordion teaser (4 cards, separate from the marquee/flip-box
    # widgets above) - also dead /portfolio/ links + dummy category+title
    # pairs; a prior run's un-anchored "Healthcare"/"Seaside Resort" swaps
    # partially corrupted 2 of these (now fixed below using the corrupted
    # strings actually present, plus the still-original other 2)
    'href="/projects/">EPC SERVICES Facility</a>':
        'href="https://gascoengineering.com.pk/pf/eni-pakistan-limited/" target="_blank" rel="noopener">Bhit Wellhead Booster Compressors</a>',
    'href="/projects/">Healthcare Facility</a>':
        'href="https://gascoengineering.com.pk/pf/eni-pakistan-limited/" target="_blank" rel="noopener">Bhit Wellhead Booster Compressors</a>',
    'href="/projects/">Urban Mall Development</a>':
        'href="https://gascoengineering.com.pk/pf/omv-pakistan-limited/" target="_blank" rel="noopener">Miano 18 Wellhead Development</a>',
    'href="/projects/">Historic Restoration</a>':
        'href="https://gascoengineering.com.pk/pf/ppl-hrl-compressor/" target="_blank" rel="noopener">HRL Compressor Package Revamp</a>',
    'href="/projects/">OPERATIONS &amp; MAINTENANCE Expansion</a>':
        'href="https://gascoengineering.com.pk/pf/engro-fertilisers/" target="_blank" rel="noopener">Compressor Installation Package</a>',
    'href="/projects/">OPERATIONS & MAINTENANCE Expansion</a>':
        'href="https://gascoengineering.com.pk/pf/engro-fertilisers/" target="_blank" rel="noopener">Compressor Installation Package</a>',
    'href="/projects/">Seaside Resort Expansion</a>':
        'href="https://gascoengineering.com.pk/pf/engro-fertilisers/" target="_blank" rel="noopener">Compressor Installation Package</a>',
    "<span>EPC SERVICES</span>": "<span>Integrated EPC</span>",
    "<span>Retail</span>": "<span>Pipeline Construction</span>",
    "<span>Restoration</span>": "<span>Operations &amp; Maintenance</span>",
    "<span>Hospitality</span>": "<span>Rental Compression &amp; Production</span>",
    # buttons
    "Get Started": "Contact Us",
    "Start Today": "Explore Services",
    "Our Story": "About Us",
    "more Services": "All Services",
    "Get Advices": "Get in Touch",
    "Start a Journey": "Work With Us",
    "Free Consultation": "Contact Us",
}

# regex swaps (tricky punctuation / counter numbers), applied after dict swaps
HOME_RE = [
    # Home's footer (elementor id 1276) is the one footer template with a
    # light cream background - the white logo used everywhere else (header,
    # mobile menu, dark offcanvas sidebar, dark shared footer on other pages)
    # is invisible here, so this one instance gets the color/black-text mark
    # instead. Anchored on element id 6f82a1a, which is unique in the file.
    (r'(data-id="6f82a1a".*?src=")/gasco/gepl-white\.png(")', r"\1/gasco/gepl-black.png\2"),
    (r"we pride ourselves on transforming.*?stands out\.",
     "we pride ourselves on delivering safe, ethical and innovative engineering solutions. Our client-focused approach ensures every project meets the highest standards."),
    (r"With a focus on innovation and sustainability, we help you navigate complex challenges, ensuring",
     "With a focus on safety, integrity and innovation, we help clients navigate complex oil &amp; gas challenges,"),
    (r"Redefining the construction industry.*?sustainable practices",
     "Delivering integrated engineering, EPC, pipeline construction and O&amp;M services to Pakistan's oil &amp; gas industry."),
    (r">\s*635\s*<", ">6<"),
    (r">\s*120\s*<", ">10<"),
    (r">\s*678\s*<", ">5<"),
]

# ---- HOME page: "Our Certifications" section (new content, not in the
# BuildGo template) - overlapping real certificate photos + angular accent
# shape, matching the reference layout, in GASCO's amber theme. Real scans
# (ISO 9001:2015, ISO 14001:2015, ISO 45001:2018) provided by the client,
# resized for web at public/gasco/cert-iso-*.jpg. Button links to our own
# /accreditation/ page (see ACCREDITATION_PAGE_HTML below), not an external
# site - it shows all 4 credentials including the PEC license.
CERT_SECTION_ANCHOR = '<section class="elementor-section elementor-top-section elementor-element elementor-element-eddd3e7'
CERT_SECTION_MARKER = "gasco-cert-section"
CERT_SECTION_HTML = """
<style>
.gasco-cert-section{position:relative;overflow:hidden;background:#F7F5EF;padding:100px 0;}
.gasco-cert-shape-a{position:absolute;right:0;top:0;bottom:0;width:42%;background:#FFBF43;clip-path:polygon(35% 0,100% 0,100% 100%,0% 100%);z-index:0;}
.gasco-cert-shape-b{position:absolute;right:0;bottom:0;width:20%;height:38%;background:#B8871F;clip-path:polygon(45% 0,100% 0,100% 100%,0 100%);z-index:0;}
.gasco-cert-container{max-width:1340px;margin:0 auto;padding:0 20px;display:flex;flex-wrap:wrap;gap:40px;align-items:center;position:relative;z-index:1;}
.gasco-cert-text{flex:1 1 380px;}
.gasco-cert-eyebrow{color:#FFBF43;font-weight:600;letter-spacing:.02em;margin:0 0 10px 0;}
.gasco-cert-desc{margin:16px 0 28px 0;max-width:460px;}
.gasco-cert-photos{flex:1 1 480px;display:flex;align-items:center;justify-content:center;padding:20px 0;}
.gasco-cert-photos img{width:190px;box-shadow:0 20px 45px rgba(0,0,0,.3);border:6px solid #fff;border-radius:2px;background:#fff;}
.gasco-cert-photos img:nth-child(1){z-index:1;margin-right:-45px;transform:translateY(24px) rotate(-5deg);}
.gasco-cert-photos img:nth-child(2){z-index:3;transform:translateY(-14px);}
.gasco-cert-photos img:nth-child(3){z-index:2;margin-left:-45px;transform:translateY(24px) rotate(5deg);}
@media(max-width:767px){.gasco-cert-shape-a,.gasco-cert-shape-b{display:none;}
.gasco-cert-photos img{width:120px;}
.gasco-cert-photos img:nth-child(1){margin-right:-25px;}
.gasco-cert-photos img:nth-child(3){margin-left:-25px;}}
</style>
<section class="elementor-section elementor-top-section elementor-section-boxed elementor-section-height-default gasco-cert-section">
  <div class="gasco-cert-shape-a"></div>
  <div class="gasco-cert-shape-b"></div>
  <div class="gasco-cert-container">
    <div class="gasco-cert-text">
      <h6 class="elementor-heading-title elementor-size-default gasco-cert-eyebrow">GASCO's Credentials</h6>
      <h2 class="elementor-heading-title elementor-size-default">Our Certifications</h2>
      <p class="elementor-heading-title elementor-size-default gasco-cert-desc">ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018 certified, and PEC licensed &#8212; the same rigorous standards that guide every project we deliver.</p>
      <div class="elementor-element elementor-element-c18debc elementor-widget elementor-widget-flexitype-creative-button" data-id="c18debc" data-element_type="widget" data-e-type="widget" data-widget_type="flexitype-creative-button.default">
        <div class="elementor-widget-container">
          <div class="flexitype-btn">
            <a class="flexitype-btn-wrapper button-isi  right" href="/accreditation/" data-text="View Certificates">
              <span>View Certificates</span>
              <i class="flaticon flaticon-right-up"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="gasco-cert-photos">
      <img src="/gasco/cert-iso-14001.jpg" alt="GASCO ISO 14001:2015 certificate">
      <img src="/gasco/cert-iso-9001.jpg" alt="GASCO ISO 9001:2015 certificate">
      <img src="/gasco/cert-iso-45001.jpg" alt="GASCO ISO 45001:2018 certificate">
    </div>
  </div>
</section>
"""

def add_certifications_section(s):
    if CERT_SECTION_MARKER in s or CERT_SECTION_ANCHOR not in s:
        return s
    return s.replace(CERT_SECTION_ANCHOR, CERT_SECTION_HTML + CERT_SECTION_ANCHOR, 1)

# ---- ABOUT US page ----
ABOUT = {
    "Dedicated to Delivering Value and Excellence": "Committed to Excellence in Oil & Gas",
    "About Our Company": "About GASCO Engineering",
    "Trusted Partner in Construction and Design": "A Culturally Diverse Company United by Shared Values",
    "Building Trust Since 1989": "Trusted Across Pakistan's Oil & Gas Sector",
    "Industry Certifications": "Our Vision & Values",
    "Our Key Achievements Over the Years": "Our Vision, Mission & Values",
    "Meet Our Experts": "Our Leadership",
    "Dedicated Professionals": "Driven by Safety & Integrity",
    "Ensuring every detail is considered designing": "Delivering competitive, high-quality products & services",
    "We take pride in our quality craftsmanship": "Focused on customer needs and satisfaction",
}
ABOUT_RE = [
    (r"Our journey began with a commitment to excellence.*?residential and commercial",
     "GASCO has gained an enviable reputation in the Oil &amp; Gas industry with its efficient service and "
     "excellent post-project follow-up. Founded by Mr. S. H. Hadi Naqvi (Late) — a visionary entrepreneur "
     "whose integrity, foresight and resolve shaped the company's foundation"),
]

# ---- SERVICES page: 6 template cards -> GASCO's 6 business divisions.
# The template's icon-box widget has no description field (title + "Read
# More" only, with a big empty gap where a description would go) and every
# "Read More" pointed at a fake /service/<slug> page that never existed here.
# SERVICES_RE (below) injects a real one-line description per division and
# repoints each link to GASCO's real services page on gascoengineering.com.pk.
SERVICES = {
    "Construction Planning": "Engineering & Consultancy",
    "Foundation Repair": "Integrated EPC Services",
    "Building Architecture": "Pipeline Construction",
    "House Renovation": "Operations & Maintenance",
    "Interior Design": "Rental Compression & Production",
    "Flooring Installation": "Outsource Warehousing",
    'href="/service/construction-planning"': 'href="https://gascoengineering.com.pk/services/" target="_blank" rel="noopener"',
    'href="/service/foundation-repair"': 'href="https://gascoengineering.com.pk/services/integrated-epc-services/" target="_blank" rel="noopener"',
    'href="/service/building-architecture"': 'href="https://gascoengineering.com.pk/services/pipeline-construction/" target="_blank" rel="noopener"',
    'href="/service/house-renovation"': 'href="https://gascoengineering.com.pk/services/" target="_blank" rel="noopener"',
    'href="/service/interior-design"': 'href="https://gascoengineering.com.pk/services/" target="_blank" rel="noopener"',
    'href="/service/flooring-installation"': 'href="https://gascoengineering.com.pk/services/" target="_blank" rel="noopener"',
}

SERVICES_DESC = {
    "Engineering & Consultancy": "An extensive range of engineering disciplines, backed by a full-service design department using the latest technology.",
    "Integrated EPC Services": "Integrating engineering, procurement, fabrication, construction and project management into one seamless EPFC solution.",
    "Pipeline Construction": "Pursuing our goal of becoming Pakistan's premier pipeline construction and maintenance company, with the utmost regard for safety and the environment.",
    "Operations & Maintenance": "Highly trained specialists managing, operating and maintaining customer equipment across every region of Pakistan.",
    "Rental Compression & Production": "A diverse fleet of compression and production equipment available under rental, lease or rent-to-purchase plans.",
    "Outsource Warehousing": "Dedicated warehousing services trusted by multinationals operating across Pakistan.",
}
# insert a <p> description right after each title's </h5> (still inside the
# surrounding .title div) - title text is unique per card so this is safe.
# Negative lookahead skips cards that already got their description, so
# re-running the pipeline doesn't duplicate it.
SERVICES_RE = [
    (re.escape(title) + r"(\s*</a>\s*</h5>)(?!<p class=\"icon__box-item-desc\">)",
     title + r"\1" + f'<p class="icon__box-item-desc">{desc}</p>')
    for title, desc in SERVICES_DESC.items()
]

# ---- SERVICES page: full redesign of the 6-card grid to a photo-card layout
# (photo + title + description + underlined "Learn more" link) per reference
# design, replacing the old icon-box grid outright. Same real hrefs/descriptions
# as SERVICES/SERVICES_DESC above; photos are stock placeholders not already
# used on the Projects page, to avoid an identical image showing up twice.
# hrefs are internal /services/<slug>/ detail pages (see SERVICE_DETAILS +
# build_service_detail_page below), not the external gascoengineering.com.pk
# links used before - each division now has a real page on this site.
SERVICES_CARDS = [
    ("/wp-content/uploads/2024/09/banner-1.jpg", "Engineering & Consultancy",
     SERVICES_DESC["Engineering & Consultancy"], "/services/engineering-consultancy/"),
    ("/wp-content/uploads/2024/09/services-1.jpg", "Integrated EPC Services",
     SERVICES_DESC["Integrated EPC Services"], "/services/integrated-epc-services/"),
    ("/wp-content/uploads/2024/09/service-3.jpg", "Pipeline Construction",
     SERVICES_DESC["Pipeline Construction"], "/services/pipeline-construction/"),
    ("/wp-content/uploads/2024/10/subscribe.jpg", "Operations &amp; Maintenance",
     SERVICES_DESC["Operations & Maintenance"], "/services/operations-maintenance/"),
    ("/wp-content/uploads/2024/09/service-4.jpg", "Rental Compression &amp; Production",
     SERVICES_DESC["Rental Compression & Production"], "/services/rental-compression-production/"),
    ("/wp-content/uploads/2024/10/about-6.jpg", "Outsource Warehousing",
     SERVICES_DESC["Outsource Warehousing"], "/services/outsource-warehousing/"),
]
SERVICES_GRID_ANCHOR = '<section class="elementor-section elementor-top-section elementor-element elementor-element-a6f67bf elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="a6f67bf" data-element_type="section" data-e-type="section">'
SERVICES_GRID_MARKER = "gasco-svc-grid"

def _services_card(img, title, desc, href):
    return f"""<div class="gasco-svc-card">
  <a href="{href}"><img src="{img}" alt="{title}" loading="lazy"></a>
  <h3>{title}</h3>
  <p>{desc}</p>
  <a class="gasco-svc-more" href="{href}">Learn more <i class="flaticon flaticon-right-arrow"></i></a>
</div>"""

def build_services_grid():
    cards = "\n".join(_services_card(*c) for c in SERVICES_CARDS)
    return f"""
<style>
.gasco-svc-grid{{display:grid;grid-template-columns:repeat(3,1fr);gap:40px 32px;max-width:1340px;margin:0 auto;padding:80px 20px;}}
.gasco-svc-card img{{width:100%;aspect-ratio:16/10;object-fit:cover;display:block;}}
.gasco-svc-card h3{{margin:20px 0 8px;font-size:20px;}}
.gasco-svc-card p{{margin:0 0 14px;opacity:.75;font-size:15px;line-height:1.5;}}
.gasco-svc-card a.gasco-svc-more{{display:inline-flex;align-items:center;gap:6px;font-weight:600;text-decoration:none;color:inherit;border-bottom:2px solid #FFBF43;padding-bottom:2px;}}
.gasco-svc-card a.gasco-svc-more i{{color:#FFBF43;font-size:13px;}}
@media(max-width:900px){{.gasco-svc-grid{{grid-template-columns:repeat(2,1fr);}}}}
@media(max-width:600px){{.gasco-svc-grid{{grid-template-columns:1fr;}}}}
</style>
<div class="gasco-svc-grid">
{cards}
</div>
"""

def redesign_services_grid(s):
    if SERVICES_GRID_MARKER in s:
        return s  # already redesigned
    if SERVICES_GRID_ANCHOR not in s:
        return s
    return _replace_block(s, SERVICES_GRID_ANCHOR, build_services_grid(), tag="section")

# ---- PROJECTS page: 8 template portfolio cards -> 8 real GASCO projects.
# No dedicated detail page exists in this clone for any of these, so each
# card links out to the matching real project page on gascoengineering.com.pk
# (the two Home-page flagship projects without a known individual page link
# to the Flagship Projects index instead). Card photos stay the template's
# stock images (no real project photography available yet).
PROJECTS = {
    "Portfolio 4 Columns": "Flagship Projects",
    # 1: Healthcare Facility / Healthcare -> Bhit Wellhead Booster Compressors
    'href="/portfolio/healthcare-facility"': 'href="https://gascoengineering.com.pk/pf/eni-pakistan-limited/" target="_blank" rel="noopener"',
    "Healthcare Facility": "Bhit Wellhead Booster Compressors",
    "Healthcare": "Integrated EPC",
    # 2: Community Center / Public Spaces -> PGNIG Rizq-2 / Rehman-4 / Rehman-5
    'href="/portfolio/community-center/"': 'href="https://gascoengineering.com.pk/pf/pgnig-rizq-2/" target="_blank" rel="noopener"',
    "Community Center": "Rizq-2, Rehman-4 &amp; Rehman-5 Facilities",
    "Public Spaces": "Pipeline Construction",
    # 3: Mall Development / Retail -> Miano 18 Wellhead Development
    'href="/portfolio/urban-mall-development"': 'href="https://gascoengineering.com.pk/pf/omv-pakistan-limited/" target="_blank" rel="noopener"',
    "Mall Development": "Miano 18 Wellhead Development",
    "Retail": "Pipeline Construction",
    # 4: Historic Restoration / Restoration -> HRL Compressor Package Revamp
    'href="/portfolio/historic-restoration/"': 'href="https://gascoengineering.com.pk/pf/ppl-hrl-compressor/" target="_blank" rel="noopener"',
    "Historic Restoration": "HRL Compressor Package Revamp",
    "Restoration": "Operations &amp; Maintenance",
    # 5: Home Renovation / Residential -> FFCL NGBC Compressor Station
    'href="/portfolio/luxury-home-renovation"': 'href="https://gascoengineering.com.pk/pf/fatima-fertilizer-company-limited/" target="_blank" rel="noopener"',
    "Home Renovation": "FFCL NGBC Compressor Station",
    "Residential": "Integrated EPC",
    # 6: Modern Architecture / Modern -> Compressor Installation Package (Engro)
    'href="/portfolio/modern-architecture"': 'href="https://gascoengineering.com.pk/pf/engro-fertilisers/" target="_blank" rel="noopener"',
    "Modern Architecture": "Compressor Installation Package",
    "Modern": "Rental Compression &amp; Production",
    # 7: Industrial Warehouse / Industrial -> Makori Front-End Compression
    'href="/portfolio/industrial-warehouse/"': 'href="https://gascoengineering.com.pk/flagship-projects/" target="_blank" rel="noopener"',
    "Industrial Warehouse": "Central Front-End Compression, Makori Gas Facility",
    "Industrial": "Integrated EPC",
    # 8: Resort Expansion / Resort -> Mari Gas Pressure Boosting Station
    'href="/portfolio/seaside-resort-expansion/"': 'href="https://gascoengineering.com.pk/flagship-projects/" target="_blank" rel="noopener"',
    "Resort Expansion": "Gas Pressure Boosting Station, Mari Pipeline",
    "Resort": "Operations &amp; Maintenance",
}

# ---- TEAM page: template people -> GASCO leadership (real names + titles) ----
TEAM_NAMES = {
    "Amelia Clover": "S. Faysal H. Naqvi",
    "Julian Wyat": "Ameer Muhammad",
    "Guy Hawkins": "Aslam Khan",
    "Archer Graham": "Shariq Siddiqui",
    "Alan Dosan": "Shams Ashraf",
    "Sarah Johnson": "Rabab Hasan",
    "Derya Kurtulus": "Salman Ahmed",
    "Steve Rhodes": "Chief Financial Officer",
    "Team Style 1": "Our Team",  # breadcrumb
}
TEAM_ROLES = {  # unique template roles (str replace)
    "Project Manager": "Chief Executive Officer",
    "Site Engineer": "Engineering & Construction Manager",
    "Safety Officer": "HSE Manager",
    "Lead Architect": "Proposals Manager",
    "Safety Inspector": "Administration Head",
    "Civil Engineer": "Finance & Accounts",
}

# per-page registries
PAGE_MAP = {"home-04": HOME, "about-us": ABOUT,
            "services": SERVICES, "projects": PROJECTS}
PAGE_RE = {"home-04": HOME_RE, "about-us": ABOUT_RE, "services": SERVICES_RE}

def apply_map(s, mapping):
    for k in sorted(mapping, key=len, reverse=True):
        s = s.replace(k, mapping[k])
    return s

def process(slug):
    fp = os.path.join(ROOT, slug, "body.html")
    s = open(fp, encoding="utf-8").read()
    s = replace_menus(s)
    s = apply_map(s, GLOBAL)
    for pat, rep in GLOBAL_RE:
        s = re.sub(pat, rep, s, flags=re.S)
    if slug != "projects":  # projects page reuses these hrefs for real cards
        for pat, rep in MARQUEE_RE:
            s = re.sub(pat, rep, s, flags=re.S)
    if slug in PAGE_MAP:
        s = apply_map(s, PAGE_MAP[slug])
    for pat, rep in PAGE_RE.get(slug, []):
        s = re.sub(pat, rep, s, flags=re.S)
    if slug == "our-team":
        s = apply_map(s, TEAM_NAMES)
        s = apply_map(s, TEAM_ROLES)
        # two template members share "General Laborer" (Shariq's card, then
        # Rabab's card in document order) -> assign each a distinct real title
        s = re.sub("General Laborer", "Business Development Manager", s, count=1)
        s = re.sub("General Laborer", "Accounts &amp; Procurement Head", s, count=1)
    if slug == "home-04":
        s = add_certifications_section(s)
    if slug == "services":
        s = redesign_services_grid(s)
    if slug == "about-us":
        s = remove_video_widget(s)
    s = remove_offcanvas_widget(s)
    open(fp, "w", encoding="utf-8").write(s)
    print("content mapped:", slug)

# ---- ACCREDITATION page (new - not in the BuildGo template). Grid layout
# modeled on the reference credentials-grid pattern: photo, amber underline,
# title, subtitle, one card per real GASCO credential. Built from the
# services page's already-working header/breadcrumb/footer (swapping the
# breadcrumb title) rather than hand-assembling those from scratch.
ACCREDITATION_CARDS = [
    ("/gasco/cert-iso-9001.jpg", "GASCO ISO 9001:2015 certificate", "ISO Certificate", "ISO 9001:2015 &#8212; Quality Management"),
    ("/gasco/cert-iso-14001.jpg", "GASCO ISO 14001:2015 certificate", "ISO Certificate", "ISO 14001:2015 &#8212; Environmental Management"),
    ("/gasco/cert-iso-45001.jpg", "GASCO ISO 45001:2018 certificate", "ISO Certificate", "ISO 45001:2018 &#8212; Occupational Health &amp; Safety"),
    ("/gasco/cert-pec.jpg", "GASCO Pakistan Engineering Council license", "PEC License", "License Number: 185"),
]

def _accreditation_card(img, alt, title, sub):
    return f"""<div class="gasco-accred-card">
      <a href="{img}" target="_blank" rel="noopener"><img src="{img}" alt="{alt}"></a>
      <div class="gasco-accred-divider"></div>
      <h3>{title}</h3>
      <p>{sub}</p>
    </div>"""

def build_accreditation_content():
    cards = "\n    ".join(_accreditation_card(*c) for c in ACCREDITATION_CARDS)
    return f"""
<style>
.gasco-accred-section{{padding:80px 20px;max-width:1340px;margin:0 auto;}}
.gasco-accred-eyebrow{{color:#FFBF43;font-weight:600;margin:0 0 10px;}}
.gasco-accred-intro{{max-width:600px;margin:16px 0 50px;opacity:.75;}}
.gasco-accred-grid{{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;}}
.gasco-accred-card{{background:#F7F5EF;border-radius:8px;padding:30px;text-align:center;}}
.gasco-accred-card img{{width:100%;max-width:220px;box-shadow:0 10px 25px rgba(0,0,0,.15);margin:0 auto 24px;display:block;}}
.gasco-accred-divider{{width:60px;height:3px;background:#FFBF43;margin:0 auto 20px;}}
.gasco-accred-card h3{{margin:0 0 6px;font-size:19px;}}
.gasco-accred-card p{{margin:0;opacity:.7;font-size:14px;}}
@media(max-width:1000px){{.gasco-accred-grid{{grid-template-columns:repeat(2,1fr);}}}}
@media(max-width:560px){{.gasco-accred-grid{{grid-template-columns:1fr;}}}}
</style>
<section class="gasco-accred-section">
  <h6 class="elementor-heading-title elementor-size-default gasco-accred-eyebrow">Credentials</h6>
  <h2 class="elementor-heading-title elementor-size-default">Our Certifications</h2>
  <p class="gasco-accred-intro">GASCO maintains internationally recognized quality, environmental and safety management standards, and is a licensed constructor/operator with the Pakistan Engineering Council.</p>
  <div class="gasco-accred-grid">
    {cards}
  </div>
</section>
"""

def _extract_nav_header(src):
    # nav/logo/header markup ends right where either the old full-bleed
    # banner or the new compact page-header begins - handle both so this
    # works regardless of whether services/body.html has already been
    # through strip_breadcrumb_banner.
    for marker in ('<div class="gasco-page-header">',
                    '<section class="elementor-section elementor-top-section elementor-element elementor-element-53ac921'):
        idx = src.find(marker)
        if idx >= 0:
            return src[:idx]
    return src[:src.index('<div class="section-nopading">')]

def build_accreditation_page():
    out_dir = os.path.join(ROOT, "accreditation")
    os.makedirs(out_dir, exist_ok=True)
    src = open(os.path.join(ROOT, "services", "body.html"), encoding="utf-8").read()
    nav_header = fix_header_logo(_extract_nav_header(src))
    footer = src[src.index("<footer"):]
    crumb_ul = ('<ul><li class="home item"><a href="/">Home</a></li>'
                '<li class="separator">/</li>'
                '<li class="current item">Accreditation</li></ul>')
    compact_header = build_compact_header("accreditation", "Accreditation", crumb_ul)
    body = nav_header + compact_header + build_accreditation_content() + footer
    open(os.path.join(out_dir, "body.html"), "w", encoding="utf-8").write(body)

    meta = json.loads(open(os.path.join(ROOT, "services", "page.json"), encoding="utf-8").read())
    meta["title"] = "Accreditation &#8211; GASCO"
    open(os.path.join(out_dir, "page.json"), "w", encoding="utf-8").write(
        json.dumps(meta, ensure_ascii=False, indent=2))
    print("built accreditation page")

# ---- SERVICE DETAIL pages (new - one per division, linked from the Services
# grid's "Learn more"). Layout follows the reference (breadcrumb, photo+intro,
# capability section, "why partner" facts, related-projects table) but every
# fact is real and already sourced elsewhere in this file: intro/deliver text
# from SERVICES_DESC-derived research, projects from PROJECTS above, and the
# "why partner" bullets from GEPL's public company profile (2 decades as a
# front-line EPCC contractor, 2,000+ staff, 24/7 execution, ISO/PEC - see
# ACCREDITATION_CARDS). No invented client names, dates or figures.
# company-wide facts, shown on every detail page
WHY_PARTNER = [
    ("Two Decades in Oil &amp; Gas", "A front-line EPCC contractor active in Pakistan's oil &amp; gas sector for the last 20 years."),
    ("2,000+ Skilled Personnel", "A large deployable workforce delivering projects across every region of Pakistan."),
    ("24/7 Execution Capability", "Round-the-clock project execution to keep schedules on track."),
    ("Certified &amp; Licensed", 'ISO 9001, ISO 14001 &amp; ISO 45001 certified, and PEC licensed &#8212; see our <a href="/accreditation/">certifications</a>.'),
]

SERVICE_DETAILS = {
    "engineering-consultancy": {
        "title": "Engineering &amp; Consultancy",
        "img": "/wp-content/uploads/2024/09/banner-1.jpg",
        "intro": "Gasco offers an extensive range of engineering disciplines and houses a full-service design department implementing the latest technology.",
        "deliver": "Front-end and detailed engineering design across mechanical, electrical, instrumentation and civil disciplines for oil &amp; gas facilities, backed by an in-house design department using the latest engineering technology.",
        "highlights": [
            ("Full-Service Design Department", "In-house engineering across mechanical, electrical, instrumentation and civil disciplines, using the latest design technology."),
            ("Front-End to Detailed Design", "Engineering support spanning concept studies through to fully detailed, construction-ready packages."),
        ],
        "gallery": ["portfolio-1.jpg", "portfolio-2.jpg", "blog-1.jpg", "who-we-are.jpg"],
        "projects": [],
    },
    "integrated-epc-services": {
        "title": "Integrated EPC Services",
        "img": "/wp-content/uploads/2024/09/services-1.jpg",
        "intro": "GASCO integrates engineering, procurement, fabrication, construction and project management into one seamless EPFC solution for clients across diverse industries.",
        "deliver": "A full EPFC (Engineering, Procurement, Fabrication, Construction) delivery model, taking projects from concept through to commissioning under a single, integrated scope.",
        "highlights": [
            ("Single-Scope EPFC Delivery", "Engineering, procurement, fabrication, construction and project management under one integrated contract."),
            ("Concept to Commissioning", "A complete delivery model that carries a project from initial design through to start-up."),
        ],
        "gallery": ["portfolio-3.jpg", "portfolio-4.jpg", "about-4.jpg", "image-2.jpg"],
        "projects": [
            ("Miano 18 Wellhead Development", "OMV Pakistan Limited &#8212; Miano Concession, Sindh"),
            ("Bhit Wellhead Booster Compressors", "Eni Pakistan Limited &#8212; Kirthar Concession, Sindh"),
        ],
    },
    "pipeline-construction": {
        "title": "Pipeline Construction",
        "img": "/wp-content/uploads/2024/09/service-3.jpg",
        "intro": "Gasco Engineering is determined to become Pakistan's premier pipeline construction and maintenance company, serving the pipeline industry throughout Pakistan and the Middle East, with the utmost regard for environmental protection and employee safety.",
        "deliver": "Full-scope pipeline construction and maintenance &#8212; from wellhead tie-ins to compressor station piping &#8212; delivered with a disciplined focus on safety and environmental protection.",
        "highlights": [
            ("Nationwide &amp; Regional Reach", "Serving the pipeline industry throughout Pakistan and the Middle East."),
            ("Safety-First Execution", "Every project delivered with the utmost regard for environmental protection and employee safety."),
        ],
        "gallery": ["portfolio-5.jpg", "portfolio-6.jpg", "portfolio-7.jpg", "cta.jpg"],
        "projects": [
            ("Rizq-2, Rehman-4 &amp; Rehman-5 Facilities", "PGNIG"),
            ("Central Front-End Compression", "Makori Gas Facility"),
            ("Gas Pressure Boosting Station", "Mari Pipeline"),
        ],
    },
    "operations-maintenance": {
        "title": "Operations &amp; Maintenance",
        "img": "/wp-content/uploads/2024/10/subscribe.jpg",
        "intro": "Gasco Operations is active in every region of Pakistan, offering a team of highly trained specialists to manage, operate and maintain customers' equipment, with an availability / up-time guarantee of 98% and above.",
        "deliver": "O&amp;M and Annual Turnaround services, backed by nearly a decade and a half of experience operating and maintaining gas compression stations and production units for customers across Pakistan.",
        "highlights": [
            ("98%+ Uptime Guarantee", "An availability / up-time guarantee of 98% and above on the equipment we operate."),
            ("14 Years of O&amp;M Experience", "Annual Turnaround and operations &amp; maintenance services for customers across Pakistan."),
        ],
        "gallery": ["portfolio-8.jpg", "skill.jpg", "about-5.jpg", "blog-2.jpg"],
        "projects": [
            ("HRL Compressor Package Revamp", "Pakistan Petroleum Limited &#8212; Kandhkot Gas Field"),
        ],
    },
    "rental-compression-production": {
        "title": "Rental Compression &amp; Production",
        "img": "/wp-content/uploads/2024/09/service-4.jpg",
        "intro": "Gasco maintains a diverse fleet of compression and production equipment, available under rental, lease or rent-to-purchase plans.",
        "deliver": "Flexible equipment access without the capital burden of ownership &#8212; compression packages sized and supplied to match each client's production profile.",
        "highlights": [
            ("Flexible Fleet Access", "Compression and production equipment available under rental, lease or rent-to-purchase plans."),
            ("Sized to Your Production Profile", "Packages matched to each client's specific output and pressure requirements."),
        ],
        "gallery": ["portfolio-1.jpg", "portfolio-2.jpg", "portfolio-3.jpg", "about-6.jpg"],
        "projects": [
            ("Compressor Installation Package", "Engro Fertilizers &#8212; 3 &#215; 7,950 Hp, 150 MMSCFD"),
        ],
    },
    "outsource-warehousing": {
        "title": "Outsource Warehousing",
        "img": "/wp-content/uploads/2024/10/about-6.jpg",
        "intro": "Gasco also offers dedicated warehousing services, trusted by multinationals operating in Pakistan.",
        "deliver": "Secure, professionally managed storage and logistics support for materials and equipment, reducing overhead for clients operating across Pakistan.",
        "highlights": [
            ("Trusted by Multinationals", "Dedicated warehousing services relied on by multinational operators across Pakistan."),
            ("Secure Materials Management", "Professionally managed storage and logistics support that reduces overhead for our clients."),
        ],
        "gallery": ["portfolio-4.jpg", "portfolio-5.jpg", "portfolio-6.jpg", "who-we-are.jpg"],
        "projects": [],
    },
}

def _gallery_src(name):
    year = "2024/09" if ("portfolio" in name or "blog" in name or "who-we-are" in name or "about-4" in name) else "2024/10"
    return f"/wp-content/uploads/{year}/{name}"

def build_service_detail_content(data):
    highlights = "\n".join(
        f'<div class="gasco-svcd-highlight"><h4>{title}</h4><p>{desc}</p></div>'
        for title, desc in data["highlights"])
    why = "\n".join(
        f'<div class="gasco-svcd-highlight"><h4>{title}</h4><p>{desc}</p></div>'
        for title, desc in WHY_PARTNER)
    gallery = "\n".join(
        f'<img src="{_gallery_src(g)}" alt="{data["title"]} &#8212; project photo" loading="lazy">'
        for g in data["gallery"])
    if data["projects"]:
        rows = "\n".join(
            f'<tr><td>{name}</td><td>{client}</td></tr>' for name, client in data["projects"])
        projects_html = f"""<div class="gasco-svcd-section">
    <h2 class="elementor-heading-title elementor-size-default">Related Projects</h2>
    <table class="gasco-svcd-table">
      <thead><tr><th>Project</th><th>Client / Location</th></tr></thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  </div>"""
    else:
        projects_html = ""
    others = [c for c in SERVICES_CARDS if c[1] != data["title"]][:3]
    explore = "\n".join(
        f'<a class="gasco-svcd-explore-card" href="{href}"><img src="{img}" alt="{title}" loading="lazy"><span>{title}</span></a>'
        for img, title, _desc, href in others)
    return f"""
<style>
.gasco-svcd-hero{{max-width:1340px;margin:0 auto;padding:10px 20px 0;position:relative;}}
.gasco-svcd-hero img{{width:100%;height:460px;object-fit:cover;border-radius:6px;display:block;}}
.gasco-svcd-hero-cta{{position:absolute;left:40px;bottom:26px;}}
.gasco-svcd-section{{max-width:1340px;margin:0 auto;padding:28px 20px;}}
.gasco-svcd-section-first{{padding-top:22px;}}
.gasco-svcd-section > p{{opacity:.75;line-height:1.6;max-width:820px;}}
.gasco-svcd-highlights{{display:grid;grid-template-columns:repeat(2,1fr);gap:16px 32px;margin-top:22px;}}
.gasco-svcd-highlight{{border-left:3px solid #FFBF43;padding:4px 0 4px 18px;}}
.gasco-svcd-highlight h4{{margin:0 0 6px;font-size:17px;}}
.gasco-svcd-highlight p{{margin:0;opacity:.75;line-height:1.55;font-size:14.5px;}}
.gasco-svcd-highlight a{{color:#FFBF43;text-decoration:underline;}}
.gasco-svcd-table{{width:100%;border-collapse:collapse;margin-top:20px;box-shadow:0 4px 18px rgba(0,0,0,.06);}}
.gasco-svcd-table th{{background:#FFBF43;color:#222;text-align:left;padding:14px 20px;font-weight:600;}}
.gasco-svcd-table td{{padding:14px 20px;border-bottom:1px solid #E5E2D8;opacity:.8;}}
.gasco-svcd-table tbody tr:nth-child(even){{background:#FAF8F1;}}
.gasco-svcd-gallery{{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:20px;}}
.gasco-svcd-gallery img{{width:100%;height:180px;object-fit:cover;border-radius:4px;}}
.gasco-svcd-explore{{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:20px;}}
.gasco-svcd-explore-card{{position:relative;display:block;height:170px;border-radius:6px;overflow:hidden;text-decoration:none;}}
.gasco-svcd-explore-card img{{width:100%;height:100%;object-fit:cover;display:block;transition:.3s;}}
.gasco-svcd-explore-card:hover img{{transform:scale(1.06);}}
.gasco-svcd-explore-card span{{position:absolute;left:0;right:0;bottom:0;padding:14px 16px;background:linear-gradient(transparent,rgba(0,0,0,.75));color:#fff;font-weight:600;font-size:15px;}}
@media(max-width:900px){{.gasco-svcd-highlights,.gasco-svcd-gallery,.gasco-svcd-explore{{grid-template-columns:repeat(2,1fr);}}}}
@media(max-width:600px){{.gasco-svcd-highlights,.gasco-svcd-gallery,.gasco-svcd-explore{{grid-template-columns:1fr;}}.gasco-svcd-hero img{{height:240px;}}.gasco-svcd-hero-cta{{left:20px;bottom:16px;}}}}
</style>
<div class="gasco-svcd-hero">
  <img src="{data['img']}" alt="{data['title']}" loading="lazy">
  <div class="gasco-svcd-hero-cta">
    <div class="elementor-element elementor-element-c18debc elementor-widget elementor-widget-flexitype-creative-button" data-id="c18debc" data-element_type="widget" data-e-type="widget" data-widget_type="flexitype-creative-button.default">
      <div class="elementor-widget-container">
        <div class="flexitype-btn">
          <a class="flexitype-btn-wrapper button-isi  right" href="/projects/" data-text="View Projects">
            <span>View Projects</span>
            <i class="flaticon flaticon-right-up"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="gasco-svcd-section gasco-svcd-section-first">
  <h2 class="elementor-heading-title elementor-size-default">What We Deliver</h2>
  <p>{data['deliver']}</p>
  <div class="gasco-svcd-highlights">
{highlights}
  </div>
</div>
<div class="gasco-svcd-section">
  <h2 class="elementor-heading-title elementor-size-default">Why Partner With GASCO</h2>
  <div class="gasco-svcd-highlights">
{why}
  </div>
</div>
{projects_html}
<div class="gasco-svcd-section">
  <h2 class="elementor-heading-title elementor-size-default">Project Images</h2>
  <div class="gasco-svcd-gallery">
{gallery}
  </div>
</div>
<div class="gasco-svcd-section">
  <h2 class="elementor-heading-title elementor-size-default">Explore More Solutions</h2>
  <div class="gasco-svcd-explore">
{explore}
  </div>
</div>
"""

def build_service_detail_page(slug):
    data = SERVICE_DETAILS[slug]
    out_dir = os.path.join(ROOT, slug)
    os.makedirs(out_dir, exist_ok=True)
    src = open(os.path.join(ROOT, "services", "body.html"), encoding="utf-8").read()
    nav_header = fix_header_logo(_extract_nav_header(src))
    footer = src[src.index("<footer"):]
    crumb_ul = ('<ul><li class="home item"><a href="/">Home</a></li>'
                '<li class="separator">/</li>'
                '<li class="item"><a href="/services/">Services</a></li>'
                '<li class="separator">/</li>'
                f'<li class="current item">{data["title"]}</li></ul>')
    compact_header = build_compact_header(slug, data["title"], crumb_ul)
    body = nav_header + compact_header + build_service_detail_content(data) + footer
    open(os.path.join(out_dir, "body.html"), "w", encoding="utf-8").write(body)

    meta = json.loads(open(os.path.join(ROOT, "services", "page.json"), encoding="utf-8").read())
    plain_title = re.sub(r"&amp;", "&", data["title"])
    meta["title"] = f"{plain_title} &#8211; GASCO"
    open(os.path.join(out_dir, "page.json"), "w", encoding="utf-8").write(
        json.dumps(meta, ensure_ascii=False, indent=2))
    print("built service detail page:", slug)

# ---- Compact page header (replaces the big photo breadcrumb banner site-wide).
# Every non-home page used the same wrapping section (id 53ac921) for a
# full-bleed photo + big white title + breadcrumb; client asked for it gone
# everywhere in favour of a small breadcrumb line + heading + a real 2-line
# description of that page. Reuses each page's own already-correct breadcrumb
# <ul> (built earlier by replace_menus/build_service_detail_page etc.) rather
# than regenerating it, so Home/Services/X nesting stays exactly right.
PAGE_DESCRIPTIONS = {
    "about-us": "Learn about GASCO Engineering (Pvt.) Ltd. &#8212; our history, leadership and the values that guide every project we deliver.",
    "services": "Explore GASCO's six core divisions, from engineering &amp; consultancy to outsource warehousing, serving Pakistan's oil &amp; gas sector.",
    "contact-us": "Get in touch with GASCO Engineering for your next Oil &amp; Gas project &#8212; our team is ready to help.",
    "projects": "A selection of GASCO's flagship Oil &amp; Gas projects across Pakistan, from pipeline construction to compressor stations.",
    "our-team": "Meet the leadership team driving GASCO Engineering's projects across Pakistan's Oil &amp; Gas sector.",
    "accreditation": "GASCO Engineering holds ISO 9001, ISO 14001 and ISO 45001 certification, and is licensed by the Pakistan Engineering Council.",
}
COMPACT_HEADER_MARKER = "gasco-page-header"

def fix_header_logo(header_html):
    # the header logo image (gepl-white.png) has a white "GASCO ENGINEERING"
    # wordmark baked into the pixels, meant to read against a dark hero photo
    # - on a white background it's just barely-visible anti-aliased edges.
    # Only the first 2 occurrences are the main-nav and mobile-popup logo;
    # the 3rd is inside the offcanvas sidebar, which has its own dark
    # background (#222) regardless of page, so it correctly stays white.
    # Guarded so calling this twice (e.g. once already-baked into the
    # services page this was copied from) doesn't eat into that 3rd one.
    if "/gasco/gepl-black.png" in header_html:
        return header_html
    return header_html.replace("/gasco/gepl-white.png", "/gasco/gepl-black.png", 2)

def build_compact_header(slug, title, crumb_ul):
    # service-detail pages already have their own rich hero (h1 + intro +
    # photo + button) right below - just the breadcrumb line, no duplicate
    # title/description here. Every other page gets the full compact header.
    has_own_hero = slug in SERVICE_DETAILS
    desc = PAGE_DESCRIPTIONS.get(slug) or SERVICE_DETAILS.get(slug, {}).get("intro", "")
    title_html = "" if has_own_hero else f'<h1 class="elementor-heading-title elementor-size-default">{title}</h1>\n  <p>{desc}</p>\n  '
    return f"""
<style>
/* the header was designed to float over a dark hero photo (white nav text,
   transparent background) - every page that photo just got removed from
   needs that text switched to a dark color or it's invisible on white */
.custom-header-builder .header_mega-menu ul li.menu-item > .menu-link,
.custom-header-builder .header_mega-menu ul li.menu-item > .menu-link::before,
.custom-header-builder .flexitype-search-icon i,
.custom-header-builder .flexitype-offcanvas-popup-icon i {{color:#1A1A1A !important;}}
.custom-header-builder .header_mega-menu ul li.menu-item:hover > .menu-link {{color:#FFBF43 !important;}}
/* the header floats via position:absolute (no longer over a tall hero photo
   that used to push content below it) - without this, our content starts at
   the very top of the page and the ~100px-tall floating nav bar overlaps it */
.gasco-page-header{{max-width:1340px;margin:0 auto;padding:{'130px' if has_own_hero else '146px'} 20px 8px;}}
.gasco-page-header .meta ul{{list-style:none;display:flex;gap:6px;padding:0;margin:0 0 10px;font-size:13px;opacity:.6;}}
.gasco-page-header .meta ul li.separator{{opacity:.5;}}
.gasco-page-header .meta ul a{{color:inherit;text-decoration:none;}}
.gasco-page-header .meta ul .current{{color:#FFBF43;}}
.gasco-page-header h1{{margin:0 0 10px;}}
.gasco-page-header p{{max-width:640px;opacity:.75;line-height:1.55;margin:0;}}
</style>
<div class="gasco-page-header">
  <div class="meta">{crumb_ul}</div>
  {title_html}</div>
"""

def strip_breadcrumb_banner(s, slug):
    start = s.find('<section class="elementor-section elementor-top-section elementor-element elementor-element-53ac921')
    if start < 0 or COMPACT_HEADER_MARKER in s:
        return s
    end_tag = "</section>"
    depth, i = 0, start
    for m in re.finditer(r'<section\b|</section>', s[start:]):
        if m.group(0) == end_tag:
            depth -= 1
            if depth == 0:
                i = start + m.end()
                break
        else:
            depth += 1
    banner = s[start:i]
    title_m = re.search(r'<h2 class="breadcrumb-title">(.*?)</h2>', banner, re.S)
    ul_m = re.search(r"(<ul>.*?</ul>)", banner, re.S)
    title = title_m.group(1) if title_m else slug.replace("-", " ").title()
    crumb_ul = ul_m.group(1) if ul_m else ""
    header = build_compact_header(slug, title, crumb_ul)
    return fix_header_logo(s[:start]) + header + s[i:]

def _remove_div_block(s, anchor):
    start = s.find(anchor)
    if start < 0:
        return s
    depth, i = 0, start
    for m in re.finditer(r'<div\b|</div>', s[start:]):
        if m.group(0) == '</div>':
            depth -= 1
            if depth == 0:
                i = start + m.end()
                break
        else:
            depth += 1
    return s[:start] + s[i:]

OFFCANVAS_WIDGET_ANCHOR = '<div class="elementor-element elementor-element-90c974a'

def remove_offcanvas_widget(s):
    # the small amber circular "4-square grid" icon in the header opens a
    # slide-out sidebar panel (duplicate logo/contact/social info) - client
    # called it unnecessary. Removes the icon AND its hidden panel content
    # together (balanced-tag scan), since without the trigger the panel is
    # unreachable dead weight anyway.
    return _remove_div_block(s, OFFCANVAS_WIDGET_ANCHOR)

VIDEO_WIDGET_ANCHOR = '<div class="elementor-element elementor-element-66fb8bf'

def remove_video_widget(s):
    # About Us had a YouTube play-button overlay (no real video configured -
    # just a template placeholder link) sitting on top of the hero photo.
    # Client asked for the play button + YouTube link gone, image unchanged -
    # this widget is just the button overlay, the photo itself lives in the
    # surrounding section's own background, untouched by removing this.
    return _remove_div_block(s, VIDEO_WIDGET_ANCHOR)

# Every other page (about-us, services, contact-us, projects, our-team,
# accreditation, 6 service details) still uses the old banner format at the
# point build_accreditation_page()/build_service_detail_page() copy their
# header from services/body.html - they must run BEFORE this, so the header
# they copy is still the full pre-strip version. Run this last, once, over
# every page on disk.
ALL_COMPACT_SLUGS = ["about-us", "services", "contact-us", "projects", "our-team",
                      "accreditation"] + list(SERVICE_DETAILS.keys())

def strip_all_banners():
    for slug in ALL_COMPACT_SLUGS:
        fp = os.path.join(ROOT, slug, "body.html")
        s = open(fp, encoding="utf-8").read()
        new_s = strip_breadcrumb_banner(s, slug)
        if new_s != s:
            open(fp, "w", encoding="utf-8").write(new_s)
            print("stripped banner:", slug)

if __name__ == "__main__":
    import sys
    for slug in (sys.argv[1:] or ["home-04"]):
        process(slug)
