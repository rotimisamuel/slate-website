'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const impactData = [
  { title: 'Full-Spectrum Partner', body: "Software, AI, e-learning, and hardware — one partner across your entire technology value chain. No handoffs, no gaps." },
  { title: 'AI-Powered Delivery', body: "We don't just advise on AI — we engineer it. End-to-end AI solutions built for African institutions, in production today." },
  { title: 'E-Learning at Scale', body: 'LMS platforms designed for national institutions, including the Nigerian Police Force — mobile-first, offline, 370K+ users.' },
  { title: 'Locally Built. Global Standard.', body: 'International engineering rigour with deep knowledge of African infrastructure and institutional realities.' },
]

function ImpactVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let w = 0, h = 0

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Animated circuit grid
    const COLS = 12, ROWS = 10
    let t = 0

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      t += 0.015

      const cw = w / COLS
      const rh = h / ROWS

      // Grid lines
      ctx.strokeStyle = 'rgba(118,185,0,0.08)'
      ctx.lineWidth = 0.5
      for (let c = 0; c <= COLS; c++) {
        ctx.beginPath()
        ctx.moveTo(c * cw, 0)
        ctx.lineTo(c * cw, h)
        ctx.stroke()
      }
      for (let r = 0; r <= ROWS; r++) {
        ctx.beginPath()
        ctx.moveTo(0, r * rh)
        ctx.lineTo(w, r * rh)
        ctx.stroke()
      }

      // Glowing nodes at intersections
      for (let c = 0; c <= COLS; c++) {
        for (let r = 0; r <= ROWS; r++) {
          const phase = (c * 0.8 + r * 1.2 + t) % (Math.PI * 2)
          const alpha = (Math.sin(phase) + 1) / 2 * 0.6
          if (alpha > 0.3) {
            const x = c * cw
            const y = r * rh
            ctx.beginPath()
            ctx.arc(x, y, 2, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(118,185,0,${alpha})`
            ctx.fill()
          }
        }
      }

      // Traveling pulses on grid lines
      const numPulses = 6
      for (let i = 0; i < numPulses; i++) {
        const progress = ((t * 0.3 + i / numPulses) % 1)
        const row = Math.floor(i * (ROWS / numPulses))
        const x = progress * w
        const y = row * rh

        const grad = ctx.createRadialGradient(x, y, 0, x, y, 40)
        grad.addColorStop(0, 'rgba(118,185,0,0.7)')
        grad.addColorStop(1, 'rgba(118,185,0,0)')
        ctx.beginPath()
        ctx.arc(x, y, 40, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 420 }}>
      {/* AI-generated server room background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/images/server-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.35,
      }} />
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      <span style={{ position: 'absolute', top: 0, right: 0, width: 14, height: 14, background: 'var(--color-primary)', zIndex: 2 }} />
      {/* Corner label */}
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
        Abuja · London
      </div>
    </div>
  )
}

export default function Difference() {
  const [openIdx, setOpenIdx] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const accordionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(headerRef.current?.children ?? [], {
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      })

      // Accordion items stagger
      const items = accordionRef.current?.querySelectorAll('.accordion-row')
      if (items) {
        gsap.from(items, {
          scrollTrigger: { trigger: accordionRef.current, start: 'top 80%' },
          x: -40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
        })
      }

      // Image reveal with clip path
      gsap.from(imageRef.current, {
        scrollTrigger: { trigger: imageRef.current, start: 'top 80%' },
        clipPath: 'inset(100% 0 0 0)',
        duration: 1.2,
        ease: 'expo.out',
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Animate accordion body open/close
  const handleAccordion = (idx: number) => {
    const prevBody = bodyRefs.current[openIdx]
    const nextBody = bodyRefs.current[idx]
    const isSame = idx === openIdx

    if (prevBody && openIdx !== idx) {
      gsap.to(prevBody, { height: 0, duration: 0.3, ease: 'power2.in' })
    }

    if (nextBody) {
      if (isSame) {
        gsap.to(nextBody, { height: 0, duration: 0.3, ease: 'power2.in' })
        setOpenIdx(-1)
      } else {
        gsap.set(nextBody, { height: 'auto' })
        const target = nextBody.offsetHeight
        gsap.from(nextBody, { height: 0, duration: 0.35, ease: 'power2.out' })
        gsap.to(nextBody, { height: target, duration: 0.35, ease: 'power2.out' })
        setOpenIdx(idx)
      }
    }
  }

  return (
    <section
      id="difference"
      ref={sectionRef}
      className="rsp-pad"
      style={{
        background: '#000',
        color: '#fff',
        padding: '96px 32px',
        fontFamily: 'var(--font-brand)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 56px' }}>
          <div style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
            marginBottom: 18,
          }}>
            The Slate difference
          </div>
          <h2 style={{
            margin: '0 0 18px',
            fontSize: 'clamp(30px, 4vw, 44px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}>
            Why leading institutions choose us
          </h2>
          <p style={{
            margin: 0,
            fontSize: 17,
            lineHeight: 1.65,
            color: 'rgba(255,255,255,0.7)',
          }}>
            One partner across your entire technology value chain — software, AI, e-learning, and hardware, engineered to perform where our clients actually are.
          </p>
        </div>

        <div className="rsp-stack" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
          alignItems: 'stretch',
        }}>
          {/* Accordion */}
          <div ref={accordionRef} style={{ borderTop: '1px solid var(--color-hairline-strong)' }}>
            {impactData.map((it, i) => (
              <div
                key={i}
                className="accordion-row"
                style={{
                  borderBottom: '1px solid var(--color-hairline-strong)',
                  padding: '22px 4px',
                  cursor: 'pointer',
                }}
                onClick={() => handleAccordion(i)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    width: 24,
                    flexShrink: 0,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 style={{
                    margin: 0,
                    flex: 1,
                    fontSize: 20,
                    fontWeight: 700,
                    lineHeight: 1.25,
                    color: openIdx === i ? '#fff' : 'rgba(255,255,255,0.78)',
                    transition: 'color 0.2s',
                  }}>
                    {it.title}
                  </h3>
                  <span style={{
                    fontSize: 22,
                    lineHeight: 1,
                    color: 'var(--color-primary)',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>
                    {openIdx === i ? '–' : '+'}
                  </span>
                </div>
                <div
                  ref={el => { bodyRefs.current[i] = el }}
                  className="accordion-body"
                  style={{ height: i === 0 ? 'auto' : 0 }}
                >
                  <p style={{
                    margin: '14px 0 4px 40px',
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: 'rgba(255,255,255,0.7)',
                    maxWidth: '46ch',
                  }}>
                    {it.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Animated visual */}
          <div ref={imageRef} style={{ position: 'relative', minHeight: 420 }}>
            <ImpactVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
