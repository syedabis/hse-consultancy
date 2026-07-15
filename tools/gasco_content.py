#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Map Gasco Engineering (GEPL) content onto the cloned theme.

- Rewrites the demo mega-menu to GASCO's real flat menu (all copies).
- Applies GLOBAL text swaps (footer/contact) to every page.
- Applies per-page copy swaps (Home first).
Replacements are applied longest-key-first so specific phrases win over
generic words (e.g. "Building Architecture" before "Architecture").
Idempotent-ish: safe to re-run after re-extract+normalize+rebrand.
"""
import os, re, glob

ROOT = os.path.join(os.path.dirname(__file__), "..", "content")

# ---- flat GASCO navigation (replaces the demo mega-menu everywhere) ----
NAV = [("Home", "/"), ("About Us", "/about-us/"), ("Services", "/services/"),
       ("Projects", "/projects/"), ("Our Team", "/our-team/"),
       ("Contact Us", "/contact-us/")]
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

def _replace_block(s, start_key, new_html):
    out, i = [], 0
    while True:
        j = s.find(start_key, i)
        if j < 0:
            out.append(s[i:]); break
        out.append(s[i:j])
        depth, k = 0, j
        for m in re.finditer(r'<ul\b|</ul>', s[j:]):
            if m.group(0) == '</ul>':
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
# each word for one of GEPL's 6 business divisions (word text is unique to
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
    "Shaping Future": "Engineering the",
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
    "wpboss": "GEPL",
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
     "GEPL has gained an enviable reputation in the Oil &amp; Gas industry with its efficient service and "
     "excellent post-project follow-up. Founded by Mr. S. H. Hadi Naqvi (Late) — a visionary entrepreneur "
     "whose integrity, foresight and resolve shaped the company's foundation"),
]

# ---- SERVICES page: 6 template cards -> GEPL's 6 business divisions ----
SERVICES = {
    "Construction Planning": "Engineering & Consultancy",
    "Foundation Repair": "Integrated EPC Services",
    "Building Architecture": "Pipeline Construction",
    "House Renovation": "Operations & Maintenance",
    "Interior Design": "Rental Compression & Production",
    "Flooring Installation": "Outsource Warehousing",
}

# ---- PROJECTS page: 8 template portfolio cards -> 8 real GEPL projects.
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

# ---- TEAM page: template people -> GEPL leadership (real names + titles) ----
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
PAGE_RE = {"home-04": HOME_RE, "about-us": ABOUT_RE}

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
    open(fp, "w", encoding="utf-8").write(s)
    print("content mapped:", slug)

if __name__ == "__main__":
    import sys
    for slug in (sys.argv[1:] or ["home-04"]):
        process(slug)
