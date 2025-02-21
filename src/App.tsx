import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
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
import './App.css'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/ai-worker" element={<AIWorker />} />
          <Route path="/products" element={<Products />} />
          <Route path="/articles/:slug" element={<Article />} />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  )
}

export default App
