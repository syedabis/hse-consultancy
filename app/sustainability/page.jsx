"use client";

import Link from "next/link";
import ClientMarquee from "../../components/detail/ClientMarquee";
import ShowcaseSection from "../../components/detail/ShowcaseSection";
import PillarsSection from "../../components/detail/PillarsSection";
import StatsSection from "../../components/detail/StatsSection";
import MethodologyCarousel from "../../components/detail/MethodologyCarousel";
import FeaturedProjects from "../../components/detail/FeaturedProjects";
import "../../components/detail/detail.css";
import "./sustainability.css";

const SUSTAINABILITY_PILLARS = [
  {
    title: "Scope 1, 2 & 3 Decarbonization & Carbon Accounting",
    items: [
      "Greenhouse Gas (GHG) Protocol & ISO 14064 Carbon Audits",
      "Scope 1 Direct Facility Emissions & Methane Leak Detection",
      "Scope 2 Indirect Energy Consumption Efficiency Audits",
      "Scope 3 Supply Chain Carbon Footprinting & Lifecycle Assessment (LCA)",
      "Net-Zero Transition Roadmaps & Science Based Targets (SBTi)",
    ],
  },
  {
    title: "Category A, B & C EIA & NCEC Permitting",
    items: [
      "Category A, B & C Environmental Impact Assessments (EIA)",
      "Saudi National Center for Environmental Compliance (NCEC) Permitting",
      "Hydrogeological & Baseline Air Quality Surveys",
      "Construction Environmental Management Plans (CEMP)",
      "Industrial Waste & Hazardous Chemical Minimization Frameworks",
    ],
  },
  {
    title: "Corporate ESG Governance & Reporting Disclosures",
    items: [
      "GRI (Global Reporting Initiative) & SASB ESG Disclosures",
      "Task Force on Climate-Related Financial Disclosures (TCFD)",
      "Corporate Sustainability Governance & Board Risk Oversight",
      "Green Bond & Sustainable Finance Readiness Assurance",
      "ISO 14001 Environmental Management Systems (EMS) Certification",
    ],
  },
];

const SUSTAINABILITY_STATS = [
  { number: "Scope 1-3", label: "Carbon Accounting" },
  { number: "100%", label: "NCEC Compliance Rate" },
  { number: "50+", label: "EIA & Baseline Studies" },
  { number: "Net-Zero", label: "SBTi Strategy Aligned" },
];

const SUSTAINABILITY_STEPS = [
  { num: "01", title: "Carbon Baseline Scoping", desc: "Comprehensive facility energy scoping, GHG Protocol inventory setup, and baseline emissions mapping across Scope 1, 2, and 3." },
  { num: "02", title: "Regulatory EIA & Permitting", desc: "Executing Category A/B/C Environmental Impact Assessments and securing NCEC environmental operating permits." },
  { num: "03", title: "Decarbonization Roadmap", desc: "Formulating cost-effective carbon reduction strategies, energy efficiency upgrades, and renewable energy integration." },
  { num: "04", title: "ESG Governance Setup", desc: "Designing corporate ESG policies, ISO 14001 EMS management frameworks, and sustainability board governance." },
  { num: "05", title: "GRI / TCFD Disclosure", desc: "Compiling investor-ready sustainability reports aligned with GRI, SASB, TCFD, and Saudi Green Initiative goals." },
  { num: "06", title: "Annual Audit & Verification", desc: "Ongoing environmental monitoring, third-party carbon footprint verification, and annual ESG re-certification." },
];

const SUSTAINABILITY_PROJECTS = [
  {
    tag: "Renewable Energy Utility",
    title: "500 MW Solar & Wind Energy Park Environmental Governance",
    desc: "Environmental Baseline Survey (EBS), Category A EIA study, high-voltage electrical safety audit, and avian protection plan.",
    image: "/two-professional-technicians-installing-solar.jpeg",
    link: "/projects/500mw-solar-wind-park-environmental-safety-governance/",
  },
  {
    tag: "Mining & Infrastructure",
    title: "Industrial Water Infrastructure Environmental Impact Assessment (EIA)",
    desc: "Multi-season Environmental Baseline Survey (EBS), EIA study, and NCEC regulatory permit acquisition for long-distance pipelines.",
    image: "/industrial-water-treatment-plant.jpeg",
    link: "/projects/industrial-water-infrastructure-environmental-impact-assessment/",
  },
  {
    tag: "Oil & Gas Industrial Complex",
    title: "Refinery Carbon Footprint & Scope 1-3 GHG Audit",
    desc: "Comprehensive GHG accounting, flaring minimization review, and ISO 14064 carbon reduction strategy implementation.",
    image: "/hse/water_eia_environmental_study%201.jpg",
    link: "/projects/",
  },
];

export default function SustainabilityPage() {
  return (
    <div className="detail-page-wrapper">
      {/* 1. Sustainability Hero Banner */}
      <section className="sustainability-hero-section">
        <video
          className="sustainability-hero-video-bg"
          autoPlay
          muted
          playsInline
          loop
          src="/banner.mp4"
        />

        <div className="sustainability-hero-content">
          <span className="sustainability-subtitle-pill">STRATEGIC ESG &amp; NET-ZERO ADVISORY</span>
          <h1 className="sustainability-hero-title-solid">SUSTAINABILITY &amp; ESG</h1>
          <h2 className="sustainability-hero-title-outlined">Decarbonization &amp; NCEC Permitting</h2>
          <div>
            <a href="#sustainability-details" className="sustainability-hero-btn">
              <span>EXPLORE ESG ADVISORY</span>
              <i className="flaticon flaticon-right-up"></i>
            </a>
          </div>
        </div>

        <div className="sustainability-rotating-badge">
          <a href="#sustainability-details">
            <img src="/gasco/epc-badge.svg" alt="ESG Advisory" />
          </a>
        </div>
      </section>

      {/* 2. Client Logos Marquee */}
      <ClientMarquee title="Sustainability Partners" />

      {/* 3. Showcase Section */}
      <ShowcaseSection
        id="sustainability-details"
        pill="GRI, SASB, TCFD &amp; SAUDI GREEN INITIATIVE ALIGNED"
        title="Corporate Sustainability, ESG Strategy & Environmental Compliance"
        paragraphs={[
          "Kazain HSE Advisory delivers premier Sustainability & ESG Consulting, Scope 1–3 Decarbonization Strategies, and NCEC Environmental Permitting for industrial, energy, and corporate clients across the Middle East.",
          "Our certified environmental engineers and ESG specialists formulate robust Net-Zero transition roadmaps, execute Category A, B & C Environmental Impact Assessments (EIA), and build ISO 14001 Environmental Management Systems.",
          "We empower organizations to fulfill Saudi Vision 2030 and international climate goals through investor-ready GRI, SASB, and TCFD sustainability disclosures, carbon footprint verification, and circular economy governance.",
        ]}
        image="/hse/water_eia_environmental_study%201.jpg"
        imageAlt="Kazain Environmental EIA & Sustainability Governance"
        ctaText="Request ESG Proposal ↗"
        ctaLink="/contact-us/"
      />

      {/* 4. Technical Pillars Grid */}
      <PillarsSection
        eyebrow="TECHNICAL DIVISIONS"
        title="Sustainability, ESG & Environmental Pillars"
        pillars={SUSTAINABILITY_PILLARS}
      />

      {/* 5. High-Impact Statement & 4 Big Stats */}
      <StatsSection
        statementHtml={`At Kazain, our Sustainability & ESG division empowers energy and industrial leaders to accelerate <span class="highlight">Net-Zero decarbonization</span>, secure <span class="highlight">100% NCEC environmental compliance</span>, and publish investor-grade <span class="highlight">GRI & TCFD disclosures</span>.`}
        stats={SUSTAINABILITY_STATS}
      />

      {/* 6. 5-Stage Consulting Methodology */}
      <MethodologyCarousel
        eyebrow="SUSTAINABILITY FRAMEWORK"
        title="5-Stage ESG & Decarbonization Methodology"
        desc="Our structured sustainability framework ensures transparent GHG accounting, regulatory clearance, and long-term ESG value creation."
        steps={SUSTAINABILITY_STEPS}
      />

      {/* 7. Featured Projects Grid */}
      <FeaturedProjects
        eyebrow="PROVEN TRACK RECORD"
        title="Featured Environmental & ESG Projects"
        projects={SUSTAINABILITY_PROJECTS}
      />
    </div>
  );
}
