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

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

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
        eyebrow="Related Case Studies"
        title="More Projects & Audits"
        projects={project.relatedProjects}
      />
    </div>
  );
}
