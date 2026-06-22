'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from '@/components/Nav'
import CTAStrip from '@/components/CTAStrip'
import Footer from '@/components/Footer'

gsap.registerPlugin(ScrollTrigger)

export interface ServiceCard  { title: string; texts: string[] }
export interface Principle    { title: string; text: string }
export interface PricingRow   { term: string; monthly: string; total: string; fees: string }

export interface ServiceTemplateProps {
  num: string
  heroTitle: string
  heroSub: string
  buildTitle: string
  buildLead: string[]
  buildCta: string
  buildCards: ServiceCard[]
  techTags?: string[]
  principlesLabel?: string
  principlesTitle?: string
  principles?: Principle[]
  caseNoteTitle?: string
  caseNote?: string
  pricing?: PricingRow[]
}

const allServices = [
  { n: '01', label: 'Custom Software',        href: '/services/software' },
  { n: '02', label: 'Digital Transformation', href: '/services/transformation' },
  { n: '03', label: 'AI Strategy',            href: '/services/ai' },
  { n: '04', label: 'E-Learning',             href: '/services/elearning' },
  { n: '05', label: 'Consulting',             href: '/services/consulting' },
  { n: '06', label: 'Hardware & Flexi-Pay',   href: '/services/hardware' },
]

export default function ServiceTemplate(p: ServiceTemplateProps) {
  const heroRef  = useRef<HTMLElement>(null)
  const buildRef = useRef<HTMLElement>(null)
  const princRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero — y only (never opacity so elements are always readable)
      gsap.from(heroRef.current?.querySelectorAll('.hero-el') ?? [], {
        y: 28, duration: 0.7, ease: 'power3.out', stagger: 0.1, delay: 0.2,
        clearProps: 'transform',
      })

      // Build cards — y-slide only, cards stay fully opaque
      gsap.from(buildRef.current?.querySelectorAll('.build-card') ?? [], {
        scrollTrigger: { trigger: buildRef.current, start: 'top 82%' },
        y: 32, duration: 0.6, ease: 'power3.out', stagger: 0.08,
        clearProps: 'transform',
      })

      // Principles cards — same pattern
      if (princRef.current) {
        gsap.from(princRef.current.querySelectorAll('.pr-card'), {
          scrollTrigger: { trigger: princRef.current, start: 'top 82%' },
          y: 28, duration: 0.6, ease: 'power3.out', stagger: 0.08,
          clearProps: 'transform',
        })
      }
    })
    return () => ctx.revert()
  }, [])

  const hasPrinciples = (p.principles ?? []).length > 0
  const hasTags       = (p.techTags   ?? []).length > 0
  const hasCase       = !!p.caseNote
  const hasPricing    = (p.pricing    ?? []).length > 0

  return (
    <div style={{ fontFamily: "'Inter', Arial, sans-serif", color: '#000', background: '#fff' }}>
      <Nav active="services" />

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ background: '#000', color: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 32px' }}>
          <div className="hero-el" style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#76b900', marginBottom: 20 }}>
            Service · {p.num}
          </div>
          <h1 className="hero-el" style={{ margin: '0 0 24px', fontWeight: 700, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.02, letterSpacing: '-0.03em', maxWidth: '18ch' }}>
            {p.heroTitle}
          </h1>
          <p className="hero-el" style={{ margin: 0, maxWidth: '62ch', fontSize: 18, lineHeight: 1.6, color: 'rgba(255,255,255,0.74)' }}>
            {p.heroSub}
          </p>
        </div>
      </section>

      {/* ── BUILD SECTION ── */}
      <section ref={buildRef} className="rsp-pad" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
        <div className="rsp-stack" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.4fr', gap: 56, alignItems: 'start' }}>

          {/* Sticky sidebar */}
          <div className="rsp-unstick" style={{ position: 'sticky', top: 108 }}>
            <h2 style={{ margin: '0 0 20px', fontSize: 'clamp(30px, 3.4vw, 40px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em', color: '#000' }}>
              {p.buildTitle}
            </h2>
            {p.buildLead.map((para, i) => (
              <p key={i} style={{ margin: '0 0 16px', fontSize: 16, lineHeight: 1.65, color: '#1a1a1a', maxWidth: '42ch' }}>
                {para}
              </p>
            ))}
            <Link
              href="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                height: 46, padding: '0 24px', marginTop: 8,
                background: '#76b900', color: '#000',
                fontWeight: 700, fontSize: 15, textDecoration: 'none', borderRadius: 2,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#5a8d00')}
              onMouseLeave={e => (e.currentTarget.style.background = '#76b900')}
            >
              {p.buildCta} <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Right column */}
          <div>
            {/* Card grid — white cards, 1px gray gap */}
            <div className="rsp-cols-1-xs" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1px',
              background: '#cccccc',
              border: '1px solid #cccccc',
            }}>
              {p.buildCards.map((c, i) => (
                <div
                  key={i}
                  className="build-card"
                  style={{
                    position: 'relative',
                    backgroundColor: '#ffffff',
                    padding: '28px 26px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f7f7f7')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#ffffff')}
                >
                  <span style={{ position: 'absolute', top: 0, left: 0, width: 12, height: 12, backgroundColor: '#76b900', display: 'block' }} />
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, lineHeight: 1.25, color: '#000' }}>{c.title}</h3>
                  {c.texts.map((txt, j) => (
                    <p key={j} style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: '#1a1a1a' }}>{txt}</p>
                  ))}
                </div>
              ))}
            </div>

            {/* Tech tags */}
            {hasTags && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 20 }}>
                {p.techTags!.map(t => (
                  <span key={t} style={{ fontSize: 12.5, fontWeight: 700, color: '#1a1a1a', backgroundColor: '#f7f7f7', border: '1px solid #cccccc', borderRadius: 2, padding: '6px 12px' }}>
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Case note */}
            {hasCase && (
              <div style={{ position: 'relative', marginTop: 20, backgroundColor: '#000', color: '#fff', borderRadius: 2, padding: '26px 28px' }}>
                <span style={{ position: 'absolute', top: 0, right: 0, width: 12, height: 12, backgroundColor: '#76b900', display: 'block' }} />
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#76b900', marginBottom: 10 }}>
                  {p.caseNoteTitle ?? 'Case Note'}
                </div>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: 'rgba(255,255,255,0.82)' }}>{p.caseNote}</p>
              </div>
            )}

            {/* Pricing table */}
            {hasPricing && (
              <div style={{ marginTop: 28 }}>
                <h3 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 700, color: '#000' }}>Flexi-Pay pricing</h3>
                <div style={{ border: '1px solid #cccccc', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', backgroundColor: '#000', color: '#fff' }}>
                    {['Term', 'Monthly', 'Total', 'Fees'].map(h => (
                      <div key={h} style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</div>
                    ))}
                  </div>
                  {p.pricing!.map((row, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', borderTop: '1px solid #cccccc' }}>
                      <div style={{ padding: '14px 16px', fontSize: 14, fontWeight: 700, color: '#000' }}>{row.term}</div>
                      <div style={{ padding: '14px 16px', fontSize: 14, color: '#76b900', fontWeight: 700 }}>{row.monthly}</div>
                      <div style={{ padding: '14px 16px', fontSize: 14, color: '#1a1a1a' }}>{row.total}</div>
                      <div style={{ padding: '14px 16px', fontSize: 14, color: '#757575' }}>{row.fees}</div>
                    </div>
                  ))}
                </div>
                <p style={{ margin: '10px 0 0', fontSize: 12, color: '#757575' }}>*Sample based on ₦1,000 base price. Actual prices vary.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ── */}
      {hasPrinciples && (
        <section ref={princRef} style={{ backgroundColor: '#f7f7f7', borderTop: '1px solid #cccccc', borderBottom: '1px solid #cccccc' }}>
          <div className="rsp-pad" style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 32px' }}>
            <div style={{ maxWidth: 720, marginBottom: 48 }}>
              <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#76b900', marginBottom: 14 }}>
                {p.principlesLabel}
              </div>
              <h2 style={{ margin: 0, fontSize: 'clamp(28px, 3.2vw, 40px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#000' }}>
                {p.principlesTitle}
              </h2>
            </div>
            <div className="rsp-cols-1-xs" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', backgroundColor: '#cccccc', border: '1px solid #cccccc' }}>
              {p.principles!.map((pr, i) => (
                <div
                  key={i}
                  className="pr-card"
                  style={{ position: 'relative', backgroundColor: '#ffffff', padding: '28px 26px', display: 'flex', flexDirection: 'column', gap: '10px', minHeight: 150 }}
                >
                  <span style={{ position: 'absolute', top: 0, left: 0, width: 12, height: 12, backgroundColor: '#76b900', display: 'block' }} />
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, lineHeight: 1.25, color: '#000' }}>{pr.title}</h3>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: '#1a1a1a' }}>{pr.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ALL SERVICES ── */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#757575', marginBottom: 24 }}>
          All services
        </div>
        <div className="rsp-cols-2 rsp-cols-1-xs" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', backgroundColor: '#cccccc', border: '1px solid #cccccc' }}>
          {allServices.map(r => {
            const isCurrent = r.n === p.num
            return (
              <Link
                key={r.n}
                href={r.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '22px 24px', textDecoration: 'none',
                  backgroundColor: isCurrent ? '#000' : '#ffffff',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={e => { if (!isCurrent) e.currentTarget.style.backgroundColor = '#f7f7f7' }}
                onMouseLeave={e => { if (!isCurrent) e.currentTarget.style.backgroundColor = '#ffffff' }}
              >
                <span style={{ fontSize: 14, fontWeight: 700, color: '#76b900', flexShrink: 0 }}>{r.n}</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: isCurrent ? '#fff' : '#000' }}>{r.label}</span>
              </Link>
            )
          })}
        </div>
      </section>

      <CTAStrip />
      <Footer />
    </div>
  )
}
