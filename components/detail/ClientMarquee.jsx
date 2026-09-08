"use client";

export default function ClientMarquee({ title = "Our Valued Clients" }) {
  const logos = Array.from({ length: 14 }, (_, i) => `/Client Logos/${i + 1}.png`);

  return (
    <section className="detail-marquee-section">
      <div className="detail-marquee-label">{title}</div>
      <div className="detail-marquee-track-wrapper">
        <div className="detail-marquee-track">
          {/* First loop */}
          {logos.map((src, idx) => (
            <div key={`logo-1-${idx}`} className="detail-marquee-item">
              <img src={src} alt={`Client logo ${idx + 1}`} loading="lazy" />
            </div>
          ))}
          {/* Second loop for infinite seamless scroll */}
          {logos.map((src, idx) => (
            <div key={`logo-2-${idx}`} className="detail-marquee-item" aria-hidden="true">
              <img src={src} alt={`Client logo ${idx + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
