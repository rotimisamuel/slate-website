'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const items = [
  'Custom Software',
  'Digital Transformation',
  'AI Strategy',
  'E-Learning at Scale',
  'Technology Consulting',
  'Intelligent Hardware',
  'Abuja · London',
]

function MarqueeItem({ text }: { text: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      <span style={{
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.85)',
        padding: '14px 0',
        whiteSpace: 'nowrap',
      }}>
        {text}
      </span>
      <span style={{
        width: 6,
        height: 6,
        background: 'var(--color-primary)',
        margin: '0 28px',
        flexShrink: 0,
        display: 'block',
      }} />
    </span>
  )
}

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(wrapRef.current, {
        scrollTrigger: { trigger: wrapRef.current, start: 'top 90%' },
        y: 16,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'transform',
      })

      // Speed up marquee on scroll
      let currentSpeed = 1
      ScrollTrigger.create({
        trigger: wrapRef.current,
        onUpdate: (self) => {
          const target = 1 + Math.abs(self.getVelocity()) / 3000
          currentSpeed = currentSpeed + (target - currentSpeed) * 0.1
          if (trackRef.current) {
            trackRef.current.style.animationDuration = `${38 / currentSpeed}s`
          }
        },
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={wrapRef}
      style={{
        background: '#000',
        borderTop: '1px solid var(--color-hairline-strong)',
        borderBottom: '1px solid var(--color-hairline-strong)',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontFamily: 'var(--font-brand)',
      }}
    >
      <div ref={trackRef} className="slate-marquee-track">
        {/* Render twice for seamless loop */}
        {[...items, ...items].map((t, i) => (
          <MarqueeItem key={i} text={t} />
        ))}
        {[...items, ...items].map((t, i) => (
          <MarqueeItem key={`b${i}`} text={t} />
        ))}
      </div>
    </div>
  )
}
