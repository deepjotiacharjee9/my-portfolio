import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const STATS = [
  { value: 50,  suffix: '+',  label: 'Videos Edited',    sub: 'Across all formats'        },
  { value: 10,  suffix: 'M+', label: 'Views Generated',  sub: 'Combined across clients'   },
  { value: 5,   suffix: '+',  label: 'Years Experience',  sub: 'Documentary & long-form'  },
  { value: 100, suffix: '%',  label: 'Client Retention',  sub: 'Repeat clients & referrals'},
]

function useCountUp(target: number, duration = 1800, enabled = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!enabled) return
    let val = 0
    const step = target / (duration / 16)
    const id = setInterval(() => {
      val = Math.min(val + step, target)
      setCount(Math.floor(val))
      if (val >= target) clearInterval(id)
    }, 16)
    return () => clearInterval(id)
  }, [target, duration, enabled])
  return count
}

function StatItem({ value, suffix, label, sub, index }: (typeof STATS)[0] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  const count = useCountUp(value, 1800, on)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setOn(true) },
      { threshold: 0.5 }
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="border-l border-[#1E1E1E] pl-6 first:border-l-0 first:pl-0"
    >
      <div
        className="font-display font-extrabold leading-none text-[#F0EDE8] tabular-nums"
        style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}
      >
        {count}<span className="text-[#C8A96E]">{suffix}</span>
      </div>
      <div className="mt-2.5 text-sm font-medium text-[#888888]">{label}</div>
      <div className="mt-1 text-xs text-[#383838]">{sub}</div>
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section className="py-20 px-6 border-t border-[#1A1A1A]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {STATS.map((s, i) => (
            <StatItem key={s.label} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
