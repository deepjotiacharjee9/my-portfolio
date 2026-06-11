import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, Instagram, Linkedin } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'

/**
 * CONTACT FORM SETUP (Formspree — free tier: 50 submissions/month)
 * ──────────────────────────────────────────────────────────────────
 * 1. Go to https://formspree.io and sign up
 * 2. Create a new form (use rabbanideep@gmail.com as the destination)
 * 3. Copy your form ID (looks like: xpwzknbj)
 * 4. Replace 'YOUR_FORMSPREE_ID' below with your actual form ID
 * ──────────────────────────────────────────────────────────────────
 */
const FORMSPREE_ID = 'YOUR_FORMSPREE_ID'

const PROJECT_TYPES = [
  'Documentary',
  'YouTube Channel',
  'Podcast',
  'Brand Film',
  'Long-form Content',
  'Other',
]

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const [form,   setForm]   = useState({ name: '', email: '', type: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
      if (res.ok) setForm({ name: '', email: '', type: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(96,165,250,0.12)] text-[#F8FAFC] text-sm px-4 py-3 ' +
    'placeholder-[rgba(148,163,184,0.30)] focus:outline-none focus:border-[rgba(96,165,250,0.40)] transition-colors duration-200'

  return (
    <section id="contact" className="py-24 px-6 border-t border-[rgba(96,165,250,0.12)]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* ── Left: Info ── */}
        <div>
          <SectionLabel number="06" label="Get In Touch" />

          <h2
            className="font-display font-extrabold text-[#F8FAFC] leading-tight mb-6"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
          >
            Let's Build<br />
            <span style={{ color: 'rgba(96,165,250,0.12)' }}>Something Real</span>
          </h2>

          <p className="text-[rgba(148,163,184,0.68)] leading-relaxed mb-10 max-w-sm text-[15px]">
            If you're a creator or filmmaker with a vision and a project worth
            telling — I want to hear about it.
          </p>

          <div className="space-y-4">
            {[
              { icon: Mail,      href: 'mailto:rabbanideep@gmail.com', text: 'rabbanideep@gmail.com' },
              { icon: Instagram, href: '#',                             text: '@deepjoti.edits'       },
              { icon: Linkedin,  href: '#',                             text: 'Deepjoti Acharjee'     },
            ].map(({ icon: Icon, href, text }) => (
              <a
                key={text}
                href={href}
                data-hover
                className="flex items-center gap-3 text-sm text-[rgba(148,163,184,0.65)] hover:text-[#60A5FA] transition-colors duration-200 group w-fit"
              >
                <Icon size={14} />
                {text}
                <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {status === 'sent' ? (
            <div className="border border-[rgba(96,165,250,0.15)] bg-[rgba(59,130,246,0.05)] p-10 text-center flex flex-col items-center gap-4">
              <div className="w-10 h-10 border border-[rgba(96,165,250,0.30)] rounded-full flex items-center justify-center text-[#60A5FA] text-lg">
                ✓
              </div>
              <h3 className="font-display font-semibold text-[#F8FAFC]">Message received.</h3>
              <p className="text-sm text-[rgba(148,163,184,0.68)]">I'll be in touch within 24–48 hours.</p>
              <button
                onClick={() => setStatus('idle')}
                data-hover
                className="mt-2 text-xs text-[rgba(148,163,184,0.55)] hover:text-[#60A5FA] transition-colors duration-200"
              >
                Send another →
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-[rgba(148,163,184,0.70)] tracking-[0.2em] uppercase mb-2">Name</label>
                  <input type="text" required placeholder="Your name" value={form.name}    onChange={set('name')}    className={inputClass} />
                </div>
                <div>
                  <label className="block text-[11px] text-[rgba(148,163,184,0.70)] tracking-[0.2em] uppercase mb-2">Email</label>
                  <input type="email" required placeholder="your@email.com" value={form.email} onChange={set('email')} className={inputClass} />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[rgba(148,163,184,0.70)] tracking-[0.2em] uppercase mb-2">Project Type</label>
                <select value={form.type} onChange={set('type')} className={`${inputClass} appearance-none`}>
                  <option value="">Select type</option>
                  {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-[rgba(148,163,184,0.70)] tracking-[0.2em] uppercase mb-2">Your Project</label>
                <textarea
                  required
                  rows={5}
                  placeholder="What are you working on? What's the vision?"
                  value={form.message}
                  onChange={set('message')}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {status === 'error' && (
                <p className="text-xs text-red-400/80">
                  Something went wrong. Email me at{' '}
                  <a href="mailto:rabbanideep@gmail.com" className="underline">rabbanideep@gmail.com</a>
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                data-hover
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#2563EB] text-white font-semibold text-sm tracking-wide hover:bg-[#1D4ED8] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-300"
              >
                {status === 'sending' ? 'Sending…' : <>Send Message <ArrowUpRight size={15} /></>}
              </button>

              <p className="text-[11px] text-[rgba(148,163,184,0.40)] text-center">
                Or email directly at{' '}
                <a href="mailto:rabbanideep@gmail.com" className="text-[rgba(96,165,250,0.70)] hover:text-[#60A5FA] transition-colors duration-200">
                  rabbanideep@gmail.com
                </a>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
