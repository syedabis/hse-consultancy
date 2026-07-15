#!/usr/bin/env python3
"""Apply the GASCO identity swap over the extracted content.

Safe by design: only the camelCase brand text "BuildGo" (visible copy/titles)
and the two logo image paths are changed. Lowercase asset paths that contain
"buildgo" (e.g. /wp-content/themes/buildgo/...) are left untouched.

Re-run after re-extracting a page. Idempotent.
"""
import glob, json, os

ROOT = os.path.join(os.path.dirname(__file__), "..", "content")

LOGO_MAP = {
    "/wp-content/uploads/2024/09/logo-2.png": "/gasco/gepl-white.png",  # header + mobile
    "/wp-content/uploads/2024/10/logo-3.png": "/gasco/gepl-white.png",  # footer
}

FAVICON_MAP = {
    "/wp-content/uploads/2024/09/favicon.png": "/gasco/favicon.png",
}

# browser-tab <title> per page - the demo theme's page NAMES (not just the
# "BuildGo" brand suffix) leaked into the tab title (e.g. "Home 04 - GASCO",
# "Team Style 1 - GASCO", "Portfolio 4 Columns - GASCO"); override explicitly
# per slug instead of relying on the generic BuildGo->GASCO text swap below.
TITLE_MAP = {
    "home-04": "Home &#8211; GASCO",
    "projects": "Flagship Projects &#8211; GASCO",
    "our-team": "Our Team &#8211; GASCO",
}

def run():
    for f in glob.glob(os.path.join(ROOT, "*", "body.html")):
        s = open(f, encoding="utf-8").read()
        orig = s
        for a, b in LOGO_MAP.items():
            s = s.replace(a, b)
        s = s.replace("BuildGo", "GASCO")        # visible brand text (case-sensitive)
        s = s.replace(">ThemeOri<", ">GASCO<")   # footer attribution
        if s != orig:
            open(f, "w", encoding="utf-8").write(s)
            print("body ", os.path.basename(os.path.dirname(f)))
    # page.json: raw replace of the camelCase brand name (title + inline schema
    # data). Asset paths use lowercase "buildgo" so they are unaffected.
    for f in glob.glob(os.path.join(ROOT, "*", "page.json")):
        slug = os.path.basename(os.path.dirname(f))
        s = open(f, encoding="utf-8").read()
        orig = s
        if "BuildGo" in s:
            s = s.replace("BuildGo", "GASCO")
        for a, b in FAVICON_MAP.items():
            s = s.replace(a, b)
        if slug in TITLE_MAP:
            data = json.loads(s)
            data["title"] = TITLE_MAP[slug]
            s = json.dumps(data, ensure_ascii=False, indent=2)
        if s != orig:
            open(f, "w", encoding="utf-8").write(s)
            print("json ", slug)

if __name__ == "__main__":
    run()
    print("rebrand done")
