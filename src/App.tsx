import { useEffect, useState } from 'react'
import CustomCursor from './components/ui/CustomCursor'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Stats from './components/sections/Stats'
import Work from './components/sections/Work'
import About from './components/sections/About'
import Testimonials from './components/sections/Testimonials'
import Contact from './components/sections/Contact'
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
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Work />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
