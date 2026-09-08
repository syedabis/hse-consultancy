"use client";

export default function MethodologyCarousel({
  eyebrow = "PROVEN DELIVERY FRAMEWORK",
  title = "Project Execution Methodology",
  desc = "Our integrated approach guarantees seamless delivery from concept through commissioning.",
  steps = [],
}) {
  return (
    <section className="detail-container">
      <div className="detail-methodology-section">
        <div className="detail-methodology-head">
          {eyebrow && <span className="step-eyebrow">{eyebrow}</span>}
          <h2>{title}</h2>
          {desc && <p>{desc}</p>}
        </div>

        <div className="detail-methodology-carousel-outer">
          <div className="detail-methodology-track">
            {/* First loop of 6 cards */}
            {steps.map((step, idx) => (
              <div key={`step-1-${idx}`} className="detail-method-card">
                <div className="step-num">{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
            {/* Second loop for infinite smooth continuous marquee */}
            {steps.map((step, idx) => (
              <div key={`step-2-${idx}`} className="detail-method-card" aria-hidden="true">
                <div className="step-num">{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
