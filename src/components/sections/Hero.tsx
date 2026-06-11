import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import VideoModal from '../ui/VideoModal'
import ToolkitStrip from '../ui/ToolkitStrip'
import type { Project } from '../../types'

/**
 * SHOWREEL CONFIG
 * ──────────────────────────────────────────────────────
 * Replace SHOWREEL_DRIVE_ID with your Google Drive file ID.
 *   Share URL: https://drive.google.com/file/d/FILE_ID/view
 *   → copy the FILE_ID portion only
 *
 * Or switch to YouTube:
 *   videoType: 'youtube', videoId: 'YOUR_YT_VIDEO_ID'
 * ──────────────────────────────────────────────────────
 */
const SHOWREEL_ID = 'YOUR_SHOWREEL_DRIVE_FILE_ID'

const showreel: Project = {
  id:          'showreel',
  title:       'Showreel 2024',
  client:      'Deepjoti Acharjee',
  year:        2024,
  era:         'recent',
  format:      'long-form',
  thumbnail:   '',
  videoType:   'drive',
  videoId:     SHOWREEL_ID,
  description: 'A curated selection of my best work — short form and long form.',
  tags:        ['Showreel', 'Short Form', 'Long Form'],
  featured:    true,
}


const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  const [open, setOpen] = useState(false)
  const thumbUrl = `https://drive.google.com/thumbnail?id=${SHOWREEL_ID}&sz=w800`

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-between pt-20"
      >
        {/* ── Main content ── */}
        <div className="flex-1 flex items-center px-6">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_460px] gap-12 lg:gap-20 items-center"
            >
              {/* ── Left: Text ── */}
              <div>
                {/* Availability chip */}
                <motion.div variants={item} className="flex items-center gap-2.5 mb-10">
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
                  style={{ fontSize: 'clamp(3.2rem, 9.5vw, 9.5rem)' }}
                >
                  <span style={{ color: 'rgba(96,165,250,0.12)' }}>VIDEO</span>
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
                  className="mt-7 text-[rgba(186,230,253,0.72)] text-lg max-w-[400px] leading-relaxed"
                >
                  Short form or long form — I make every frame count, every
                  cut intentional, every video worth watching till the end.
                </motion.p>

                {/* CTAs */}
                <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
                  <a
                    href="#work"
                    data-hover
                    className="group flex items-center gap-2 px-6 py-3.5 bg-[#2563EB] text-white font-semibold text-sm tracking-wide hover:bg-[#1D4ED8] transition-colors duration-300"
                  >
                    View My Work
                    <ArrowRight
                      size={15}
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    />
                  </a>
                  <button
                    onClick={() => setOpen(true)}
                    data-hover
                    className="group flex items-center gap-2 px-6 py-3.5 border border-[rgba(96,165,250,0.22)] text-[rgba(203,213,225,0.80)] text-sm tracking-wide hover:border-[rgba(96,165,250,0.45)] hover:text-white transition-all duration-300"
                  >
                    <Play size={13} fill="currentColor" strokeWidth={0} />
                    Play Showreel
                  </button>
                </motion.div>
              </div>

              {/* ── Right: Showreel card ── */}
              <motion.div variants={item} className="w-full">
                <div
                  className="relative aspect-video overflow-hidden border border-[rgba(96,165,250,0.12)] cursor-pointer group"
                  onClick={() => setOpen(true)}
                  data-hover
                >
                  {/* Thumbnail */}
                  <img
                    src={thumbUrl}
                    alt="Showreel thumbnail"
                    className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:brightness-60 transition-all duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
                  />

                  {/* Gradient fallback bg */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0D1929] to-[#03080F]" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
                    <div className="w-[60px] h-[60px] rounded-full border border-white/15 flex items-center justify-center group-hover:border-[rgba(96,165,250,0.40)] group-hover:bg-[rgba(59,130,246,0.08)] transition-all duration-400">
                      <Play size={22} fill="#FFFFFF" strokeWidth={0} className="ml-1" />
                    </div>
                    <span className="text-[11px] text-[rgba(148,163,184,0.82)] tracking-[0.25em] uppercase group-hover:text-[#60A5FA] transition-colors duration-300">
                      Play Showreel
                    </span>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-0 right-0 w-7 h-7 border-t border-r border-[rgba(96,165,250,0.20)] z-10" />
                  <div className="absolute bottom-0 left-0 w-7 h-7 border-b border-l border-[rgba(96,165,250,0.20)] z-10" />
                </div>

                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-[11px] text-[rgba(148,163,184,0.65)] tracking-[0.2em] uppercase">
                    Showreel 2024
                  </span>
                  <span className="text-[11px] text-[rgba(148,163,184,0.55)]">
                    Replace with your Drive ID ↑
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <ToolkitStrip />
      </section>

      <VideoModal project={open ? showreel : null} onClose={() => setOpen(false)} />
    </>
  )
}
