import re

slugs = [
    'engineering-consultancy',
    'pipeline-construction',
    'rental-compression-production',
    'outsource-warehousing',
    'operations-maintenance'
]

for s in slugs:
    with open(f"content/{s}/body.html", "r", encoding="utf-8") as f:
        html = f.read()

    badge_match = re.search(r'<h6 class="elementor-heading-title elementor-size-default">(.*?)</h6>', html)
    h2_1_match = re.search(r'<h2 class="elementor-heading-title elementor-size-default">(.*?)</h2>', html)

    badge = badge_match.group(1) if badge_match else "N/A"
    h2_1 = h2_1_match.group(1) if h2_1_match else "N/A"

    print(f"[{s}] -> Sub-badge: {badge} | Hero Line 1: {h2_1}")
