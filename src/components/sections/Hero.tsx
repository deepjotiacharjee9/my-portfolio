import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ToolkitStrip from '../ui/ToolkitStrip'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}

const FORMATS = ['Short Form', 'Long Form', 'Reels', 'YouTube', 'Podcasts']

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-20 overflow-hidden"
    >
      {/* ── Aurora Drift ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="aurora-blob aurora-a absolute rounded-full"
          style={{ width: 500, height: 500, top: '8%', left: '12%',
            background: '#3b82f6', filter: 'blur(70px)', opacity: 0.45 }}
        />
        <div
          className="aurora-blob aurora-b absolute rounded-full"
          style={{ width: 420, height: 420, top: '28%', right: '8%',
            background: '#22d3ee', filter: 'blur(70px)', opacity: 0.45 }}
        />
        <div
          className="aurora-blob aurora-c absolute rounded-full"
          style={{ width: 380, height: 380, bottom: '12%', left: '38%',
            background: '#6366f1', filter: 'blur(70px)', opacity: 0.40 }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-[2] flex-1 flex items-center px-6">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center"
          >
            {/* Availability chip */}
            <motion.div variants={item} className="flex justify-center items-center gap-2.5 mb-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-70" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34D399]" />
              </span>
              <span className="text-[11px] text-[rgba(110,231,183,0.95)] tracking-[0.2em] uppercase">
                Available for new projects
              </span>
            </motion.div>

            {/* Hero headline */}
            <motion.h1
              variants={item}
              className="font-display font-extrabold leading-[0.88] tracking-tight uppercase"
              style={{ fontSize: 'clamp(3.8rem, 13vw, 12rem)' }}
            >
              <span style={{ color: 'rgba(96,165,250,0.32)' }}>VIDEO</span>
              <br />
              <span style={{
                backgroundImage: 'linear-gradient(135deg, #FFFFFF 15%, #BAE6FD 55%, #60A5FA 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                EDITOR.
              </span>
            </motion.h1>

            {/* Sub copy */}
            <motion.p
              variants={item}
              className="mt-7 text-[rgba(186,230,253,0.72)] text-lg max-w-[480px] mx-auto leading-relaxed"
            >
              Short form or long form — I make every frame count, every
              cut intentional, every video worth watching till the end.
            </motion.p>

            {/* Format chips */}
            <motion.div variants={item} className="mt-8 flex flex-wrap justify-center items-center gap-2">
              {FORMATS.map((f, i) => (
                <span key={f}>
                  <span className="px-3.5 py-1.5 border border-[rgba(96,165,250,0.18)] bg-[rgba(96,165,250,0.04)] text-[10px] text-[rgba(147,197,253,0.80)] tracking-[0.22em] uppercase inline-block">
                    {f}
                  </span>
                  {i < FORMATS.length - 1 && (
                    <span className="inline-block w-px h-3 bg-[rgba(96,165,250,0.18)] mx-2 align-middle" />
                  )}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={item} className="mt-10 flex justify-center">
              <a
                href="#work"
                data-hover
                className="group flex items-center gap-2 px-8 py-4 bg-[#2563EB] text-white font-semibold text-sm tracking-wide hover:bg-[#1D4ED8] transition-colors duration-300"
              >
                View My Work
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-[2]"><ToolkitStrip /></div>
    </section>
  )
}
