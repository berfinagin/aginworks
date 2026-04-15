import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/tokens.css'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header'
import StickyBar from './components/StickyBar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <StickyBar />
      </BrowserRouter>
    </LanguageProvider>
  )
}
