import { notFound } from "next/navigation";
import { SERVICE_DETAILS } from "../../../data/serviceDetails";
import DetailHero from "../../../components/detail/DetailHero";
import ClientMarquee from "../../../components/detail/ClientMarquee";
import ShowcaseSection from "../../../components/detail/ShowcaseSection";
import PillarsSection from "../../../components/detail/PillarsSection";
import StatsSection from "../../../components/detail/StatsSection";
import MethodologyCarousel from "../../../components/detail/MethodologyCarousel";
import FeaturedProjects from "../../../components/detail/FeaturedProjects";
import "../../../components/detail/detail.css";

export async function generateStaticParams() {
  return Object.keys(SERVICE_DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = SERVICE_DETAILS[slug];
  if (!service) return { title: "Service Not Found - Kazain Ventures" };

  const title = `${service.heroTitlePart1} ${service.heroTitlePart2 || ""} - Kazain Ventures`.trim();
  return {
    title,
    description: service.showcaseParagraphs?.[0] || "Kazain Engineering & EPC Services",
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = SERVICE_DETAILS[slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="detail-page-wrapper">
      {/* 1. Video Hero Banner */}
      <DetailHero
        eyebrow={service.eyebrow}
        titlePart1={service.heroTitlePart1}
        titlePart2={service.heroTitlePart2}
        badgeImage={service.badgeImage}
        badgeAlt={service.badgeAlt}
        ctaText={service.heroCtaText}
        ctaLink={service.heroCtaLink}
      />

      {/* 2. Client Logos Marquee */}
      <ClientMarquee title="Our Valued Clients" />

      {/* 3. Showcase Section */}
      <ShowcaseSection
        id="capabilities"
        pill={service.showcasePill}
        title={service.showcaseTitle}
        paragraphs={service.showcaseParagraphs}
        image={service.showcaseImage}
        imageAlt={service.showcaseImageAlt}
        ctaText={service.showcaseCtaText}
        ctaLink={service.showcaseCtaLink}
      />

      {/* 3.5 Technical Pillars Grid */}
      <PillarsSection
        eyebrow={service.pillarsEyebrow}
        title={service.pillarsTitle}
        pillars={service.pillars}
      />

      {/* 4. High-Impact Statement & 4 Big Stats */}
      <StatsSection
        statementHtml={service.statementHtml}
        stats={service.stats}
      />

      {/* 5. Dark Methodology Section (Horizontal Carousel) */}
      <MethodologyCarousel
        eyebrow={service.methodologyEyebrow}
        title={service.methodologyTitle}
        desc={service.methodologyDesc}
        steps={service.methodologySteps}
      />

      {/* 6. Featured Projects Grid */}
      <FeaturedProjects
        eyebrow={service.featuredEyebrow}
        title={service.featuredTitle}
        projects={service.featuredProjects}
      />
    </div>
  );
}
