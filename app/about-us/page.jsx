"use client";

import Link from "next/link";
import ClientMarquee from "../../components/detail/ClientMarquee";
import "./about.css";
import "../../components/home/home.css";

const IMPACT_STATS = [
  { number: "35M+", label: "Safe Man-Hours Guided" },
  { number: "30+", label: "Years HSE Experience" },
  { number: "500+", label: "HAZOP & Risk Audits" },
  { number: "100%", label: "Regulatory Compliance" },
];

const STRATEGY_CARDS = [
  {
    icon: "fa-bullseye",
    title: "Client Governance",
    desc: "Tailoring HSE risk frameworks and compliance protocols to match complex client operating environments.",
  },
  {
    icon: "fa-lightbulb",
    title: "Technical Innovation",
    desc: "Deploying advanced dispersion modeling software and accredited assessment methodologies.",
  },
  {
    icon: "fa-shield-halved",
    title: "Core Competencies",
    desc: "Delivering expert HAZOP facilitation, technical safety audits, and environmental impact studies.",
  },
  {
    icon: "fa-chart-line",
    title: "Sustainable Impact",
    desc: "Empowering industrial leaders with scalable safety management systems and specialized workforce training.",
  },
];

const STAFF_IMAGES = [
  "/staff/1.jpeg",
  "/staff/2.jpeg",
  "/staff/3.jpeg",
  "/staff/DSC_0027.JPG",
];

const TIMELINE_MILESTONES = [
  {
    year: "2024",
    title: "National Process Safety Expansion",
    desc: "Executing HAZOP & Quantitative Risk Assessments (QRA) for Reko Diq Mining Complex.",
  },
  {
    year: "2021",
    title: "Integrated Management Frameworks",
    desc: "ISO 45001 & 14001 certification advisory for industrial condensate & gas processing facilities.",
  },
  {
    year: "2018",
    title: "Operational Risk & ESG Audits",
    desc: "Pioneered environmental compliance monitoring and sustainability risk reporting for oil & gas.",
  },
  {
    year: "2016",
    title: "Major Pipeline HSE Oversight",
    desc: "Spearheaded pipeline integrity & HSE audit supervision for 42” x 80 km RLNG project with Zero LTI.",
  },
  {
    year: "2014",
    title: "High-Hazard Facility Safety",
    desc: "Expanded process safety advisory for high-pressure gas compression stations & processing plants.",
  },
  {
    year: "2009",
    title: "Occupational Health Programs",
    desc: "Introduced comprehensive workplace exposure monitoring and industrial hygiene baseline studies.",
  },
  {
    year: "2008",
    title: "Process Safety & SIL Assessment",
    desc: "Integrated TÜV-standard Safety Integrity Level (SIL) verification for regional gas fields.",
  },
  {
    year: "2007",
    title: "Turnkey Safety Governance",
    desc: "Established full-scope HSE management systems and emergency response plans for industrial assets.",
  },
  {
    year: "2003",
    title: "Third-Party HSE Audits",
    desc: "First local consultancy providing specialized safety inspections & risk mitigation for rental compression.",
  },
  {
    year: "1998",
    title: "Prime Safety Advisory Body",
    desc: "Appointed primary HSE governance body for major industrial facility compliance.",
  },
  {
    year: "1996",
    title: "International HSE Alignment",
    desc: "Aligned safety auditing frameworks with global energy majors and regulatory bodies.",
  },
  {
    year: "1995",
    title: "HSE Consultancy Launch",
    desc: "Kazain launched its dedicated safety engineering and industrial risk advisory division.",
  },
  {
    year: "1993",
    title: "Corporate Expansion",
    desc: "Expanded technical safety & risk management operations globally.",
  },
  {
    year: "1990",
    title: "Safety Equipment Advisory",
    desc: "Pioneered industrial safety equipment compliance & hazardous area classification.",
  },
  {
    year: "1975",
    title: "Foundation of Kazain Advisory",
    desc: "Founded with a vision for industrial reliability, operational safety, and zero-harm culture.",
  },
];



export default function AboutUsPage() {
  return (
    <div className="about-page-root">
      {/* 1. Hero Section */}
      <section className="about-hero-section">
        <video
          className="about-hero-video-bg"
          autoPlay
          muted
          playsInline
          loop
          src="/banner.mp4"
        />

        <div className="about-hero-content">
          <span className="about-subtitle-pill">
            ESTABLISHED 1975 &bull; PREMIER HSE ADVISORY &amp; RISK CONSULTANCY
          </span>
          <h1 className="about-hero-title-solid">SAFEGUARDING PEOPLE, ASSETS &amp;</h1>
          <h2 className="about-hero-title-outlined">Environment</h2>
          <div>
            <a href="#overview-stats" className="about-hero-btn">
              <span>Discover Our Story</span>
              <i className="flaticon flaticon-right-up"></i>
            </a>
          </div>
        </div>

        <div className="about-rotating-badge">
          <a href="#overview-stats">
            <img src="/gasco/epc-badge.svg" alt="HSE Advisory" />
          </a>
        </div>
      </section>

      {/* 2. Valued Clients Marquee Ticker */}
      <ClientMarquee />

      {/* 2. Overview & Impact Statistics */}
      <section id="overview-stats" className="gasco-impact-stats-section">
        <div className="gasco-impact-stats-container">
          <p className="gasco-impact-statement">
            At Kazain HSE Advisory, we are committed to revolutionizing workplace safety and environmental stewardship across the energy and industrial sectors. We combine{" "}
            <span className="muted-text">
              certified HAZOP chairpersons, ISO lead auditors, advanced dispersion modeling, and accredited training programs to achieve Target Zero Harm.
            </span>
          </p>

          <div className="gasco-impact-stats-grid">
            {IMPACT_STATS.map((stat, idx) => (
              <div className="gasco-stat-item" key={idx}>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Vision, Mission & Values (3-Card Grid) */}
      <section className="gasco-vision-values-section">
        <div className="gasco-vv-container">
          <div className="gasco-vv-header">
            <div className="line"></div>
            <h2>OUR VISION, MISSION &amp; VALUES</h2>
            <div className="line"></div>
          </div>

          <div className="gasco-vv-3cards-grid">
            {/* Vision Card */}
            <div className="gasco-vv-card-item">
              <div className="vv-card-badge">VISION</div>
              <h3>Premier HSE Advisory Leadership</h3>
              <p className="main-desc">
                To be the industrial sector's premier Health, Safety &amp; Environmental risk consultancy, recognized globally for empowering organizations to operate with zero harm and complete compliance.
              </p>
              <h4 className="sub-heading">To achieve this, we:</h4>
              <ul className="vv-list">
                <li>
                  <span className="check-icon">&#10003;</span>
                  <span>Deliver world-class HAZOP, QRA, and PSM advisory services</span>
                </li>
                <li>
                  <span className="check-icon">&#10003;</span>
                  <span>Design ISO 45001 &amp; ISO 14001 management systems that stick</span>
                </li>
                <li>
                  <span className="check-icon">&#10003;</span>
                  <span>Protect ecosystems through comprehensive EIA &amp; regulatory studies</span>
                </li>
                <li>
                  <span className="check-icon">&#10003;</span>
                  <span>Foster executive safety leadership and workforce competence</span>
                </li>
              </ul>
            </div>

            {/* Mission Card */}
            <div className="gasco-vv-card-item">
              <div className="vv-card-badge">MISSION</div>
              <h3>Operational Excellence</h3>
              <p className="main-desc">
                To engineer, construct, and operate vital oil &amp; gas infrastructure safely, efficiently, and on schedule while maintaining an unwavering commitment to HSE standards.
              </p>
              <h4 className="sub-heading">Our commitments:</h4>
              <ul className="vv-list">
                <li>
                  <span className="check-icon">&#10003;</span>
                  <span>Execute all projects with 35M+ Safe Hours &amp; Zero LTI</span>
                </li>
                <li>
                  <span className="check-icon">&#10003;</span>
                  <span>Maintain ISO 9001, ISO 14001, &amp; ISO 45001 certified frameworks</span>
                </li>
                <li>
                  <span className="check-icon">&#10003;</span>
                  <span>Provide turnkey EPCC services from design to commissioning</span>
                </li>
                <li>
                  <span className="check-icon">&#10003;</span>
                  <span>Deploy rapid-response rental gas compression solutions</span>
                </li>
              </ul>
            </div>

            {/* Values Card */}
            <div className="gasco-vv-card-item">
              <div className="vv-card-badge">VALUES</div>
              <h3>Core Principles</h3>
              <p className="main-desc">
                Our core values define every project we undertake and guide our workforce across all operational sites globally.
              </p>
              <h4 className="sub-heading">Key core values:</h4>
              <ul className="vv-list">
                <li>
                  <span className="check-icon">&#10003;</span>
                  <span><strong>Integrity:</strong> Absolute transparency and ethical conduct</span>
                </li>
                <li>
                  <span className="check-icon">&#10003;</span>
                  <span><strong>Safety First:</strong> Uncompromising Zero-Harm culture</span>
                </li>
                <li>
                  <span className="check-icon">&#10003;</span>
                  <span><strong>Precision:</strong> Relentless quality control &amp; technical accuracy</span>
                </li>
                <li>
                  <span className="check-icon">&#10003;</span>
                  <span><strong>Partnerships:</strong> Sustainable, value-driven relationships</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA Banner: Get Expert Support */}
      <section className="gasco-cta-banner-section">
        <div className="gasco-cta-banner-container">
          <div className="gasco-cta-banner-left">
            <h2>Get Expert HSE Advisory &amp; Process Safety Support</h2>
          </div>
          <div className="gasco-cta-banner-right">
            <Link href="/contact-us/" className="gasco-cta-banner-btn">
              <span>WORK WITH US</span>
              <i className="flaticon flaticon-right-up"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Advisory Strategy & Risk Governance */}
      <section className="gasco-strategy-fullwidth-section">
        <div className="gasco-strategy-fullwidth-container">
          <div className="gasco-strategy-top-grid">
            <div className="gasco-strategy-top-left">
              <img src="/trenching-picture.jpg" alt="Kazain HSE Advisory &amp; Risk Governance" />
            </div>
            <div className="gasco-strategy-top-right">
              <span className="pill-badge">OUR ADVISORY STRATEGY</span>
              <h2>Driving Safety Governance &amp; Sustainable Risk Mitigation</h2>
              <p>
                Kazain HSE Advisory aims to deliver sustainable industrial value by leveraging our core competencies: rigorous process safety assessments, HAZOP/HAZID studies, ISO management system audits, and environmental dispersion modeling across the energy and manufacturing sectors.
              </p>
              <p>
                Our strategy empowers operating companies to systematically identify high-consequence hazards, streamline compliance with international regulatory frameworks, and embed a resilient zero-harm culture throughout their operational lifecycle.
              </p>
            </div>
          </div>

          <div className="gasco-strategy-4cards-grid">
            {STRATEGY_CARDS.map((card, idx) => (
              <div className="gasco-strategy-card-item" key={idx}>
                <div className="card-icon">
                  <i className={`fa-solid ${card.icon}`}></i>
                </div>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Our People & Workforce */}
      <section className="gasco-strategy-fullwidth-section" style={{ background: "#FFFFFF" }}>
        <div className="gasco-strategy-fullwidth-container">
          <div className="gasco-strategy-top-grid">
            <div className="gasco-strategy-top-right">
              <span className="pill-badge">OUR EXPERTS &amp; TECHNICAL LEADERSHIP</span>
              <h2>Driven by Expert Insight, Committed to Operational Excellence</h2>
              <p>
                At Kazain HSE Advisory, our strength lies in our multidisciplinary team of certified HAZOP chairpersons, process safety engineers, ISO lead auditors, and environmental specialists. We combine decades of hands-on industrial field experience with rigorous technical governance to safeguard complex energy and manufacturing operations.
              </p>
              <p>
                We foster a continuous learning culture where expert consultants collaborate seamlessly across global standards. By equipping our specialists with state-of-the-art consequence modeling tools and accredited auditing frameworks, we ensure our clients achieve Target Zero Harm, total compliance, and long-term operational resilience.
              </p>
            </div>
            <div className="gasco-strategy-top-left">
              <img src="/staff/DSC_0024.JPG" alt="Kazain Dedicated Workforce &amp; Staff" />
            </div>
          </div>

          <div className="gasco-staff-4cards-grid">
            {STAFF_IMAGES.map((src, idx) => (
              <div className="gasco-staff-card-item" key={idx}>
                <div className="staff-img-box">
                  <img src={src} alt={`Kazain Team Member ${idx + 1}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. History & Milestones Horizontal Continuous Timeline */}
      <section className="gasco-history-animated-section">
        <div className="gasco-history-container">
          <div className="gasco-history-header">
            <span className="pill-badge">OUR HSE JOURNEY &amp; MILESTONES</span>
            <h2>50 Years of Industrial HSE Legacy</h2>
          </div>
        </div>

        <div className="gasco-horizontal-timeline-viewport">
          <div className="timeline-horizontal-axis"></div>
          <div className="gasco-horizontal-marquee-track">
            {/* First Set */}
            <div className="gasco-horizontal-timeline-list">
              {TIMELINE_MILESTONES.map((item, idx) => (
                <div className="gasco-h-timeline-item" key={`first-${idx}`}>
                  <div className="h-timeline-year">{item.year}</div>
                  <div className="h-timeline-dot"></div>
                  <div className="h-timeline-card">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Duplicate Set for Seamless Continuous Loop */}
            <div className="gasco-horizontal-timeline-list" aria-hidden="true">
              {TIMELINE_MILESTONES.map((item, idx) => (
                <div className="gasco-h-timeline-item" key={`dup-${idx}`}>
                  <div className="h-timeline-year">{item.year}</div>
                  <div className="h-timeline-dot"></div>
                  <div className="h-timeline-card">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
