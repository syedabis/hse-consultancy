#!/usr/bin/env python3
"""Static mirror of buildgo.nextwpcook.com -> local folder, path-preserving.

Rewrites same-host absolute URLs to root-relative (/...) so the mirror works
when served by any static server rooted at OUT. Recursively pulls assets that
CSS files reference (fonts, background images).
"""
import os, re, sys, time, urllib.request, urllib.error
from urllib.parse import urljoin, urlparse

BASE = "https://buildgo.nextwpcook.com"
HOST = "buildgo.nextwpcook.com"
OUT  = "d:/Ahmer/gasco-website"
ASSET_ROOT = OUT + "/public"   # assets served by Next from public/
PAGE_ROOT  = OUT + "/_mirror"  # raw page HTML kept as source
UA   = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"

# Pages to mirror as HTML documents (path -> saved as <path>/index.html)
PAGES = [p.strip() for p in sys.argv[1:]] or ["/home-04/"]

ASSET_EXT = (".css",".js",".png",".jpg",".jpeg",".webp",".gif",".svg",
             ".woff",".woff2",".ttf",".eot",".ico",".mp4",".json",".xml",".cur",".avif")

fetched_assets = set()
failed = []

def get(url, binary=True, tries=3):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Referer": BASE})
    last = None
    for i in range(tries):
        try:
            with urllib.request.urlopen(req, timeout=45) as r:
                return r.read()
        except Exception as e:
            last = e; time.sleep(1.2*(i+1))
    raise last

def asset_path(url):
    p = urlparse(url)
    return os.path.join(ASSET_ROOT, p.path.lstrip("/").replace("/", os.sep))

def page_path(url):
    p = urlparse(url)
    path = p.path
    if path == "" or path.endswith("/"):
        path = path + "index.html"
    return os.path.join(PAGE_ROOT, path.lstrip("/").replace("/", os.sep))

def ensure_dir(fp):
    os.makedirs(os.path.dirname(fp), exist_ok=True)

def is_asset_url(u):
    pu = urlparse(u)
    if pu.netloc and pu.netloc != HOST:
        return False
    path = pu.path.lower()
    return path.endswith(ASSET_EXT)

def normalize(u, base=BASE):
    """Return absolute same-host url or None if external/non-http."""
    if u.startswith("//"):
        u = "https:" + u
    if u.startswith("/"):
        u = BASE + u
    u = urljoin(base, u)
    pu = urlparse(u)
    if pu.scheme not in ("http","https"):
        return None
    return u

def rewrite_host(text):
    """Same-host absolute -> root-relative."""
    text = text.replace("https://"+HOST, "").replace("http://"+HOST, "")
    text = text.replace("//"+HOST, "")
    return text

CSS_URL_RE = re.compile(r"url\(\s*['\"]?([^'\")]+?)['\"]?\s*\)", re.I)
CSS_IMPORT_RE = re.compile(r"@import\s+['\"]([^'\"]+)['\"]", re.I)

def process_css(css_url, raw):
    """Download url()/@import targets on same host; rewrite css to root-relative."""
    try:
        text = raw.decode("utf-8", "replace")
    except Exception:
        return raw
    targets = set(CSS_URL_RE.findall(text)) | set(CSS_IMPORT_RE.findall(text))
    for t in targets:
        t = t.strip()
        if t.startswith("data:") or t == "":
            continue
        au = normalize(t, base=css_url)
        if au and urlparse(au).netloc == HOST and is_asset_url(au):
            download_asset(au)
    return rewrite_host(text).encode("utf-8")

def download_asset(url):
    if url in fetched_assets:
        return
    fetched_assets.add(url)
    if urlparse(url).netloc != HOST:
        return
    fp = asset_path(url)
    if os.path.exists(fp):        # already mirrored in a previous run
        return
    try:
        data = get(url)
    except Exception as e:
        failed.append((url, str(e))); print("  FAIL", url, e); return
    if url.lower().split("?")[0].endswith(".css"):
        data = process_css(url, data)
    ensure_dir(fp)
    with open(fp, "wb") as f:
        f.write(data)
    print("  asset", urlparse(url).path)

# collect same-host asset urls from an HTML string
ASSET_IN_HTML_RE = re.compile(r"(?:https?:)?//"+re.escape(HOST)+r"/[^\s\"'\)<>]+", re.I)

def mirror_page(route):
    url = BASE + route
    print("PAGE", url)
    html = get(url).decode("utf-8","replace")
    # find same-host asset urls (css/js/img/font). ignore page links (end with /)
    for m in set(ASSET_IN_HTML_RE.findall(html)):
        cu = m.rstrip('\\')
        au = normalize(cu)
        if au and is_asset_url(au):
            download_asset(au)
    # also root-relative asset refs like /wp-content/... (no host)
    for m in set(re.findall(r"[\"'(]\s*(/wp-(?:content|includes)/[^\s\"'\)<>]+)", html)):
        au = normalize(m)
        if au and is_asset_url(au):
            download_asset(au)
    # rewrite + save
    out_html = rewrite_host(html)
    fp = page_path(url)
    ensure_dir(fp)
    with open(fp, "wb") as f:
        f.write(out_html.encode("utf-8"))
    print("SAVED", fp)

if __name__ == "__main__":
    for pg in PAGES:
        if not pg.startswith("/"): pg = "/"+pg
        if not pg.endswith("/"): pg = pg+"/"
        mirror_page(pg)
    print("\nAssets fetched:", len(fetched_assets), "| failures:", len(failed))
    for u,e in failed[:40]:
        print("  x", u, e)
