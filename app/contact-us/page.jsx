"use client";

import { useState } from "react";
import Link from "next/link";
import "./contact.css";

export default function ContactUsPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // null | "loading" | "success"

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setFormState({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    }, 800);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-page-root">
      {/* 1. Hero Section */}
      <section className="contact-hero-section">
        <video
          className="contact-hero-video-bg"
          autoPlay
          muted
          playsInline
          loop
          src="/banner.mp4"
        />

        <div className="contact-hero-content">
          <span className="contact-subtitle-pill">24/7 HSE Advisory &amp; Risk Support</span>
          <h1 className="contact-hero-title-solid">REQUEST AUDIT</h1>
          <h2 className="contact-hero-title-outlined">With Kazain HSE Advisory</h2>
          <div>
            <a href="#contact-form-section" className="contact-hero-btn">
              <span>REQUEST AUDIT</span>
              <i className="flaticon flaticon-right-up"></i>
            </a>
          </div>
        </div>

        <div className="contact-rotating-badge">
          <a href="#contact-form-section">
            <img src="/gasco/epc-badge.svg" alt="HSE Advisory" />
          </a>
        </div>
      </section>

      {/* 2. White Impact Statement & 4 Big Stats */}
      <section className="epc-statement-section">
        <div className="epc-statement-text">
          Kazain provides <span>24/7 specialized HSE consultancy</span> and{" "}
          <span>risk advisory</span> across industrial and energy sectors. Reach out to our
          expert team for <span>safety audits &amp; compliance management</span>.
        </div>
        <div className="epc-stats-grid">
          <div className="epc-stat-box">
            <h2>30+</h2>
            <p>Years Industry Experience</p>
          </div>
          <div className="epc-stat-box">
            <h2>24/7</h2>
            <p>HSE Incident Advisory</p>
          </div>
          <div className="epc-stat-box">
            <h2>100%</h2>
            <p>Regulatory Compliance</p>
          </div>
          <div className="epc-stat-box">
            <h2>500+</h2>
            <p>HAZOP &amp; Risk Audits</p>
          </div>
        </div>
      </section>

      {/* 4. Main Contact Form & Info Cards Section */}
      <section id="contact-form-section" className="gasco-contact-sec">
        <div className="gasco-contact-container">
          <div className="gasco-contact-grid">
            {/* Left: Info Cards */}
            <div className="gasco-contact-info-wrap">
              <div className="gasco-contact-card">
                <div className="gasco-contact-icon">
                  <i className="flaticon flaticon-phone"></i>
                </div>
                <div className="gasco-contact-card-content">
                  <h4>Phone Inquiry</h4>
                  <p>
                    <a href="tel:+97145550000">+971 4 555 0000</a>
                  </p>
                  <p style={{ fontSize: "13.5px", color: "#9CA3AF", marginTop: "4px" }}>
                    Mon - Sat: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>

              <div className="gasco-contact-card">
                <div className="gasco-contact-icon">
                  <i className="flaticon flaticon-email-3"></i>
                </div>
                <div className="gasco-contact-card-content">
                  <h4>Official Email</h4>
                  <p>
                    <a href="mailto:info@kazainventures.com">info@kazainventures.com</a>
                  </p>
                  <p style={{ fontSize: "13.5px", color: "#9CA3AF", marginTop: "4px" }}>
                    Fast response within 24 business hours
                  </p>
                </div>
              </div>

              <div className="gasco-contact-card">
                <div className="gasco-contact-icon">
                  <i className="flaticon flaticon-location-1"></i>
                </div>
                <div className="gasco-contact-card-content">
                  <h4>Head Office Location</h4>
                  <p>
                    <a
                      href="https://maps.app.goo.gl/RKvRodZG5vRKP8vY7"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Dubai, United Arab Emirates
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="gasco-contact-form-card">
              <h3>Request HSE Consultancy</h3>
              <p className="form-desc">
                Fill in your requirements below and our lead HSE consultant will contact you promptly.
              </p>

              {status === "success" && (
                <div
                  style={{
                    background: "#ECFDF5",
                    border: "1px solid #10B981",
                    color: "#065F46",
                    padding: "16px 20px",
                    borderRadius: "10px",
                    marginBottom: "24px",
                    fontWeight: "600",
                  }}
                >
                  Thank you for contacting Kazain! Your inquiry has been submitted successfully. Our team will get back to you shortly.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="gasco-form-row gasco-form-group">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="gasco-form-input"
                      placeholder="Your Full Name *"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="gasco-form-input"
                      placeholder="Email Address *"
                      required
                    />
                  </div>
                </div>

                <div className="gasco-form-row gasco-form-group">
                  <div>
                    <input
                      type="text"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="gasco-form-input"
                      placeholder="Phone Number *"
                      required
                    />
                  </div>
                  <div>
                    <select
                      name="service"
                      value={formState.service}
                      onChange={handleChange}
                      className="gasco-form-input"
                      required
                      style={{ cursor: "pointer" }}
                    >
                      <option value="" disabled>
                        Select HSE Service Category *
                      </option>
                      <option value="Process Safety & HAZOP">
                        Process Safety &amp; HAZOP / QRA
                      </option>
                      <option value="ISO 45001 / 14001 Certification">
                        ISO 45001 / 14001 Certification
                      </option>
                      <option value="Occupational Health & Hygiene">
                        Occupational Health &amp; Hygiene
                      </option>
                      <option value="Environmental Impact Assessment">
                        Environmental Impact (EIA / IEE)
                      </option>
                      <option value="Safety Audits & Incident RCA">
                        Safety Audits &amp; Incident RCA
                      </option>
                      <option value="HSE Training Academy">
                        HSE Training &amp; Workshops
                      </option>
                      <option value="General HSE Advisory">General HSE Advisory</option>
                    </select>
                  </div>
                </div>

                <div className="gasco-form-group">
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    className="gasco-form-textarea"
                    placeholder="Detail your facility, project, or audit requirements *"
                    required
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="gasco-form-submit-btn"
                    disabled={status === "loading"}
                  >
                    <span>{status === "loading" ? "Submitting..." : "Submit Inquiry"}</span>
                    <i className="flaticon flaticon-right-arrow"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Head Office Location Map Section */}
      <section className="gasco-map-sec">
        <div className="gasco-map-head">
          <span>Visit Our Offices</span>
          <h2>Kazain Regional Head Office Dubai</h2>
        </div>
        <div className="gasco-map-iframe-wrap">
          <iframe
            loading="lazy"
            src="https://maps.google.com/maps?q=Dubai,United%20Arab%20Emirates&t=m&z=12&output=embed"
            title="Kazain Ventures Head Office Dubai"
            aria-label="Kazain Ventures Head Office Dubai"
          />
        </div>
      </section>
    </div>
  );
}
