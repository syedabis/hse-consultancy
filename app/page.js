import { loadPage } from "../lib/pages";
import RawContent from "../components/RawContent";

export default function HomePage() {
  const { meta, body } = loadPage("home-04");
  return <RawContent html={body} scripts={meta.scripts} />;
}
