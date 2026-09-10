import Link from "next/link";

export default function Footer() {
  return (
    <footer
      itemType="https://schema.org/WPFooter"
      itemScope
      id="colophon"
      role="contentinfo"
      className="site-footer"
      style={{
        background: "#0F141C",
        color: "#9CA3AF",
        borderTop: "1px solid #1F2937",
        fontFamily: "'Instrument Sans', sans-serif",
      }}
    >
      <div
        className="footer-inner-container"
        style={{
          maxWidth: "1340px",
          margin: "0 auto",
          padding: "70px 24px 35px",
        }}
      >
        {/* Main 4 Columns Grid */}
        <div
          className="footer-main-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "40px",
            alignItems: "start",
            marginBottom: "60px",
          }}
        >
          {/* Column 1: Logo & About Text */}
          <div className="footer-col footer-col-about" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="footer-logo-wrap" style={{ height: "42px", display: "flex", alignItems: "center" }}>
              <Link href="/" style={{ display: "inline-block" }}>
                <img
                  src="/kazain_ventures_Logo.png"
                  alt="Kazain Ventures Logo"
                  style={{ maxHeight: "38px", width: "auto", display: "block" }}
                />
              </Link>
            </div>
            <p className="footer-about-text" style={{ fontSize: "14.5px", color: "#9CA3AF", lineHeight: "1.65", margin: 0, maxWidth: "290px" }}>
              We’re your trusted HSE &amp; Environmental Risk Advisory partner across industrial and energy sectors.
            </p>
          </div>

          {/* Column 2: Address & Phone */}
          <div className="footer-col footer-col-address">
            <h4
              className="footer-col-head"
              style={{
                fontSize: "17px",
                fontWeight: "700",
                color: "#FFFFFF",
                margin: "0 0 20px 0",
                lineHeight: "1.3",
                letterSpacing: "0.2px",
              }}
            >
              Address
            </h4>
            <p style={{ fontSize: "14.5px", color: "#D1D5DB", lineHeight: "1.6", margin: "0 0 12px 0" }}>
              Dubai, United Arab Emirates
            </p>
            <a
              href="tel:+97145550000"
              style={{
                fontSize: "14.5px",
                fontWeight: "700",
                color: "#FFBF43",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              className="footer-link"
            >
              +971 4 555 0000
            </a>
          </div>

          {/* Column 3: Quick Links */}
          <div className="footer-col footer-col-links">
            <h4
              className="footer-col-head"
              style={{
                fontSize: "17px",
                fontWeight: "700",
                color: "#FFFFFF",
                margin: "0 0 20px 0",
                lineHeight: "1.3",
                letterSpacing: "0.2px",
              }}
            >
              Quick links
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              <li>
                <Link href="/about-us/" className="footer-link" style={{ fontSize: "14.5px", color: "#9CA3AF", textDecoration: "none" }}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services/" className="footer-link" style={{ fontSize: "14.5px", color: "#9CA3AF", textDecoration: "none" }}>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/sustainability/" className="footer-link" style={{ fontSize: "14.5px", color: "#9CA3AF", textDecoration: "none" }}>
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/digitalization/" className="footer-link" style={{ fontSize: "14.5px", color: "#9CA3AF", textDecoration: "none" }}>
                  Digitalization
                </Link>
              </li>
              <li>
                <Link href="/projects/" className="footer-link" style={{ fontSize: "14.5px", color: "#9CA3AF", textDecoration: "none" }}>
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact-us/" className="footer-link" style={{ fontSize: "14.5px", color: "#9CA3AF", textDecoration: "none" }}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="footer-col footer-col-support">
            <h4
              className="footer-col-head"
              style={{
                fontSize: "17px",
                fontWeight: "700",
                color: "#FFFFFF",
                margin: "0 0 20px 0",
                lineHeight: "1.3",
                letterSpacing: "0.2px",
              }}
            >
              Support
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              <li>
                <Link href="/about-us/" className="footer-link" style={{ fontSize: "14.5px", color: "#9CA3AF", textDecoration: "none" }}>
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/about-us/" className="footer-link" style={{ fontSize: "14.5px", color: "#9CA3AF", textDecoration: "none" }}>
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Divider & Social Icons Row */}
        <div
          className="footer-bottom-row"
          style={{
            borderTop: "1px solid #1F2937",
            paddingTop: "28px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <p style={{ fontSize: "13.5px", color: "#6B7280", margin: 0 }}>
            Copyright 2026 – All Rights Reserved By Kazain
          </p>

          <div className="footer-social-row" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {[
              { icon: "fab fa-facebook-f", href: "https://www.facebook.com/", label: "Facebook" },
              { icon: "fab fa-x-twitter", href: "https://x.com/", label: "Twitter" },
              { icon: "fab fa-instagram", href: "https://www.instagram.com/", label: "Instagram" },
              { icon: "fab fa-linkedin-in", href: "https://www.linkedin.com/", label: "LinkedIn" },
            ].map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="footer-social-btn"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "#1F2937",
                  border: "1px solid #374151",
                  color: "#FFBF43",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "15px",
                  textDecoration: "none",
                  transition: "all 0.35s ease",
                }}
              >
                <i className={s.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

