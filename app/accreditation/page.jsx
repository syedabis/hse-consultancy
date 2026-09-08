import Link from "next/link";
import "./accreditation.css";

export const metadata = {
  title: "HSE Accreditation & Regulatory Approvals - Kazain Ventures",
  description: "Kazain holds ISO 45001 (OH&S), ISO 14001 (Environment), and ISO 9001 (Quality) accreditations alongside EPA regulatory clearances.",
};

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
  ];

  return (
    <div className="accred-page-wrapper">
      {/* Header Banner */}
      <div className="accred-header">
        <div className="accred-header-inner">
          <div className="accred-breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Accreditation</span>
          </div>
          <h1>HSE Accreditation & Regulatory Approvals</h1>
          <p>
            Kazain holds ISO 45001 (OH&S), ISO 14001 (Environment), and ISO 9001 (Quality)
            accreditations alongside EPA regulatory clearances for industrial safety and risk
            consultancy.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <section className="accred-section">
        <span className="accred-eyebrow">HSE Certifications</span>
        <h2>Our Regulatory Credentials</h2>
        <p className="accred-intro">
          Kazain operates under accredited management systems and regulatory clearances to
          deliver certified HSE advisory, process risk studies, and safety audits.
        </p>

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

      {/* Bottom CTA */}
      <section className="accred-cta-section">
        <div className="accred-cta-inner">
          <h2>Partner With Kazain for Your Next Project</h2>
          <Link href="/contact-us/" className="accred-cta-btn">
            <span>Contact Us</span>
            <i className="flaticon flaticon-right-up" />
          </Link>
        </div>
      </section>
    </div>
  );
}
