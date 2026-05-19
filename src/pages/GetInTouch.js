import React, { useState } from "react";

function GetInTouch({ setActiveNav }) {
  const [isHovered, setIsHovered] = useState(false);

  const [isCardHovered, setIsCardHovered] = useState(false);
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
            onClick={() => setActiveNav && setActiveNav("Home")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          > 
            ←
          </button>
        </div>
        <div style={styles.badge}>
          <span style={styles.badgeDot} />
          Contact Us
        </div>
      </div>
      <h1 style={styles.title}>
        Get in <span style={styles.accent}>Touch</span>
      </h1>
      <div style={styles.titleUnderline} />

      <p style={styles.body}>
        We'd love to hear from you! Reach out to us for any inquiries,
        partnerships, or support regarding our agricultural innovations.
      </p>

      <div
        style={{ ...styles.card, ...(isCardHovered ? styles.cardHov : {}) }}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
      >
        <h3 style={styles.cardHeading}>Email</h3>
        <p style={styles.cardText}>hello@verdeversity.com</p>
        <h3 style={{ ...styles.cardHeading, marginTop: "16px" }}>Phone Number</h3>
        <p style={styles.cardText}>0927-427-9760</p>
        <h3 style={{ ...styles.cardHeading, marginTop: "16px" }}>Address</h3>
        <p style={styles.cardText}>Gov Pack Rd. Baguio City, <br />Benguet, 2600, Philippines</p>
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
    marginBottom: "20px",
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
    margin: "0 0 16px", // Adjusted margin to align with badge
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
  card: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: "20px",
    padding: "32px 40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 8px 24px rgba(0,0,0,0.15)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    width: "100%",
    maxWidth: "400px",
  },
  cardHov: {
    transform: "translateY(-6px) scale(1.03)",
    background: "rgba(255,255,255,0.18)",
    border: "1px solid rgba(255,255,255,0.30)",
    boxShadow:
      "inset 0 1.5px 0 rgba(255,255,255,0.35), " +
      "0 20px 48px rgba(0,0,0,0.30), " +
      "0 0 0 0.5px rgba(255,255,255,0.14)",
    transition: "transform 0.22s cubic-bezier(.34,1.56,.64,1), background 0.18s ease, box-shadow 0.22s ease, border-color 0.18s ease",
  },
  cardHeading: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#fff",
    margin: "0",
    letterSpacing: "-0.2px",
  },
  cardText: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.8)",
    margin: "0",
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
};

export default GetInTouch;
