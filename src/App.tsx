import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ChakraProvider, Box } from '@chakra-ui/react'
import theme from './theme'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Knowledge from './pages/Knowledge'
import Article from './pages/Article'
import AIWorker from './pages/AIWorker'
import Products from './pages/Products'
import Security from './pages/Security'
import './App.css'

// This wrapper component detects the current route and applies the appropriate footer styling
const AppContent = () => {
  const location = useLocation();
  const isSecurityPage = location.pathname === '/security';
  
  return (
    <>
      <Navbar />
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/ai-worker" element={<AIWorker />} />
          <Route path="/products" element={<Products />} />
          <Route path="/security" element={<Security />} />
          <Route path="/articles/:slug" element={<Article />} />
        </Routes>
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
