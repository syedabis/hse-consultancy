"use client";

import Link from "next/link";
import "./team.css";

const TEAM_MEMBERS = [
  {
    badge: "Executive Advisory",
    name: "Syed A. Hassan",
    role: "Executive Director - HSE Advisory & Risk Governance",
    bio: "Over 25 years of strategic leadership directing safety management, industrial compliance, and risk frameworks for high-hazard oil & gas and manufacturing facilities.",
    certs: ["ISO 45001 Lead Auditor", "NEBOSH Diploma", "NEBOSH / OSHA Certified"],
  },
  {
    badge: "Process Safety",
    name: "Dr. Tariq Mahmood",
    role: "Head of Process Safety Engineering",
    bio: "Specialist in Quantitative Risk Assessment (QRA), HAZOP/HAZID facilitation, SIL determination, and major accident prevention modeling for refinery operations.",
    certs: ["TÜV Functional Safety Expert", "HAZOP Chairman"],
  },
  {
    badge: "Occupational Health",
    name: "Farhan Siddiqui",
    role: "Principal Occupational Hygienist",
    bio: "Expert in workplace exposure assessments, ergonomics, industrial toxic substance monitoring, and noise/vibration compliance audits across industrial sectors.",
    certs: ["CIH Certified", "OSHA Master Trainer"],
  },
  {
    badge: "Environmental Advisory",
    name: "Ayesha Rehman",
    role: "Lead Environmental & Sustainability Consultant",
    bio: "Directs Environmental Impact Assessments (EIA), carbon footprint accounting, waste minimization strategies, and EPA regulatory clearance documentation.",
    certs: ["ISO 14001 Lead Auditor", "IEMA Registered"],
  },
  {
    badge: "Competency & Training",
    name: "Zubair Khan",
    role: "Head of Safety Training & Workforce Competency",
    bio: "Leads custom safety training programs, permit-to-work (PTW) certifications, defensive driving courses, and emergency response tactical exercises.",
    certs: ["NEBOSH IGC", "IOSH Approved Trainer"],
  },
  {
    badge: "Audit & Compliance",
    name: "Noman Ahmed",
    role: "Senior Risk & Compliance Auditor",
    bio: "Specializes in third-party safety management audits, gap analyses, contractor safety evaluations, and incident investigation reporting.",
    certs: ["ISO 19011 Auditor", "OSHA 30-Hour Lead"],
  },
];

const TESTIMONIALS = [
  {
    badge: "Refinery Operator",
    quote:
      "Kazain's HAZOP leadership and consequence modeling were pivotal during our plant debottlenecking. Their team identified latent safety gaps that saved both time and capital.",
    initials: "MA",
    author: "Engr. Muhammad Ali",
    title: "VP Technical Operations",
    org: "National Refinery Ltd.",
  },
  {
    badge: "E&P Operator",
    quote:
      "Achieving ISO 45001 and ISO 14001 certification across our remote drilling fields was made seamless by Kazain's structured auditing and field coaching methodology.",
    initials: "KR",
    author: "Kamran Rauf",
    title: "Head of Corporate HSE",
    org: "Regional Energy Corp",
  },
  {
    badge: "Chemical Manufacturing",
    quote:
      "The occupational hygiene and noise mapping study conducted by Kazain provided crystal-clear actionable recommendations that drastically enhanced worker wellbeing.",
    initials: "SN",
    author: "Saad Nazir",
    title: "Plant General Manager",
    org: "Petrochem Industries",
  },
];

export default function OurTeamPage() {
  return (
    <div className="team-page-root">
      {/* 1. Hero Section */}
      <section className="team-hero-section">
        <video
          className="team-hero-video-bg"
          autoPlay
          muted
          playsInline
          loop
          src="/banner.mp4"
        />

        <div className="team-hero-content">
          <span className="team-subtitle-pill">Technical Leadership &amp; Subject Matter Experts</span>
          <h1 className="team-hero-title-solid">Our Expert Advisory</h1>
          <h2 className="team-hero-title-outlined">Leadership Team</h2>
          <div>
            <a href="#team-grid-section" className="team-hero-btn">
              <span>Meet The Specialists</span>
              <i className="flaticon flaticon-right-up"></i>
            </a>
          </div>
        </div>

        <div className="team-rotating-badge">
          <a href="#team-grid-section">
            <img src="/gasco/epc-badge.svg" alt="HSE Advisory" />
          </a>
        </div>
      </section>

      {/* 2. Team Grid Section */}
      <section id="team-grid-section" className="gasco-team-section">
        <div className="gasco-team-container">
          <div className="team-grid">
            {TEAM_MEMBERS.map((member, idx) => (
              <div className="team-card" key={idx}>
                <div className="team-card-header">
                  <span className="team-badge">{member.badge}</span>
                  <h3>{member.name}</h3>
                  <span className="role">{member.role}</span>
                </div>
                <div className="team-card-body">
                  <p className="team-bio">{member.bio}</p>
                  <div className="team-certs">
                    <h5>Key Certifications</h5>
                    <div className="cert-tags">
                      {member.certs.map((c, i) => (
                        <span className="cert-tag" key={i}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Leadership Philosophy Section */}
      <section className="kazain-philosophy-section">
        <div className="kazain-philosophy-container">
          <div className="philosophy-grid">
            <div className="philosophy-content">
              <span className="section-tag-gold">Our Philosophy</span>
              <h2>Safety as a Core Value, Not Just a Policy</h2>
              <p>
                At Kazain, we believe that world-class HSE performance begins with empathetic, technically competent leadership. Our team members don't merely point out deficiencies; they partner with operators on the ground to devise practical, engineered solutions that protect personnel and enhance productivity.
              </p>
              <Link href="/contact-us/" className="team-hero-btn">
                <span>Partner With Our Experts</span>
                <i className="flaticon flaticon-right-up"></i>
              </Link>
            </div>

            <div className="philosophy-quote-card">
              <div className="quote-icon">&ldquo;</div>
              <div className="quote-text-inner">
                &ldquo;Engineering excellence is incomplete without uncompromising safety integrity. Every audit, workshop, and training session we deliver is dedicated to ensuring every worker returns home safely.&rdquo;
              </div>
              <div className="quote-author">
                <div className="author-info">
                  <h5>Syed A. Hassan</h5>
                  <span>Executive Director, Kazain Ventures</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Client Endorsements Section */}
      <section className="kazain-testimonials-section">
        <div className="kazain-testimonials-container">
          <div className="testimonials-header">
            <span className="section-tag-dark">Client Testimonials</span>
            <h2>Endorsed by Industrial Leaders</h2>
            <p>
              Discover how our specialized technical team empowers energy operators, chemical manufacturers, and industrial facilities to uphold gold-standard safety governance.
            </p>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, idx) => (
              <div className="testimonial-card" key={idx}>
                <span className="testimonial-badge">{t.badge}</span>
                <div className="testimonial-quote">&ldquo;{t.quote}&rdquo;</div>
                <div className="testimonial-client">
                  <div className="client-avatar">{t.initials}</div>
                  <div className="client-details">
                    <h5>{t.author}</h5>
                    <span>{t.title}</span>
                    <span className="client-org">{t.org}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
