import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <Router>
    <Routes>
      <Route path="*" element={<App />} />
    </Routes>
  </Router>,
)
