"use client";

import Link from "next/link";
import { SERVICES, METHODOLOGY_STEPS } from "../../data/services";
import { PROJECTS } from "../../data/projects";
import "./services.css";

const TICKER_LOGOS = [
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

export default function ServicesPage() {
  const flagshipProjects = PROJECTS.slice(0, 3);

  return (
    <div className="services-page-root">
      {/* 1. Hero Section */}
      <section className="services-hero-section">
        <video
          className="services-hero-video-bg"
          autoPlay
          muted
          playsInline
          loop
          src="/banner.mp4"
        />

        <div className="services-hero-content">
          <span className="services-subtitle-pill">Full-Scope HSE Consultancy</span>
          <h1 className="services-hero-title-solid">Process Safety, ISO Certification</h1>
          <h2 className="services-hero-title-outlined">&amp; Risk Advisory</h2>
          <div>
            <a href="#core-services-grid" className="services-hero-btn">
              <span>Explore Divisions</span>
              <i className="flaticon flaticon-right-up"></i>
            </a>
          </div>
        </div>

        <div className="services-rotating-badge">
          <a href="#core-services-grid">
            <img src="/gasco/epc-badge.svg" alt="HSE Advisory" />
          </a>
        </div>
      </section>

      {/* 2. Valued Clients Marquee Ticker */}
      <div
        style={{
          background: "#F8F7F0",
          borderTop: "1px solid #D9D9D9",
          borderBottom: "1px solid #D9D9D9",
          padding: "30px 0",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: "1340px", margin: "0 auto", padding: "0 20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "60px",
              overflow: "hidden",
              userSelect: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "60px",
                animation: "serviceTicker 25s linear infinite",
                flexShrink: 0,
                minWidth: "100%",
              }}
            >
              {TICKER_LOGOS.map((src, idx) => (
                <img
                  key={`srv-logo1-${idx}`}
                  src={src}
                  alt={`Client Logo ${idx + 1}`}
                  style={{ maxHeight: "42px", width: "auto", objectFit: "contain" }}
                />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "60px",
                animation: "serviceTicker 25s linear infinite",
                flexShrink: 0,
                minWidth: "100%",
              }}
              aria-hidden="true"
            >
              {TICKER_LOGOS.map((src, idx) => (
                <img
                  key={`srv-logo2-${idx}`}
                  src={src}
                  alt={`Client Logo ${idx + 1}`}
                  style={{ maxHeight: "42px", width: "auto", objectFit: "contain" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Six Core Divisions Section */}
      <div id="core-services-grid" style={{ background: "#ffffff", paddingTop: "40px" }}>
        <div className="gasco-svc-header">
          <span className="badge-pill">Six Strategic Pillars</span>
          <h2>Our Core HSE Consultancy Divisions</h2>
          <p>
            Providing expert Health, Safety &amp; Environmental risk management, ISO management system implementation, workplace hygiene, and compliance auditing for industrial and energy clients.
          </p>
        </div>

        <div className="gasco-svc-grid">
          {SERVICES.map((svc) => (
            <div className="gasco-svc-card" key={svc.id}>
              <div className="gasco-svc-card-img-wrap">
                <Link href={`/services/${svc.slug}/`}>
                  <img src={svc.image} alt={svc.title} loading="lazy" />
                </Link>
              </div>
              <div className="gasco-svc-card-body">
                <div>
                  <h3>{svc.title}</h3>
                  <p>{svc.shortDesc}</p>
                  <ul className="gasco-svc-highlights">
                    {svc.highlights.map((h, i) => (
                      <li key={i}>
                        <i className="flaticon flaticon-right-arrow"></i> {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link className="gasco-svc-more" href={`/services/${svc.slug}/`}>
                  <span>Explore Division</span>
                  <i className="flaticon flaticon-right-arrow"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. 5-Stage Consulting Methodology */}
      <section className="gasco-process-sec">
        <div className="sec-title">
          <span>Proven Risk Advisory Framework</span>
          <h2>5-Stage HSE &amp; Risk Consulting Methodology</h2>
          <p>
            Our structured 5-stage advisory framework ensures rigorous hazard identification, quantitative risk modeling, barrier implementation, and long-term compliance governance across complex energy operations.
          </p>
        </div>
        <div className="gasco-process-grid">
          {METHODOLOGY_STEPS.map((step) => (
            <div className="gasco-process-card" key={step.num}>
              <div className="gasco-process-num">{step.num}</div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Flagship Projects Showcase */}
      <section style={{ padding: "80px 20px", background: "#ffffff" }}>
        <div style={{ maxWidth: "1340px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span
              style={{
                fontSize: "13px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "1px",
                padding: "6px 18px",
                border: "1px solid #d1d5db",
                borderRadius: "50px",
                background: "#ffffff",
                color: "#374151",
                display: "inline-block",
                marginBottom: "12px",
              }}
            >
              Flagship Projects
            </span>
            <h2
              style={{
                fontSize: "42px",
                fontWeight: "700",
                color: "#111827",
                fontFamily: "'Instrument Sans', sans-serif",
                margin: "0",
              }}
            >
              Our Flagship Projects
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "30px",
            }}
          >
            {flagshipProjects.map((p) => (
              <Link
                key={p.id}
                href={p.link}
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
                <div style={{ height: "220px", overflow: "hidden" }}>
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
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
                      fontSize: "18px",
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
                      margin: "0 0 16px",
                      flexGrow: 1,
                    }}
                  >
                    {p.desc}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderTop: "1px solid #F5F5F5",
                      paddingTop: "12px",
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
        </div>
      </section>

      {/* 6. Homepage CTA Parity Section */}
      <section style={{ background: "#F9FAFB", padding: "80px 20px" }}>
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
            padding: "85px 40px",
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
                fontSize: "42px",
                fontWeight: "700",
                color: "#FFFFFF",
                margin: "0 0 32px",
                lineHeight: "1.25",
              }}
            >
              Partner With Kazain for Comprehensive HSE Solutions
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
