import React, { useEffect, useState } from "react";
import AboutUs from "./pages/AboutUs";
import OurTeam from "./pages/OurTeam";
import ProductServices from "./pages/ProductServices";
import TargetMarket from "./pages/TargetMarket";
import GetInTouch from "./pages/GetInTouch";
import LearnMore from "./pages/LearnMore";
import BenefitsOfTheProject from "./pages/BenefitsOfTheProject"; // Import the new component
import ExploreMore from "./pages/ExploreMore";
import TargetMarketExplore from "./pages/TargetMarketExplore";
import AIChatInterface from "./AIChatInterface";
import SustainabilityAppMarket from "./pages/SustainabilityAppMarket";

const navItems = ["Home", "About Us", "Product & Services", "Target Market", "Our Team"];

function App() {
  const [activeNav, setActiveNav] = useState("Home");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null); // State for navigation buttons
  const [btnHovered, setBtnHovered] = useState(false); // State for 'Get in Touch' button (reverted from previous change)
  const [ghostHovered, setGhostHovered] = useState(false); // State for 'Learn More' button
  const [exploreHovered, setExploreHovered] = useState(false); // State for 'Explore more' button
  const [chatHovered, setChatHovered] = useState(false); // State for 'Chat with AI' button
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showAIChat, setShowAIChat] = useState(false); // State for showing AI chat interface
  const [statsStripHovered, setStatsStripHovered] = useState(false); // State for the stats strip panel
  const [isTargetDropdownOpen, setIsTargetDropdownOpen] = useState(false); // State for Target Market dropdown
  const [hoveredDropdown, setHoveredDropdown] = useState(null); // State for hovering dropdown items
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false); // New state for Product & Services dropdown
  const [hoveredProductDropdown, setHoveredProductDropdown] = useState(null); // New state for Product & Services dropdown items

  useEffect(() => {
    // Dynamically set the favicon and title to the brand identity when the app loads
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = 'image/png';
    link.href = '/Eco.png';
    document.title = "EcoEquity.Inc";

    const handleResize = () => {
      const nextIsMobile = window.innerWidth < 768;
      setIsMobile(nextIsMobile);
      if (!nextIsMobile) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavChange = (navName) => {
    setActiveNav(navName);
    if (isMobile) {
      setIsMobileMenuOpen(false);
      setIsProductDropdownOpen(false);
      setIsTargetDropdownOpen(false);
    }
  };

  return (
    <div style={{ ...styles.page, ...(isMobile ? styles.pageMobile : {}) }}>
      {/* Video Background */}
      <video autoPlay loop muted playsInline style={styles.videoBackground}>
        <source src="/Green.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Background Scrim */}
      <div style={{
        ...styles.bgScrim,
        // Ensure the scrim is above the video but below other content
        zIndex: 1,
      }} />
      <div style={{ ...styles.shell, ...(isMobile ? styles.shellMobile : {}) }}>

        {/* ── NAVBAR ── */}
        <nav style={{ ...styles.navbar, ...(isMobile ? styles.navbarMobile : {}) }}>
          <div style={styles.logoWrap}>
            <img src="/Eco.png" alt="EcoEquity Inc Logo" style={{ ...styles.ecoLogo, ...(isMobile ? styles.ecoLogoMobile : {}) }} />
            <span style={{ ...styles.logoText, ...(isMobile ? styles.logoTextMobile : {}) }}>EcoEquity.Inc</span>
          </div> {/* End of logoWrap */}
          <button
            type="button"
            className="mobile-hamburger"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            style={{
              ...styles.hamburgerButton,
              ...(isMobileMenuOpen ? styles.hamburgerButtonActive : {}),
            }}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            <span style={{ ...styles.hamburgerLine, ...(isMobileMenuOpen ? styles.hamburgerLineTopOpen : {}) }} />
            <span style={{ ...styles.hamburgerLine, ...(isMobileMenuOpen ? styles.hamburgerLineMiddleOpen : {}) }} />
            <span style={{ ...styles.hamburgerLine, ...(isMobileMenuOpen ? styles.hamburgerLineBottomOpen : {}) }} />
          </button>
          {isMobileMenuOpen && (
            <button
              type="button"
              className="mobile-menu-backdrop"
              aria-label="Close navigation menu"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
          <div
            className={`nav-links-panel ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}
            style={{ ...styles.navLinks, ...(isMobile ? styles.navLinksMobile : {}), ...(isMobile && !isMobileMenuOpen ? styles.navLinksMobileHidden : {}) }}
          >
            {navItems.map((item) => {
              if (item === "Target Market") {
                const isTargetMarketActive = activeNav === "Target Market" || activeNav === "Target Market Explore" || activeNav === "Sustainability App Market";
                let targetMarketLabel = item;
                if (activeNav === "Target Market Explore") targetMarketLabel = "Distribution Channels and Acquisition Tactics";
                else if (activeNav === "Sustainability App Market") targetMarketLabel = "Sustainability App Market";

                return (
                  <div
                    key={item}
                    style={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      ...(isMobile ? styles.navDropdownWrapMobile : {}),
                    }}
                    onMouseEnter={() => !isMobile && setIsTargetDropdownOpen(true)}
                    onMouseLeave={() => !isMobile && setIsTargetDropdownOpen(false)} // Close dropdown on mouse leave for desktop
                  >
                    <button
                      type="button"
                      style={{
                        ...styles.linkBtn,
                        ...(isMobile ? styles.linkBtnMobile : {}),
                        ...(isTargetMarketActive ? styles.linkBtnActive : {}),
                        ...(hoveredNav === item && !isTargetMarketActive ? styles.linkBtnHover : {}),
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                        padding: "4px 6px 4px 14px"
                      }}
                      onClick={() => {
                        setActiveNav(item);
                        if (isMobile) { // Toggle dropdown on click for mobile
                          setIsTargetDropdownOpen(true);
                        }
                      }}
                      onMouseEnter={() => setHoveredNav(item)}
                      onMouseLeave={() => setHoveredNav(null)}
                    >
                      {targetMarketLabel}
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsTargetDropdownOpen(!isTargetDropdownOpen);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "6px",
                          marginLeft: "2px",
                          borderRadius: "50%",
                          background: isTargetDropdownOpen ? "rgba(255, 255, 255, 0.15)" : "transparent",
                          cursor: "pointer",
                          transition: "background 0.2s ease"
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            transform: isTargetDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s ease"
                          }}
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                    </button>

                    {isTargetDropdownOpen && (
                      <div style={{ 
                        position: isMobile ? "relative" : "absolute", 
                        top: isMobile ? "auto" : "100%", 
                        left: isMobile ? "auto" : "50%", 
                        transform: isMobile ? "none" : "translateX(-50%)", 
                        paddingTop: isMobile ? "0px" : "8px", 
                        zIndex: 100, 
                        width: isMobile ? "100%" : "auto" 
                      }}>
                        <div className="inner-blur-glass" style={{ ...styles.dropdownMenu, ...(isMobile ? styles.dropdownMenuMobile : {}) }}>
                        <button
                          type="button"
                          style={{
                            ...styles.dropdownItem,
                            ...(isMobile ? styles.dropdownItemMobile : {}),
                            ...(activeNav === "Target Market" ? styles.dropdownItemActive : {}),
                            ...(hoveredDropdown === "Overview" && activeNav !== "Target Market" ? styles.dropdownItemHover : {})
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveNav("Target Market");
                            setIsTargetDropdownOpen(false);
                            if (isMobile) setIsMobileMenuOpen(false);
                          }}
                          onMouseEnter={() => setHoveredDropdown("Overview")}
                          onMouseLeave={() => setHoveredDropdown(null)}
                        >
                          Overview
                        </button>
                        <button
                          type="button"
                          style={{
                            ...styles.dropdownItem,
                            ...(isMobile ? styles.dropdownItemMobile : {}),
                            ...(activeNav === "Target Market Explore" ? styles.dropdownItemActive : {}),
                            ...(hoveredDropdown === "Distribution Channels and Acquisition Tactics" && activeNav !== "Target Market Explore" ? styles.dropdownItemHover : {})
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveNav("Target Market Explore");
                            setIsTargetDropdownOpen(false);
                            if (isMobile) setIsMobileMenuOpen(false);
                          }}
                          onMouseEnter={() => setHoveredDropdown("Distribution Channels and Acquisition Tactics")}
                          onMouseLeave={() => setHoveredDropdown(null)}
                        >
                          Distribution Channels and Acquisition Tactics
                        </button>
                        <button
                          type="button"
                          style={{
                            ...styles.dropdownItem,
                            ...(isMobile ? styles.dropdownItemMobile : {}),
                            ...(activeNav === "Sustainability App Market" ? styles.dropdownItemActive : {}),
                            ...(hoveredDropdown === "Sustainability" && activeNav !== "Sustainability App Market" ? styles.dropdownItemHover : {})
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveNav("Sustainability App Market");
                            setIsTargetDropdownOpen(false);
                            if (isMobile) setIsMobileMenuOpen(false);
                          }}
                          onMouseEnter={() => setHoveredDropdown("Sustainability")}
                          onMouseLeave={() => setHoveredDropdown(null)}
                        >
                          Sustainability App Market
                        </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              } else if (item === "Product & Services") { // Product & Services Dropdown
                const isProductServicesActive = activeNav === "Product & Services" || activeNav === "Benefits of the Project";

                let productServicesLabel = item;
                if (activeNav === "Benefits of the Project") {
                  productServicesLabel = "Benefits of the Project";
                }
                return (
                  <div
                    key={item}
                    style={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      ...(isMobile ? styles.navDropdownWrapMobile : {}),
                    }}
                    onMouseEnter={() => !isMobile && setIsProductDropdownOpen(true)}
                    onMouseLeave={() => !isMobile && setIsProductDropdownOpen(false)} // Close dropdown on mouse leave for desktop
                  >
                    <button
                      type="button"
                      style={{
                        ...styles.linkBtn,
                        ...(isMobile ? styles.linkBtnMobile : {}),
                        ...(isProductServicesActive ? styles.linkBtnActive : {}),
                        ...(hoveredNav === item && !isProductServicesActive ? styles.linkBtnHover : {}),
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                        padding: "4px 6px 4px 14px"
                      }}
                      onClick={() => {
                        setActiveNav(item); // Default to the main Product & Services page
                        if (isMobile) { // Toggle dropdown on click for mobile
                          setIsProductDropdownOpen(true);
                        }
                      }}
                      onMouseEnter={() => setHoveredNav(item)}
                      onMouseLeave={() => setHoveredNav(null)}
                    >
                      {productServicesLabel} {/* Display "Benefits of the Project" if active, otherwise "Product & Services" */}
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsProductDropdownOpen(!isProductDropdownOpen);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "6px",
                          marginLeft: "2px",
                          borderRadius: "50%",
                          background: isProductDropdownOpen ? "rgba(255, 255, 255, 0.15)" : "transparent",
                          cursor: "pointer",
                          transition: "background 0.2s ease"
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            transform: isProductDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s ease"
                          }}
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                    </button>

                    {isProductDropdownOpen && (
                      <div style={{ 
                        position: isMobile ? "relative" : "absolute", 
                        top: isMobile ? "auto" : "100%", 
                        left: isMobile ? "auto" : "50%", 
                        transform: isMobile ? "none" : "translateX(-50%)", 
                        paddingTop: isMobile ? "0px" : "8px", 
                        zIndex: 100, 
                        width: isMobile ? "100%" : "auto" 
                      }}>
                        <div className="inner-blur-glass" style={{ ...styles.dropdownMenu, ...(isMobile ? styles.dropdownMenuMobile : {}) }}>
                          <button
                            type="button"
                            style={{
                              ...styles.dropdownItem,
                              ...(isMobile ? styles.dropdownItemMobile : {}),
                              ...(activeNav === "Product & Services" ? styles.dropdownItemActive : {}),
                              ...(hoveredProductDropdown === "Overview" && activeNav !== "Product & Services" ? styles.dropdownItemHover : {})
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveNav("Product & Services");
                              setIsProductDropdownOpen(false);
                              if (isMobile) setIsMobileMenuOpen(false);
                            }}
                            onMouseEnter={() => setHoveredProductDropdown("Overview")}
                            onMouseLeave={() => setHoveredProductDropdown(null)}
                          >
                            Overview
                          </button>
                          <button
                            type="button"
                            style={{
                              ...styles.dropdownItem,
                              ...(isMobile ? styles.dropdownItemMobile : {}),
                              ...(activeNav === "Benefits of the Project" ? styles.dropdownItemActive : {}),
                              ...(hoveredProductDropdown === "Benefits of the Project" && activeNav !== "Benefits of the Project" ? styles.dropdownItemHover : {})
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveNav("Benefits of the Project");
                              setIsProductDropdownOpen(false);
                              if (isMobile) setIsMobileMenuOpen(false);
                            }}
                            onMouseEnter={() => setHoveredProductDropdown("Benefits of the Project")}
                            onMouseLeave={() => setHoveredProductDropdown(null)}
                          >
                            Benefits of the Project
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return ( // Regular navigation items
                <button
                  key={item}
                  type="button"
                  style={{
                    ...styles.linkBtn,
                    ...(isMobile ? styles.linkBtnMobile : {}),
                    ...(activeNav === item ? styles.linkBtnActive : {}),
                    ...(hoveredNav === item && activeNav !== item ? styles.linkBtnHover : {}),
                  }}
                  onClick={() => handleNavChange(item)}
                  onMouseEnter={() => setHoveredNav(item)}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </nav>

        {/* ── PAGE CONTENT ── */}
        {activeNav === "Home" && (
          <div style={{ ...styles.hero, ...(isMobile ? styles.heroMobile : {}) }}>
            {/* Badge */}
            <div className="inner-blur-glass glass-hover-zoom-sm" style={{ ...styles.badge, ...(isMobile ? styles.badgeMobile : {}) }}>
              <span style={styles.badgeDot} />
              <span style={styles.glassContentLayer}>Agricultural Innovation · Philippines</span>
            </div>

            <h1 style={{ ...styles.title, ...(isMobile ? styles.titleMobile : {}) }}>
              {isMobile ? (
                <>
                  Grow Food.
                  <br />
                  <span style={styles.titleAccent}>Build</span>
                  <br />
                  <span style={styles.titleAccent}>Community.</span>
                  <br />
                  Earn Sustainably.
                </>
              ) : (
                <>
                  Grow Food.{" "}
                  <span style={styles.titleAccent}>Build Community.</span>
                  {"\n"}Earn Sustainably.
                </>
              )}
            </h1>
            <div style={{ ...styles.titleUnderline, ...(isMobile ? styles.titleUnderlineMobile : {}) }}></div> {/* The new small, centered green line */}
            <p style={{ ...styles.body, ...(isMobile ? styles.bodyMobile : {}) }}>
              EcoEquity is a digital-first, high-engagement platform designed to boost
              agricultural self-sufficiency in the Philippines — starting at the household
              and community level.
            </p>
            <div style={{ ...styles.ctaRow, ...(isMobile ? styles.ctaRowMobile : {}) }}>
              <button
                type="button"
                style={{
                  ...styles.primaryBtn,
                  ...(isMobile ? styles.responsiveBtnMobile : {}), // Apply responsive styles if mobile
                  ...(btnHovered ? styles.primaryBtnHov : {}), // Apply hover styles if button is hovered
                }}
                onClick={() => handleNavChange("Contact")}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
              >
                <span aria-hidden="true" style={styles.primaryInnerBlur} />
                <span style={styles.glassContentLayer}>Get in Touch</span>
              </button>
              <button
                type="button"
                style={{
                  ...styles.glassBtn,
                  ...(isMobile ? styles.responsiveBtnMobile : {}),
                  ...(ghostHovered ? styles.glassBtnHov : {}),
                }}
                onClick={() => handleNavChange("Learn More")}
                onMouseEnter={() => setGhostHovered(true)}
                onMouseLeave={() => setGhostHovered(false)}
              >
                <span aria-hidden="true" style={styles.glassInnerBlur} />
                <span style={styles.glassContentLayer}>Learn More</span>
              </button>
            </div>
            <div style={{ ...styles.cardRow, ...(isMobile ? styles.cardRowMobile : {}) }}>
              {[
                { icon: <img src="/2.png" alt="Organic Marketplace" style={{ width: isMobile ? '34px' : '58px', height: isMobile ? '34px' : '58px', display: 'block' }} />, heading: "Organic Edibles", text: "Organic Edibles: Local produce, herbs, organic kits. Floriculture, localized seeds." },
                { icon: <img src="/1.png" alt="AI Plant Doctor" style={{ width: isMobile ? '34px' : '58px', height: isMobile ? '34px' : '58px', display: 'block' }} />, heading: "AI Plant Doctor", text: "24/7 AI Plant Doctor, localized care guides tailored to Philippine climate and native crops." }, // Changed alt text for clarity
                { icon: <img src="/3.png" alt="Community Hub" style={{ width: isMobile ? '34px' : '58px', height: isMobile ? '34px' : '58px', display: 'block' }} />, heading: "Community Hub", text: "Provides essential digital tools and localized data, supporting both urban farming and traditional farming centers during periods of oversupply." },
              ].map((c) => (
                <div
                  key={c.heading}
                  style={{
                    ...styles.card, // Apply base card styles
                    ...(isMobile ? styles.cardMobile : {}), // Apply mobile-specific card styles
                    ...(hoveredCard === c.heading ? styles.cardHov : {}),
                  }}
                  onMouseEnter={() => setHoveredCard(c.heading)}
                  onMouseLeave={() => setHoveredCard(null)}
                > 
                  <span aria-hidden="true" style={styles.cardInnerBlur} />
                  <span style={{ ...styles.cardContentLayer, ...styles.cardIcon, ...(isMobile ? styles.cardIconMobile : {}) }}>
                    {c.icon}</span>
                  {c.heading && <h3 style={{ ...styles.cardContentLayer, ...styles.cardHeading, ...(isMobile ? styles.cardHeadingMobile : {}) }}>{c.heading}</h3>}
                  {c.text && <p style={{ ...styles.cardContentLayer, ...styles.cardText, ...(isMobile ? styles.cardTextMobile : {}) }}>{c.text}</p>}
                </div>
              ))}
            </div>

            {/* Horizontal Glass Panel with new stats */}
            <div
              style={{
                ...styles.statsStrip,
                marginTop: '25px', // Moved up further
                ...(isMobile ? styles.statsStripMobile : {}),
                ...(statsStripHovered ? styles.statsStripHov : {}) }}
              onMouseEnter={() => setStatsStripHovered(true)}
              onMouseLeave={() => setStatsStripHovered(false)}
            >
              <span aria-hidden="true" style={styles.glassInnerBlur} />
              {[
                { value: "98%", label: "Company Growth" },
                { value: "99+", label: "Partners" },
                { value: "1000+", label: "Customers" },
              ].map((s, i, arr) => (
                <div
                  key={s.label}
                  style={{
                    ...styles.statCell, // Apply base stat cell styles
                    ...(i < arr.length - 1 ? (isMobile ? styles.statCellDividerMobile : styles.statCellDivider) : {}), // Apply mobile divider style
                  }}
                >
                  <span style={styles.statVal}>{s.value}</span>
                  <span style={styles.statLbl}>{s.label}</span>
                </div>
              ))}
            </div>

          </div>
        )}
        {/* Chat with AI Button */}
        {activeNav === "Home" && (
          <button
            type="button"
            style={{
              ...styles.glassBtn,
              ...styles.chatWithAiBtn,
              ...(isMobile ? styles.chatWithAiBtnMobile : {}),
              ...(chatHovered ? styles.glassBtnHov : {}),
            }}
            onClick={() => setShowAIChat(true)}
            onMouseEnter={() => setChatHovered(true)}
            onMouseLeave={() => setChatHovered(false)}
          >
            <span aria-hidden="true" style={styles.glassInnerBlur} />
            <span style={styles.glassContentLayer}>Chat with AI</span>
          </button>
        )}

        {activeNav !== "Home" && (
          <div
            style={{
              ...styles.pageContent,
              ...((activeNav === "Target Market" || 
                   activeNav === "Target Market Explore" || 
                   activeNav === "Product & Services" || 
                   activeNav === "Benefits of the Project" ||
                   (isMobile && activeNav === "About Us")) && 
                   { overflowY: "hidden" }),
            }}
          >
            {activeNav === "About Us" && <AboutUs />}
            {activeNav === "Product & Services" && <ProductServices />}
            {activeNav === "Target Market" && <TargetMarket />}
            {activeNav === "Our Team" && <OurTeam />}
            {activeNav === "Contact" && <GetInTouch setActiveNav={setActiveNav} />}
            {activeNav === "Learn More" && <LearnMore setActiveNav={setActiveNav} />}
            {activeNav === "Explore More" && <ExploreMore setActiveNav={setActiveNav} />}
            {activeNav === "Target Market Explore" && <TargetMarketExplore />}
            {activeNav === "Sustainability App Market" && <SustainabilityAppMarket />}
            {activeNav === "Benefits of the Project" && <BenefitsOfTheProject />}
          </div>
        )}
        {showAIChat && (
          <AIChatInterface onClose={() => setShowAIChat(false)} isMobile={isMobile} />
        )}

        {activeNav === "Learn More" && (
          <button
            type="button"
            style={{
              ...styles.glassBtn,
              ...styles.exploreMoreBtn,
              ...(isMobile ? styles.exploreMoreBtnMobile : {}),
              ...(exploreHovered ? styles.glassBtnHov : {}),
            }}
            onClick={() => setActiveNav("Explore More")}
            onMouseEnter={() => setExploreHovered(true)}
            onMouseLeave={() => setExploreHovered(false)}
          >
            <span aria-hidden="true" style={styles.glassInnerBlur} />
            <span style={styles.glassContentLayer}>Explore more</span>
          </button>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
const styles = {
 
  page: {
    height: "100vh",
    padding: "20px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
    color: "#fff",
    // Removed backgroundImage and backgroundSize as video will be used
    // backgroundImage: "url('/IMG_6223.jpeg')",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },

  pageMobile: {
    minHeight: "100dvh",
    height: "100dvh",
    padding: 0,
    alignItems: "stretch",
    justifyContent: "center",
    overflowX: "hidden",
  },

  videoBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0, // Ensure video is behind other content
  },

  bgScrim: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at 18% 12%, rgba(134,239,172,0.22), transparent 30%), " +
      "radial-gradient(circle at 82% 18%, rgba(125,211,252,0.18), transparent 28%), " +
      "linear-gradient(140deg, rgba(3,20,16,0.72) 0%, rgba(6,30,24,0.50) 45%, rgba(1,13,10,0.76) 100%)",
    pointerEvents: "none",
    // zIndex is set inline in the component to ensure it's above the video
    // but below the shell content.
  },

  shell: {
    background:
      "linear-gradient(145deg, rgba(255,255,255,0.18), rgba(255,255,255,0.075))",
    border: "1px solid rgba(255,255,255,0.24)",
    boxShadow:
      "0 40px 110px rgba(0,0,0,0.48), " +
      "inset 0 1px 0 rgba(255,255,255,0.34), " +
      "inset 0 -1px 0 rgba(255,255,255,0.08)",
    maxWidth: "1160px",
    width: "100%",
    height: "calc(100vh - 40px)",
    margin: "0 auto",
    borderRadius: "30px",
    padding: "28px clamp(20px, 4vw, 52px)",
    position: "relative",
    zIndex: 2,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backdropFilter: "blur(24px) saturate(155%)",
    WebkitBackdropFilter: "blur(24px) saturate(155%)",
  },

  shellMobile: {
    height: "calc(100dvh - clamp(8px, 2dvh, 16px))",
    width: "calc(100vw - clamp(18px, 6vw, 48px))",
    maxWidth: "430px",
    minWidth: 0,
    margin: "clamp(4px, 1dvh, 8px) auto 0",
    borderRadius: "clamp(18px, 5vw, 24px)",
    padding: "clamp(7px, 1.3dvh, 11px) clamp(10px, 3.5vw, 16px) clamp(10px, 1.8dvh, 14px)",
    overflowY: "auto",
    overflowX: "hidden",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 16px 10px 14px",
    borderRadius: "999px",
    background: "transparent",
    border: "none",
    boxShadow: "none",
    marginBottom: "0",
  },

  navbarMobile: {
    flexDirection: "row",
    alignItems: "center",
    gap: "clamp(6px, 2vw, 10px)",
    borderRadius: "20px",
    padding: "0 2px clamp(4px, 1dvh, 7px)",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },

  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  logoLeaf: {
    fontSize: "19px",
    lineHeight: 1,
  },

  logoText: {
    fontSize: "24px",
    fontWeight: 700,
    letterSpacing: "0",
    background: "linear-gradient(90deg, #86efac, #7dd3fc)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textShadow: "0 8px 26px rgba(0,0,0,0.28)",
  },
  logoTextMobile: { // New mobile style for logoText
    fontSize: "clamp(15px, 4.4vw, 18px)",
    fontWeight: 700,
  },

  ecoLogo: {
    height: "54px",
    width: "auto",
    // Removed marginRight as gap in logoWrap will handle spacing
  },
  ecoLogoMobile: { // New mobile style for ecoLogo
    height: "clamp(32px, 9vw, 40px)",
  },

  hamburgerButton: {
    position: "relative",
    zIndex: 2000,
    width: "clamp(34px, 9vw, 40px)",
    height: "clamp(34px, 9vw, 40px)",
    marginLeft: "auto",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.22)",
    background: "rgba(255,255,255,0.12)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
    cursor: "pointer",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.24), 0 10px 24px rgba(0,0,0,0.18)",
    backdropFilter: "blur(16px) saturate(160%)",
    WebkitBackdropFilter: "blur(16px) saturate(160%)",
  },
  hamburgerButtonActive: {
    background: "rgba(134,239,172,0.18)",
    border: "1px solid rgba(134,239,172,0.32)",
  },
  hamburgerLine: {
    width: "18px",
    height: "2px",
    borderRadius: "999px",
    background: "#ffffff",
    transition: "transform 0.18s ease, opacity 0.18s ease",
  },
  hamburgerLineTopOpen: {
    transform: "translateY(7px) rotate(45deg)",
  },
  hamburgerLineMiddleOpen: {
    opacity: 0,
  },
  hamburgerLineBottomOpen: {
    transform: "translateY(-7px) rotate(-45deg)",
  },

  navLinks: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  navLinksMobile: {
    width: "100%",
    flexDirection: "column",
    alignItems: "stretch",
    gap: "8px",
    padding: "10px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.16)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 16px 34px rgba(0,0,0,0.18)",
    backdropFilter: "blur(18px) saturate(160%)",
    WebkitBackdropFilter: "blur(18px) saturate(160%)",
  },

  navLinksMobileHidden: {
    display: "none",
  },

  navDropdownWrapMobile: {
    width: "100%",
    alignItems: "stretch",
  },

  linkBtn: {
    cursor: "pointer", 
    fontSize: "13px", 
    fontWeight: 600,
    color: "rgba(255,255,255,0.72)",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid transparent",
    fontFamily: "inherit",
    transition: "color 0.15s ease, background 0.15s ease, border-color 0.15s ease, transform 0.15s ease",
  },

  linkBtnMobile: {
    width: "100%",
    justifyContent: "center",
    minHeight: "42px",
  },

  linkBtnActive: {
    background: "rgba(255,255,255,0.22)",
    border: "1px solid rgba(255,255,255,0.22)",
    color: "#fff",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.32), 0 8px 22px rgba(0,0,0,0.16)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
  },

  linkBtnHover: {
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.14)",
    color: "rgba(255,255,255,0.88)",
    transform: "translateY(-1px)",
  },

  pageContent: { 
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    marginTop: "14px",
    borderRadius: "20px",
  },

  hero: {
    width: "100%",
    maxWidth: "820px",
    margin: "clamp(20px, 5vh, 48px) auto 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    animation: "fadeInUp 0.85s cubic-bezier(.22,1,.36,1) both",
  },

  heroMobile: {
    maxWidth: "100%",
    minWidth: 0,
    margin: "clamp(12px, 3dvh, 26px) auto 0",
    padding: "0 2px clamp(10px, 2dvh, 20px)",
    overflowX: "hidden",
  },

  badge: { 
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    padding: "7px 15px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.14)",
    border: "1px solid rgba(255,255,255,0.22)",
    fontSize: "11px",
    fontWeight: 600,
    color: "rgba(255,255,255,0.80)",
    letterSpacing: "0.6px",
    textTransform: "uppercase",
    marginBottom: "22px",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.24), 0 10px 28px rgba(0,0,0,0.16)",
    backdropFilter: "blur(18px) saturate(160%)",
    WebkitBackdropFilter: "blur(18px) saturate(160%)",
  },

  badgeMobile: {
    maxWidth: "100%",
    padding: "clamp(4px, 0.8dvh, 6px) clamp(8px, 2.6vw, 12px)",
    fontSize: "clamp(8px, 2.5vw, 10px)",
    whiteSpace: "nowrap",
    marginBottom: "clamp(6px, 1.3dvh, 12px)",
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
    fontSize: "clamp(24px, 3.2vw, 38px)",
    fontWeight: 800,
    color: "#fff",
    margin: "0 0 10px",
    fontFamily: "'Poppins', sans-serif",
    lineHeight: 1.03,
    letterSpacing: "0",
    whiteSpace: "pre-line",
    textShadow: "0 18px 42px rgba(0,0,0,0.42)",
    animation: "titleReveal 0.9s cubic-bezier(.22,1,.36,1) 0.15s both",
  },

  titleUnderline: {
    width: "118px",
    height: "4px",
    background: "linear-gradient(90deg, rgba(74,222,128,0), #86efac, #7dd3fc, rgba(125,211,252,0))",
    margin: "0 auto 22px",
    boxShadow: "0 0 18px rgba(134,239,172,0.75)",
    borderRadius: "999px",
    animation: "titleReveal 0.9s cubic-bezier(.22,1,.36,1) 0.15s both",
  },

  titleUnderlineMobile: {
    width: "clamp(70px, 22vw, 94px)",
    height: "3px",
    margin: "0 auto clamp(7px, 1.2dvh, 11px)",
  },

  titleMobile: {
    fontSize: "clamp(20px, min(7vw, 3.25dvh), 30px)",
    lineHeight: 1.02,
    maxWidth: "100%",
    overflowWrap: "break-word",
    marginBottom: "clamp(4px, 0.8dvh, 7px)",
  },

  titleAccent: { 
    background: "linear-gradient(90deg, #4ade80, #86efac)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  body: {
    color: "rgba(255, 255, 255, 0.86)",
    marginBottom: "30px",
    fontSize: "clamp(14px, 1.6vw, 17px)",
    fontWeight: 400,
    lineHeight: 1.72,
    maxWidth: "640px",
    textShadow: "0 10px 26px rgba(0,0,0,0.36)",
  },

  bodyMobile: {
    fontSize: "clamp(10px, min(3.3vw, 1.55dvh), 13px)",
    lineHeight: 1.34,
    marginBottom: "clamp(8px, 1.2dvh, 12px)",
    width: "100%",
    maxWidth: "min(320px, 100%)",
    padding: "0 4px",
    overflowWrap: "break-word",
  },

  ctaRow: { 
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "38px",
  },

  ctaRowMobile: {
    flexDirection: "column",
    gap: "clamp(6px, 1dvh, 9px)",
    width: "100%",
    maxWidth: "clamp(210px, 68vw, 260px)",
    marginBottom: "clamp(10px, 1.8dvh, 16px)",
  },

  primaryBtn: { 
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    padding: "13px 30px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.35)",
    background: "linear-gradient(135deg, rgba(134,239,172,0.95), rgba(125,211,252,0.95))",
    color: "#062018",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    transform: "scale(1)",
    transformOrigin: "center",
    willChange: "transform",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    fontFamily: "inherit",
    letterSpacing: "0.2px",
    boxShadow: "0 18px 38px rgba(34,197,94,0.26), inset 0 1px 0 rgba(255,255,255,0.48)",
    transition: "transform 0.16s ease",
    backdropFilter: "blur(18px) saturate(165%)",
    WebkitBackdropFilter: "blur(18px) saturate(165%)",
  },
  primaryInnerBlur: {
    position: "absolute",
    inset: "0",
    zIndex: 0,
    pointerEvents: "none",
    borderRadius: "inherit",
    background:
      "radial-gradient(circle at 28% 18%, rgba(255,255,255,0.35), transparent 42%), " +
      "linear-gradient(135deg, rgba(134,239,172,0.36), rgba(125,211,252,0.32))",
    backdropFilter: "blur(34px) saturate(185%)",
    WebkitBackdropFilter: "blur(34px) saturate(185%)",
  },

  primaryBtnHov: {
    transform: "scale(1.035)",
  },

  responsiveBtnMobile: {
    width: "100%",
    flex: "none",
    minWidth: 0,
    maxWidth: "none",
    padding: "clamp(6px, 1dvh, 8px) 10px",
    fontSize: "clamp(11px, 3.3vw, 13px)",
    minHeight: "clamp(30px, 4.5dvh, 36px)",
    textAlign: "center",
  },

  glassBtn: { 
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    padding: "13px 28px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.24)",
    color: "rgba(255,255,255,0.92)",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    transform: "scale(1)", // Default scale for transition
    transformOrigin: "center",
    willChange: "transform",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    fontFamily: "inherit",
    letterSpacing: "0.2px",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.26), 0 14px 30px rgba(0,0,0,0.16)",
    transition: "transform 0.16s ease",
    backdropFilter: "blur(18px) saturate(160%)",
    WebkitBackdropFilter: "blur(18px) saturate(160%)",
  },
  glassInnerBlur: {
    position: "absolute",
    inset: "0",
    zIndex: 0,
    pointerEvents: "none",
    borderRadius: "inherit",
    background:
      "radial-gradient(circle at 28% 18%, rgba(255,255,255,0.22), transparent 45%), " +
      "linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.035))",
    backdropFilter: "blur(34px) saturate(185%)",
    WebkitBackdropFilter: "blur(34px) saturate(185%)",
  },
  glassContentLayer: {
    position: "relative",
    zIndex: 1,
  },

  glassBtnHov: {
    transform: "scale(1.035)",
  },

  exploreMoreBtn: {
    position: "absolute",
    bottom: "28px",
    right: "clamp(12px, 3vw, 42px)",
    zIndex: 10,
    padding: "10px 24px",
    fontSize: "13px",
  },

  exploreMoreBtnMobile: {
    bottom: "20px",
    right: "16px",
    padding: "10px 20px",
    fontSize: "13px",
  },

  chatWithAiBtn: {
    position: "absolute", // Reverted to absolute positioning
    bottom: "28px", // Reverted to original bottom value
    right: "clamp(20px, 4vw, 52px)", // Reverted to original right value
    zIndex: 10,
  },

  chatWithAiBtnMobile: {
    position: "relative",
    bottom: "auto",
    right: "auto",
    left: "auto",
    transform: "none",
    margin: "clamp(10px, 2dvh, 20px) auto",
    display: "block",
    width: "fit-content",
    padding: "clamp(8px, 1.4dvh, 11px) clamp(13px, 4vw, 18px)",
    fontSize: "clamp(11px, 3.4vw, 13px)",
    whiteSpace: "nowrap",
  },

  statsStrip: { 
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 30px",
    borderRadius: "14px",
    background: "linear-gradient(145deg, rgba(255,255,255,0.16), rgba(255,255,255,0.08))",
    border: "1px solid rgba(255,255,255,0.20)",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.28), 0 18px 44px rgba(0,0,0,0.22)",
    transition:
      "transform 0.22s cubic-bezier(.34,1.56,.64,1)",
    transformOrigin: "center",
    willChange: "transform",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
  },
  statsStripHov: {
    transform: "scale(1.015)",
  },
  statsStripMobile: {
    width: "min(86%, 260px)",
    maxWidth: "260px",
    padding: "clamp(5px, 0.9dvh, 7px) clamp(7px, 2.2vw, 10px)",
    flexDirection: "row",
    gap: "2px",
    alignItems: "stretch",
    justifyContent: "space-between",
    marginTop: "clamp(8px, 1.8dvh, 14px)",
  },
  statCell: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 clamp(5px, 2vw, 9px)",
  },

  statCellDivider: {
    borderRight: "1px solid rgba(255,255,255,0.12)",
  },
  statCellDividerMobile: { // New mobile style for statCellDivider
    borderRight: "1px solid rgba(255,255,255,0.12)",
    borderBottom: "none",
    paddingBottom: 0,
    width: "auto",
  },

  statVal: {
    fontSize: "clamp(13px, min(4vw, 2dvh), 17px)",
    fontWeight: 700,
    color: "#ffffff", 
    letterSpacing: "-0.5px",
    lineHeight: 1.1,
    marginBottom: "3px", // Adjusted spacing
  },

  statLbl: {
    fontSize: "clamp(6px, 1.9vw, 8px)",
    fontWeight: 500,
    color: "rgba(255,255,255,0.66)",
    letterSpacing: "0.9px",
    textTransform: "uppercase",
  },

  cardRow: {
    display: "flex",
    gap: "16px",
    flexWrap: "nowrap",
    justifyContent: "center", // Centered content within the strip
    marginTop: "-10px", // Moved up further
    width: "100%",
  },
  cardRowMobile: { // New mobile style for cardRow
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    alignItems: "stretch",
    justifyContent: "center",
    gap: "clamp(5px, 2vw, 9px)",
    marginTop: "0",
    width: "100%",
    maxWidth: "100%",
    overflow: "visible",
    padding: "0 0 clamp(4px, 0.8dvh, 7px)",
    marginLeft: "auto",
    marginRight: "auto",
  },

  card: {
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    background: "linear-gradient(150deg, rgba(255,255,255,0.17), rgba(255,255,255,0.07))",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: "16px",
    padding: "12px 14px 14px",
    flex: "0 1 210px",
    maxWidth: "230px",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", // Changed to justify left the content within the card
    gap: "6px",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.24), 0 16px 38px rgba(0,0,0,0.18)",
    cursor: "default",
    transform: "scale(1)",
    transformOrigin: "center",
    willChange: "transform",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    backdropFilter: "blur(20px) saturate(165%)",
    WebkitBackdropFilter: "blur(20px) saturate(165%)",
    transition: "transform 0.22s cubic-bezier(.34,1.56,.64,1)",
  },
  cardInnerBlur: {
    position: "absolute",
    inset: "0",
    zIndex: 0,
    pointerEvents: "none",
    borderRadius: "inherit",
    background:
      "radial-gradient(circle at 30% 18%, rgba(255,255,255,0.2), transparent 42%), " +
      "linear-gradient(155deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))",
    backdropFilter: "blur(34px) saturate(180%)",
    WebkitBackdropFilter: "blur(34px) saturate(180%)",
    filter: "blur(0.2px)",
  },
  cardContentLayer: {
    position: "relative",
    zIndex: 1,
  },
  cardMobile: { // New mobile style for card
    flex: "1 1 0",
    width: "auto",
    maxWidth: "none",
    minWidth: 0,
    height: "auto",
    padding: "clamp(6px, 1dvh, 8px) clamp(5px, 1.6vw, 7px)",
    overflow: "visible",
    alignItems: "center",
    textAlign: "center",
  },
  cardHov: {
    transform: "scale(1.025)",
  },

  cardIcon: {
    fontSize: "30px",
    lineHeight: 1,
    marginTop: "-5px",
    marginLeft: "-5px",
    filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.22))",
  },
  cardIconMobile: {
    marginLeft: 0,
    alignSelf: "center",
  },
  cardHeading: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#fff",
    margin: 0,
    letterSpacing: "-0.2px",
    fontFamily: "'Poppins', sans-serif",
    marginTop: "-18px",
    textAlign: "left",
  },
  cardHeadingMobile: { // New mobile style for cardHeading
    fontSize: "clamp(9px, 2.6vw, 11px)",
    marginTop: "clamp(-14px, -2.2dvh, -10px)",
    lineHeight: 1.08,
    textAlign: "center",
    width: "100%",
  },
  cardText: {
    fontSize: "10.5px",
    color: "rgba(255, 255, 255, 0.82)",
    lineHeight: 1.5,
    margin: 0,
    marginTop: "-4px",
    textAlign: "left",
  },
  cardTextMobile: { // New mobile style for cardText
    fontSize: "clamp(8.5px, 2.3vw, 10px)",
    lineHeight: 1.25,
    textAlign: "center",
    overflowWrap: "anywhere",
  },

  dropdownMenu: {
    background: "rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    borderRadius: "14px",
    padding: "6px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    width: "max-content",
    maxWidth: "240px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.18)",
  },
  dropdownMenuMobile: {
    marginTop: "6px",
    background: "rgba(255,255,255,0.05)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
    border: "none",
    maxWidth: "none",
    minWidth: "100%",
    width: "100%",
    alignItems: "center",
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
  },
  dropdownItem: {
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
    color: "rgba(255,255,255,0.75)",
    padding: "8px 14px",
    borderRadius: "10px",
    background: "transparent",
    border: "none",
    whiteSpace: "normal",
    lineHeight: "1.4",
    fontFamily: "inherit",
    textAlign: "left",
    transition: "color 0.15s ease, background 0.15s ease",
    width: "100%",
  },
  dropdownItemMobile: {
    textAlign: "center",
  },
  dropdownItemActive: {
    background: "rgba(255,255,255,0.20)",
    color: "#fff",
    fontWeight: 600,
  },
  dropdownItemHover: {
    background: "rgba(255,255,255,0.12)",
    color: "rgba(255,255,255,0.95)",
  },

};

export default App;
