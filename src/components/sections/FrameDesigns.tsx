import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import { useFrameDesigns } from '../../hooks/useProjects'
import type { FrameDesign } from '../../types'

function DesignCard({
  design,
  onClick,
  index,
}: {
  design: FrameDesign
  onClick: () => void
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer overflow-hidden border border-[rgba(96,165,250,0.10)] hover:border-[rgba(96,165,250,0.30)] transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative aspect-video bg-[rgba(255,255,255,0.02)] overflow-hidden">
        <img
          src={design.imageUrl}
          alt={design.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,8,15,0.90)] via-[rgba(3,8,15,0.20)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <span className="text-[10px] text-[#60A5FA] tracking-[0.2em] uppercase mb-1.5">
            {design.category}
          </span>
          <span className="text-sm font-medium text-white leading-snug">{design.title}</span>
          {design.description && (
            <span className="text-xs text-[rgba(148,163,184,0.80)] mt-1 line-clamp-2">
              {design.description}
            </span>
          )}
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[rgba(96,165,250,0.15)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[rgba(96,165,250,0.15)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  )
}

function Lightbox({ design, onClose }: { design: FrameDesign; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-[rgba(3,8,15,0.95)] backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-5 right-5 w-9 h-9 border border-[rgba(96,165,250,0.18)] flex items-center justify-center text-[rgba(148,163,184,0.70)] hover:text-white hover:border-[rgba(96,165,250,0.40)] transition-all duration-200"
        onClick={onClose}
      >
        <X size={16} />
      </button>

      <div
        className="max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={design.imageUrl}
          alt={design.title}
          className="w-full max-h-[78vh] object-contain"
        />
        <div className="mt-4 flex items-start gap-4 border-t border-[rgba(96,165,250,0.08)] pt-4">
          <div className="flex-1">
            <div className="text-[10px] text-[#60A5FA] tracking-[0.2em] uppercase mb-1">
              {design.category}
            </div>
            <div className="text-sm font-medium text-[#F8FAFC]">{design.title}</div>
            {design.description && (
              <div className="text-xs text-[rgba(148,163,184,0.72)] mt-1.5 leading-relaxed">
                {design.description}
              </div>
            )}
          </div>
          <span className="text-[11px] text-[rgba(148,163,184,0.45)] tracking-[0.15em] uppercase mt-0.5 shrink-0">
            Click outside to close
          </span>
        </div>
      </div>
    </div>
  )
}

export default function FrameDesigns() {
  const { designs } = useFrameDesigns()
  const [selected, setSelected] = useState<FrameDesign | null>(null)

  if (designs.length === 0) return null

  return (
    <>
      <section className="py-16 px-6 border-t border-[rgba(96,165,250,0.12)]">
        <div className="max-w-6xl mx-auto">
          <SectionLabel number="03" label="Frame Designs" />

          <h2
            className="font-display font-extrabold text-[#F8FAFC] leading-tight mb-10"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
          >
            Design &amp;{' '}
            <span style={{ color: 'rgba(96,165,250,0.32)' }}>Frames</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {designs.map((d, i) => (
              <DesignCard
                key={d.id}
                design={d}
                onClick={() => setSelected(d)}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {selected && <Lightbox design={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
