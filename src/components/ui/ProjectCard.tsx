import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Clock } from 'lucide-react'
import type { Project } from '../../types'

interface Props {
  project: Project
  onClick: (p: Project) => void
  index: number
}

function autoThumb(p: Project): string {
  if (p.thumbnail) return p.thumbnail
  if (p.videoType === 'drive')   return `https://drive.google.com/thumbnail?id=${p.videoId}&sz=w800`
  return `https://img.youtube.com/vi/${p.videoId}/maxresdefault.jpg`
}

export default function ProjectCard({ project, onClick, index }: Props) {
  const [imgError, setImgError] = useState(false)
  const thumb = autoThumb(project)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer"
      onClick={() => onClick(project)}
      data-hover
    >
      {/* ── Thumbnail ── */}
      <div className="relative overflow-hidden aspect-video bg-[#060E1A]">
        {!imgError && (
          <img
            src={thumb}
            alt={project.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-colors duration-300 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-13 h-13 border border-white/30 rounded-full flex items-center justify-center"
            style={{ width: 52, height: 52 }}
          >
            <Play size={18} fill="#FFFFFF" strokeWidth={0} className="ml-0.5" />
          </motion.div>
        </div>

        {/* Format badge */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-black/65 backdrop-blur-sm">
          <span className="text-[10px] text-[rgba(147,197,253,0.75)] tracking-[0.2em] uppercase font-medium">
            {project.format === 'short-form' ? 'Short Form' : 'Long Form'}
          </span>
        </div>

        {/* Duration badge */}
        {project.duration && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/65 backdrop-blur-sm">
            <Clock size={9} className="text-[rgba(148,163,184,0.60)]" />
            <span className="text-[10px] text-[rgba(148,163,184,0.60)]">{project.duration}</span>
          </div>
        )}
      </div>

      {/* ── Info row ── */}
      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-display font-semibold text-[rgba(248,250,252,0.95)] group-hover:text-[#60A5FA] transition-colors duration-200 leading-snug truncate">
            {project.title}
          </h3>
          <p className="text-xs text-[rgba(148,163,184,0.65)] mt-0.5 truncate">{project.client}</p>
        </div>
        <span className="text-xs text-[rgba(148,163,184,0.40)] tabular-nums shrink-0 mt-0.5">{project.year}</span>
      </div>
    </motion.article>
  )
}
