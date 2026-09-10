"use client";

import Link from "next/link";
import ClientMarquee from "../../components/detail/ClientMarquee";
import ShowcaseSection from "../../components/detail/ShowcaseSection";
import PillarsSection from "../../components/detail/PillarsSection";
import StatsSection from "../../components/detail/StatsSection";
import MethodologyCarousel from "../../components/detail/MethodologyCarousel";
import FeaturedProjects from "../../components/detail/FeaturedProjects";
import "../../components/detail/detail.css";
import "./digitalization.css";

const DIGITAL_PILLARS = [
  {
    title: "AI Computer Vision & Automated Safety Camera Monitoring",
    items: [
      "Real-Time Automated PPE Detection (Hard Hats, Vests, Safety Glasses)",
      "High-Risk Exclusion Zone Breach & Heavy Equipment Proximity Alerts",
      "Offshore & Crane Dropped Object Prevention Scheme (DROPS) Vision Analytics",
      "Confined Space & Toxic Gas Area Personnel Tracking AI",
      "Automated Incident Video Snippet Clipping & Emergency Control Center Alerts",
    ],
  },
  {
    title: "Executive Power BI Risk Analytics & Cloud Portals",
    items: [
      "Custom Executive Power BI Dashboards for LTIFR, TRIFR & Safety KPIs",
      "Real-Time Incident Heatmapping & High-Risk Facility Predictive Analytics",
      "Cloud-Based Digital Permit-to-Work (e-PTW) & LOTO Isolation Registers",
      "Saudi Aramco & SABIC CSMS Qualification Document Portals",
      "Mobile HSE Audit Apps with Geotagged Photo Verification & Offline Sync",
    ],
  },
  {
    title: "IoT Environmental Telemetry & Wireless Sensor Networks",
    items: [
      "24/7 Wireless H2S, CH4 & Toxic Chemical Gas Sensor Networks",
      "Occupational Heat Stress (WBGT) Automated Worker Alert Systems",
      "Workplace Noise Dosimetry & Industrial Hygiene IoT Telemetry",
      "Real-Time Fenceline Environmental Air Quality & Dust Monitors",
      "SCADA & Industrial Control System (ICS) HSE Telemetry Integration",
    ],
  },
];

const DIGITAL_STATS = [
  { number: "Real-Time", label: "Power BI Risk Dashboards" },
  { number: "99.4%", label: "AI PPE Detection Accuracy" },
  { number: "24/7", label: "IoT H2S Telemetry Monitoring" },
  { number: "40%", label: "Faster Incident Response Time" },
];

const DIGITAL_STEPS = [
  { num: "01", title: "Site Infrastructure Audit", desc: "Evaluating existing CCTV camera streams, SCADA networks, and baseline HSE reporting systems across asset locations." },
  { num: "02", title: "IoT Sensor & Edge AI Setup", desc: "Deploying wireless H2S gas detectors, WBGT heat stress monitors, and calibrating edge AI computer vision units." },
  { num: "03", title: "Power BI Dashboard Design", desc: "Engineering custom Power BI executive dashboards for real-time tracking of LTIFR, audit non-conformities, and PTWs." },
  { num: "04", title: "Cloud Portal Rollout", desc: "Deploying secure e-PTW, LOTO, and Aramco CSMS compliance portals with role-based access control." },
  { num: "05", title: "Workforce Mobile Training", desc: "Training safety officers and plant operators on mobile inspection apps, automated alerts, and incident logging." },
  { num: "06", title: "Predictive AI Optimization", desc: "Utilizing machine learning models to identify high-risk maintenance windows and prevent major industrial accidents." },
];

const DIGITAL_PROJECTS = [
  {
    tag: "FMCG & Industrial Logistics",
    title: "Automated Logistics Hub Fire Risk & AI Ergonomics Assessment",
    desc: "High-bay warehouse fire safety audit, automated forklift-pedestrian AI segregation, and worker ergonomic posture survey.",
    image: "/men-inspecting-shipping-containers-at-a-shipping.jpeg",
    link: "/projects/automated-logistics-hub-fire-safety-ergonomics/",
  },
  {
    tag: "Oil & Gas Offshore Facilities",
    title: "Offshore Platform AI Video Analytics & DROPS Surveillance",
    desc: "Real-time AI camera detection for dropped objects, SIMOPS matrix compliance, and toxic gas sensor telemetry.",
    image: "/hse/dhok_sultan_hazop_audit%201.jpg",
    link: "/projects/modular-early-production-facility-hazop-assessment/",
  },
  {
    tag: "Refinery & Petrochemical Complex",
    title: "Enterprise Power BI Risk Dashboard & Digital PTW System",
    desc: "Turnkey integration of real-time safety KPIs, electronic permit-to-work workflows, and Aramco CSMS audit tracking.",
    image: "/engineers-inspecting.jpeg",
    link: "/projects/high-pressure-gas-pipeline-safety-integrity-audit/",
  },
];

export default function DigitalizationPage() {
  return (
    <div className="detail-page-wrapper">
      {/* 1. Digitalization Hero Banner */}
      <section className="digitalization-hero-section">
        <video
          className="digitalization-hero-video-bg"
          autoPlay
          muted
          playsInline
          loop
          src="/banner.mp4"
        />

        <div className="digitalization-hero-content">
          <span className="digitalization-subtitle-pill">NEXT-GEN DIGITAL HSE &amp; RISK ANALYTICS</span>
          <h1 className="digitalization-hero-title-solid">DIGITAL HSE &amp; AI ANALYTICS</h1>
          <h2 className="digitalization-hero-title-outlined">Power BI Dashboards &amp; AI Vision</h2>
          <div>
            <a href="#digitalization-details" className="digitalization-hero-btn">
              <span>EXPLORE DIGITAL HSE</span>
              <i className="flaticon flaticon-right-up"></i>
            </a>
          </div>
        </div>

        <div className="digitalization-rotating-badge">
          <a href="#digitalization-details">
            <img src="/gasco/epc-badge.svg" alt="Digital HSE" />
          </a>
        </div>
      </section>

      {/* 2. Client Logos Marquee */}
      <ClientMarquee title="Technology Partners" />

      {/* 3. Showcase Section */}
      <ShowcaseSection
        id="digitalization-details"
        pill="AI COMPUTER VISION, POWER BI &amp; IOT TELEMETRY"
        title="Transforming Traditional Safety with Real-Time Digital Risk Analytics"
        paragraphs={[
          "Kazain HSE Advisory integrates cutting-edge Digital HSE Technologies, AI Computer Vision Monitoring, and Executive Power BI Dashboards to eliminate blind spots across energy and industrial operations.",
          "Our digital risk engineers transform CCTV feeds into real-time safety monitors—automatically detecting PPE non-compliance, exclusion zone intrusions, and dropped object hazards before incidents occur.",
          "We empower executive leadership with cloud-based safety portals, electronic Permit-to-Work (e-PTW) systems, 24/7 wireless H2S telemetry, and predictive risk heatmaps aligned with Saudi Aramco and global standards.",
        ]}
        image="/teamwork-in-modern-industrial-facility.jpeg"
        imageAlt="Kazain Digital HSE & Power BI Executive Dashboard"
        ctaText="Request Digital HSE Demo ↗"
        ctaLink="/contact-us/"
      />

      {/* 4. Technical Pillars Grid */}
      <PillarsSection
        eyebrow="TECHNICAL DIVISIONS"
        title="Digital HSE & Technology Pillars"
        pillars={DIGITAL_PILLARS}
      />

      {/* 5. High-Impact Statement & 4 Big Stats */}
      <StatsSection
        statementHtml={`At Kazain, our Digital HSE division bridges the gap between field safety and executive governance using <span class="highlight">real-time Power BI risk dashboards</span>, <span class="highlight">AI computer vision monitoring</span>, and <span class="highlight">24/7 IoT environmental sensors</span>.`}
        stats={DIGITAL_STATS}
      />

      {/* 6. 5-Stage Consulting Methodology */}
      <MethodologyCarousel
        eyebrow="DIGITAL TRANSFORMATION FRAMEWORK"
        title="5-Stage Digital HSE Roadmap"
        desc="Our structured digital transformation lifecycle ensures seamless sensor deployment, AI model calibration, and executive dashboard adoption."
        steps={DIGITAL_STEPS}
      />

      {/* 7. Featured Projects Grid */}
      <FeaturedProjects
        eyebrow="PROVEN TRACK RECORD"
        title="Featured Digital HSE Projects"
        projects={DIGITAL_PROJECTS}
      />
    </div>
  );
}
