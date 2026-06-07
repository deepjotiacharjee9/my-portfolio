import CustomCursor from './components/ui/CustomCursor'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Stats from './components/sections/Stats'
import Work from './components/sections/Work'
import About from './components/sections/About'
import Testimonials from './components/sections/Testimonials'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'

export default function App() {
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
