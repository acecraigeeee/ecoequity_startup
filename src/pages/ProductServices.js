import React, { useState, useEffect } from "react";

const cards = [
  { heading: "Product", text: "• Organic Edibles: Local produce, herbs, organic kits. Floriculture, localized seeds.\n\n• AI Data Subscription: Premium 24/7 predictive diagnostics and localized weather alerts. Specialist Certification: Paid access to comprehensive courses.\n\n• Urban Starter Kits & Toolsets: Themed kits (e.g., Balcony Herb Garden, Tomato Success Kit), customized soil mixes, localized seeds, and basic tool sets." },
  { heading: "Services", text: "• 24/7 AI Plant Doctor, localized care guides tailored to Philippine climate and native crops.\n\n• Real-world event management, allowing users to RSVP to specialist workshops, trainings, and local venue gatherings.\n\n• Dedicated system for commercial farmers to list large-volume oversupply (surplus). Notifies institutional buyers (hotels, processors) for immediate purchase." },
  { heading: "Sector", text: "• Provides essential digital tools and localized data, supporting both urban farming and traditional farming centers during periods of oversupply.\n\n• Creates supplementary income streams for micro-vendors, directly addressing high unemployment/underemployment rates.\n\n• Offers a platform for standardized LGU urban farming training curricula and facilitates the distribution and tracking of native seed bank programs." },
];

function ProductServices() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = (e) => {
    if (!isMobile) return;
    const { scrollLeft, scrollWidth, clientWidth } = e.target;
    if (scrollWidth <= clientWidth) return;

    const ratio = scrollLeft / (scrollWidth - clientWidth);
    const index = Math.round(ratio * (cards.length - 1));

    if (index !== activeIndex && !isNaN(index)) {
      setActiveIndex(index);
    }
  };

  return (
    <div style={{ ...styles.wrap, ...(isMobile ? styles.wrapMobile : {}) }}>
      <style>
        {`
          .hide-scroll::-webkit-scrollbar { display: none; }
          .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      <div style={styles.badge}>
        <span style={styles.badgeDot} />
        What We Offer
      </div>

      <h1 style={{ ...styles.title, ...(isMobile ? styles.titleMobile : {}) }}>
        Product &amp; <span style={styles.accent}>Services</span>
      </h1>
      <div style={styles.titleUnderline} />

      <p style={{ ...styles.body, ...(isMobile ? styles.bodyMobile : {}) }}>
        EcoEquity offers a comprehensive suite of digital tools and resources
        to help you grow food, build community, and earn sustainably.
      </p>

      <div 
        style={{ ...styles.cardRow, ...(isMobile ? styles.cardRowMobile : {}) }} 
        className="hide-scroll"
        onScroll={handleScroll}
      >
        {cards.map((c) => (
          <div
            key={c.heading}
            style={{
              ...styles.card,
              ...(isMobile ? styles.cardMobile : {}),
              ...(hoveredCard === c.heading ? styles.cardHov : {}),
            }}
            onMouseEnter={() => setHoveredCard(c.heading)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h3 style={{ ...styles.cardHeading, ...(isMobile ? styles.cardHeadingMobile : {}) }}>{c.heading}</h3>
            <p style={{ ...styles.cardText, ...(isMobile ? styles.cardTextMobile : {}) }}>{c.text}</p>
          </div>
        ))}
      </div>

      {/* Scroll Indicator Dots - Mobile Only */}
      {isMobile && (
        <div style={styles.indicatorRow}>
          {cards.map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.dot,
                ...(activeIndex === i ? styles.dotActive : {}),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  wrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "8px 16px 20px",
    maxWidth: "1100px",
    margin: "0 auto",
    animation: "fadeInUp 0.75s cubic-bezier(.22,1,.36,1) both",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  wrapMobile: {
    padding: "12px 12px 24px",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    padding: "5px 14px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.13)",
    border: "none",
    fontSize: "11px",
    fontWeight: 600,
    color: "rgba(255,255,255,0.80)",
    letterSpacing: "0.6px",
    textTransform: "uppercase",
    marginBottom: "12px",
  },
  badgeDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#4ade80",
    boxShadow: "0 0 5px rgba(74,222,128,0.9)",
    display: "inline-block",
  },
  title: {
    fontSize: "clamp(32px, 4.5vw, 50px)",
    fontWeight: 700,
    color: "#fff",
    margin: "0 0 16px",
    lineHeight: 1.15,
    letterSpacing: "-0.8px",
    textShadow: "0 2px 20px rgba(0,0,0,0.35)",
    animation: "titleReveal 0.9s cubic-bezier(.22,1,.36,1) 0.15s both",
  },
  titleMobile: {
    fontSize: "clamp(26px, 7.5vw, 36px)",
  },
  titleUnderline: {
    width: "118px",
    height: "4px",
    background: "linear-gradient(90deg, rgba(74,222,128,0), #86efac, #7dd3fc, rgba(125,211,252,0))",
    margin: "0 auto 18px",
    boxShadow: "0 0 18px rgba(134,239,172,0.75)",
    borderRadius: "999px",
    animation: "titleReveal 0.9s cubic-bezier(.22,1,.36,1) 0.15s both",
  },
  accent: {
    background: "linear-gradient(90deg, #4ade80, #86efac)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  body: {
    color: "rgb(255, 255, 255)",
    fontSize: "clamp(14px, 1.5vw, 16px)",
    fontWeight: 400,
    lineHeight: 1.72,
    maxWidth: "680px",
    marginBottom: "12px",
  },
  bodyMobile: {
    fontSize: "13px",
    lineHeight: "1.6",
  },
  cardRow: {
    display: "flex",
    gap: "24px",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "stretch",
    marginTop: "4px",
    width: "100%",
  },
  cardRowMobile: {
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    overflowX: "auto",
    padding: "10px 40px 30px",
    gap: "20px",
    scrollSnapType: "x mandatory",
    scrollPadding: "0 40px",
    WebkitOverflowScrolling: "touch",
    alignItems: "stretch",
  },
  card: {
    background: "linear-gradient(150deg, rgba(255,255,255,0.17), rgba(255,255,255,0.07))",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: "16px",
    padding: "24px",
    flex: "1 1 300px",
    maxWidth: "340px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "left",
    gap: "8px",
    backdropFilter: "blur(20px) saturate(165%)",
    WebkitBackdropFilter: "blur(20px) saturate(165%)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.24), 0 16px 38px rgba(0,0,0,0.18)",
    cursor: "default",
    transition:
      "transform 0.22s cubic-bezier(.34,1.56,.64,1), " +
      "background 0.18s ease, " +
      "box-shadow 0.22s ease, " +
      "border-color 0.18s ease",
  },
  cardMobile: {
    flex: "0 0 280px",
    padding: "20px",
    scrollSnapAlign: "center",
    scrollSnapStop: "always",
  },

  cardHov: {
    transform: "translateY(-7px) scale(1.018)",
    background: "linear-gradient(150deg, rgba(255,255,255,0.23), rgba(255,255,255,0.105))",
    border: "1px solid rgba(255,255,255,0.28)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.32), 0 24px 52px rgba(0,0,0,0.28)",
  },
  cardHeading: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#fff",
    margin: "0",
    letterSpacing: "-0.2px",
  },
  cardHeadingMobile: {
    fontSize: "16px",
  },
  cardText: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 1.7,
    margin: "0",
    textAlign: "left",
    whiteSpace: "pre-line",
  },
  cardTextMobile: {
    fontSize: "12px",
    lineHeight: "1.5",
  },
  indicatorRow: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginTop: "0px",
    paddingBottom: "24px",
  },
  dot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.2)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  dotActive: {
    background: "#4ade80",
    transform: "scale(1.25)",
    boxShadow: "0 0 10px rgba(74, 222, 128, 0.4)",
  },
};

export default ProductServices;
