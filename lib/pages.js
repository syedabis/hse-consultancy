import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

export const ROUTES = JSON.parse(
  fs.readFileSync(path.join(ROOT, "content", "routes.json"), "utf8")
);

export function slugForPath(p) {
  if (!p) return ROUTES["/"];
  let n = p;
  if (!n.endsWith("/")) n += "/";
  return ROUTES[n] || ROUTES[p] || null;
}

export function loadPage(slug) {
  const dir = path.join(ROOT, "content", slug);
  const meta = JSON.parse(fs.readFileSync(path.join(dir, "page.json"), "utf8"));
  const body = fs.readFileSync(path.join(dir, "body.html"), "utf8");
  return { meta, body };
}

function esc(s) {
  return String(s || "").replace(/"/g, "&quot;");
}

// Build the exact head markup (stylesheets + inline styles + preloads + icon)
// in original order so the CSS cascade matches the source 1:1.
export function headHtml(assets) {
  return (assets || [])
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
