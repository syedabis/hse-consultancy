import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

export function getRoutes() {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, "content", "routes.json"), "utf8"));
  } catch (e) {
    return {};
  }
}

export function slugForPath(p) {
  const routes = getRoutes();
  if (!p) return routes["/"];
  let n = p;
  if (!n.endsWith("/")) n += "/";
  return routes[n] || routes[p] || null;
}

export function stripLegacyHeaderFooter(body) {
  let content = body;

  // 1. Remove preloader
  content = content.replace(/<!--\s*Preloader Start\s*-->[\s\S]*?<!--\s*Preloader End\s*-->/gi, "");
  content = content.replace(/<div class="theme-loader">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, "");

  // 2. Strip Header (including previous commented headers)
  let headerStart = content.indexOf("<!-- PREVIOUS HEADER");
  if (headerStart === -1) {
    headerStart = content.indexOf("<div class=\"custom-header-builder");
  }
  const idx1275 = content.indexOf("data-elementor-id=\"1275\"");
  if (headerStart !== -1 && idx1275 !== -1) {
    const endHeader = content.indexOf("</header>", idx1275);
    if (endHeader !== -1) {
      const endDiv = content.indexOf("</div>", endHeader) + 6;
      content = content.substring(0, headerStart) + content.substring(endDiv);
    }
  }

  // 3. Strip Footer
  const footerStart = content.indexOf("<footer");
  const footerEndIdx = content.indexOf("</footer>");
  if (footerStart !== -1 && footerEndIdx !== -1) {
    content = content.substring(0, footerStart) + content.substring(footerEndIdx + 9);
  }

  // 4. Strip Scroll Up Btn & outer page wrappers if present
  content = content.replace(/<div class="scroll-up[\s\S]*?<\/div>\s*<\/div>/gi, "");
  content = content.replace(/<div id="page"[^>]*>/gi, "");
  content = content.replace(/<\/div>\s*<!--\s*#page\s*-->/gi, "");

  return content;
}

export function loadPage(slug) {
  const dir = path.join(ROOT, "content", slug);
  const meta = JSON.parse(fs.readFileSync(path.join(dir, "page.json"), "utf8"));
  const rawBody = fs.readFileSync(path.join(dir, "body.html"), "utf8");
  const body = stripLegacyHeaderFooter(rawBody);
  return { meta, body };
}

function esc(s) {
  return String(s || "").replace(/"/g, "&quot;");
}

// Build the exact head markup (stylesheets + inline styles + preloads + icon)
// in original order so the CSS cascade matches the source 1:1.
export function headHtml(assets) {
  const list = assets || [];
  const has1275 = list.some((a) => a.href && a.href.includes("post-1275.css"));
  const allAssets = has1275
    ? list
    : [
        ...list,
        {
          type: "css",
          href: "/wp-content/uploads/elementor/css/post-1275.css?ver=1782478613",
        },
      ];

  return allAssets
    .map((a) => {
      if (a.type === "css") return `<link rel="stylesheet" href="${esc(a.href)}">`;
      if (a.type === "style")
        return `<style${a.id ? ` id="${esc(a.id)}"` : ""}>${a.css}</style>`;
      if (a.type === "preload")
        return `<link rel="preload" href="${esc(a.href)}" as="${esc(a.as)}"${
          a.mime ? ` type="${esc(a.mime)}"` : ""
        }${a.crossorigin ? ` crossorigin="${esc(a.crossorigin)}"` : ""}>`;
      if (a.type === "icon")
        return `<link rel="icon" href="${esc(a.href)}"${
          a.sizes ? ` sizes="${esc(a.sizes)}"` : ""
        }>`;
      return "";
    })
    .join("\n");
}
