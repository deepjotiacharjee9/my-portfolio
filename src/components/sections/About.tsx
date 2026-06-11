import { motion } from 'framer-motion'
import { Film, Palette, Monitor, Mic } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'

const skills = [
  { icon: Film,    label: 'Non-linear Editing', tools: 'Premiere Pro · DaVinci Resolve' },
  { icon: Palette, label: 'Color Grading',       tools: 'DaVinci Resolve · Lumetri'     },
  { icon: Monitor, label: 'Motion Graphics',     tools: 'After Effects · Motion'         },
  { icon: Mic,     label: 'Sound Design',        tools: 'Audition · Logic Pro'           },
]

const fadeLeft  = { hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } } }
const fadeRight = { hidden: { opacity: 0, x:  24 }, show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } } }

export default function About() {
  return (
    <section id="about" className="py-24 px-6 border-t border-[rgba(96,165,250,0.12)]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* ── Photo ── */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[3/4] bg-[rgba(255,255,255,0.02)] border border-[rgba(96,165,250,0.12)] relative overflow-hidden">
            {/*
              REPLACE THIS PLACEHOLDER WITH YOUR PHOTO
              Add an <img> tag:
                <img src="/your-photo.jpg" alt="Deepjoti Acharjee"
                     className="w-full h-full object-cover" />
            */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-8">
              <span className="text-[rgba(148,163,184,0.55)] text-[11px] tracking-[0.2em] uppercase">
                Add your photo here
              </span>
              <span style={{ color: 'rgba(96,165,250,0.08)' }} className="text-xs">
                Replace the placeholder div in About.tsx
              </span>
            </div>

            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[rgba(96,165,250,0.20)]" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[rgba(96,165,250,0.20)]" />
          </div>

          {/* Floating badge */}
          <div className="hidden md:block absolute -bottom-5 -right-5 bg-[rgba(255,255,255,0.03)] border border-[rgba(96,165,250,0.12)] px-5 py-4">
            <div className="text-[10px] text-[rgba(147,197,253,0.75)] tracking-[0.2em] uppercase mb-1">Based in</div>
            <div className="text-sm font-semibold text-[#F8FAFC]">India</div>
          </div>
        </motion.div>

        {/* ── Bio ── */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <SectionLabel number="04" label="About" />

          <h2
            className="font-display font-extrabold text-[#F8FAFC] leading-tight mb-7"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}
          >
            The Editor<br />
            <span style={{ color: 'rgba(96,165,250,0.12)' }}>Behind the Story</span>
          </h2>

          <div className="space-y-4 text-[rgba(148,163,184,0.85)] leading-relaxed text-[15px]">
            <p>
              I'm Deepjoti Acharjee — a documentary and long-form video editor
              with a deep belief that every frame should serve the story.
            </p>
            <p>
              I work with creators, podcasters, and filmmakers who want their
              videos to do more than just look good. They want them to{' '}
              <em className="text-[rgba(186,230,253,0.72)] not-italic">feel something</em>,
              retain viewers, and build a loyal audience.
            </p>
            <p>
              My background is in documentary storytelling, which means I think
              about structure, pacing, and emotional arc before I touch a single
              cut. That's the difference between a video that performs and one
              that people talk about.
            </p>
          </div>

          {/* Skills */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map(({ icon: Icon, label, tools }) => (
              <div
                key={label}
                className="border border-[rgba(96,165,250,0.12)] p-4 hover:border-[rgba(96,165,250,0.25)] transition-colors duration-300"
              >
                <Icon size={16} className="text-[#60A5FA] mb-3" />
                <div className="text-sm font-medium text-[rgba(226,232,240,0.88)]">{label}</div>
                <div className="text-xs text-[rgba(148,163,184,0.75)] mt-1">{tools}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
