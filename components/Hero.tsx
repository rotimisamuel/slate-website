'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let w = 0, h = 0

    type Particle = {
      x: number; y: number; vx: number; vy: number
      r: number; alpha: number; pulse: number; pulseSpeed: number
    }
    const particles: Particle[] = []
    const COUNT = 70

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: (Math.random() * 0.01) + 0.005,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      // Draw connections
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(118,185,0,${(1 - dist / 140) * 0.15})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        p.pulse += p.pulseSpeed
        const glow = 0.5 + Math.sin(p.pulse) * 0.3
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(118,185,0,${p.alpha * glow})`
        ctx.fill()

        // Move
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} id="hero-canvas" />
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const line3Ref = useRef<HTMLSpanElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2, defaults: { ease: 'power3.out' } })

      tl.from(overlayRef.current, { opacity: 0, duration: 1.2, clearProps: 'opacity' })
        .from(badgeRef.current, { y: -20, opacity: 0, duration: 0.6, clearProps: 'opacity,transform' }, '-=0.8')
        .from([line1Ref.current, line2Ref.current, line3Ref.current], {
          y: 80, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power4.out', clearProps: 'opacity,transform',
        }, '-=0.4')
        .from(descRef.current, { y: 30, opacity: 0, duration: 0.7, clearProps: 'opacity,transform' }, '-=0.5')
        .from(ctaRef.current?.children ?? [], {
          y: 25, opacity: 0, duration: 0.5, stagger: 0.1, clearProps: 'opacity,transform',
        }, '-=0.4')
        .from(statRef.current, {
          y: 30, opacity: 0, scale: 0.88, duration: 0.7, ease: 'back.out(2)', clearProps: 'opacity,transform',
        }, '-=0.3')

      // Parallax — scoped to ctx so it's cleaned up on unmount
      if (sectionRef.current) {
        gsap.to(sectionRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
          yPercent: 12,
        })
      }

      // Stat count-up — scoped query so we never pick up stale DOM from another page
      const obj = { val: 0 }
      const statNum = sectionRef.current?.querySelector('.hero-stat-num')
      if (statNum) {
        tl.to(obj, {
          val: 78, duration: 1.4, ease: 'power2.out',
          onUpdate: () => { statNum.textContent = Math.round(obj.val) + 'K+' },
        }, '-=0.2')
      }
    }, sectionRef)  // scope: only reverts animations belonging to this section

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#000',
        color: '#fff',
        overflow: 'hidden',
        minHeight: '88vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* AI-generated hero background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/images/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }} />

      {/* Particle canvas on top of image */}
      <ParticleCanvas />

      {/* Gradient overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(105deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.82) 40%, rgba(0,0,0,0.55) 72%, rgba(0,0,0,0.35) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle green glow in top-right */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '50vw',
        height: '60vw',
        background: 'radial-gradient(ellipse at center, rgba(118,185,0,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div className="rsp-pad-x" style={{
        position: 'relative',
        maxWidth: 1280,
        margin: '0 auto',
        padding: '80px 32px 64px',
        width: '100%',
      }}>
        {/* Badge */}
        <div
          ref={badgeRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            border: '1px solid var(--color-hairline-strong)',
            padding: '7px 14px',
            borderRadius: 2,
            marginBottom: 56,
          }}
        >
          <span style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--color-primary)',
            boxShadow: '0 0 0 4px rgba(118,185,0,0.25)',
            flexShrink: 0,
          }} />
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.85)',
          }}>
            Available for new engagements
          </span>
        </div>

        {/* Two-column layout */}
        <div className="rsp-stack" style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          gap: 48,
          alignItems: 'end',
        }}>
          {/* Headline */}
          <div>
            <h1 style={{
              margin: 0,
              fontWeight: 700,
              fontSize: 'clamp(48px, 7vw, 92px)',
              lineHeight: 0.98,
              letterSpacing: '-0.03em',
            }}>
              <span className="line-wrap">
                <span ref={line1Ref} style={{ display: 'block' }}>We build.</span>
              </span>
              <span className="line-wrap">
                <span ref={line2Ref} style={{ display: 'block' }}>We scale.</span>
              </span>
              <span className="line-wrap">
                <span ref={line3Ref} style={{ display: 'block' }}>
                  We <span style={{ color: 'var(--color-primary)' }}>transform.</span>
                </span>
              </span>
            </h1>
          </div>

          {/* Description + CTAs */}
          <div style={{ paddingBottom: 10 }}>
            <p
              ref={descRef}
              style={{
                margin: '0 0 28px',
                fontSize: 17,
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.82)',
                maxWidth: '38ch',
              }}
            >
              Slate engineers the systems that run modern institutions — custom software, AI, e-learning, and intelligent hardware. Engineered for African realities, delivered to global standard.
            </p>
            <div ref={ctaRef} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href="#contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 52,
                  padding: '0 28px',
                  background: 'var(--color-primary)',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: 16,
                  textDecoration: 'none',
                  borderRadius: 2,
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-primary-dark)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-primary)')}
              >
                Start a project
              </a>
              <a
                href="#services"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 52,
                  padding: '0 24px',
                  background: 'transparent',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 16,
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.85)',
                  borderRadius: 2,
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)'
                  e.currentTarget.style.color = 'var(--color-primary)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.85)'
                  e.currentTarget.style.color = '#fff'
                }}
              >
                Explore our work
              </a>
            </div>
          </div>
        </div>

        {/* Stat card */}
        <div
          ref={statRef}
          style={{
            marginTop: 56,
            display: 'inline-block',
            background: 'rgba(0,0,0,0.85)',
            border: '1px solid var(--color-hairline-strong)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            padding: '20px 26px',
            position: 'relative',
          }}
        >
          <span style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 12,
            height: 12,
            background: 'var(--color-primary)',
          }} />
          <div style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: 8,
          }}>
            Trusted across two continents
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <span
              className="hero-stat-num"
              style={{ fontSize: 44, fontWeight: 700, lineHeight: 1, color: 'var(--color-primary)' }}
            >
              0K+
            </span>
            <span style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.85)',
            }}>
              Customers<br />served
            </span>
          </div>
        </div>
      </div>

      {/* Bottom gradient bleed */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 120,
        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />
    </section>
  )
}
