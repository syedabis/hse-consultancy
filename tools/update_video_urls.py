import os
import glob
import re

content_dir = "content"
html_files = glob.glob(os.path.join(content_dir, "**", "*.html"), recursive=True)

updated_count = 0
for fpath in html_files:
    with open(fpath, "r", encoding="utf-8") as f:
        code = f.read()
    
    if "<video" in code:
        # Match background_video_link or video src attributes
        new_code = re.sub(r'background_video_link&quot;:&quot;[^&]+&quot;', r'background_video_link&quot;:&quot;/banner.mp4&quot;', code)
        new_code = re.sub(r'src=["\']https?://[^"\']+\.mp4["\']', r'src="/banner.mp4"', new_code)
        
        if new_code != code:
            with open(fpath, "w", encoding="utf-8") as f:
                f.write(new_code)
            updated_count += 1

print(f"[Video Update] Updated video background URLs in {updated_count} files.")
