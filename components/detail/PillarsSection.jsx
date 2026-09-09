"use client";

export default function PillarsSection({ eyebrow, title, pillars }) {
  if (!pillars || pillars.length === 0) return null;

  return (
    <section className="detail-pillars-section" style={{ padding: "80px 20px", background: "#000000" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "45px" }}>
          {eyebrow && (
            <span
              style={{
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1.2px",
                color: "#FFBF43",
                background: "rgba(255, 191, 67, 0.12)",
                border: "1px solid rgba(255, 191, 67, 0.3)",
                padding: "6px 16px",
                borderRadius: "20px",
                display: "inline-block",
                marginBottom: "16px",
              }}
            >
              {eyebrow}
            </span>
          )}
          {title && (
            <h2
              style={{
                fontSize: "36px",
                fontWeight: "800",
                color: "#FFFFFF",
                margin: "0",
                lineHeight: "1.2",
              }}
            >
              {title}
            </h2>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "30px",
          }}
        >
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderTop: "3px solid #FFBF43",
                borderRadius: "16px",
                padding: "32px 24px",
                backdropFilter: "blur(8px)",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#FFFFFF",
                  margin: "0 0 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <i className="flaticon flaticon-checked" style={{ color: "#FFBF43", fontSize: "20px" }}></i>
                {pillar.title}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {pillar.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    style={{
                      fontSize: "14.5px",
                      color: "#9CA3AF",
                      lineHeight: "1.6",
                      marginBottom: "12px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <i
                      className="flaticon flaticon-right-arrow"
                      style={{ color: "#FFBF43", fontSize: "14px", marginTop: "4px" }}
                    ></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
