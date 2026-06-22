'use client'

import { useEffect, useRef, useState } from 'react'
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

const links = [
  { href: '/',          label: 'Home',     key: 'home' },
  { href: '/services',  label: 'Services', key: 'services' },
  { href: '/products',  label: 'Products', key: 'products' },
  { href: '/contact',   label: 'Contact',  key: 'contact' },
]

export default function Nav({ active = 'home' }: { active?: string }) {
  const navRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (navRef.current) {
        gsap.from(navRef.current, { y: -20, duration: 0.5, ease: 'power2.out', clearProps: 'transform' })
      }
      ScrollTrigger.create({
        start: 'top -60',
        onUpdate: (self) => {
          if (!navRef.current) return
          gsap.to(navRef.current, {
            boxShadow: self.progress > 0
              ? '0 0 24px rgba(118,185,0,0.18)'
              : '0 0 5px rgba(0,0,0,0.3)',
            duration: 0.3,
          })
        },
      })
    }, navRef)
    return () => ctx.revert()
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [active])

  return (
    <header
      ref={navRef}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: '#000',
        borderBottom: '1px solid #5e5e5e',
        boxShadow: '0 0 5px 0 rgba(0,0,0,0.3)',
        fontFamily: "'Inter', Arial, sans-serif",
      }}
    >
      <nav style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '18px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
      }}>
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 11,
            textDecoration: 'none',
            color: '#fff',
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: '-0.02em',
            flexShrink: 0,
          }}
        >
          <SlateLogo />
          Slate<span style={{ color: '#76b900' }}>.</span>
        </Link>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {links.map(({ href, label, key }) => (
            <Link
              key={key}
              href={href}
              style={{
                color: active === key ? '#76b900' : 'rgba(255,255,255,0.78)',
                textDecoration: 'none',
                fontSize: 15,
                fontWeight: 700,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { if (active !== key) e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { if (active !== key) e.currentTarget.style.color = 'rgba(255,255,255,0.78)' }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              height: 40,
              padding: '0 20px',
              background: '#76b900',
              color: '#000',
              fontWeight: 700,
              fontSize: 14,
              textDecoration: 'none',
              borderRadius: 2,
              flexShrink: 0,
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#5a8d00')}
            onMouseLeave={e => (e.currentTarget.style.background = '#76b900')}
          >
            Get Started <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Hamburger button — mobile only */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            flexShrink: 0,
          }}
        >
          <span style={{ display: 'block', position: 'relative', width: 22, height: 14 }}>
            <span style={{
              display: 'block', position: 'absolute', left: 0, width: '100%', height: 2,
              background: '#fff', borderRadius: 1,
              top: menuOpen ? '50%' : 0,
              transform: menuOpen ? 'translateY(-50%) rotate(45deg)' : 'none',
              transition: 'top 0.2s, transform 0.2s',
            }} />
            <span style={{
              display: 'block', position: 'absolute', left: 0, width: '100%', height: 2,
              background: '#fff', borderRadius: 1,
              top: '50%', transform: 'translateY(-50%)',
              opacity: menuOpen ? 0 : 1,
              transition: 'opacity 0.15s',
            }} />
            <span style={{
              display: 'block', position: 'absolute', left: 0, width: '100%', height: 2,
              background: '#fff', borderRadius: 1,
              bottom: menuOpen ? '50%' : 0,
              transform: menuOpen ? 'translateY(50%) rotate(-45deg)' : 'none',
              transition: 'bottom 0.2s, transform 0.2s',
            }} />
          </span>
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <div
        className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}
        style={{
          background: '#000',
          borderTop: '1px solid #5e5e5e',
          padding: '0 24px 24px',
          gap: 0,
        }}
      >
        {links.map(({ href, label, key }) => (
          <Link
            key={key}
            href={href}
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'block',
              padding: '16px 0',
              borderBottom: '1px solid #222',
              color: active === key ? '#76b900' : 'rgba(255,255,255,0.85)',
              textDecoration: 'none',
              fontSize: 17,
              fontWeight: 700,
            }}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/contact"
          onClick={() => setMenuOpen(false)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 20,
            height: 46,
            padding: '0 24px',
            background: '#76b900',
            color: '#000',
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
            borderRadius: 2,
          }}
        >
          Get Started →
        </Link>
      </div>
    </header>
  )
}
