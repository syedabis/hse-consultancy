import { headers } from "next/headers";
import { slugForPath, loadPage, headHtml } from "../lib/pages";
import "./custom.css";

export async function generateMetadata() {
  const p = (await headers()).get("x-pathname") || "/";
  const slug = slugForPath(p) || slugForPath("/");
  const { meta } = loadPage(slug);
  const title = (meta.title || "Kaizen HSE Advisory")
    .replace(/&#8211;|&#8212;/g, "–")
    .replace(/&amp;/g, "&");
  return { title };
}

export default async function RootLayout({ children }) {
  const p = (await headers()).get("x-pathname") || "/";
  const slug = slugForPath(p) || slugForPath("/");
  const { meta } = loadPage(slug);

  return (
    <html lang={meta.lang || "en"}>
      {/* Exact theme head (CSS links + inline styles + preloads + favicon),
          in order. Must live in the real <head> - browsers only pick up
          <link rel="icon"> (favicon) from here, not from a body-injected div. */}
      <head
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: headHtml(meta.headAssets) }}
      />
      <body className={meta.bodyClass} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
