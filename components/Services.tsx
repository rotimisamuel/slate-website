'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { num: '01', glyph: '◆', title: 'Custom Software', body: 'Web, mobile, APIs, and backend systems — scalable, secure, and documented for your team to own.' },
  { num: '02', glyph: '⬡', title: 'Digital Transformation', body: 'Legacy modernisation to full re-architecture, with change management built in from day one.' },
  { num: '03', glyph: '◈', title: 'AI Strategy', body: 'Production-ready AI — intelligent tutoring at national scale, predictive analytics, and process automation.' },
  { num: '04', glyph: '▤', title: 'E-Learning Platforms', body: 'Mobile-first, offline-capable LMS for governments, security agencies, and enterprises.' },
  { num: '05', glyph: '◇', title: 'Technology Consulting', body: 'Independent advisory on strategy, vendor selection, governance, and digital investment.' },
  { num: '06', glyph: '▥', title: 'Hardware & Flexi-Pay', body: 'Laptops, phones, tablets, and power systems with transparent, flexible ownership plans.' },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading group scrolls in
      gsap.from(headingRef.current?.children ?? [], {
        scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
      })

      // Cards stagger cascade
      const cards = gridRef.current?.querySelectorAll('.service-card-item')
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 78%',
          },
          y: 60,
          opacity: 0,
          stagger: { amount: 0.9, grid: [2, 3] },
          duration: 0.7,
          ease: 'power3.out',
        })
      }

      // Glyph icons pop in
      const glyphs = gridRef.current?.querySelectorAll('.service-glyph')
      if (glyphs) {
        gsap.from(glyphs, {
          scrollTrigger: { trigger: gridRef.current, start: 'top 70%' },
          scale: 0,
          opacity: 0,
          stagger: 0.08,
          duration: 0.4,
          ease: 'back.out(2)',
          delay: 0.2,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '96px 32px',
        fontFamily: 'var(--font-brand)',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: '0.85fr 1.5fr',
        gap: 64,
        alignItems: 'start',
      }}>
        {/* Sticky sidebar */}
        <div ref={headingRef} style={{ position: 'sticky', top: 110 }}>
          <div style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
            marginBottom: 20,
          }}>
            What we deliver
          </div>
          <h2 style={{
            margin: '0 0 20px',
            fontSize: 'clamp(32px, 4vw, 44px)',
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
          }}>
            Six disciplines.<br />One standard.
          </h2>
          <p style={{
            margin: '0 0 28px',
            fontSize: 16,
            lineHeight: 1.6,
            color: 'var(--color-body)',
            maxWidth: '36ch',
          }}>
            We design and build end-to-end — from strategy to deployment, from architecture to scale — creating systems that perform in production.
          </p>
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 44,
              padding: '0 24px',
              background: '#000',
              color: '#fff',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              borderRadius: 2,
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--color-primary)'
              e.currentTarget.style.color = '#000'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#000'
              e.currentTarget.style.color = '#fff'
            }}
          >
            Get in touch
          </a>
        </div>

        {/* Service grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 1,
            background: 'var(--color-hairline)',
            border: '1px solid var(--color-hairline)',
          }}
        >
          {services.map((s) => (
            <div
              key={s.num}
              className="service-card service-card-item"
              style={{
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                minHeight: 220,
                cursor: 'default',
              }}
            >
              {/* Corner accent */}
              <span style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 12,
                height: 12,
                background: 'var(--color-primary)',
              }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  className="service-glyph"
                  style={{ fontSize: 24, lineHeight: 1, color: 'var(--color-primary)' }}
                >
                  {s.glyph}
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--color-ash)' }}>
                  {s.num}
                </span>
              </div>
              <h3 style={{
                margin: '4px 0 0',
                fontSize: 20,
                fontWeight: 700,
                lineHeight: 1.2,
                color: 'var(--color-ink)',
              }}>
                {s.title}
              </h3>
              <p style={{
                margin: 0,
                fontSize: 15,
                lineHeight: 1.6,
                color: 'var(--color-body)',
              }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
