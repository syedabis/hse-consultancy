"use client";

import "../../components/home/home.css";

const TICKER_LOGOS = [
  "/Client Logos/1.png",
  "/Client Logos/2.png",
  "/Client Logos/3.png",
  "/Client Logos/4.png",
  "/Client Logos/5.png",
  "/Client Logos/6.png",
  "/Client Logos/7.png",
  "/Client Logos/8.png",
  "/Client Logos/9.png",
  "/Client Logos/10.png",
  "/Client Logos/11.png",
  "/Client Logos/12.png",
  "/Client Logos/13.png",
  "/Client Logos/14.png",
];

export default function ClientMarquee() {
  return (
    <section className="home-ticker-section">
      <div className="home-ticker-container">
        <div className="home-ticker-flex">
          <div className="home-ticker-track">
            {TICKER_LOGOS.map((src, idx) => (
              <img key={`cli1-${idx}`} src={src} alt={`Client Logo ${idx + 1}`} />
            ))}
          </div>
          <div className="home-ticker-track" aria-hidden="true">
            {TICKER_LOGOS.map((src, idx) => (
              <img key={`cli2-${idx}`} src={src} alt={`Client Logo ${idx + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
