'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { rawValue: 78, suffix: 'K+', label: 'Customers Served', note: 'Enterprise · Government · Institutional' },
  { rawValue: 5, suffix: '+', label: 'Years Delivering', note: 'Since 2020 · Growing every quarter' },
  { rawValue: 2, suffix: '', label: 'Continents', note: 'Abuja · London · Regional reach' },
  { rawValue: 99, suffix: '%', label: 'Uptime SLA', note: 'Across production platforms' },
]

export default function StatsBand() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards flip in
      const cards = cardsRef.current?.querySelectorAll('.stat-card-item')
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: { trigger: cardsRef.current, start: 'top 82%' },
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
        })
      }

      // Count-up animation for each stat number
      stats.forEach((stat, i) => {
        const numEl = document.querySelector(`.stat-num-${i}`)
        if (!numEl) return
        const obj = { val: 0 }
        gsap.to(obj, {
          scrollTrigger: { trigger: cardsRef.current, start: 'top 82%' },
          val: stat.rawValue,
          duration: 1.8,
          ease: 'power2.out',
          delay: i * 0.1,
          onUpdate: () => {
            numEl.textContent = Math.round(obj.val) + stat.suffix
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '80px 32px',
        fontFamily: 'var(--font-brand)',
      }}
    >
      <div
        ref={cardsRef}
        className="rsp-cols-2"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          background: 'var(--color-hairline)',
          border: '1px solid var(--color-hairline)',
        }}
      >
        {stats.map((st, i) => (
          <div
            key={i}
            className="stat-card stat-card-item"
            style={{ padding: '32px 28px' }}
          >
            <span style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 12,
              height: 12,
              background: 'var(--color-primary)',
            }} />
            <div
              className={`stat-num-${i}`}
              style={{
                fontSize: 'clamp(36px, 4vw, 48px)',
                fontWeight: 700,
                lineHeight: 1,
                color: 'var(--color-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              0{st.suffix}
            </div>
            <div style={{ marginTop: 12, fontSize: 14, fontWeight: 700, color: 'var(--color-ink)' }}>
              {st.label}
            </div>
            <div style={{ marginTop: 4, fontSize: 13, lineHeight: 1.5, color: 'var(--color-mute)' }}>
              {st.note}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
