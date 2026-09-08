"use client";

import Link from "next/link";

export default function FeaturedProjects({
  eyebrow = "Proven Track Record",
  title = "Featured Projects",
  projects = [],
}) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="detail-projects-section">
      <div className="detail-container">
        <div className="detail-projects-head">
          {eyebrow && <span className="pill-badge">{eyebrow}</span>}
          <h2>{title}</h2>
        </div>

        <div className="detail-projects-grid">
          {projects.map((proj, idx) => {
            const cardContent = (
              <>
                <div className="detail-project-img">
                  <img src={proj.image} alt={proj.title} loading="lazy" />
                </div>
                <div className="detail-project-body">
                  {proj.tag && <span className="detail-project-tag">{proj.tag}</span>}
                  <h4>{proj.title}</h4>
                  {proj.desc && <p>{proj.desc}</p>}
                </div>
              </>
            );

            if (proj.link) {
              return (
                <Link key={idx} href={proj.link} className="detail-project-card">
                  {cardContent}
                </Link>
              );
            }

            return (
              <div key={idx} className="detail-project-card">
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
