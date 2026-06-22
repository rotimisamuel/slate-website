'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const quoteText = 'Execution is the critical part of a successful strategy.'
const quoteHighlight = 'Getting it done. Getting it done right.'
const quoteEnd = 'Getting it done better than anyone else.'

export default function Quote() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLQuoteElement>(null)
  const attrRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Expanding line
      gsap.from(lineRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        scaleX: 0,
        transformOrigin: 'center',
        duration: 1.2,
        ease: 'expo.out',
      })

      // Label
      gsap.from(labelRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.1,
      })

      // Wrap each word in a span for stagger
      const blockquote = quoteRef.current
      if (blockquote) {
        const wordEls = blockquote.querySelectorAll('.quote-word')
        gsap.from(wordEls, {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          y: 20,
          opacity: 0,
          stagger: 0.025,
          duration: 0.4,
          ease: 'power3.out',
          delay: 0.2,
        })
      }

      // Author
      gsap.from(attrRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.6,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const wrapWords = (text: string, highlight = false) =>
    text.split(' ').map((word, i) => (
      <span key={i} className="quote-word" style={{
        display: 'inline-block',
        marginRight: '0.28em',
        color: highlight ? 'var(--color-primary)' : undefined,
      }}>
        {word}
      </span>
    ))

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--color-surface-soft)',
        borderTop: '1px solid var(--color-hairline)',
        borderBottom: '1px solid var(--color-hairline)',
        fontFamily: 'var(--font-brand)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative line */}
      <div
        ref={lineRef}
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: 2,
          background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
        }}
      />

      <div style={{
        maxWidth: 1000,
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
            marginBottom: 28,
          }}
        >
          Perspective
        </div>

        <blockquote
          ref={quoteRef}
          style={{
            margin: 0,
            fontSize: 'clamp(22px, 3.4vw, 38px)',
            fontWeight: 700,
            lineHeight: 1.35,
            letterSpacing: '-0.01em',
            color: 'var(--color-ink)',
          }}
        >
          {wrapWords(quoteText)}
          {wrapWords(quoteHighlight, true)}
          {wrapWords(quoteEnd)}
        </blockquote>

        <div
          ref={attrRef}
          style={{
            marginTop: 32,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--color-mute)',
          }}
        >
          Louis Gerstner · Former CEO, IBM
        </div>
      </div>
    </section>
  )
}
