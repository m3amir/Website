import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component has been modified to no longer automatically scroll to top
function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();

  // No longer scrolls to top on route changes
  useEffect(() => {
    // Functionality removed
  }, [pathname]);
  
  // No longer scrolls to top on page refresh/initial load
  useEffect(() => {
    // Functionality removed
    
    return () => {
      // No cleanup needed
    };
  }, []);

  return null; // This component doesn't render anything
}

export default ScrollToTopOnNavigate; 