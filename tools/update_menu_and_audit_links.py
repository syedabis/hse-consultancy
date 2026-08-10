import os
import glob
import json
import re
import urllib.parse

content_dir = r"c:\Users\Administrator\.gemini\antigravity\scratch\18 - Gasco Website\content"
html_files = glob.glob(os.path.join(content_dir, "**", "*.html"), recursive=True)

# Step 1: Menu update
target_menu_end = '<li class="menu-item menu-item-type-post_type menu-item-object-page"><a href="/our-team/" class="menu-link">Our Team</a></li>'
contact_us_item = '<li class="menu-item menu-item-type-post_type menu-item-object-page"><a href="/contact-us/" class="menu-link">Contact Us</a></li>'
new_menu_end = target_menu_end + contact_us_item

updated_count = 0
for fpath in html_files:
    with open(fpath, "r", encoding="utf-8") as f:
        code = f.read()
    if 'href="/contact-us/" class="menu-link"' not in code and target_menu_end in code:
        code = code.replace(target_menu_end, new_menu_end)
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(code)
        updated_count += 1

print(f"[Menu Update] Added 'Contact Us' to navigation menu in {updated_count} files.")

# Step 2: Audit all links
routes_path = os.path.join(content_dir, "routes.json")
with open(routes_path, "r", encoding="utf-8") as f:
    routes = json.load(f)

valid_routes = set(routes.keys())
all_valid_routes = set()
for r in valid_routes:
    all_valid_routes.add(r)
    unquoted = urllib.parse.unquote(r)
    all_valid_routes.add(unquoted)
    if r.endswith("/"):
        all_valid_routes.add(r[:-1])
        all_valid_routes.add(unquoted[:-1])
    else:
        all_valid_routes.add(r + "/")
        all_valid_routes.add(unquoted + "/")

public_dir = r"c:\Users\Administrator\.gemini\antigravity\scratch\18 - Gasco Website\public"

broken_links = []
audited_links_count = 0

href_pattern = re.compile(r'href=["\']([^"\']+)["\']', re.IGNORECASE)
src_pattern = re.compile(r'src=["\']([^"\']+)["\']', re.IGNORECASE)

for fpath in html_files:
    rel_path = os.path.relpath(fpath, content_dir)
    
    with open(fpath, "r", encoding="utf-8") as f:
        code = f.read()
    
    # Extract hrefs
    hrefs = href_pattern.findall(code)
    for href in hrefs:
        href_clean = href.strip()
        if not href_clean or href_clean.startswith("#") or href_clean.startswith("mailto:") or href_clean.startswith("tel:") or href_clean.startswith("javascript:"):
            continue
        if href_clean.startswith("http://") or href_clean.startswith("https://"):
            if not ("localhost" in href_clean or "gasco" in href_clean or "gascoengineering" in href_clean):
                continue
        
        audited_links_count += 1
        path_only = href_clean.split("#")[0].split("?")[0]
        if not path_only:
            continue
            
        if path_only.startswith("/"):
            unquoted_path = urllib.parse.unquote(path_only)
            # Check static file in /public/
            local_static_path = os.path.join(public_dir, unquoted_path.lstrip("/\\"))
            if os.path.exists(local_static_path) or os.path.isfile(local_static_path):
                continue
            
            # Check route in Next.js app
            if path_only not in all_valid_routes and unquoted_path not in all_valid_routes:
                broken_links.append({
                    "source_file": rel_path,
                    "type": "Internal Page / Link",
                    "url": href_clean,
                    "reason": "Route / Destination not found in website routes"
                })

    # Extract srcs (images, videos, scripts)
    srcs = src_pattern.findall(code)
    for src in srcs:
        src_clean = src.strip()
        if not src_clean or src_clean.startswith("data:") or src_clean.startswith("blob:"):
            continue
            
        if src_clean.startswith("http://") or src_clean.startswith("https://"):
            if not ("localhost" in src_clean or "127.0.0.1" in src_clean):
                continue
                
        audited_links_count += 1
        path_only = src_clean.split("?")[0]
        if path_only.startswith("/"):
            unquoted_path = urllib.parse.unquote(path_only)
            local_static_path = os.path.join(public_dir, unquoted_path.lstrip("/\\"))
            if not os.path.exists(local_static_path):
                broken_links.append({
                    "source_file": rel_path,
                    "type": "Asset / Image",
                    "url": src_clean,
                    "reason": f"File not found in /public{unquoted_path}"
                })

print("\n" + "="*80)
print(f"LINK AUDIT COMPLETE - Total links audited: {audited_links_count}")
print(f"Total Broken / Missing Links Found: {len(broken_links)}")
print("="*80)

if broken_links:
    unique_broken = {}
    for item in broken_links:
        key = (item["url"], item["reason"])
        if key not in unique_broken:
            unique_broken[key] = []
        unique_broken[key].append(item["source_file"])
            
    print("\n--- Summary of Broken Links ---")
    for (url, reason), src_files in unique_broken.items():
        print(f"URL: {url}")
        print(f"Reason: {reason}")
        print(f"Found in {len(src_files)} file(s): {', '.join(set(src_files))}\n")
