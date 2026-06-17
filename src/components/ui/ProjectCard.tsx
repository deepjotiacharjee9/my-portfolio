import { useState } from 'react'
import { Play, Clock, X } from 'lucide-react'
import type { Project } from '../../types'
import { useInView } from '../../hooks/useInView'

interface Props {
  project: Project
  index: number
}

function embedUrl(p: Project) {
  if (p.videoType === 'drive') {
    return `https://drive.google.com/file/d/${p.videoId}/preview`
  }
  if (p.format === 'short-form') {
    return `https://www.youtube.com/embed/${p.videoId}?rel=0&playsinline=1`
  }
  const origin = encodeURIComponent(window.location.origin)
  return `https://www.youtube.com/embed/${p.videoId}?autoplay=1&rel=0&origin=${origin}`
}

function autoThumb(p: Project): string {
  if (p.thumbnail) return p.thumbnail
  if (p.videoType === 'drive') return `https://drive.google.com/thumbnail?id=${p.videoId}&sz=w800`
  return `https://img.youtube.com/vi/${p.videoId}/maxresdefault.jpg`
}

export default function ProjectCard({ project, index }: Props) {
  const [imgError, setImgError] = useState(false)
  const [playing, setPlaying] = useState(false)
  const isShort = project.format === 'short-form'
  const isDrive = project.videoType === 'drive'
  const thumb = autoThumb(project)
  const { ref, inView } = useInView(0.15)

  return (
    /* Outer: scroll reveal */
    <div
      ref={ref}
      className={`card-reveal${inView ? ' in' : ''}`}
      style={{ transitionDelay: `${index * 0.07}s` }}
    >
    {/* Inner: hover lift + tilt */}
    <div className="card-tilt">
    <article
      className="group cursor-pointer"
      onClick={() => { if (!playing) setPlaying(true) }}
      data-hover
    >
      {/* Thumbnail / Player */}
      <div className={`relative overflow-hidden bg-[#060E1A] ${isShort ? 'aspect-[9/16]' : 'aspect-video'}`}>
        {playing ? (
          <>
            {isDrive ? (
              /*
               * Drive's /preview page has a ~52px toolbar at the top.
               * We offset the iframe upward to hide it and compensate the height,
               * so the actual video fills the full frame on all screen sizes.
               */
              <div className="absolute inset-0 overflow-hidden">
                <iframe
                  src={`https://drive.google.com/file/d/${project.videoId}/preview`}
                  style={{
                    position: 'absolute',
                    top: '-60px',
                    left: 0,
                    width: '100%',
                    height: 'calc(100% + 60px)',
                    border: 'none',
                  }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={project.title}
                />
              </div>
            ) : (
              <iframe
                src={embedUrl(project)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                title={project.title}
              />
            )}
            <button
              onClick={(e) => { e.stopPropagation(); setPlaying(false) }}
              className="absolute top-2 right-2 w-7 h-7 bg-black/70 flex items-center justify-center text-white hover:bg-black/90 transition-colors z-10"
              aria-label="Stop video"
            >
              <X size={13} />
            </button>
          </>
        ) : (
          <>
            {!imgError && (
              <img
                src={thumb}
                alt={project.title}
                loading="lazy"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            )}

            {/* Hover play overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-colors duration-300 flex items-center justify-center">
              <div
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/30 rounded-full flex items-center justify-center"
                style={{ width: 52, height: 52 }}
              >
                <Play size={18} fill="#FFFFFF" strokeWidth={0} className="ml-0.5" />
              </div>
            </div>

            {/* Format badge */}
            <div className="absolute top-3 left-3 px-2 py-1 bg-black/65 backdrop-blur-sm">
              <span className="text-[10px] text-[rgba(147,197,253,0.75)] tracking-[0.2em] uppercase font-medium">
                {isShort ? 'Short Form' : 'Long Form'}
              </span>
            </div>

            {/* Duration badge */}
            {project.duration && (
              <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/65 backdrop-blur-sm">
                <Clock size={9} className="text-[rgba(148,163,184,0.78)]" />
                <span className="text-[10px] text-[rgba(148,163,184,0.78)]">{project.duration}</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Info row */}
      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-display font-semibold text-[rgba(248,250,252,0.95)] group-hover:text-[#60A5FA] transition-colors duration-200 leading-snug truncate">
            {project.title}
          </h3>
          <p className="text-xs text-[rgba(148,163,184,0.82)] mt-0.5 truncate">{project.client}</p>
        </div>
        <span className="text-xs text-[rgba(148,163,184,0.65)] tabular-nums shrink-0 mt-0.5">{project.year}</span>
      </div>
    </article>
    </div>
    </div>
  )
}
