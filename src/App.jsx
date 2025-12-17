import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Privacy from './pages/privacy'
import Terms from './pages/terms'
import ClientPortal from './pages/clientportal'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/portal" element={<ClientPortal />} />
      </Routes>
    </Router>
  )
}
