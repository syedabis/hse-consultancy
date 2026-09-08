"use client";

export default function StatsSection({
  statementHtml,
  stats = [],
}) {
  return (
    <section className="detail-statement-section">
      <div className="detail-container">
        {statementHtml && (
          <p
            className="detail-statement-text"
            dangerouslySetInnerHTML={{ __html: statementHtml }}
          />
        )}
        {stats && stats.length > 0 && (
          <div className="detail-stats-grid">
            {stats.map((item, idx) => (
              <div key={idx} className="detail-stat-box">
                <h2>{item.number}</h2>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
