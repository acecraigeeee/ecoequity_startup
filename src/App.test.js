import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("App navigation", () => {
  test("renders home view by default", () => {
    render(<App />);
    // The "VerdeVersity" text is now present again.
    expect(screen.getByText("VerdeVersity")).toBeInTheDocument();
    expect(screen.getByText(/Grow Food\./)).toBeInTheDocument();
    expect(screen.getByText(/Build Community\./)).toBeInTheDocument();
    expect(screen.getByText(/Earn Sustainably\./)).toBeInTheDocument();
    expect(screen.getByText("Agricultural Innovation · Philippines")).toBeInTheDocument();
  });

  test("switches to Product & Services page when nav button is clicked", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Product & Services" }));

    expect(screen.getByText("What We Offer")).toBeInTheDocument();
    expect(screen.getByText("Product & Services")).toBeInTheDocument();
    expect(screen.getByText(/VerdeVersity offers a comprehensive suite of digital tools/)).toBeInTheDocument();
    expect(screen.getByText(/• Organic Edibles: Local produce/)).toBeInTheDocument();
  });

  test("renders Product & Services page with updated card and text styles", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Product & Services" }));

    const productHeading = screen.getByText("Product");
    const cardContainer = productHeading.closest("div");

    expect(cardContainer).toHaveStyle("display: flex");
    expect(cardContainer).toHaveStyle("flex-direction: column");
    expect(cardContainer).toHaveStyle("align-items: flex-start");
    expect(cardContainer).toHaveStyle("text-align: left");

    expect(screen.getByText(/Real-world event management, allowing users to RSVP/)).toBeInTheDocument();
    expect(screen.getByText(/Notifies institutional buyers \(hotels, processors\)/)).toBeInTheDocument();
  });

  test("switches to About Us page when nav button is clicked", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "About Us" }));

    expect(screen.getByText(/about us/i)).toBeInTheDocument();
  });

  test("switches to Target Market page and shows goal text when nav button is clicked", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Target Market" }));

    expect(screen.getByText("Who We Serve")).toBeInTheDocument();
    expect(screen.getByText("Target Market")).toBeInTheDocument();
    expect(screen.getByText(/To achieve 150,000\+ Active Monthly Users/)).toBeInTheDocument();
  });

  test("target market page content should not be scrollable", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Target Market" }));

    const pageContainer = screen.getByText("Who We Serve").parentElement.parentElement;
    expect(pageContainer).toHaveStyle("overflow-y: hidden");
  });

  test("target market explore page content should not be scrollable", () => {
    render(<App />);

    const targetMarketBtn = screen.getByRole("button", { name: /Target Market/i });
    const container = targetMarketBtn.parentElement;
    
    fireEvent.mouseEnter(container);
    fireEvent.click(screen.getByRole("button", { name: "Distribution Channels and Acquisition Tactics" }));

    const pageContainer = screen.getByText("Who We Serve").parentElement.parentElement.parentElement;
    expect(pageContainer).toHaveStyle("overflow-y: hidden");
  });

  test("displays AI Farming System image and removes its text content on Home page", () => {
    render(<App />);

    // Ensure we are on the Home page first (default behavior)
    expect(screen.getByText("VerdeVersity")).toBeInTheDocument();

    // Check for the absence of the old heading and text
    expect(screen.queryByText("AI Farming System")).not.toBeInTheDocument();
    expect(screen.queryByText("Empower communities through accessible agricultural innovation.")).not.toBeInTheDocument();
    expect(screen.getByAltText("AI Farming System")).toBeInTheDocument();
  });

  test("active navigation button has iOS glass effect", () => {
    render(<App />);

    const aboutUsButton = screen.getByRole("button", { name: "About Us" });
    fireEvent.click(aboutUsButton);

    // Check for the active styles, including the glass effect
    expect(aboutUsButton).toHaveStyle(`
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
      font-weight: 600;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.14);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
    `);
  });

  test("does not render Verde logo in the navigation bar", () => {
    render(<App />);
    const logoImage = screen.queryByAltText("Verde Logo");
    expect(logoImage).not.toBeInTheDocument();
  });

  test("active navigation button has iOS glass effect for Home", () => {
    render(<App />);

    const homeButton = screen.getByRole("button", { name: "Home" });
    // Home is active by default
    expect(homeButton).toHaveStyle(`
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
      font-weight: 600;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.14);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
    `);
  });

  test("active navigation button has iOS glass effect for Product & Services", () => {
    render(<App />);

    const productServicesButton = screen.getByRole("button", { name: "Product & Services" });
    fireEvent.click(productServicesButton);

    expect(productServicesButton).toHaveStyle(`
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
      font-weight: 600;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.14);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
    `);
  });

  test("active navigation button has iOS glass effect for Target Market", () => {
    render(<App />);

    const targetMarketButton = screen.getByRole("button", { name: "Target Market" });
    fireEvent.click(targetMarketButton);

    expect(targetMarketButton).toHaveStyle(`
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
      font-weight: 600;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.14);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
    `);
  });

  test("active navigation button has iOS glass effect for Our Team", () => {
    render(<App />);

    const ourTeamButton = screen.getByRole("button", { name: "Our Team" });
    fireEvent.click(ourTeamButton);

    expect(ourTeamButton).toHaveStyle(`
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
      font-weight: 600;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.14);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
    `);
  });

  test("switches to Contact page when Get in Touch button is clicked", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /Get in Touch/i }));

    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText(/We'd love to hear from you!/i)).toBeInTheDocument();
  });

  test("switches to Learn More page when Learn More button is clicked", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /Learn More/i }));

    expect(screen.getByText("Learn More")).toBeInTheDocument();
    expect(screen.getByText(/Sustainable Development Goals/i)).toBeInTheDocument();
    expect(screen.getByAltText("Verde")).toBeInTheDocument();
  });

  test("renders Explore more button on Learn More and hides it on Target Market pages", () => {
    render(<App />);
    
    expect(screen.queryByRole("button", { name: /Explore more/i })).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByRole("button", { name: /Learn More/i }));
    expect(screen.getByRole("button", { name: /Explore more/i })).toBeInTheDocument();

    // Check Target Market page
    fireEvent.click(screen.getByRole("button", { name: "Target Market" }));
    expect(screen.queryByRole("button", { name: /Explore more/i })).not.toBeInTheDocument();
  });

  test("switches to Explore More page when Explore more button is clicked", () => {
    render(<App />);
    
    // First navigate to Learn More to reveal the Explore more button
    fireEvent.click(screen.getByRole("button", { name: /Learn More/i }));
    fireEvent.click(screen.getByRole("button", { name: /Explore more/i }));
    
    expect(screen.getByText("Explore More")).toBeInTheDocument();
    expect(screen.getByText(/Dive deeper into our platform's capabilities/i)).toBeInTheDocument();
    expect(screen.getByText("1980")).toBeInTheDocument();
    expect(screen.getByText(/SHIFT FROM SELF-SUFFICIENCY TO IMPORT DEPENDENCY/i)).toBeInTheDocument();
    expect(screen.getByText(/The Peso devaluation \(1980s Debt Crisis\) made imported/i)).toBeInTheDocument();
    expect(screen.getByText("2000")).toBeInTheDocument();
    expect(screen.getByText(/WTO ACCESSION & TRADE LIBERALIZATION/i)).toBeInTheDocument();
    expect(screen.getByText(/Cheap imports flooded the market/i)).toBeInTheDocument();
    expect(screen.getByText("2010")).toBeInTheDocument();
    expect(screen.getByText(/GLOBAL PRICE SHOCKS & RAPID URBANIZATION/i)).toBeInTheDocument();
    expect(screen.getByText(/Import dependency caused high USD rates to translate/i)).toBeInTheDocument();
    expect(screen.getByText("2020")).toBeInTheDocument();
    expect(screen.getByText(/PANDEMIC & SUPPLY CHAIN FRAGILITY/i)).toBeInTheDocument();
    expect(screen.getByText(/Global supply shocks demonstrated the inability/i)).toBeInTheDocument();
  });

  test("switches to Explore More page when Distribution Channels and Acquisition Tactics option is clicked from Target Market dropdown", () => {
    render(<App />);
    
    const targetMarketBtn = screen.getByRole("button", { name: /Target Market/i });
    const container = targetMarketBtn.parentElement;
    
    fireEvent.mouseEnter(container);
    fireEvent.click(screen.getByRole("button", { name: "Distribution Channels and Acquisition Tactics" }));
    
    expect(screen.getByText(/Distribution Channels/i)).toBeInTheDocument();
    expect(screen.getByText("Digital Acquisition")).toBeInTheDocument();
    expect(screen.getByText("Physical & Community Engagement")).toBeInTheDocument();
    expect(screen.getByText("B2B & Sector Integration")).toBeInTheDocument();
    expect(screen.getByText(/Content Marketing:/i)).toBeInTheDocument();
    expect(screen.getByText(/SEO\/ASO:/i)).toBeInTheDocument();
    expect(screen.getByText(/Monetization Strategy:/i)).toBeInTheDocument();
    expect(screen.getByText(/LGU Partnership Integration:/i)).toBeInTheDocument();
    expect(screen.getByText(/Specialist Workshops:/i)).toBeInTheDocument();
    expect(screen.getByText(/Word-of-Mouth:/i)).toBeInTheDocument();
    expect(screen.getByText(/Direct Sales to Institutions:/i)).toBeInTheDocument();
    expect(screen.getByText(/Farmer Outreach:/i)).toBeInTheDocument();
  });

  test("navigates back to Home when back button is clicked on Learn More page", () => {
    render(<App />);
    
    fireEvent.click(screen.getByRole("button", { name: /Learn More/i }));
    fireEvent.click(screen.getByRole("button", { name: /← Back/i }));
    
    expect(screen.getByText("VerdeVersity")).toBeInTheDocument();
    expect(screen.getByText(/Grow Food\./)).toBeInTheDocument();
  });

  test("the three glass containers under the buttons are moved up", () => {
    render(<App />);

    // Find one of the card headings to locate its parent container (cardRow)
    const organicEdiblesHeading = screen.getByText("Organic Edibles");
    const cardRowContainer = organicEdiblesHeading.closest("div[style*='display: flex']"); // Find the closest flex div

    expect(cardRowContainer).toHaveStyle("margin-top: -10px");
  });

  test("navigates back to Learn More when back button is clicked on Explore More page", () => {
    render(<App />);
    
    fireEvent.click(screen.getByRole("button", { name: /Learn More/i }));
    fireEvent.click(screen.getByRole("button", { name: /Explore more/i }));
    fireEvent.click(screen.getByRole("button", { name: /← Back/i }));
    
    expect(screen.getByText(/Sustainable Development Goals/i)).toBeInTheDocument();
  });

  test("renders timeline circles vertically on Explore More page", () => {
    render(<App />);
    
    fireEvent.click(screen.getByRole("button", { name: /Learn More/i }));
    fireEvent.click(screen.getByRole("button", { name: /Explore more/i }));
    
    const timelineContainer = screen.getByTestId("timeline-container");
    expect(timelineContainer).toHaveStyle("flex-direction: column");
    expect(timelineContainer).toHaveStyle("align-self: center");
  });

  test("shows Sustainability App Market in Target Market dropdown and allows clicking it", () => {
    render(<App />);
    
    // Find the Target Market button and its container
    const targetMarketBtn = screen.getByRole("button", { name: /Target Market/i });
    const container = targetMarketBtn.parentElement;
    
    // Simulate hover to open the dropdown
    fireEvent.mouseEnter(container);
    
    const sustainabilityBtn = screen.getByRole("button", { name: "Sustainability App Market" });
    expect(sustainabilityBtn).toBeInTheDocument();
    
    // Simulate clicking the option
    fireEvent.click(sustainabilityBtn);
    
    // After clicking, we should navigate away from the home page
    expect(screen.queryByText(/Grow Food\./)).not.toBeInTheDocument();
  });
});

describe("Background video", () => {
  test("renders the background video with correct attributes", () => {
    render(<App />);
    const videoElement = screen.getByTestId("background-video");
    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute("src", "/Green.mp4");
    expect(videoElement).toHaveAttribute("loop");
    expect(videoElement).toHaveAttribute("muted");
  });

  test("renders Chat with AI button on Home page with glass effect and correct position", () => {
    render(<App />);

    const chatButton = screen.getByRole("button", { name: "Chat with AI" });
    expect(chatButton).toBeInTheDocument();

    // Check for glass effect styles
    expect(chatButton).toHaveStyle(`
      background: rgba(255, 255, 255, 0.12);
      color: rgba(255, 255, 255, 0.88);
      font-size: 14px;
      font-weight: 600;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22), 0 4px 16px rgba(0, 0, 0, 0.12);
    `);

    // Check for positioning styles
    expect(chatButton).toHaveStyle("align-self: flex-end");
    expect(chatButton).toHaveStyle("z-index: 10");
  });
});
