// Normalize each page's body.html through the browser's HTML parser so the
// stored markup is byte-identical to what the browser produces (idempotent).
// This makes React's SSR string match the hydrated DOM -> no hydration errors,
// while keeping full server-side rendering. body.html has no <script> tags,
// so setContent performs no JS mutation — it's a pure parse/serialize.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const ROOT = "d:/Ahmer/gasco-website/content";
const slugs = process.argv.slice(2);

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  for (const slug of slugs) {
    const fp = path.join(ROOT, slug, "body.html");
    const raw = fs.readFileSync(fp, "utf8");
    await p.setContent(
      `<!DOCTYPE html><html><head></head><body><div id="__wrap">${raw}</div></body></html>`,
      { waitUntil: "domcontentloaded" }
    );
    const norm = await p.$eval("#__wrap", (el) => el.innerHTML);
    fs.writeFileSync(fp, norm, "utf8");
    console.log(`[${slug}] ${raw.length} -> ${norm.length} bytes`);
  }
  await b.close();
})();
