import React, { useEffect, useState, useRef } from 'react';
import './Security.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Security: React.FC = () => {
  const [activeFaqItem, setActiveFaqItem] = useState<number | null>(null);
  
  // Add refs for each section
  const headerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  
  const toggleFaqItem = (index: number) => {
    setActiveFaqItem(activeFaqItem === index ? null : index);
  };
  
  useEffect(() => {
    // Create intersection observer for auto-scrolling
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3, // Trigger when 30% of the section is visible
    };

    const smoothScrollTo = (target: Element) => {
      const startPosition = window.pageYOffset;
      const targetPosition = target.getBoundingClientRect().top + startPosition;
      const distance = targetPosition - startPosition;
      const duration = 1500; // Increased duration to 1.5 seconds for slower scrolling
      let start: number | null = null;

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function for smoother animation
        const easeInOutCubic = (t: number) => {
          return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        window.scrollTo(0, startPosition + (distance * easeInOutCubic(progress)));

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          smoothScrollTo(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Observe each section
    if (headerRef.current) observer.observe(headerRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (faqRef.current) observer.observe(faqRef.current);

    // Clean up observer on unmount
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    // Only apply styling to the navbar - the footer is now handled by props
    const styleElement = document.createElement('style');
    styleElement.id = 'security-nav-style';
    styleElement.innerHTML = `
      /* Ensure navbar is dark */
      nav.security-page-nav,
      nav.security-page-nav *,
      nav.security-page-nav div,
      nav.security-page-nav button:not([class*="chakra-button"]) {
        background-color: #090a0f !important;
        color: #FFFFFF !important;
      }
      
      /* Specific override for logo with maximum specificity */
      html body #root nav.security-page-nav a[href="/"] > div,
      html body #root nav.security-page-nav a[href="/"] > div *,
      nav.security-page-nav a[href="/"] > div,
      nav.security-page-nav a[href="/"] > div *,
      nav.security-page-nav .security-page-nav-logo,
      nav.security-page-nav .security-page-nav-logo * {
        background-color: transparent !important;
        background: transparent !important;
        color: #FFFFFF !important;
      }
      
      /* Target the M3Labs text specifically with highest specificity */
      html body #root nav.security-page-nav a[href="/"] .chakra-text,
      html body #root nav.security-page-nav .chakra-text,
      nav.security-page-nav a > div span.chakra-text,
      nav.security-page-nav a > div .chakra-text span {
        background-color: transparent !important;
        background: transparent !important;
        /* Keep logo text white */
        color: #FFFFFF !important;
      }

      /* Force security card background to be gray - with ID for maximum specificity */
      html body #root #security-card-section,
      #security-card-section,
      div#security-card-section,
      #security-card-section.security-card-background,
      #security-card-section.security-container,
      html body #root .security-card-background#security-card-section {
        background-color: #1a1b2d !important;
        background: #1a1b2d !important;
      }

      /* Force gradient backgrounds */
      html body #root .security-gradient-top,
      .security-gradient-top,
      div.security-gradient-top {
        background: linear-gradient(to bottom, #090a0f 0%, #131426 50%, #1a1b2d 100%) !important;
        background-color: transparent !important;
      }

      html body #root .security-gradient-bottom,
      .security-gradient-bottom,
      div.security-gradient-bottom {
        background: linear-gradient(to bottom, #1a1b2d 0%, #131426 50%, #090a0f 100%) !important;
        background-color: transparent !important;
      }
      
      /* Force footer to be black with more specific overrides */
      html body #root footer.site-footer.security-footer,
      html body #root footer.site-footer.security-footer.css-jonbcl,
      html body footer.site-footer.security-footer,
      html body footer.site-footer.security-footer.css-jonbcl,
      html body footer:not(.dark-theme),
      html body footer.css-jonbcl,
      html body footer.site-footer,
      footer.site-footer.security-footer,
      footer.site-footer.security-footer.css-jonbcl,
      .site-footer.security-footer,
      footer.security-page-footer,
      footer.force-black-bg,
      .security-page-footer,
      footer.site-footer.security-footer.css-jonbcl,
      .site-footer.security-footer.css-jonbcl {
        background-color: #090a0f !important;
        background: #090a0f !important;
        color: #FFFFFF !important;
        border-color: #333333 !important;
      }
      
      /* Ensure footer and all children remain black despite global selectors */
      html body #root footer.site-footer.security-footer *,
      html body #root footer.site-footer.security-footer.css-jonbcl *,
      html body footer.site-footer.security-footer *,
      html body footer.site-footer.security-footer.css-jonbcl *,
      html body footer:not(.dark-theme) *,
      footer.site-footer.security-footer *,
      footer.site-footer.security-footer.css-jonbcl *,
      footer.security-page-footer *,
      footer.force-black-bg *,
      .security-page-footer *,
      footer.site-footer.security-footer div,
      footer.site-footer.security-footer span,
      footer.site-footer.security-footer p,
      footer.site-footer.security-footer.css-jonbcl div,
      footer.site-footer.security-footer.css-jonbcl span,
      footer.site-footer.security-footer.css-jonbcl p {
        background-color: #090a0f !important;
        background: #090a0f !important;
        color: #FFFFFF !important;
      }
      
      /* Ensure specific links and text elements in footer maintain correct colors */
      html body #root footer.security-footer a,
      footer.security-footer a,
      .security-footer a,
      footer.security-page-footer a,
      footer.force-black-bg a,
      footer.security-footer a:hover,
      .security-footer a:hover,
      footer.site-footer.security-footer a,
      footer.site-footer.security-footer.css-jonbcl a {
        color: #9363ff !important;
        background-color: transparent !important;
        background: transparent !important;
      }
      
      /* Override the specific selector causing the issue */
      body:not(.dark-theme) footer.security-footer,
      #root:not(.dark-theme) footer.security-footer,
      footer:not(.dark-theme).security-footer,
      footer:not(.dark-theme).security-page-footer,
      footer:not(.dark-theme).force-black-bg {
        background-color: #090a0f !important;
        background: #090a0f !important;
        color: #FFFFFF !important;
      }

      /* Animation classes for fade-in effects */
      .fade-in {
        animation: fadeIn 0.8s ease-out forwards;
      }
      
      .fade-in-delay-1 {
        animation: fadeIn 0.8s ease-out 0.2s forwards;
        opacity: 0;
      }
      
      .fade-in-delay-2 {
        animation: fadeIn 0.8s ease-out 0.4s forwards;
        opacity: 0;
      }
      
      .fade-in-delay-3 {
        animation: fadeIn 0.8s ease-out 0.6s forwards;
        opacity: 0;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes fadeInLeft {
        from { opacity: 0; transform: translateX(-40px); }
        to { opacity: 1; transform: translateX(0); }
      }

      @keyframes fadeInRight {
        from { opacity: 0; transform: translateX(40px); }
        to { opacity: 1; transform: translateX(0); }
      }

      .fade-in-left {
        animation: fadeInLeft 0.8s ease-out forwards;
      }

      .fade-in-right {
        animation: fadeInRight 0.8s ease-out forwards;
      }

      /* Card animation classes */
      .security-card-content {
        animation: fadeInLeft 0.8s ease-out 0.2s both;
        opacity: 0;
      }

      .security-card:nth-child(even) .security-card-content {
        animation: fadeInRight 0.8s ease-out 0.2s both;
      }

      .security-card-animation {
        animation: fadeInRight 0.8s ease-out 0.4s both;
        opacity: 0;
      }

      .security-card:nth-child(even) .security-card-animation {
        animation: fadeInLeft 0.8s ease-out 0.4s both;
      }

      /* Override FAQ section centering with extreme specificity */
      html body #root .security-root-container .security-container .security-faq-section,
      .security-faq-section,
      div.security-faq-section,
      .security-root-container .security-faq-section,
      .security-container .security-faq-section {
        margin: 0 !important;
        margin-right: auto !important;
        margin-left: 0 !important;
        max-width: 100% !important;
        width: 100% !important;
        padding-left: 0 !important;
        position: relative !important;
        left: 0 !important;
      }
      
      /* Feature cards with alternating backgrounds */
      .security-feature-card {
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        background-color: #FFFFFF !important;
        color: #090a0f !important;
        border: 1px solid #e0e0e0 !important;
      }
      
      .security-feature-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      }
      
      .security-features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 24px;
        margin-top: 40px;
      }

      /* Ensure security features section has white background */
      html body #root .security-features,
      .security-features,
      div.security-features,
      .security-features.security-container,
      html body #root .security-features.security-container {
        background-color: #FFFFFF !important;
        background: #FFFFFF !important;
        color: #090a0f !important;
      }
      
      /* Ensure security features grid has white background */
      html body #root .security-features-grid,
      .security-features-grid,
      div.security-features-grid,
      .security-features .security-features-grid,
      html body #root .security-features .security-features-grid {
        background-color: #FFFFFF !important;
        background: #FFFFFF !important;
        color: #090a0f !important;
      }
      
      /* Ensure security features headings have correct color */
      html body #root .security-features h2,
      .security-features h2,
      .security-features .security-features-title,
      html body #root .security-features .security-features-title {
        color: #090a0f !important;
      }
      
      html body #root .security-features .security-feature-card h3,
      .security-features .security-feature-card h3 {
        color: #090a0f !important;
      }
    `;
    document.head.appendChild(styleElement);
    
    // Make sure navbar has dark styling
    const navbar = document.querySelector('nav');
    if (navbar) {
      navbar.classList.add('security-page-nav');
      (navbar as HTMLElement).style.backgroundColor = '#090a0f';
      (navbar as HTMLElement).style.borderColor = '#333333';
      
      // Update text color in navbar to white
      const navbarLinks = navbar.querySelectorAll('button');
      navbarLinks.forEach(link => {
        if (link.textContent !== 'Contact') {
          (link as HTMLElement).style.color = '#FFFFFF';
        }
      });
      
      // Ensure logo has transparent background
      const navbarLogo = navbar.querySelector('a > div');
      if (navbarLogo) {
        (navbarLogo as HTMLElement).style.backgroundColor = 'transparent';
        
        // Apply styling to all children
        const logoChildren = navbarLogo.querySelectorAll('*');
        logoChildren.forEach(child => {
          (child as HTMLElement).style.backgroundColor = 'transparent';
        });
        
        // Don't modify the text color of the logo
      }
    }
    
    // Force the card section background color directly using JavaScript
    setTimeout(() => {
      // This section is no longer needed since we removed the blue transition
    }, 100);
    
    // Force FAQ section to the left
    setTimeout(() => {
      const faqSection = document.querySelector('.security-faq-section');
      if (faqSection) {
        // Force position with !important
        (faqSection as HTMLElement).style.setProperty('margin-left', '0', 'important');
        (faqSection as HTMLElement).style.setProperty('margin-right', 'auto', 'important');
        (faqSection as HTMLElement).style.setProperty('margin', '6rem 0 10rem 0', 'important');
        (faqSection as HTMLElement).style.setProperty('max-width', '100%', 'important');
        (faqSection as HTMLElement).style.setProperty('width', '100%', 'important');
        
        // Force heading and FAQ items to align properly
        const faqHeading = faqSection.querySelector('h2');
        if (faqHeading) {
          (faqHeading as HTMLElement).style.marginLeft = '1rem';
        }
        
        const faqItems = faqSection.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
          (item as HTMLElement).style.marginLeft = '1rem';
        });
        
        // Fix toggle button positioning
        const questionRows = faqSection.querySelectorAll('.faq-question-row');
        questionRows.forEach(row => {
          (row as HTMLElement).style.width = 'fit-content';
          (row as HTMLElement).style.maxWidth = '700px';
          
          const toggleButton = row.querySelector('.faq-toggle');
          if (toggleButton) {
            (toggleButton as HTMLElement).style.marginLeft = '1rem';
          }
        });
      }
    }, 100);
    
    // Add this new code to apply the security-footer class to the footer element
    const footer = document.querySelector('footer');
    if (footer) {
      // Just add the necessary classes - styling is now handled in index.css
      footer.classList.add('security-footer', 'security-page-footer', 'force-black-bg', 'dark-theme');
    }
    
    // Ensure FAQ toggle buttons are aligned correctly after render
    setTimeout(() => {
      const faqQuestionRows = document.querySelectorAll('.faq-question-row');
      faqQuestionRows.forEach(row => {
        // Make sure toggle button is closer to question
        const toggleWrapper = row.querySelector('div[style*="display: flex"][style*="align-items: center"]');
        if (toggleWrapper) {
          (toggleWrapper as HTMLElement).style.display = 'flex';
          (toggleWrapper as HTMLElement).style.alignItems = 'center';
          (toggleWrapper as HTMLElement).style.flexWrap = 'nowrap';
        }

        const toggleButton = row.querySelector('.faq-toggle');
        if (toggleButton) {
          (toggleButton as HTMLElement).style.marginLeft = '1rem';
        }
      });
    }, 500);
    
    // Clean up on unmount
    return () => {
      // Remove the injected style elements
      const styleEl = document.getElementById('security-nav-style');
      if (styleEl) document.head.removeChild(styleEl);
      
      // Reset navbar styling
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.classList.remove('security-page-nav');
        (navbar as HTMLElement).removeAttribute('style');
        
        // Reset navbar links
        const navbarLinks = navbar.querySelectorAll('button');
        navbarLinks.forEach(link => {
          (link as HTMLElement).removeAttribute('style');
        });
        
        const navbarLogo = navbar.querySelector('a > div');
        if (navbarLogo) {
          (navbarLogo as HTMLElement).removeAttribute('style');
        }
      }
      
      // Reset footer styling
      const footer = document.querySelector('footer');
      if (footer) {
        footer.classList.remove('security-footer', 'security-page-footer', 'force-black-bg', 'dark-theme');
      }
    };
  }, []);
  
  return (
    <div className="security-root-container" style={{ overflow: "hidden", maxWidth: "100vw" }}>
      
      {/* Black background header section */}
      <div ref={headerRef} className="security-container" style={{
        paddingLeft: "0",
        paddingRight: "1rem",
        position: "relative",
        overflow: "visible",
        backgroundColor: "#090a0f",
        color: "#FFFFFF",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}>
        <div className="security-header" style={{ marginTop: "10rem", paddingLeft: "1rem" }}>
          <h1 className="fade-in">Quality Assured Enterprise Ready</h1>
          <p className="security-intro fade-in-delay-1">
            We designed our platform with AI safety in mind to ensure complete peace of mind.
            Our security framework incorporates best practices to protect your data at all times.
            <br /><br />
            With safety-first human-in-the-loop architecture, we ensure responsible AI governance, transparent decision-making, and ethical use at every step
          </p>
        </div>

        {/* Lottie Animation */}
        <div 
          className="fade-in-delay-3"
          style={{
          marginTop: '-120px',
          position: 'relative',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#090a0f',
          overflow: 'hidden',
          paddingBottom: '80px'
          }}
        >
          <div style={{
            width: '100%',
            maxWidth: '800px',
            height: '400px',
            position: 'relative',
            backgroundColor: '#090a0f',
            overflow: 'hidden',
            borderRadius: '24px'
          }}>
            <DotLottieReact
              src="https://lottie.host/f42acc63-d027-42a3-83c6-769a724634ce/nYVdmzCcMK.lottie"
              loop
              autoplay
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#090a0f'
              }}
            />
          </div>
        </div>
      </div>

      {/* White background features section */}
      <div ref={featuresRef} style={{
        backgroundColor: "#FFFFFF",
        color: "#090a0f",
        padding: "80px 0",
        width: "100%",
        position: "relative",
        zIndex: "1",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}>
        <div className="security-features security-container" style={{ 
          paddingLeft: "1rem",
          backgroundColor: "#FFFFFF",
          color: "#090a0f",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%"
        }}>
          <h2 className="security-features-title fade-in" style={{ 
            color: "#000000", 
            backgroundColor: "#FFFFFF",
            padding: "15px 30px",
            borderRadius: "8px",
            display: "inline-block",
            margin: "0 auto 30px auto",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            fontWeight: "700"
          }}>
            Your security, safety, & privacy is our top priority
          </h2>
          
          <div className="security-features-grid" style={{ 
            backgroundColor: "#FFFFFF", 
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
            marginTop: "40px",
            border: "2px solid #e0e0e0",
            borderRadius: "16px",
            padding: "24px"
          }}>
            <div className="security-feature-card fade-in-delay-1" style={{ 
              backgroundColor: "#FFFFFF", 
              color: "#000000", 
              border: "3px solid #666666",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)"
            }}>
              <h3 style={{ color: "#000000" }}>No training on your data</h3>
              <p style={{ color: "#000000" }}>We never use your private data to train or update our models. Your data is isolated in dedicated silos only accessible to your organization.</p>
            </div>
            
            <div className="security-feature-card fade-in-delay-2" style={{ 
              backgroundColor: "#FFFFFF", 
              color: "#000000", 
              border: "3px solid #666666",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)"
            }}>
              <h3 style={{ color: "#000000" }}>Private data stays private</h3>
              <p style={{ color: "#000000" }}>Data is stored in completely siloed data stores, isolated from all other customer data, ensuring total privacy and control.</p>
            </div>
          

            <div className="security-feature-card fade-in-delay-3" style={{ 
              backgroundColor: "#FFFFFF", 
              color: "#000000", 
              border: "3px solid #666666",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)"
            }}>
              <h3 style={{ color: "#000000" }}>Human-in-the-loop protection</h3>
              <p style={{ color: "#000000" }}>Our system allows you to monitor and approve all actions, with guardrails for sensitive operations to ensure quality and safety.</p>
            </div>
          </div>
        </div>
        
        {/* Replace the existing button with a completely new one */}
        <div 
          className="white-button-container" 
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "3rem",
            marginBottom: "2rem",
            position: "relative",
            zIndex: "10"
          }}
        >
          <a 
            href="/contact"
            style={{
              backgroundColor: "#FFFFFF",
              color: "#090a0f",
              padding: "12px 30px",
              fontSize: "1.1rem",
              fontWeight: "600",
              borderRadius: "8px",
              border: "2px solid #090a0f",
              textDecoration: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease"
            }}
          >
            Get Started
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Black background FAQ section */}
      <div ref={faqRef} style={{
        backgroundColor: "#090a0f",
        color: "#FFFFFF",
        padding: "40px 0",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}>
        {/* FAQ Section */}
        <div className="security-faq-section" style={{ 
          textAlign: "left", 
          paddingLeft: "0",
          marginLeft: "0 !important",
          marginRight: "auto !important",
          paddingRight: "2rem",
          position: "relative",
          left: "0",
          display: "block",
          width: "100%"
        }}>
          {/* Inline script to force left alignment */}
          <script dangerouslySetInnerHTML={{
            __html: `
              // Force this section to left alignment
              const faqSection = document.querySelector('.security-faq-section');
              if (faqSection) {
                faqSection.style.setProperty('margin-left', '0', 'important');
                faqSection.style.setProperty('margin-right', 'auto', 'important');
                faqSection.style.setProperty('max-width', '100%', 'important');
                faqSection.style.setProperty('width', '100%', 'important');
                faqSection.style.setProperty('position', 'relative', 'important');
                faqSection.style.setProperty('left', '0', 'important');
              }
            `
          }} />
          
          <h2 className="fade-in" style={{ 
          position: "relative",
            paddingBottom: "0.75rem", 
            marginBottom: "2.5rem", 
            display: "inline-block",
            borderBottom: "4px solid #FFFFFF",
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginLeft: "1rem"
          }}>
            Frequently asked questions
          </h2>
          
          <div className={`faq-item ${activeFaqItem === 0 ? 'active' : ''}`} style={{ 
            textAlign: "left",
            marginLeft: "1rem",
            width: "calc(100% - 2rem)"
          }}>
            <div className="faq-question-row fade-in-delay-1" onClick={() => toggleFaqItem(0)} style={{ 
              justifyContent: "flex-start",
              display: "flex",
              alignItems: "center",
              width: "fit-content",
              maxWidth: "700px"
            }}>
              <div className="faq-number" style={{ marginRight: "1rem" }}>- 01</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="faq-question">How secure is our platform?</div>
                <button className="faq-toggle" style={{ 
                  marginLeft: "1rem",
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0
                }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M8 0V16M0 8H16" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
            </div>
            <div className="faq-answer" style={{ paddingLeft: "3rem" }}>
              <p>We implement enterprise-grade security measures to protect your data. All data is encrypted in transit and at rest, and we follow industry best practices for data security and privacy.</p>
            </div>
          </div>

          <div className={`faq-item ${activeFaqItem === 1 ? 'active' : ''}`} style={{ 
            textAlign: "left",
            marginLeft: "1rem",
            width: "calc(100% - 2rem)"
          }}>
            <div className="faq-question-row fade-in-delay-1" onClick={() => toggleFaqItem(1)} style={{ 
              justifyContent: "flex-start",
              display: "flex",
              alignItems: "center",
              width: "fit-content",
              maxWidth: "700px"
            }}>
              <div className="faq-number" style={{ marginRight: "1rem" }}>- 02</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="faq-question">How is my data used?</div>
                <button className="faq-toggle" style={{ 
                  marginLeft: "1rem",
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0
                }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M8 0V16M0 8H16" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
            </div>
            <div className="faq-answer" style={{ paddingLeft: "3rem" }}>
              <p>We never use your private data to train or update our models. Your data remains yours and is used solely to provide the services you request.</p>
            </div>
          </div>

          <div className={`faq-item ${activeFaqItem === 2 ? 'active' : ''}`} style={{ 
            textAlign: "left",
            marginLeft: "1rem",
            width: "calc(100% - 2rem)"
          }}>
            <div className="faq-question-row fade-in-delay-2" onClick={() => toggleFaqItem(2)} style={{ 
              justifyContent: "flex-start",
              display: "flex",
              alignItems: "center",
              width: "fit-content",
              maxWidth: "700px"
            }}>
              <div className="faq-number" style={{ marginRight: "1rem" }}>- 03</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="faq-question">What data connections are supported?</div>
                <button className="faq-toggle" style={{ 
                  marginLeft: "1rem",
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0
                }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M8 0V16M0 8H16" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
            </div>
            <div className="faq-answer" style={{ paddingLeft: "3rem" }}>
              <p>We can securely connect to various data sources, including internal databases, data warehouses, and cloud storage solutions. We use secure connection methods and respect all access controls.</p>
            </div>
          </div>

          <div className={`faq-item ${activeFaqItem === 4 ? 'active' : ''}`} style={{ 
            textAlign: "left",
            marginLeft: "1rem",
            width: "calc(100% - 2rem)"
          }}>
            <div className="faq-question-row fade-in-delay-3" onClick={() => toggleFaqItem(4)} style={{ 
              justifyContent: "flex-start",
              display: "flex",
              alignItems: "center",
              width: "fit-content",
              maxWidth: "700px"
            }}>
              <div className="faq-number" style={{ marginRight: "1rem" }}>- 04</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="faq-question">How does pricing work?</div>
                <button className="faq-toggle" style={{ 
                  marginLeft: "1rem",
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0
                }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M8 0V16M0 8H16" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
            </div>
            <div className="faq-answer" style={{ paddingLeft: "3rem" }}>
              <p>Our pricing is transparent and scalable based on your needs. We offer various plans to accommodate different use cases and organization sizes. Contact our sales team for detailed pricing information.</p>
            </div>
          </div>

          <div className={`faq-item ${activeFaqItem === 5 ? 'active' : ''}`} style={{ 
            textAlign: "left",
            marginLeft: "1rem",
            width: "calc(100% - 2rem)"
          }}>
            <div className="faq-question-row fade-in-delay-3" onClick={() => toggleFaqItem(5)} style={{ 
              justifyContent: "flex-start",
              display: "flex",
              alignItems: "center",
              width: "fit-content",
              maxWidth: "700px"
            }}>
              <div className="faq-number" style={{ marginRight: "1rem" }}>- 05</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="faq-question">How reliable is your AI?</div>
                <button className="faq-toggle" style={{ 
                  marginLeft: "1rem",
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0
                }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M8 0V16M0 8H16" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
            </div>
            <div className="faq-answer" style={{ paddingLeft: "3rem" }}>
              <p>Our AI employes multi-route reasoning to ensure accuracy and reliability in its actions but we integrate a human in the loop functionality every step of the way to ensure that added oversight.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security; 