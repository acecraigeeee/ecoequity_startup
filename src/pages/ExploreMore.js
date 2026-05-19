import React, { useState } from "react";

function ExploreMore({ setActiveNav }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={styles.wrap}>
      <div style={styles.headerRow}>
        <div style={styles.backBtnWrap}>
          <button
            type="button"
            style={{
              ...styles.backBtn,
              ...(isHovered ? styles.backBtnHov : {}),
            }}
            onClick={() => setActiveNav && setActiveNav("Learn More")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          > 
            ←
          </button>
        </div>
        <div style={styles.badge}>
          <span style={styles.badgeDot} />
          Explore More
        </div>
      </div>

      <h1 style={styles.title}>
        Problem <span style={styles.accent}>Addressed</span>
      </h1>
      <div style={styles.titleUnderline} />

      <p style={styles.body}>
        Dive deeper into our platform's capabilities and discover how we are
        revolutionizing agriculture across the Philippines through sustainable practices.
      </p>

      <div style={styles.circleCol} data-testid="timeline-container">
        <div style={styles.timelineItem}>
          <div style={styles.circle}>1980</div>
          <div style={styles.timelineText}>
            <h3 style={styles.timelineHeading}>
              SHIFT FROM SELF-SUFFICIENCY TO IMPORT DEPENDENCY
            </h3>
            <p style={styles.timelineBody}>
              The Peso devaluation (1980s Debt Crisis) made imported inputs expensive, immediately followed by WTO liberalization (1995). This killed local farmer profitability and formally cemented the reliance on cheap rice imports.
            </p>
          </div>
        </div>
        <div style={styles.timelineItem}>
          <div style={styles.circle}>2000</div>
          <div style={styles.timelineText}>
            <h3 style={styles.timelineHeading}>
              WTO ACCESSION & TRADE LIBERALIZATION
            </h3>
            <p style={styles.timelineBody}>
              Cheap imports flooded the market, making local crops unprofitable. Policy formally shifted to Import-Based Security, severely reducing domestic food sufficiency.
            </p>
          </div>
        </div>
        <div style={styles.timelineItem}>
          <div style={styles.circle}>2010</div>
          <div style={styles.timelineText}>
            <h3 style={styles.timelineHeading}>
              GLOBAL PRICE SHOCKS & RAPID URBANIZATION
            </h3>
            <p style={styles.timelineBody}>
              Import dependency caused high USD rates to translate to inaccessible domestic food prices. Rapid conversion of farmland further reduced productive capacity, heightening scarcity in urban areas.
            </p>
          </div>
        </div>
        <div style={styles.timelineItem}>
          <div style={styles.circle}>2020</div>
          <div style={styles.timelineText}>
            <h3 style={styles.timelineHeading}>
              PANDEMIC & SUPPLY CHAIN FRAGILITY
            </h3>
            <p style={styles.timelineBody}>
              Global supply shocks demonstrated the inability to sustain the population without external aid. Chronic high food inflation coupled with low employment made food fundamentally unaffordable and inaccessible for many Filipinos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "32px 16px 24px",
    maxWidth: "820px",
    margin: "0 auto",
    animation: "fadeInUp 0.75s cubic-bezier(.22,1,.36,1) both",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
    marginBottom: "20px",
  },
  backBtnWrap: {
    position: "absolute",
    left: 0,
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
    maxWidth: "580px",
    marginBottom: "24px",
  },
  backBtn: {
    padding: "8px 16px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.88)",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    letterSpacing: "0.2px",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22), 0 4px 16px rgba(0,0,0,0.12)",
    transition: "background 0.16s ease, border-color 0.16s ease",
  },
  backBtnHov: {
    background: "rgba(255,255,255,0.18)",
    borderColor: "rgba(255,255,255,0.35)",
  },
  circleCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "center",
    gap: "24px",
    marginTop: "20px",
  },
  circle: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: 600,
    color: "#fff",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22), 0 8px 24px rgba(0,0,0,0.15)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    flexShrink: 0,
  },
  timelineItem: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    textAlign: "left",
  },
  timelineText: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    maxWidth: "500px",
  },
  timelineHeading: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#fff",
    margin: 0,
    letterSpacing: "-0.2px",
    lineHeight: 1.4,
  },
  timelineBody: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 1.6,
    margin: 0,
    textAlign: "left",
  },
};

export default ExploreMore;
