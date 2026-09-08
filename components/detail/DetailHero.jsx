"use client";

import Link from "next/link";

export default function DetailHero({
  eyebrow,
  titlePart1,
  titlePart2,
  badgeImage = "/gasco/epc-badge.svg",
  badgeAlt = "HSE Risk Advisory",
  ctaText = "Explore Services",
  ctaLink = "/contact-us/",
}) {
  return (
    <section className="detail-hero-section">
      <video
        className="detail-hero-video-bg"
        autoPlay
        muted
        playsInline
        loop
        src="/banner.mp4"
      />

      <div className="detail-hero-content">
        {eyebrow && <span className="detail-subtitle-pill">{eyebrow}</span>}
        <h1 className="detail-hero-title-solid">{titlePart1}</h1>
        {titlePart2 && <h2 className="detail-hero-title-outlined">{titlePart2}</h2>}
        {ctaLink && ctaText && (
          <div>
            <Link href={ctaLink} className="detail-hero-btn">
              <span>{ctaText}</span>
              <i className="flaticon flaticon-right-up" />
            </Link>
          </div>
        )}
      </div>

      {badgeImage && (
        <div className="detail-rotating-badge">
          <Link href="/contact-us/">
            <img src={badgeImage} alt={badgeAlt} />
          </Link>
        </div>
      )}
    </section>
  );
}
