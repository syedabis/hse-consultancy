"use client";

export default function StatsSection({
  statementHtml,
  stats = [],
}) {
  if (!stats || stats.length === 0) return null;

  // Duplicate array for smooth continuous horizontal loop animation
  const loopedStats = [...stats, ...stats];

  return (
    <section className="detail-statement-section">
      <div className="detail-container">
        {statementHtml && (
          <p
            className="detail-statement-text"
            dangerouslySetInnerHTML={{ __html: statementHtml }}
          />
        )}
      </div>

      <div className="detail-stats-carousel-outer">
        <div className="detail-stats-track">
          {loopedStats.map((item, idx) => (
            <div key={idx} className="detail-stat-box">
              <h2>{item.number}</h2>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
