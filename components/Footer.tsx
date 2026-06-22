'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SlateLogo = () => (
  <svg viewBox="0 0 60 64" width="27" height="29" fill="none" aria-hidden="true" style={{ display: 'block', flex: 'none' }}>
    <rect x="13" y="2" width="45" height="11" fill="#ffffff" />
    <polygon points="13,2 22,2 13,11" fill="#000" />
    <rect x="2" y="19" width="45" height="11" fill="#76b900" />
    <polygon points="47,19 56,19 47,28" fill="#000" />
    <rect x="13" y="36" width="45" height="11" fill="#76b900" />
    <polygon points="13,36 22,36 13,45" fill="#000" />
    <rect x="2" y="53" width="45" height="11" fill="#ffffff" />
    <polygon points="47,53 56,53 47,62" fill="#000" />
  </svg>
)

const serviceLinks = [
  { label: 'Custom Software',        href: '/services/software' },
  { label: 'Digital Transformation', href: '/services/transformation' },
  { label: 'AI Strategy',            href: '/services/ai' },
  { label: 'E-Learning',             href: '/services/elearning' },
  { label: 'Consulting',             href: '/services/consulting' },
  { label: 'Hardware & Flexi-Pay',   href: '/services/hardware' },
]

const productLinks = [
  { label: 'Laptops',      href: '/products#laptops' },
  { label: 'Smartphones',  href: '/products#smartphones' },
  { label: 'Tablets',      href: '/products#tablets' },
  { label: 'Desktops',     href: '/products#desktops' },
  { label: 'UPS Systems',  href: '/products#ups' },
  { label: 'Power Banks',  href: '/products#powerbanks' },
]

const companyLinks = [
  { label: 'About',            href: '/#partnership' },
  { label: 'SDOI Initiative',  href: '/sdoi' },
  { label: 'Contact',          href: '/contact' },
  { label: 'slateworld.io ↗', href: 'https://slateworld.io', external: true },
]

export default function Footer() {
  const footerRef   = useRef<HTMLElement>(null)
  const gridRef     = useRef<HTMLDivElement>(null)
  const wordmarkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grid columns — y-slide only (no opacity so links are always visible)
      gsap.from(gridRef.current?.children ?? [], {
        scrollTrigger: { trigger: gridRef.current, start: 'top 88%' },
        y: 30, duration: 0.7, ease: 'power3.out', stagger: 0.1,
        clearProps: 'transform',
      })

      // Wordmark parallax
      gsap.to(wordmarkRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1.5,
        },
        y: -80,
        ease: 'none',
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      style={{ background: '#000', color: '#fff', overflow: 'hidden', fontFamily: "'Inter', Arial, sans-serif" }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px 0' }}>
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
            gap: 48,
            paddingBottom: 64,
            borderBottom: '1px solid #5e5e5e',
          }}
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 11,
                textDecoration: 'none', color: '#fff', fontWeight: 700,
                fontSize: 22, letterSpacing: '-0.02em', marginBottom: 20,
              }}
            >
              <SlateLogo />
              Slate<span style={{ color: '#76b900' }}>.</span>
            </Link>
            <p style={{ margin: '0 0 18px', maxWidth: '42ch', fontSize: 14, lineHeight: 1.65, color: 'rgba(255,255,255,0.6)' }}>
              A full-spectrum technology company. Software development, AI strategy, e-learning, consulting, and intelligent hardware — engineered for African realities, built to global standard.
            </p>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.45)' }}>
              Slate Technologies Limited<br />
              Registered in Nigeria &amp; United Kingdom
            </p>
          </div>

          {/* Services */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 18 }}>
              Services
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {serviceLinks.map(s => (
                <li key={s.label}>
                  <Link href={s.href} className="link-green">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 18 }}>
              Products
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {productLinks.map(p => (
                <li key={p.label}>
                  <Link href={p.href} className="link-green">{p.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 18 }}>
              Company
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {companyLinks.map(c => (
                <li key={c.label}>
                  <Link
                    href={c.href}
                    className="link-green"
                    target={c.external ? '_blank' : undefined}
                    rel={c.external ? 'noopener noreferrer' : undefined}
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, padding: '28px 0' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.02em' }}>
            © 2026 Slate Technologies Limited. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy', 'Terms', 'Warranty'].map(item => (
              <a
                key={item}
                href="#"
                style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.55)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Giant wordmark parallax */}
      <div ref={wordmarkRef} style={{ lineHeight: 0.78, overflow: 'hidden', padding: '0 16px', userSelect: 'none' }}>
        <span style={{ display: 'block', fontSize: 'clamp(120px, 22vw, 320px)', fontWeight: 700, letterSpacing: '-0.04em', color: 'rgba(255,255,255,0.04)', whiteSpace: 'nowrap' }}>
          Slate.
        </span>
      </div>
    </footer>
  )
}
