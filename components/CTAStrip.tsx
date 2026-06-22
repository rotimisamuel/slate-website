'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTAStrip() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const h2Ref = useRef<HTMLHeadingElement>(null)
  const paraRef = useRef<HTMLParagraphElement>(null)
  const btnsRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // BG green flash on entry
      gsap.from(bgRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      })

      gsap.from(labelRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        y: 30,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
      })

      gsap.from(h2Ref.current?.children ?? [h2Ref.current], {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power4.out',
        delay: 0.1,
      })

      gsap.from(paraRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
        y: 25,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.2,
      })

      gsap.from(btnsRef.current?.children ?? [], {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        y: 30,
        opacity: 0,
        scale: 0.9,
        stagger: 0.12,
        duration: 0.6,
        ease: 'back.out(2)',
        delay: 0.3,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        background: '#000',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'var(--font-brand)',
      }}
    >
      {/* Subtle green radial glow */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          height: '80vw',
          maxWidth: 1000,
          maxHeight: 1000,
          background: 'radial-gradient(ellipse, rgba(118,185,0,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{
        position: 'relative',
        maxWidth: 1280,
        margin: '0 auto',
        padding: '96px 32px',
        textAlign: 'center',
      }}>
        <div
          ref={labelRef}
          style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
            marginBottom: 22,
          }}
        >
          Ready to begin?
        </div>

        <h2
          ref={h2Ref}
          style={{
            margin: '0 0 20px',
            fontSize: 'clamp(32px, 4.4vw, 56px)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          <span style={{ display: 'block' }}>Let&apos;s build something</span>
          <span style={{ display: 'block' }}>
            <span style={{ color: 'var(--color-primary)' }}>remarkable</span> together.
          </span>
        </h2>

        <p
          ref={paraRef}
          style={{
            margin: '0 auto 36px',
            maxWidth: '56ch',
            fontSize: 17,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.72)',
          }}
        >
          Talk to our team about your project — no obligation, no jargon. We respond within one business day across both continents.
        </p>

        <div
          ref={btnsRef}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a
            href="mailto:hello@slateworld.io"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 52,
              padding: '0 30px',
              background: 'var(--color-primary)',
              color: '#000',
              fontWeight: 700,
              fontSize: 16,
              textDecoration: 'none',
              borderRadius: 2,
              transition: 'background 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--color-primary-dark)'
              e.currentTarget.style.transform = 'scale(1.03)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--color-primary)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
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
              padding: '0 26px',
              background: 'transparent',
              color: '#fff',
              fontWeight: 700,
              fontSize: 16,
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.85)',
              borderRadius: 2,
              transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--color-primary)'
              e.currentTarget.style.color = 'var(--color-primary)'
              e.currentTarget.style.transform = 'scale(1.03)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.85)'
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            See services
          </a>
        </div>
      </div>
    </section>
  )
}
