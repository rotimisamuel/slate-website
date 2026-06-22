'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const partnerA = [
  'Strategy, architecture, and delivery under one roof',
  'Systems that perform in production, on infrastructure that works where you are',
  'International engineering rigour with African institutional knowledge',
  'Built scalable, secure, and documented for your team to own',
]

const partnerB = [
  'LMS designed for 370,000+ Nigerian Police officers',
  'Mobile-first with offline content download for low-connectivity regions',
  'AI tutoring, gamification, and HR-system integration',
  '99%+ uptime across all production platforms',
]

function TechVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let w = 0, h = 0
    let t = 0

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Isometric grid
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      t += 0.008

      // Dark gradient bg
      const bg = ctx.createLinearGradient(0, 0, w, h)
      bg.addColorStop(0, '#0a0a0a')
      bg.addColorStop(1, '#111')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      // Hexagonal grid pattern
      const size = 32
      const hexH = size * Math.sqrt(3)
      const hexW = size * 2

      for (let row = -1; row < Math.ceil(h / hexH) + 1; row++) {
        for (let col = -1; col < Math.ceil(w / (hexW * 0.75)) + 1; col++) {
          const x = col * hexW * 0.75
          const y = row * hexH + (col % 2 === 0 ? 0 : hexH / 2)
          const phase = (col * 0.5 + row * 0.7 + t) % (Math.PI * 2)
          const glow = (Math.sin(phase) + 1) / 2

          ctx.beginPath()
          for (let a = 0; a < 6; a++) {
            const angle = (a * Math.PI) / 3
            const hx = x + size * Math.cos(angle)
            const hy = y + size * Math.sin(angle)
            if (a === 0) ctx.moveTo(hx, hy)
            else ctx.lineTo(hx, hy)
          }
          ctx.closePath()
          ctx.strokeStyle = `rgba(118,185,0,${0.04 + glow * 0.1})`
          ctx.lineWidth = 0.5
          ctx.stroke()

          if (glow > 0.8) {
            ctx.fillStyle = `rgba(118,185,0,${(glow - 0.8) * 0.15})`
            ctx.fill()
          }
        }
      }

      // Glowing orbs
      const orbs = [
        { ox: w * 0.2, oy: h * 0.3, speed: 0.7 },
        { ox: w * 0.7, oy: h * 0.6, speed: 1.1 },
        { ox: w * 0.5, oy: h * 0.8, speed: 0.9 },
      ]
      orbs.forEach(({ ox, oy, speed }) => {
        const px = ox + Math.sin(t * speed) * 20
        const py = oy + Math.cos(t * speed * 0.7) * 15
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 60)
        grad.addColorStop(0, 'rgba(118,185,0,0.15)')
        grad.addColorStop(1, 'rgba(118,185,0,0)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
}

function LearningVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let w = 0, h = 0
    let t = 0

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const NODES = 12
    type Node = { x: number; y: number; vx: number; vy: number; r: number; connected: boolean }
    const nodes: Node[] = Array.from({ length: NODES }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 4 + 2,
      connected: false,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      t += 0.01

      // Move nodes
      nodes.forEach(n => {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      })

      // Draw connections
      nodes.forEach((a, i) => {
        nodes.forEach((b, j) => {
          if (i >= j) return
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = w * 0.35
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.5
            ctx.beginPath()
            ctx.strokeStyle = `rgba(118,185,0,${alpha})`
            ctx.lineWidth = 0.8
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        })
      })

      // Draw nodes
      nodes.forEach((n, i) => {
        const phase = (i * 0.8 + t) % (Math.PI * 2)
        const glow = (Math.sin(phase) + 1) / 2

        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(118,185,0,${glow * 0.1})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(118,185,0,${0.5 + glow * 0.5})`
        ctx.fill()
      })

      // Green glow center
      const cx = w / 2 + Math.sin(t * 0.5) * 30
      const cy = h / 2 + Math.cos(t * 0.3) * 20
      const centerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.4)
      centerGrad.addColorStop(0, 'rgba(118,185,0,0.08)')
      centerGrad.addColorStop(1, 'rgba(118,185,0,0)')
      ctx.fillStyle = centerGrad
      ctx.fillRect(0, 0, w, h)

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      {/* AI-generated e-learning background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/images/elearning-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.4,
      }} />
      {/* Dark overlay to blend */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
      }} />
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
    </>
  )
}

export default function Partnership() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const row1ImgRef = useRef<HTMLDivElement>(null)
  const row1TextRef = useRef<HTMLDivElement>(null)
  const row2ImgRef = useRef<HTMLDivElement>(null)
  const row2TextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from(headerRef.current?.children ?? [], {
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
      })

      // Row 1: image from left, text from right
      gsap.from(row1ImgRef.current, {
        scrollTrigger: { trigger: row1ImgRef.current, start: 'top 80%' },
        x: -60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      })
      gsap.from(row1TextRef.current?.children ?? [], {
        scrollTrigger: { trigger: row1TextRef.current, start: 'top 80%' },
        x: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
      })

      // Row 2: text from left, image from right
      gsap.from(row2TextRef.current?.children ?? [], {
        scrollTrigger: { trigger: row2TextRef.current, start: 'top 80%' },
        x: -60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
      })
      gsap.from(row2ImgRef.current, {
        scrollTrigger: { trigger: row2ImgRef.current, start: 'top 80%' },
        x: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      })

      // Parallax on images
      gsap.to(row1ImgRef.current, {
        scrollTrigger: { trigger: row1ImgRef.current, scrub: 1, start: 'top bottom', end: 'bottom top' },
        yPercent: -8,
      })
      gsap.to(row2ImgRef.current, {
        scrollTrigger: { trigger: row2ImgRef.current, scrub: 1, start: 'top bottom', end: 'bottom top' },
        yPercent: -8,
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="partnership"
      ref={sectionRef}
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '24px 32px 96px',
        fontFamily: 'var(--font-brand)',
      }}
    >
      {/* Header */}
      <div
        ref={headerRef}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
          alignItems: 'end',
          marginBottom: 64,
        }}
      >
        <div>
          <div style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
            marginBottom: 18,
          }}>
            Who we are
          </div>
          <h2 style={{
            margin: 0,
            fontSize: 'clamp(30px, 3.6vw, 42px)',
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
          }}>
            A technology partner<br />built for purpose.
          </h2>
        </div>
        <p style={{
          margin: 0,
          fontSize: 16,
          lineHeight: 1.65,
          color: 'var(--color-body)',
        }}>
          Slate Technologies Limited is a software, AI, and hardware company working with enterprises, governments, and institutions across Africa and the UK. We design and build end-to-end — from strategy to deployment, from architecture to scale.
        </p>
      </div>

      {/* Row 1 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '0.9fr 1.1fr',
        gap: 48,
        alignItems: 'center',
        padding: '40px 0',
        borderTop: '1px solid var(--color-hairline)',
      }}>
        <div ref={row1ImgRef} style={{ position: 'relative', minHeight: 360, overflow: 'hidden', borderRadius: 2 }}>
          <TechVisual />
          <span style={{ position: 'absolute', bottom: 0, left: 0, width: 14, height: 14, background: 'var(--color-primary)', zIndex: 2 }} />
          <div style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            zIndex: 2,
          }}>
            Full-Stack Architecture
          </div>
        </div>

        <div ref={row1TextRef}>
          <h3 style={{ margin: '0 0 20px', fontSize: 24, fontWeight: 700, lineHeight: 1.2 }}>
            Built end-to-end,<br />from strategy to scale
          </h3>
          <ul style={{
            listStyle: 'none',
            margin: '0 0 24px',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}>
            {partnerA.map((p, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: 15, lineHeight: 1.5, flexShrink: 0 }}>›</span>
                <span style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--color-body)' }}>{p}</span>
              </li>
            ))}
          </ul>
          <a
            href="#services"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: 'var(--color-primary)',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              transition: 'gap 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.gap = '12px')}
            onMouseLeave={e => (e.currentTarget.style.gap = '8px')}
          >
            Learn more <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      {/* Row 2 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: 48,
        alignItems: 'center',
        padding: '40px 0',
        borderTop: '1px solid var(--color-hairline)',
      }}>
        <div ref={row2TextRef}>
          <h3 style={{ margin: '0 0 20px', fontSize: 24, fontWeight: 700, lineHeight: 1.2 }}>
            E-learning at national scale
          </h3>
          <ul style={{
            listStyle: 'none',
            margin: '0 0 24px',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}>
            {partnerB.map((p, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: 15, lineHeight: 1.5, flexShrink: 0 }}>›</span>
                <span style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--color-body)' }}>{p}</span>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: 'var(--color-primary)',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              transition: 'gap 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.gap = '12px')}
            onMouseLeave={e => (e.currentTarget.style.gap = '8px')}
          >
            Learn more <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div ref={row2ImgRef} style={{ position: 'relative', minHeight: 360, overflow: 'hidden', borderRadius: 2 }}>
          <LearningVisual />
          <span style={{ position: 'absolute', top: 0, right: 0, width: 14, height: 14, background: 'var(--color-primary)', zIndex: 2 }} />
          <div style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            zIndex: 2,
          }}>
            370K+ Active Users
          </div>
        </div>
      </div>
    </section>
  )
}
