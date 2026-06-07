import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from '../ui/ProjectCard'
import VideoModal from '../ui/VideoModal'
import SectionLabel from '../ui/SectionLabel'
import { projects } from '../../data/projects'
import type { Project } from '../../types'

function FormatSubSection({
  title,
  items,
  onSelect,
  baseIndex,
}: {
  title: string
  items: Project[]
  onSelect: (p: Project) => void
  baseIndex: number
}) {
  if (items.length === 0) return null

  return (
    <div className="mt-10">
      {/* Sub-section label */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-[11px] text-[#C8A96E] tracking-[0.25em] uppercase font-medium">
          {title}
        </span>
        <span className="flex-1 h-px bg-[#1A1A1A]" />
        <span className="text-[11px] text-[#2E2E2E] tabular-nums">{items.length} videos</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={onSelect}
            index={baseIndex + i}
          />
        ))}
      </div>
    </div>
  )
}

function EraSection({
  eraLabel,
  sectionNumber,
  eraKey,
  onSelect,
}: {
  eraLabel: string
  sectionNumber: string
  eraKey: 'recent' | 'old'
  onSelect: (p: Project) => void
}) {
  const eraProjects = projects.filter((p) => p.era === eraKey)
  const shortForm   = eraProjects.filter((p) => p.format === 'short-form')
  const longForm    = eraProjects.filter((p) => p.format === 'long-form')

  return (
    <div className="py-16 px-6 border-t border-[#1A1A1A]">
      <div className="max-w-6xl mx-auto">
        <SectionLabel number={sectionNumber} label={eraLabel} />

        <h2
          className="font-display font-extrabold text-[#F0EDE8] leading-tight"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
        >
          {eraLabel === 'Recent Works'
            ? <>Latest &amp; <span className="text-[#252525]">Greatest</span></>
            : <>The Archive</>
          }
        </h2>

        <FormatSubSection
          title="Short Form"
          items={shortForm}
          onSelect={onSelect}
          baseIndex={0}
        />
        <FormatSubSection
          title="Long Form"
          items={longForm}
          onSelect={onSelect}
          baseIndex={shortForm.length}
        />

        {eraProjects.length === 0 && (
          <p className="mt-10 text-[#2E2E2E] text-sm">
            No projects yet. Add them in{' '}
            <code className="text-[#C8A96E]">src/data/projects.ts</code>{' '}
            with <code className="text-[#C8A96E]">era: '{eraKey}'</code>
          </p>
        )}
      </div>
    </div>
  )
}

export default function Work() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <>
      <div id="work">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <EraSection
            eraLabel="Recent Works"
            sectionNumber="02"
            eraKey="recent"
            onSelect={setSelected}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <EraSection
            eraLabel="Old Videos"
            sectionNumber="03"
            eraKey="old"
            onSelect={setSelected}
          />
        </motion.div>
      </div>

      <VideoModal project={selected} onClose={() => setSelected(null)} />
    </>
  )
}
