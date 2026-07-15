#!/usr/bin/env python3
"""Split a mirrored WordPress page into Next.js-consumable parts.

Input : _mirror/<slug>/index.html
Output: content/<slug>/body.html  (body inner, scripts removed)
        content/<slug>/page.json  (lang,title,bodyClass,headAssets[],scripts[])

headAssets preserves the exact head order (css links / inline styles / preloads /
icon) so the CSS cascade is identical. scripts[] is the full document-order list
of <script> (external {src} or inline {code}) to replay after the DOM mounts.
"""
import sys, os, re, json

ROOT = "d:/Ahmer/gasco-website"

def attrs_of(s):
    return {k.lower(): v for k, v in re.findall(r'([\w:-]+)\s*=\s*"([^"]*)"', s)} | \
           {k.lower(): v for k, v in re.findall(r"([\w:-]+)\s*=\s*'([^']*)'", s)}

SCRIPT_RE = re.compile(r'<script\b([^>]*)>(.*?)</script>', re.I | re.S)
STYLE_RE  = re.compile(r'<style\b([^>]*)>(.*?)</style>', re.I | re.S)
HEAD_ITEM_RE = re.compile(r'(<link\b[^>]*?>)|(<style\b[^>]*>.*?</style>)', re.I | re.S)

def scripts_from(fragment):
    out = []
    for m in SCRIPT_RE.finditer(fragment):
        a = attrs_of(m.group(1))
        item = {}
        if a.get("src"):
            item["src"] = a["src"]
        else:
            code = m.group(2).strip()
            if not code:
                continue
            item["code"] = code
        # preserve type/id so non-JS blocks (application/json, ld+json,
        # speculationrules, module) stay inert data instead of being run as JS
        if a.get("type"):
            item["type"] = a["type"]
        if a.get("id"):
            item["id"] = a["id"]
        out.append(item)
    return out

def strip_scripts(fragment):
    return SCRIPT_RE.sub("", fragment)

def extract(slug):
    src = os.path.join(ROOT, "_mirror", slug, "index.html")
    html = open(src, encoding="utf-8", errors="replace").read()

    lang = (re.search(r'<html[^>]*\blang="([^"]+)"', html) or [None, "en"])[1]
    title = (re.search(r'<title[^>]*>(.*?)</title>', html, re.S) or [None, slug])[1].strip()

    bodym = re.search(r'<body\b([^>]*)>(.*)</body>', html, re.S)
    body_attrs = attrs_of(bodym.group(1))
    body_class = body_attrs.get("class", "")
    body_inner = bodym.group(2)

    headm = re.search(r'<head\b[^>]*>(.*?)</head>', html, re.S)
    head_inner = headm.group(1)

    # scripts in document order: head scripts, then body scripts
    scripts = scripts_from(head_inner) + scripts_from(body_inner)

    # ordered head assets (links + inline styles, interleaved)
    head_assets = []
    for m in HEAD_ITEM_RE.finditer(strip_scripts(head_inner)):
        if m.group(1):  # <link ...>
            a = attrs_of(m.group(1))
            rel = (a.get("rel") or "").lower()
            if "stylesheet" in rel:
                head_assets.append({"type": "css", "href": a.get("href", "")})
            elif "preload" in rel:
                head_assets.append({"type": "preload", "href": a.get("href", ""),
                                     "as": a.get("as", ""), "mime": a.get("type", ""),
                                     "crossorigin": a.get("crossorigin", "")})
            elif "icon" in rel:
                head_assets.append({"type": "icon", "href": a.get("href", ""),
                                     "sizes": a.get("sizes", "")})
        else:            # <style ...>...</style>
            sm = STYLE_RE.search(m.group(0))
            css = sm.group(2).strip()
            a = attrs_of(sm.group(1))
            if css:
                head_assets.append({"type": "style", "css": css, "id": a.get("id", "")})

    body_html = strip_scripts(body_inner).strip()

    outdir = os.path.join(ROOT, "content", slug)
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, "body.html"), "w", encoding="utf-8") as f:
        f.write(body_html)
    with open(os.path.join(outdir, "page.json"), "w", encoding="utf-8") as f:
        json.dump({"slug": slug, "lang": lang, "title": title,
                   "bodyClass": body_class, "headAssets": head_assets,
                   "scripts": scripts}, f, indent=1, ensure_ascii=False)

    ext_css = [a["href"] for a in head_assets if a["type"] == "css" and a["href"].startswith("http")]
    ext_js  = [s["src"] for s in scripts if s.get("src", "").startswith("http")]
    print(f"[{slug}] css={sum(1 for a in head_assets if a['type']=='css')} "
          f"styles={sum(1 for a in head_assets if a['type']=='style')} "
          f"preload={sum(1 for a in head_assets if a['type']=='preload')} "
          f"scripts={len(scripts)} (inline={sum(1 for s in scripts if 'code' in s)}) "
          f"bodyKB={len(body_html)//1024}")
    if ext_css: print("   EXTERNAL css:", ext_css)
    if ext_js:  print("   EXTERNAL js :", ext_js)

if __name__ == "__main__":
    for slug in (sys.argv[1:] or ["home-04"]):
        extract(slug)
