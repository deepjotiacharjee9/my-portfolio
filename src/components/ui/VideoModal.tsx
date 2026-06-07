import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
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

export default function VideoModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return
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
              className="absolute -top-9 right-0 flex items-center gap-1.5 text-xs text-[#555555] hover:text-[#F0EDE8] transition-colors duration-200"
            >
              <X size={14} /> Close
            </button>

            {/* 16:9 video */}
            <div className="aspect-video w-full bg-[#141414] border border-[#252525]">
              <iframe
                key={project.videoId}
                src={embedUrl(project)}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={project.title}
              />
            </div>

            {/* Meta row */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <h3 className="font-display font-semibold text-base text-[#F0EDE8]">
                  {project.title}
                </h3>
                <p className="text-sm text-[#555555] mt-1 max-w-xl leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 shrink-0">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 text-[11px] border border-[#252525] text-[#555555] tracking-wide">
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
