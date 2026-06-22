'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const faqData = [
  { q: 'What does Slate do?', a: "We're a full-spectrum technology company — custom software, AI systems, e-learning platforms, technology consulting, and intelligent hardware for enterprises, governments, and institutions." },
  { q: 'Where do you operate?', a: 'We work across Africa and the UK, with teams in Abuja and London — engineered for African realities, delivered to global standard.' },
  { q: 'Do you build e-learning platforms?', a: 'Yes. We design and deploy mobile-first, offline-capable LMS platforms for national institutions, including a system designed for 370,000+ Nigerian Police officers.' },
  { q: 'What is Flexi-Pay?', a: 'Flexi-Pay lets you acquire premium hardware today and spread the cost over 6–24 months with a transparent 3% monthly fee on the declining balance — and no early-payoff penalty.' },
  { q: 'How do we start a project?', a: 'Talk to our team about your project — no obligation, no jargon. We respond within one business day across both continents.' },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(-1)
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current?.children ?? [], {
        scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
      })

      const rows = listRef.current?.querySelectorAll('.faq-row')
      if (rows) {
        gsap.from(rows, {
          scrollTrigger: { trigger: listRef.current, start: 'top 80%' },
          x: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggle = (idx: number) => {
    const prevBody = bodyRefs.current[openIdx]
    const nextBody = bodyRefs.current[idx]
    const isSame = idx === openIdx

    if (prevBody && openIdx !== idx) {
      gsap.to(prevBody, { height: 0, duration: 0.3, ease: 'power2.in' })
    }

    if (isSame) {
      if (nextBody) gsap.to(nextBody, { height: 0, duration: 0.3, ease: 'power2.in' })
      setOpenIdx(-1)
    } else {
      if (nextBody) {
        gsap.set(nextBody, { height: 'auto' })
        const target = nextBody.offsetHeight
        gsap.from(nextBody, { height: 0, duration: 0 })
        gsap.to(nextBody, { height: target, duration: 0.35, ease: 'power2.out' })
      }
      setOpenIdx(idx)
    }
  }

  return (
    <section
      id="faq"
      ref={sectionRef}
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '96px 32px',
        fontFamily: 'var(--font-brand)',
      }}
    >
      <div className="rsp-stack" style={{
        display: 'grid',
        gridTemplateColumns: '0.8fr 1.4fr',
        gap: 64,
        alignItems: 'start',
      }}>
        {/* Left: heading */}
        <div ref={headingRef}>
          <div style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
            marginBottom: 18,
          }}>
            FAQs
          </div>
          <h2 style={{
            margin: 0,
            fontSize: 'clamp(30px, 3.6vw, 42px)',
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
          }}>
            Frequently<br />asked questions
          </h2>
        </div>

        {/* Right: accordion */}
        <div ref={listRef} style={{ borderTop: '1px solid var(--color-hairline)' }}>
          {faqData.map((f, i) => (
            <div
              key={i}
              className="faq-row"
              style={{
                borderBottom: '1px solid var(--color-hairline)',
                padding: '24px 4px',
                cursor: 'pointer',
              }}
              onClick={() => toggle(i)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <h3 style={{
                  margin: 0,
                  flex: 1,
                  fontSize: 18,
                  fontWeight: 700,
                  lineHeight: 1.4,
                  color: openIdx === i ? 'var(--color-primary)' : 'var(--color-ink)',
                  transition: 'color 0.2s',
                }}>
                  {f.q}
                </h3>
                <span style={{
                  fontSize: 22,
                  lineHeight: 1,
                  color: 'var(--color-primary)',
                  fontWeight: 700,
                  flexShrink: 0,
                  transition: 'transform 0.3s',
                  transform: openIdx === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  display: 'inline-block',
                }}>
                  +
                </span>
              </div>
              <div
                ref={el => { bodyRefs.current[i] = el }}
                style={{ overflow: 'hidden', height: 0 }}
              >
                <p style={{
                  margin: '14px 0 2px',
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: 'var(--color-body)',
                  maxWidth: '64ch',
                }}>
                  {f.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
