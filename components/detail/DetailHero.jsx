"use client";

import Link from "next/link";

export default function DetailHero({
  eyebrow,
  titlePart1,
  titlePart2,
  badgeImage = "/gasco/epc-badge.svg",
  badgeAlt = "EPC Badge",
  ctaText = "Explore Services",
  ctaLink = "/contact-us/",
}) {
  return (
    <section className="detail-hero-section">
      <video
        className="detail-hero-video-bg"
        role="presentation"
        autoPlay
        muted
        playsInline
        loop
        src="/banner.mp4"
      />
      <div className="detail-hero-overlay" />
      <div className="detail-hero-inner">
        <div className="detail-hero-content">
          {eyebrow && <span className="detail-hero-eyebrow">{eyebrow}</span>}
          <h1 className="detail-hero-title">
            <span>{titlePart1}</span>
            {titlePart2 && <span className="title-accent">{titlePart2}</span>}
          </h1>
          {ctaLink && ctaText && (
            <Link href={ctaLink} className="detail-hero-cta">
              <span>{ctaText}</span>
              <i className="flaticon flaticon-right-up" />
            </Link>
          )}
        </div>

        {badgeImage && (
          <div className="detail-hero-badge">
            <Link href="/contact-us/" title="Contact Kazain">
              <img src={badgeImage} alt={badgeAlt} width={140} height={140} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
