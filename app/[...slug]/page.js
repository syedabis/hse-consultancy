import { notFound } from "next/navigation";
import { slugForPath, loadPage } from "../../lib/pages";
import RawContent from "../../components/RawContent";

// Catch-all route: maps the requested URL to a mirrored page via routes.json.
export default async function CatchAll({ params }) {
  const { slug = [] } = await params;
  const path = "/" + slug.join("/") + "/";
  const s = slugForPath(path);
  if (!s) notFound();
  const { meta, body } = loadPage(s);
  return <RawContent html={body} scripts={meta.scripts} />;
}
