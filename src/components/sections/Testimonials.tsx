import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import { testimonials } from '../../data/projects'

export default function Testimonials() {
  return (
    <section className="py-24 px-6 border-t border-[#1A1A1A]">
      <div className="max-w-6xl mx-auto">
        <SectionLabel number="05" label="Client Words" />

        <h2
          className="font-display font-extrabold text-[#F0EDE8] leading-tight mb-14"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
        >
          What Clients<br />
          <span className="text-[#252525]">Are Saying</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="border border-[#1E1E1E] p-6 flex flex-col hover:border-[#252525] transition-colors duration-300"
            >
              <Quote size={18} className="text-[#C8A96E] opacity-50 mb-5 shrink-0" />

              <p className="text-[#666666] text-sm leading-relaxed flex-1">
                &ldquo;{t.content}&rdquo;
              </p>

              <div className="border-t border-[#1A1A1A] pt-4 mt-5">
                <div className="text-sm font-medium text-[#C8C8C8]">{t.name}</div>
                <div className="text-xs text-[#C8A96E] mt-0.5">{t.role}</div>
                <div className="text-xs text-[#383838] mt-0.5">{t.platform}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
