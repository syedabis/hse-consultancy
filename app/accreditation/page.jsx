"use client";

import Link from "next/link";
import DetailHero from "../../components/detail/DetailHero";
import ClientMarquee from "../../components/detail/ClientMarquee";
import "../../components/detail/detail.css";
import "../about-us/about.css";
import "./accreditation.css";

export default function AccreditationPage() {
  const credentials = [
    {
      img: "/gasco/cert-iso-45001.jpg",
      alt: "Kazain ISO 45001:2018 certificate",
      title: "ISO 45001:2018",
      desc: "Occupational Health & Safety Management System",
    },
    {
      img: "/gasco/cert-iso-14001.jpg",
      alt: "Kazain ISO 14001:2015 certificate",
      title: "ISO 14001:2015",
      desc: "Environmental Management & Sustainability",
    },
    {
      img: "/gasco/cert-iso-9001.jpg",
      alt: "Kazain ISO 9001:2015 certificate",
      title: "ISO 9001:2015",
      desc: "Quality Governance & Audit Excellence",
    },
    {
      img: "/gasco/cert-pec.jpg",
      alt: "Kazain Professional Engineering Accreditation",
      title: "OSHA & EPA Compliant",
      desc: "Licensed Safety & Risk Consultancy",
    },
    {
      img: "/gasco/cert-iso-45001.jpg",
      alt: "COR Certificate of Recognition Canada",
      title: "COR™ Certified (Canada)",
      desc: "Certificate of Recognition (COR™) Safety Audit Clearance",
    },
    {
      img: "/gasco/cert-iso-9001.jpg",
      alt: "CCOHS Canadian Occupational Health & Safety",
      title: "CCOHS & OHS Canada",
      desc: "Canadian Occupational Health & Safety Regulation Compliance",
    },
    {
      img: "/gasco/cert-iso-14001.jpg",
      alt: "Canada Energy Regulator CER Infrastructure Risk Governance",
      title: "Canada Energy Regulator",
      desc: "Federal Energy Infrastructure & Pipeline Risk Governance",
    },
    {
      img: "/gasco/cert-pec.jpg",
      alt: "CRSP Board Certified Safety Professionals Canada",
      title: "CRSP® Board Certified",
      desc: "Board of Canadian Registered Safety Professionals",
    },
    {
      img: "/gasco/cert-iso-9001.jpg",
      alt: "Saudi Aramco CSMS Qualified Contractor",
      title: "Saudi Aramco CSMS",
      desc: "Category A Contractor Safety Management Approval",
    },
    {
      img: "/gasco/cert-iso-45001.jpg",
      alt: "NEBOSH & IOSH Approved Training Partner",
      title: "NEBOSH & IOSH Approved",
      desc: "Accredited Safety Training & Competency Partner",
    },
    {
      img: "/gasco/cert-iso-14001.jpg",
      alt: "TÜV Functional Safety Certification",
      title: "TÜV Functional Safety",
      desc: "IEC 61508 / 61511 Process Safety & SIL Assessment",
    },
    {
      img: "/gasco/cert-pec.jpg",
      alt: "NCEC Environmental Permit & Clearance",
      title: "NCEC Environmental Permit",
      desc: "Licensed Category A, B & C EIA Regulatory Clearance",
    },
  ];

  return (
    <div className="accred-page-wrapper">
      {/* 1. Video Hero Banner matching homepage */}
      <DetailHero
        eyebrow="ISO & REGULATORY COMPLIANCE STANDARDS"
        titlePart1="HSE ACCREDITATION &"
        titlePart2="Regulatory Approvals"
        ctaText="Explore Accreditations"
        ctaLink="#regulatory-credentials"
      />

      {/* 2. Valued Clients Marquee Ticker */}
      <ClientMarquee title="Our Valued Clients" />

      {/* 3. Overview & Impact Statistics */}
      <section className="gasco-impact-stats-section">
        <div className="gasco-impact-stats-container">
          <p className="gasco-impact-statement">
            At Kazain HSE Advisory, we are committed to revolutionizing workplace safety and environmental stewardship across the energy and industrial sectors. We combine{" "}
            <span className="muted-text">
              certified HAZOP chairpersons, ISO lead auditors, advanced dispersion modeling, and accredited training programs to achieve Target Zero Harm.
            </span>
          </p>

          <div className="gasco-impact-stats-grid">
            <div className="gasco-stat-item" style={{ textAlign: "center" }}>
              <div className="stat-number">35M+</div>
              <div className="stat-label">SAFE MAN-HOURS GUIDED</div>
            </div>
            <div className="gasco-stat-item" style={{ textAlign: "center" }}>
              <div className="stat-number">30+</div>
              <div className="stat-label">YEARS HSE EXPERIENCE</div>
            </div>
            <div className="gasco-stat-item" style={{ textAlign: "center" }}>
              <div className="stat-number">500+</div>
              <div className="stat-label">HAZOP &amp; RISK AUDITS</div>
            </div>
            <div className="gasco-stat-item" style={{ textAlign: "center" }}>
              <div className="stat-number">100%</div>
              <div className="stat-label">REGULATORY COMPLIANCE</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Main Regulatory Credentials Grid */}
      <section id="regulatory-credentials" className="accred-section">
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 50px" }}>
          <h2>Our Regulatory Credentials</h2>
          <p className="accred-intro" style={{ margin: "0 auto" }}>
            Kazain operates under accredited management systems and regulatory clearances to
            deliver certified HSE advisory, process risk studies, and safety audits.
          </p>
        </div>

        <div className="accred-grid">
          {credentials.map((c, idx) => (
            <div key={idx} className="accred-card">
              <a href={c.img} target="_blank" rel="noopener noreferrer">
                <img src={c.img} alt={c.alt} loading="lazy" />
              </a>
              <div className="accred-divider" />
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Bottom CTA Banner Section */}
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
