import { notFound } from "next/navigation";
import { PROJECT_DETAILS, getProjectBySlug } from "../../../data/projectDetails";
import DetailHero from "../../../components/detail/DetailHero";
import ClientMarquee from "../../../components/detail/ClientMarquee";
import ShowcaseSection from "../../../components/detail/ShowcaseSection";
import StatsSection from "../../../components/detail/StatsSection";
import MethodologyCarousel from "../../../components/detail/MethodologyCarousel";
import FeaturedProjects from "../../../components/detail/FeaturedProjects";
import "../../../components/detail/detail.css";

export async function generateStaticParams() {
  const params = [];
  for (const proj of Object.values(PROJECT_DETAILS)) {
    if (proj.slugs && Array.isArray(proj.slugs)) {
      for (const s of proj.slugs) {
        params.push({ slug: s });
      }
    }
    if (proj.id && !params.some((p) => p.slug === proj.id)) {
      params.push({ slug: proj.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Case Study - Kazain Ventures" };

  const title = `${project.heroTitlePart1} - Kazain Case Study`.trim();
  return {
    title,
    description: project.showcaseParagraphs?.[0] || "Kazain Engineering Project Case Study",
  };
}

const DEFAULT_RELATED_PROJECTS = [
  {
    tag: "TotalEnergies / Shell",
    title: "Cross-Country High-Pressure Pipeline Safety & Integrity Audit",
    desc: "Multi-disciplinary Safety & Integrity Audit across an 80 KM, 42-inch gas transmission pipeline.",
    image: "/trenching-picture.jpg",
    link: "/projects/High-Pressure Gas Pipeline-high-pressure-pipeline/",
  },
  {
    tag: "BP International / Aramco",
    title: "Wellhead Compression Station ISO Management Framework",
    desc: "Unified ISO 45001 & ISO 14001 certification and noise mitigation framework.",
    image: "/hse/asme_skid_hazop_review%202.jpg",
    link: "/projects/Compression Station-wellhead-booster-compression-package/",
  },
  {
    tag: "SNGPL / Power Consortium",
    title: "Gas Dehydration Plant Fire & Explosion Risk Analysis",
    desc: "Quantitative risk assessment and 3D gas dispersion modeling for high-pressure TEG facility.",
    image: "/hse/gas_processing_fera_simulation%201.jpg",
    link: "/projects/Gas Dehydration Facility-gas-processing-dehydration/",
  },
];

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const related = project.relatedProjects && project.relatedProjects.length > 0
    ? project.relatedProjects
    : DEFAULT_RELATED_PROJECTS;

  return (
    <div className="detail-page-wrapper">
      {/* 1. Video Hero Banner */}
      <DetailHero
        eyebrow={project.eyebrow}
        titlePart1={project.heroTitlePart1}
        titlePart2={project.heroTitlePart2}
        badgeImage={project.badgeImage}
        badgeAlt={project.badgeAlt}
        ctaText={project.heroCtaText}
        ctaLink={project.heroCtaLink}
      />

      {/* 2. Client Logos Marquee */}
      <ClientMarquee title="Project Stakeholders" />

      {/* 3. Showcase Section */}
      <ShowcaseSection
        id="project-details"
        pill={project.showcasePill}
        title={project.showcaseTitle}
        paragraphs={project.showcaseParagraphs}
        image={project.showcaseImage}
        imageAlt={project.showcaseImageAlt}
        ctaText={project.showcaseCtaText}
        ctaLink={project.showcaseCtaLink}
      />

      {/* 4. High-Impact Statement & 4 Big Stats */}
      <StatsSection
        statementHtml={project.statementHtml}
        stats={project.stats}
      />

      {/* 5. Dark Methodology / Framework Section */}
      <MethodologyCarousel
        eyebrow={project.methodologyEyebrow}
        title={project.methodologyTitle}
        desc={project.methodologyDesc}
        steps={project.methodologySteps}
      />

      {/* 6. Related Project Case Studies Grid */}
      <FeaturedProjects
        eyebrow="RELATED CASE STUDIES"
        title="More Projects & Audits"
        projects={related}
      />
    </div>
  );
}
