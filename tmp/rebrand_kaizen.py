import os
import glob
import re

content_dir = r"c:\Users\Administrator\.gemini\antigravity\scratch\18 - Gasco Website\content"

replacements = [
    ("GASCO Engineering (Pvt) Limited", "Kaizen HSE Advisory (Pvt) Limited"),
    ("GASCO Engineering", "Kaizen Advisory"),
    ("GASCO HSE Advisory", "Kaizen HSE Advisory"),
    ("GASCO Advisory", "Kaizen Advisory"),
    ("GASCO", "Kaizen"),
    ("Gasco", "Kaizen"),
    ("info@gascoengineering.com.pk", "info@kaizen-hse.com"),
]

modified_count = 0

for root, dirs, files in os.walk(content_dir):
    for f in files:
        if f.endswith(".json") or f.endswith(".html"):
            file_path = os.path.join(root, f)
            with open(file_path, "r", encoding="utf-8") as file:
                content = file.read()
            
            new_content = content
            for old_str, new_str in replacements:
                new_content = new_content.replace(old_str, new_str)
            
            if new_content != content:
                with open(file_path, "w", encoding="utf-8") as file:
                    file.write(new_content)
                modified_count += 1
                print(f"Updated: {file_path}")

print(f"Total files updated: {modified_count}")
