"use client";

import { useState } from "react";
import Link from "next/link";
import { PROJECTS, PROJECT_CATEGORIES } from "../../data/projects";
import "./projects.css";

const EXCELLENCE_ITEMS = [
  {
    icon: "flaticon-project-management",
    title: "ISO & OSHA Certified",
    desc: "Operating under ISO 9001, 14001, and 45001 standards with full C-A Category licensing for unlimited scale contracts.",
  },
  {
    icon: "flaticon-wrench",
    title: "Heavy Equipment Fleet",
    desc: "Ownership of specialized trenchers, sidebooms, pipe layers, bending machines, and high-capacity mobile crane fleets.",
  },
  {
    icon: "flaticon-design-thinking",
    title: "Turnkey Capability",
    desc: "Complete single-source execution from front-end engineering design (FEED) through procurement, fabrication, and final testing.",
  },
  {
    icon: "flaticon-technical-support",
    title: "Long-Term O&M Support",
    desc: "Post-commissioning operational maintenance, field management, and emergency response teams standing by across all asset sites.",
  },
  {
    icon: "flaticon-consultation",
    title: "HSE & Safety Leadership",
    desc: "Rigorous Health, Safety & Environment policies logging over 35 Million safe man-hours with a zero Lost Time Injury record.",
  },
  {
    icon: "flaticon-server",
    title: "ASME Stamped Skids",
    desc: "State-of-the-art heavy fabrication facilities equipped for ASME Sec VIII pressure vessels and modular process skids.",
  },
];

const CLIENT_LOGOS = [
  "/Client Logos/1.png",
  "/Client Logos/2.png",
  "/Client Logos/3.png",
  "/Client Logos/4.png",
  "/Client Logos/5.png",
  "/Client Logos/6.png",
  "/Client Logos/7.png",
  "/Client Logos/8.png",
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="projects-page-root">
      {/* 1. Exact Homepage Matching Hero Section */}
      <section className="gasco-hero-homepage-match">
        <video
          className="gasco-hero-video-bg"
          autoPlay
          muted
          playsInline
          loop
          src="/banner.mp4"
        />

        <div className="gasco-hero-content-wrapper">
          <span className="gasco-hero-subtitle-pill">Leading Industrial HSE Advisory</span>
          <h1 className="gasco-hero-title-solid">HSE Case Studies &amp;</h1>
          <h2 className="gasco-hero-title-outlined">Safety Audits</h2>
          <div>
            <a href="#projects-showcase" className="gasco-hero-yellow-btn">
              <span>Explore Case Studies</span>
              <i className="flaticon flaticon-right-up"></i>
            </a>
          </div>
        </div>

        <div className="gasco-hero-badge-container">
          <Link href="/contact-us/">
            <img src="/gasco/epc-badge.svg" alt="HSE Advisory Badge" />
          </Link>
        </div>
      </section>

      {/* 2. Filterable Projects Showcase Section */}
      <section className="gasco-portfolio-section" id="projects-showcase">
        <div className="gasco-portfolio-container">
          <div className="gasco-portfolio-header">
            <span className="pill-badge">Proven HSE Track Record</span>
            <h2>Featured HSE Case Studies &amp; Audits</h2>
            <p>
              Explore our portfolio of process safety workshops (HAZOP/QRA), ISO 45001/14001 certification implementations, occupational hygiene mapping, and environmental impact assessments.
            </p>
          </div>

          {/* Filter Controls */}
          <div className="portfolio-filter-bar">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                className={`filter-btn ${activeCategory === cat.key ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="portfolio-grid" id="projects-grid">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={project.link}
                className="project-card"
              >
                <div className="project-img-wrapper">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-content">
                  <span className="project-client">{project.client}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>
                  <div className="project-specs">
                    <span>
                      <i className="flaticon flaticon-location-1"></i> {project.location}
                    </span>
                    <span>
                      <i className="flaticon flaticon-project-management"></i> {project.contractType}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Execution Excellence Continuous Marquee */}
      <section className="gasco-excellence-section">
        <div className="gasco-excellence-header">
          <span className="pill-badge">Execution Pillars</span>
          <h2>Our Engineering Standards</h2>
          <p>
            Every Kazain project is built upon rigorous international standards, certified safety management systems, and specialized heavy machinery fleets.
          </p>
        </div>

        <div className="excellence-marquee-wrapper">
          <div className="excellence-marquee-track">
            {EXCELLENCE_ITEMS.map((item, idx) => (
              <div className="excellence-card" key={`track1-${idx}`}>
                <div className="icon-box">
                  <i className={`flaticon ${item.icon}`}></i>
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="excellence-marquee-track" aria-hidden="true">
            {EXCELLENCE_ITEMS.map((item, idx) => (
              <div className="excellence-card" key={`track2-${idx}`}>
                <div className="icon-box">
                  <i className={`flaticon ${item.icon}`}></i>
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Valued Clients Marquee Section */}
      <section className="gasco-clients-section">
        <div className="gasco-clients-header">
          <h5>Trusted By Global Energy Majors</h5>
        </div>
        <div className="gasco-clients-marquee">
          <div className="gasco-clients-track">
            {CLIENT_LOGOS.map((src, idx) => (
              <img key={`logo1-${idx}`} src={src} alt={`Client Logo ${idx + 1}`} />
            ))}
          </div>
          <div className="gasco-clients-track" aria-hidden="true">
            {CLIENT_LOGOS.map((src, idx) => (
              <img key={`logo2-${idx}`} src={src} alt={`Client Logo ${idx + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Homepage Parity CTA Section */}
      <section className="gasco-homepage-cta-section">
        <div className="gasco-homepage-cta-card">
          <div className="gasco-homepage-cta-content">
            <h2>Partner With Kazain for Your Next Oil &amp; Gas Project</h2>
            <Link href="/contact-us/" className="gasco-homepage-cta-btn">
              <span>CONTACT US</span>
              <i className="flaticon flaticon-right-up"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
