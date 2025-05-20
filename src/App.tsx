import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import theme from './theme'
import './App.css'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTopOnNavigate from './components/ScrollToTopOnNavigate'

// Pages
import Home from './pages/Home'
import Products from './pages/Products'
import AIWorker from './pages/AIWorker'
import Articles from './pages/Articles'
import Article from './pages/Article'
import ArticleView from './pages/ArticleView'
import Contact from './pages/Contact'
import Security from './pages/Security'
import Knowledge from './pages/Knowledge'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <ScrollToTopOnNavigate />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/text2agent" element={<AIWorker />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/article-view/:id" element={<ArticleView />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/security" element={<Security />} />
          <Route path="/knowledge" element={<Knowledge />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
