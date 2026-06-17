import { useEffect, useRef } from 'react'

interface Star {
  x: number; y: number; r: number
  opacity: number; twinkleSpeed: number; phase: number
}
interface Meteor {
  x: number; y: number; len: number; speed: number
  alpha: number; active: boolean
}

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let stars: Star[] = []
    let meteors: Meteor[] = []
    const ANGLE = Math.PI / 5

    const spawnMeteor = (): Meteor => ({
      x:      Math.random() * canvas.width,
      y:      Math.random() * canvas.height * 0.6,
      len:    Math.random() * 110 + 60,
      speed:  Math.random() * 4 + 3,
      alpha:  0,
      active: false,
    })

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width  = canvas.offsetWidth  * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)

      const area  = canvas.offsetWidth * canvas.offsetHeight
      const count = Math.min(Math.floor(area / 5500), 250)
      stars = Array.from({ length: count }, () => ({
        x:            Math.random() * canvas.offsetWidth,
        y:            Math.random() * canvas.offsetHeight,
        r:            Math.random() * 1.1 + 0.15,
        opacity:      Math.random() * 0.55 + 0.2,
        twinkleSpeed: Math.random() * 0.5 + 0.08,
        phase:        Math.random() * Math.PI * 2,
      }))
      meteors = Array.from({ length: 4 }, spawnMeteor)
    }

    let t = 0
    const draw = () => {
      t += 0.016
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Stars
      for (const s of stars) {
        const a = s.opacity * (0.55 + 0.45 * Math.sin(t * s.twinkleSpeed + s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,225,255,${a})`
        ctx.fill()
      }

      // Shooting stars
      for (const m of meteors) {
        if (!m.active) {
          if (Math.random() < 0.0006) { m.active = true; m.alpha = 0.9 }
          continue
        }
        m.x    += Math.cos(ANGLE) * m.speed
        m.y    += Math.sin(ANGLE) * m.speed
        m.alpha -= 0.010

        const tx = m.x - Math.cos(ANGLE) * m.len
        const ty = m.y - Math.sin(ANGLE) * m.len
        const g  = ctx.createLinearGradient(tx, ty, m.x, m.y)
        g.addColorStop(0, 'rgba(186,230,253,0)')
        g.addColorStop(1, `rgba(186,230,253,${Math.max(0, m.alpha)})`)
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(m.x, m.y)
        ctx.strokeStyle = g
        ctx.lineWidth   = 1.2
        ctx.stroke()

        if (m.alpha <= 0) Object.assign(m, spawnMeteor())
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Radial vignette — dark edges, open centre */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 40%, transparent 30%, rgba(2,8,20,0.72) 100%)' }}
      />

      {/* Very subtle blue glow at bottom — gives depth without clutter */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: '35%', background: 'linear-gradient(to top, rgba(37,99,235,0.07), transparent)' }}
      />
    </>
  )
}
