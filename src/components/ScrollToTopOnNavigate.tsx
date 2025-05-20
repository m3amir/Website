import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component automatically scrolls to top when navigating between pages
function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();

  // Scroll to top on route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  // Scroll to top on page refresh/initial load
  useEffect(() => {
    // Set scroll restoration to manual to prevent browser's auto-scroll behavior
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    return () => {
      // Reset scroll restoration on unmount
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
    };
  }, []);

  return null; // This component doesn't render anything
}

export default ScrollToTopOnNavigate; 