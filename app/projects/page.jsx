"use client";

import { useState } from "react";
import Link from "next/link";
import { PROJECTS, PROJECT_CATEGORIES } from "../../data/projects";
import ClientMarquee from "../../components/detail/ClientMarquee";
import "./projects.css";

const EXCELLENCE_ITEMS = [
  {
    icon: "flaticon-project-management",
    title: "ISO & OSHA Certified",
    desc: "Operating under certified ISO 9001, 14001, and 45001 management systems aligned with global OSHA standards.",
  },
  {
    icon: "flaticon-consultation",
    title: "Process Safety & HAZOP",
    desc: "TÜV-certified Functional Safety experts facilitating HAZOP, LOPA, FERA, and 3D Phast consequence modeling.",
  },
  {
    icon: "flaticon-design-thinking",
    title: "Aramco CSMS Compliance",
    desc: "Turnkey alignment with Saudi Aramco Contractor Safety Management Systems and NCEC environmental regulations.",
  },
  {
    icon: "flaticon-technical-support",
    title: "Industrial Hygiene Survey",
    desc: "Quantitative personal noise dosimetry, thermal heat stress (WBGT), and workplace indoor air quality evaluations.",
  },
  {
    icon: "flaticon-server",
    title: "HSE Leadership & Audits",
    desc: "Comprehensive safety culture auditing and site risk governance logging over 35 Million safe man-hours.",
  },
  {
    icon: "flaticon-wrench",
    title: "Digital HSE Analytics",
    desc: "Real-time Power BI risk dashboards, digital Permit-to-Work tracking, and incident root cause analysis.",
  },
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

      {/* 2. Valued Clients Marquee Section */}
      <ClientMarquee />

      {/* 3. Filterable Projects Showcase Section */}
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
                  <div className="project-card-header">
                    <span className="project-client">{project.client}</span>
                    <h3 className="project-title">{project.title}</h3>
                  </div>

                  <p className="project-desc">{project.desc}</p>

                  <div className="project-card-footer">
                    <div className="project-specs">
                      <span>
                        <i className="flaticon flaticon-location-1"></i> {project.location}
                      </span>
                    </div>
                    <span className="view-case-link">
                      View Case Study <i className="flaticon flaticon-right-up"></i>
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
          <span className="pill-badge">Advisory Excellence</span>
          <h2>Our HSE &amp; Governance Standards</h2>
          <p>
            Every Kazain engagement is built upon certified safety management frameworks, international ISO standards, and expert risk governance.
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

      {/* 5. Homepage Parity CTA Section */}
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
