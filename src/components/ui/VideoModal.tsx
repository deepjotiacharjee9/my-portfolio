import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, ExternalLink } from 'lucide-react'
import type { Project } from '../../types'

interface Props {
  project: Project | null
  onClose: () => void
}

function embedUrl(p: Project) {
  if (p.videoType === 'drive') {
    return `https://drive.google.com/file/d/${p.videoId}/preview`
  }
  return `https://www.youtube.com/embed/${p.videoId}?autoplay=1&rel=0&modestbranding=1`
}

function driveDirectUrl(videoId: string) {
  return `https://drive.google.com/file/d/${videoId}/view`
}

export default function VideoModal({ project, onClose }: Props) {
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    if (!project) return
    setLoadError(false)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/92 modal-backdrop"
          onClick={onClose}
        >
          <motion.div
            key="panel"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1,    opacity: 1, y: 0  }}
            exit={{    scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              data-hover
              className="absolute -top-9 right-0 flex items-center gap-1.5 text-xs text-[rgba(148,163,184,0.78)] hover:text-white transition-colors duration-200"
            >
              <X size={14} /> Close
            </button>

            {/* 16:9 video */}
            <div className="aspect-video w-full bg-[#060E1A] border border-[rgba(96,165,250,0.12)] relative">
              {loadError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center">
                  <AlertTriangle size={28} className="text-[#60A5FA]/60" />
                  <div>
                    <p className="text-[#F8FAFC] text-sm font-medium mb-1">Video couldn't load</p>
                    <p className="text-[rgba(148,163,184,0.82)] text-xs leading-relaxed max-w-sm">
                      {project.videoType === 'drive'
                        ? 'Make sure the Google Drive file is shared as "Anyone with the link can view".'
                        : 'The video could not be embedded. It may be private or have embedding disabled.'}
                    </p>
                  </div>
                  {project.videoType === 'drive' && (
                    <a
                      href={driveDirectUrl(project.videoId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-hover
                      className="flex items-center gap-1.5 px-4 py-2 border border-[rgba(96,165,250,0.30)] text-[#60A5FA] text-xs hover:bg-[rgba(96,165,250,0.10)] transition-colors"
                    >
                      Open in Google Drive <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              ) : (
                <iframe
                  key={project.videoId}
                  src={embedUrl(project)}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={project.title}
                  onError={() => setLoadError(true)}
                  onLoad={(e) => {
                    try {
                      const frame = e.target as HTMLIFrameElement
                      if (project.videoType === 'drive') {
                        const url = frame.contentWindow?.location?.href
                        if (url && !url.includes('drive.google.com')) setLoadError(true)
                      }
                    } catch {
                      // Cross-origin — can't inspect, assume it loaded fine
                    }
                  }}
                />
              )}
            </div>

            {/* Meta row */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <h3 className="font-display font-semibold text-base text-[#F8FAFC]">
                  {project.title}
                </h3>
                <p className="text-sm text-[rgba(148,163,184,0.85)] mt-1 max-w-xl leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 shrink-0">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 text-[11px] border border-[rgba(96,165,250,0.20)] text-[rgba(148,163,184,0.78)] tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
