import { useEffect, useState } from 'react'
import CustomCursor from './components/ui/CustomCursor'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Stats from './components/sections/Stats'
import Work from './components/sections/Work'
import About from './components/sections/About'
import Footer from './components/layout/Footer'
import AdminApp from './pages/admin/AdminApp'

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
      <CustomCursor />

      {/* ── Atmospheric background blobs ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* Blob 1: large, top-right */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-20%',
          width: '70vw',
          height: '70vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(29,78,216,0.07) 45%, transparent 70%)',
        }} />
        {/* Blob 2: mid, bottom-left */}
        <div style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-20%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.10) 0%, rgba(37,99,235,0.06) 45%, transparent 70%)',
        }} />
        {/* Blob 3: tiny, center */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '30vw',
          height: '30vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(147,197,253,0.04) 0%, transparent 70%)',
        }} />
      </div>

      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Work />
        <About />
      </main>
      <Footer />
    </>
  )
}
