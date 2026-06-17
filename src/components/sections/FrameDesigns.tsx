import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import { useFrameDesigns } from '../../hooks/useProjects'

const SLIDE_W = 70  // % of container width per slide
const GAP_W   = 3   // % gap between slides
const STEP    = SLIDE_W + GAP_W                // 73% per step
const OFFSET  = (100 - SLIDE_W) / 2           // 15% — centers the active slide

export default function FrameDesigns() {
  const { designs } = useFrameDesigns()
  const [index, setIndex] = useState(0)
  const pointerStartX = useRef<number | null>(null)

  if (designs.length === 0) return null

  const current = designs[index]

  const go = (step: number) => {
    setIndex((i) => Math.max(0, Math.min(i + step, designs.length - 1)))
  }

  const onPointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return
    const diff = pointerStartX.current - e.clientX
    if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1)
    pointerStartX.current = null
  }

  const translateX = OFFSET - index * STEP

  return (
    <section className="py-16 border-t border-[rgba(96,165,250,0.12)]">
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <SectionLabel number="05" label="Frame Designs" />
        <h2
          className="font-display font-extrabold text-[#F8FAFC] leading-tight"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
        >
          Design &amp;{' '}
          <span style={{ color: 'rgba(96,165,250,0.32)' }}>Frames</span>
        </h2>
      </div>

      {/* Carousel track */}
      <div
        className="relative overflow-hidden select-none cursor-grab active:cursor-grabbing"
        style={{ height: '62vh' }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div
          className="flex h-full"
          style={{
            transform: `translateX(${translateX}%)`,
            transition: 'transform 0.72s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            gap: `${GAP_W}%`,
          }}
        >
          {designs.map((design, i) => {
            const isActive = i === index
            return (
              <div
                key={design.id}
                className="shrink-0 h-full overflow-hidden bg-[#060E1A]"
                style={{
                  width: `${SLIDE_W}%`,
                  opacity: isActive ? 1 : 0.52,
                  transform: isActive ? 'scale(1)' : 'scale(0.96)',
                  transition: 'opacity 0.65s ease, transform 0.65s ease',
                  cursor: isActive ? 'default' : 'pointer',
                }}
                onClick={() => { if (!isActive) go(i > index ? 1 : -1) }}
              >
                <img
                  src={design.imageUrl}
                  alt={design.title}
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              </div>
            )
          })}
        </div>

        {/* Left arrow */}
        {index > 0 && (
          <button
            onClick={() => go(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-black/50 border border-[rgba(96,165,250,0.18)] text-[rgba(148,163,184,0.80)] hover:text-white hover:bg-black/80 hover:border-[rgba(96,165,250,0.40)] transition-all duration-200 z-10"
            aria-label="Previous"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* Right arrow */}
        {index < designs.length - 1 && (
          <button
            onClick={() => go(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-black/50 border border-[rgba(96,165,250,0.18)] text-[rgba(148,163,184,0.80)] hover:text-white hover:bg-black/80 hover:border-[rgba(96,165,250,0.40)] transition-all duration-200 z-10"
            aria-label="Next"
          >
            <ChevronRight size={22} />
          </button>
        )}

        {/* Counter */}
        <div className="absolute bottom-4 right-4 text-[11px] text-[rgba(148,163,184,0.55)] tabular-nums tracking-[0.15em] z-10">
          {index + 1} / {designs.length}
        </div>
      </div>

      {/* Info row */}
      <div className="max-w-6xl mx-auto px-6 mt-5 flex items-start justify-between gap-4">
        <div>
          <span className="text-[10px] text-[#60A5FA] tracking-[0.22em] uppercase">
            {current.category}
          </span>
          <h3 className="font-display font-semibold text-[rgba(248,250,252,0.90)] mt-1 text-lg leading-snug">
            {current.title}
          </h3>
          {current.description && (
            <p className="text-sm text-[rgba(148,163,184,0.70)] mt-1.5 leading-relaxed max-w-xl">
              {current.description}
            </p>
          )}
        </div>

        {/* Dot indicators */}
        {designs.length > 1 && (
          <div className="flex items-center gap-2 shrink-0 mt-1.5">
            {designs.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === index
                    ? 'w-5 h-1.5 bg-[#60A5FA]'
                    : 'w-1.5 h-1.5 bg-[rgba(96,165,250,0.25)] hover:bg-[rgba(96,165,250,0.50)]'
                }`}
                aria-label={`Go to frame ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
