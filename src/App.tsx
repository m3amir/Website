import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ChakraProvider, Box } from '@chakra-ui/react'
import { lazy, Suspense, useEffect } from 'react'
import theme from './theme'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTopOnNavigate from './components/ScrollToTopOnNavigate'
import './App.css'

// Lazy load page components
const Home = lazy(() => import('./pages/Home'))
const Contact = lazy(() => import('./pages/Contact'))
const Knowledge = lazy(() => import('./pages/Knowledge'))
const Article = lazy(() => import('./pages/Article'))
const AIWorker = lazy(() => import('./pages/AIWorker'))
const Products = lazy(() => import('./pages/Products'))
const Security = lazy(() => import('./pages/Security'))

// Loading fallback
const LoadingFallback = () => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    height="100vh"
    width="100%"
  >
    <Box 
      width="40px" 
      height="40px" 
      borderRadius="50%" 
      border="3px solid" 
      borderColor="brand.100" 
      borderTopColor="brand.500" 
      animation="spin 1s linear infinite"
      sx={{
        '@keyframes spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }}
    />
  </Box>
)

// This wrapper component detects the current route and applies the appropriate footer styling
const AppContent = () => {
  const location = useLocation();
  const isSecurityPage = location.pathname === '/security';
  
  // Update document title
  useEffect(() => {
    document.title = "M3Labs | Change your paradigm of work";
  }, []);

  return (
    <>
      <ScrollToTopOnNavigate />
      <Navbar />
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/ai-worker" element={<AIWorker />} />
            <Route path="/products" element={<Products />} />
            <Route path="/security" element={<Security />} />
            <Route path="/articles/:slug" element={<Article />} />
          </Routes>
        </Suspense>
        <Footer variant={isSecurityPage ? 'security' : 'default'} />
      </Box>
    </>
  );
};

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <AppContent />
      </Router>
    </ChakraProvider>
  )
}

export default App
