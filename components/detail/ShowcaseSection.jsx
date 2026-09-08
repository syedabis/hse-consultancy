"use client";

import Link from "next/link";

export default function ShowcaseSection({
  pill,
  title,
  paragraphs = [],
  image,
  imageAlt = "Showcase image",
  ctaText = "Request Proposal ↗",
  ctaLink = "/contact-us/",
  id = "showcase",
}) {
  return (
    <section className="detail-showcase-section" id={id}>
      <div className="detail-container">
        <div className="detail-showcase-grid">
          <div className="detail-showcase-img-card">
            <img src={image} alt={imageAlt} loading="lazy" />
          </div>
          <div className="detail-showcase-content">
            {pill && <span className="pill-badge">{pill}</span>}
            <h2>{title}</h2>
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            {ctaText && ctaLink && (
              <Link href={ctaLink} className="detail-showcase-btn">
                {ctaText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
