import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Use createRoot API with concurrent features
ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
