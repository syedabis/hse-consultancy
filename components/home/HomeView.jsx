"use client";

import Link from "next/link";
import { PROJECTS } from "../../data/projects";
import { SERVICES } from "../../data/services";
import "./home.css";

const CLIENT_LOGOS = [
  "/Client Logos/1.png",
  "/Client Logos/2.png",
  "/Client Logos/3.png",
  "/Client Logos/4.png",
  "/Client Logos/5.png",
  "/Client Logos/6.png",
  "/Client Logos/7.png",
  "/Client Logos/8.png",
  "/Client Logos/9.png",
  "/Client Logos/10.png",
  "/Client Logos/11.png",
  "/Client Logos/12.png",
  "/Client Logos/13.png",
  "/Client Logos/14.png",
];

const COMMITMENT_CARDS = [
  {
    icon: "flaticon-project-management",
    title: "Process Safety (PSM)",
    desc: "HAZOP, HAZID, QRA, and Safety Case risk assessments",
  },
  {
    icon: "flaticon-ux-design",
    title: "ISO & HSE Standards",
    desc: "ISO 45001, 14001, 9001, OSHA & global audit compliance",
  },
  {
    icon: "flaticon-exploration",
    title: "Regulatory Permits",
    desc: "EIA environmental clearances, EPA & NCEC regulatory permits",
  },
  {
    icon: "flaticon-technical-support",
    title: "Occupational Hygiene",
    desc: "Workplace exposure, air monitoring & noise mapping studies",
  },
];

const CERT_SLOGANS = [
  { text: "ZERO LTI & INJURY FREE", outlined: false },
  { text: "10+ MILLION SAFE MANHOURS", outlined: true },
  { text: "ISO 45001 HEALTH & SAFETY", outlined: false },
  { text: "ISO 14001 ENVIRONMENTAL STEWARDSHIP", outlined: true },
  { text: "SAFETY FIRST CULTURE", outlined: false },
  { text: "HAZARD CONTROL & RISK MANAGEMENT", outlined: true },
];

export default function HomeView() {
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <div className="home-root">
      {/* 1. Hero Section */}
      <section className="home-hero-section">
        <video
          className="home-hero-video-bg"
          autoPlay
          muted
          playsInline
          loop
          src="/banner.mp4"
        />

        <div className="home-hero-content">
          <span className="home-subtitle-pill">
            Leading Health, Safety &amp; Environment Advisory
          </span>
          <h1 className="home-hero-title-solid">Targeting Zero Harm &amp;</h1>
          <h2 className="home-hero-title-outlined">Total Risk Compliance</h2>
          <div>
            <Link href="/contact-us/" className="home-hero-btn">
              <span>Request Safety Audit</span>
              <i className="flaticon flaticon-right-up"></i>
            </Link>
          </div>
        </div>

        <div className="home-rotating-badge">
          <Link href="/contact-us/">
            <img src="/gasco/epc-badge.svg" alt="HSE Risk Advisory" />
          </Link>
        </div>
      </section>

      {/* 2. Valued Clients Marquee Ticker */}
      <section className="home-ticker-section">
        <div className="home-ticker-container">
          <div className="home-ticker-flex">
            <div className="home-ticker-track">
              {CLIENT_LOGOS.map((src, idx) => (
                <img key={`cli1-${idx}`} src={src} alt={`Client Logo ${idx + 1}`} />
              ))}
            </div>
            <div className="home-ticker-track" aria-hidden="true">
              {CLIENT_LOGOS.map((src, idx) => (
                <img key={`cli2-${idx}`} src={src} alt={`Client Logo ${idx + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. About Kazain HSE Solutions */}
      <section className="home-about-section">
        <div className="home-about-container">
          <div className="home-about-img">
            <img src="/lifting-picture.jpeg" alt="Kazain HSE Operations" />
          </div>

          <div className="home-about-text">
            <h6>About Kazain HSE Solutions</h6>
            <h2>Safeguarding People, Assets &amp; Environment Since 1975</h2>
            <p>
              Kazain HSE Advisory delivers premier Health, Safety, and Environmental consulting, ISO 45001/14001 certification guidance, process safety risk studies (HAZOP/QRA), and workplace risk auditing backed by over 35 Million Safe Man-Hours across the energy sector.
            </p>

            <Link href="/about-us/" className="home-hero-btn">
              <span>About Us</span>
              <i className="flaticon flaticon-right-up"></i>
            </Link>

            <div className="home-about-counters">
              <div className="home-counter-item">
                <h3>50<span className="suffix">+</span></h3>
                <p>Years of Advisory Excellence</p>
              </div>
              <div className="home-counter-item">
                <h3>35<span className="suffix">M+</span></h3>
                <p>Safe Man-Hours (Zero LTI)</p>
              </div>
              <div className="home-counter-item">
                <h3>500<span className="suffix">+</span></h3>
                <p>HAZOP &amp; Risk Workshops</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Divisions Overview */}
      <section style={{ padding: "60px 20px", background: "#F9FAFB" }}>
        <div style={{ maxWidth: "1340px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "1000px", margin: "0 auto 35px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1.2px",
                color: "#B88014",
                background: "rgba(255, 191, 67, 0.15)",
                padding: "6px 16px",
                borderRadius: "20px",
                display: "inline-block",
                marginBottom: "10px",
              }}
            >
              HSE Advisory Services
            </span>
            <h2 style={{ fontSize: "clamp(22px, 5vw, 36px)", fontWeight: "800", color: "#111827", margin: "0 0 10px", lineHeight: "1.25", wordBreak: "break-word", overflowWrap: "break-word" }}>
              Comprehensive Safety &amp; Risk Solutions
            </h2>
            <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: "1.6", margin: "0 auto", maxWidth: "700px" }}>
              Explore our core specialized divisions engineered to help operating companies uphold gold-standard safety and regulatory compliance.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px",
            }}
          >
            {SERVICES.map((svc) => (
              <div
                key={svc.id}
                style={{
                  background: "#ffffff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.35s ease",
                }}
              >
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <img
                    src={svc.image}
                    alt={svc.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="home-service-card-body" style={{ padding: "24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#111827",
                      margin: "0 0 10px",
                      lineHeight: "1.3",
                    }}
                  >
                    {svc.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#525252", lineHeight: "1.6", margin: "0 0 16px", flexGrow: 1 }}>
                    {svc.shortDesc}
                  </p>
                  <Link
                    href={`/services/${svc.slug}/`}
                    className="home-service-card-btn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 16px",
                      background: "#F9FAFB",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      color: "#111827",
                      fontWeight: "700",
                      fontSize: "13.5px",
                      textDecoration: "none",
                    }}
                  >
                    <span>Explore Division</span>
                    <i className="flaticon flaticon-right-arrow" style={{ color: "#FFBF43" }}></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our HSE Commitment & 4 Strategic Pillars (Pure Black Theme) */}
      <section className="home-commitment-section">
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div className="home-commitment-top-grid">
            <div className="home-commitment-img-wrap">
              <img
                src="/hse-commitment.jpg"
                alt="Kazain HSE Commitment"
                className="home-commitment-img"
              />
            </div>
            <div className="home-commitment-text-wrap">
              <span className="home-commitment-pill">
                Our HSE Commitment
              </span>
              <h2 className="home-commitment-title">
                Driving Zero Harm &amp; Total Regulatory Compliance
              </h2>
              <p className="home-commitment-desc">
                At Kazain HSE Advisory, we empower organizations to build zero-incident workplaces, achieve global ISO compliance, and implement sustainable environmental strategies across high-hazard industrial sectors.
              </p>
              <Link href="/contact-us/" className="home-hero-btn">
                <span>Request Consultation</span>
                <i className="flaticon flaticon-right-up"></i>
              </Link>
            </div>
          </div>

          <div className="home-commitment-cards-grid">
            {COMMITMENT_CARDS.map((card, idx) => (
              <div
                key={idx}
                className="home-commitment-card"
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "rgba(255, 191, 67, 0.12)",
                    border: "1px solid rgba(255, 191, 67, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "18px",
                  }}
                >
                  <i
                    className={`flaticon ${card.icon}`}
                    style={{ fontSize: "28px", color: "#FFBF43" }}
                  ></i>
                </div>
                <h5 style={{ fontSize: "18px", fontWeight: "700", color: "#FFFFFF", margin: "0 0 8px" }}>
                  {card.title}
                </h5>
                <p style={{ fontSize: "13.5px", color: "#9CA3AF", lineHeight: "1.55", margin: "0" }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Featured Case Studies & Audits */}
      <section style={{ padding: "60px 20px", background: "#F9FAFB" }}>
        <div style={{ maxWidth: "1340px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 35px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1.2px",
                color: "#B88014",
                background: "rgba(255, 191, 67, 0.15)",
                padding: "6px 16px",
                borderRadius: "20px",
                display: "inline-block",
                marginBottom: "10px",
              }}
            >
              Proven Track Record
            </span>
            <h2 style={{ fontSize: "clamp(22px, 5vw, 36px)", fontWeight: "800", color: "#111827", margin: "0 0 10px", lineHeight: "1.25", wordBreak: "break-word", overflowWrap: "break-word" }}>
              Featured HSE Case Studies &amp; Audits
            </h2>
            <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: "1.6", margin: "0" }}>
              Explore how we have engineered safety integrity and environmental resilience for leading regional operators.
            </p>
          </div>

          <div
            className="home-projects-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px",
            }}
          >
            {featuredProjects.map((p) => (
              <Link
                key={p.id}
                href={p.link}
                className="home-project-card"
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.35s ease",
                }}
              >
                <div style={{ height: "230px", overflow: "hidden" }}>
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="home-project-card-body" style={{ padding: "25px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "#B88014",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "8px",
                    }}
                  >
                    {p.client}
                  </span>
                  <h3
                    style={{
                      fontSize: "19px",
                      fontWeight: "800",
                      color: "#111827",
                      margin: "0 0 10px",
                      lineHeight: "1.35",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#525252",
                      lineHeight: "1.6",
                      margin: "0 0 18px",
                      flexGrow: 1,
                    }}
                  >
                    {p.desc}
                  </p>
                  <div
                    className="home-project-card-meta"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderTop: "1px solid #F5F5F5",
                      paddingTop: "14px",
                      fontSize: "13px",
                      color: "#4B5563",
                      fontWeight: "600",
                    }}
                  >
                    <span>
                      <i className="flaticon flaticon-location-1" style={{ color: "#FFBF43", marginRight: "6px" }}></i>
                      {p.location}
                    </span>
                    <span>
                      <i className="flaticon flaticon-project-management" style={{ color: "#FFBF43", marginRight: "6px" }}></i>
                      {p.contractType}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/projects/" className="home-hero-btn">
              <span>View All Case Studies</span>
              <i className="flaticon flaticon-right-up"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Certifications & Accreditations Section */}
      <section className="gasco-cert-section">
        <div className="gasco-cert-container">
          <div className="gasco-cert-text">
            <h6 className="gasco-cert-eyebrow">GLOBAL HSE ACCREDITATION &amp; GOVERNANCE</h6>
            <h2 className="gasco-cert-title">Certified Excellence in Risk &amp; Safety Management</h2>
            <p className="gasco-cert-desc">
              ISO 45001 (OH&amp;S), ISO 14001 (Environmental), and ISO 9001 (Quality) certified — applying internationally recognized governance frameworks and accredited risk management rigor to protect people, assets, and the environment.
            </p>
            <Link href="/accreditation/" className="home-hero-btn">
              <span>Explore Accreditations</span>
              <i className="flaticon flaticon-right-up"></i>
            </Link>
          </div>

          <div className="gasco-cert-right-wrap">
            <div className="gasco-cert-photos">
              <div className="gasco-cert-card">
                <img src="/certificates/1.PNG" alt="Kazain Certificate 1" className="gasco-cert-img" />
              </div>
              <div className="gasco-cert-card">
                <img src="/certificates/2.PNG" alt="Kazain Certificate 2" className="gasco-cert-img" />
              </div>
              <div className="gasco-cert-card">
                <img src="/certificates/3.PNG" alt="Kazain Certificate 3" className="gasco-cert-img" />
              </div>
            </div>
          </div>
        </div>

        {/* Marquee Slogans Track */}
        <div className="gasco-cert-slider-wrap">
          <div className="gasco-cert-slogans-track">
            {CERT_SLOGANS.concat(CERT_SLOGANS).map((slogan, idx) => (
              <div
                key={idx}
                className={`gasco-cert-slogan-item ${slogan.outlined ? "outlined" : ""}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59 59" width="36" height="36">
                  <path fill="#FFBF43" d="m31 29.5c34 19.6 18.1 35.5-1.5 1.5-19.6 34-35.5 18.1-1.5-1.5-34-19.6-18.1-35.5 1.5-1.5 19.6-34 35.5-18.1 1.5 1.5z"></path>
                </svg>
                <span>{slogan.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Homepage CTA Parity Section */}
      <section style={{ background: "#F9FAFB", padding: "60px 20px" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
            backgroundImage: "url('/about-us/footer.jpg')",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            borderRadius: "20px",
            overflow: "hidden",
            padding: "60px 24px",
            textAlign: "center",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(15, 20, 28, 0.65)",
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: "820px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(20px, 5vw, 38px)",
                fontWeight: "700",
                color: "#FFFFFF",
                margin: "0 0 24px",
                lineHeight: "1.25",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            >
              Partner With Kazain for Complete HSE &amp; Risk Management Solutions
            </h2>
            <Link
              href="/contact-us/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "#FFBF43",
                color: "#000000",
                fontSize: "13px",
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: "1px",
                padding: "16px 36px",
                borderRadius: "30px",
                textDecoration: "none",
                boxShadow: "0 4px 15px rgba(255, 191, 67, 0.35)",
              }}
            >
              <span>CONTACT US</span>
              <i className="flaticon flaticon-right-up"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
