import { useEffect, useState } from 'react'
import CustomCursor from './components/ui/CustomCursor'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Stats from './components/sections/Stats'
import Work from './components/sections/Work'
import FrameDesigns from './components/sections/FrameDesigns'
import About from './components/sections/About'
import Footer from './components/layout/Footer'
import AdminApp from './pages/admin/AdminApp'
import StarBackground from './components/ui/StarBackground'

function useHash() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const handler = () => setHash(window.location.hash)
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])
  return hash
}

export default function App() {
  const hash = useHash()

  if (hash.startsWith('#/admin')) return <AdminApp />

  return (
    <>
      {/* ── Global star background — fixed so it persists across all sections ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
        <StarBackground />
      </div>

      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Work />
        <FrameDesigns />
        <About />
      </main>
      <Footer />
    </>
  )
}
