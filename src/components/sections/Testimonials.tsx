import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import { useTestimonials } from '../../hooks/useProjects'

export default function Testimonials() {
  const { testimonials } = useTestimonials()
  return (
    <section className="py-24 px-6 border-t border-[rgba(96,165,250,0.12)]">
      <div className="max-w-6xl mx-auto">
        <SectionLabel number="05" label="Client Words" />

        <h2
          className="font-display font-extrabold text-[#F8FAFC] leading-tight mb-14"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
        >
          What Clients<br />
          <span style={{ color: 'rgba(96,165,250,0.12)' }}>Are Saying</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="border border-[rgba(96,165,250,0.12)] p-6 flex flex-col hover:border-[rgba(96,165,250,0.22)] transition-colors duration-300"
            >
              <Quote size={18} className="text-[#60A5FA] opacity-50 mb-5 shrink-0" />

              <p className="text-[rgba(148,163,184,0.68)] text-sm leading-relaxed flex-1">
                &ldquo;{t.content}&rdquo;
              </p>

              <div className="border-t border-[rgba(96,165,250,0.10)] pt-4 mt-5">
                <div className="text-sm font-medium text-[rgba(226,232,240,0.88)]">{t.name}</div>
                <div className="text-xs text-[rgba(147,197,253,0.75)] mt-0.5">{t.role}</div>
                <div className="text-xs text-[rgba(148,163,184,0.55)] mt-0.5">{t.platform}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
