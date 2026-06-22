'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from '@/components/Nav'
import CTAStrip from '@/components/CTAStrip'
import Footer from '@/components/Footer'

gsap.registerPlugin(ScrollTrigger)

const ranges = [
  {
    num: '01', id: 'laptops', title: 'Slate Laptops', cols: 'repeat(3, 1fr)',
    products: [
      { name: 'Slate Pro 15', cat: 'Professional', spec: 'Intel Core i7 · 16GB RAM · 512GB SSD · 15.6″ FHD · Dustproof' },
      { name: 'Slate Business 14', cat: 'Business', spec: 'Intel Core i5 · 8GB RAM · 256GB SSD · 14″ FHD · Long Battery' },
      { name: 'Slate Student 13', cat: 'Student', spec: 'Intel Core i3 · 8GB RAM · 256GB SSD · 13.3″ · Flexi-Pay' },
    ],
  },
  {
    num: '02', id: 'smartphones', title: 'Slate Smartphones', cols: 'repeat(3, 1fr)',
    products: [
      { name: 'Slate X1 Pro', cat: 'Flagship', spec: '5G · 12GB RAM · 256GB · AI Triple Camera · 6.7″ AMOLED' },
      { name: 'Slate A5', cat: 'Mid-Range', spec: '4G · 8GB RAM · 128GB · 48MP Camera · 5000mAh' },
      { name: 'Slate E3', cat: 'Essential', spec: '4G · 4GB RAM · 64GB · Dual SIM · 4500mAh · Rugged' },
    ],
  },
  {
    num: '03', id: 'tablets', title: 'Slate Tablets', cols: 'repeat(3, 1fr)',
    products: [
      { name: 'Slate Tab Pro 11', cat: 'Pro', spec: '11″ 2K · 8GB RAM · 256GB · 4G LTE · Stylus + Keyboard' },
      { name: 'Slate Tab S 10', cat: 'Student', spec: '10.5″ FHD · 6GB RAM · 128GB · 4G LTE · Stylus' },
      { name: 'Slate Tab Junior', cat: 'Kids', spec: '8″ HD · 4GB RAM · 64GB · Rugged · Parental Controls' },
    ],
  },
  {
    num: '04', id: 'desktops', title: 'Slate Desktops', cols: 'repeat(2, 1fr)',
    products: [
      { name: 'Slate AiO 24', cat: 'All-in-One', spec: 'Intel Core i5 · 8GB RAM · 256GB SSD · 24″ FHD Touch · Built-in UPS' },
      { name: 'Slate Tower Pro', cat: 'Tower', spec: 'Intel Core i7 · 16GB RAM · 1TB SSD · Discrete GPU · Enterprise' },
    ],
  },
  {
    num: '05', id: 'ups', title: 'UPS Systems', cols: 'repeat(3, 1fr)',
    products: [
      { name: 'Slate UPS 1KVA', cat: 'Home', spec: '1000VA / 600W · Pure Sine Wave · AVR' },
      { name: 'Slate UPS 2KVA', cat: 'Office', spec: '2000VA / 1400W · LCD Panel · Smart Energy' },
      { name: 'Slate UPS 5KVA', cat: 'Enterprise', spec: '5000VA / 3500W · Parallel · Remote Management' },
    ],
  },
  {
    num: '06', id: 'powerbanks', title: 'Power Banks', cols: 'repeat(3, 1fr)',
    products: [
      { name: 'Slate Charge 10', cat: 'Pocket', spec: '10,000mAh · 22.5W Fast · USB-C + USB-A · Slim' },
      { name: 'Slate Charge 20', cat: 'Standard', spec: '20,000mAh · 65W PD · Laptop Compatible · 3 Ports' },
      { name: 'Slate Charge 40 Solar', cat: 'Heavy Duty', spec: '40,000mAh · Solar · 100W PD · Rugged' },
    ],
  },
]

function ProductRange({ r }: { r: typeof ranges[0] }) {
  const rangeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(rangeRef.current?.querySelectorAll('.prod-card') ?? [], {
        scrollTrigger: { trigger: rangeRef.current, start: 'top 82%' },
        y: 40, opacity: 0, stagger: 0.1, duration: 0.65, ease: 'power3.out',
      })
    }, rangeRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rangeRef} id={r.id} style={{ padding: '64px 0', borderTop: '1px solid var(--color-hairline)', scrollMarginTop: 90 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 32 }}>
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
          {r.num} · Range
        </span>
        <h2 style={{ margin: 0, fontSize: 'clamp(26px, 2.8vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em' }}>
          {r.title}
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: r.cols, gap: 24 }}>
        {r.products.map((p, i) => (
          <div
            key={i}
            className="prod-card"
            style={{
              border: '1px solid var(--color-hairline)',
              borderRadius: 2,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-hairline)')}
          >
            {/* Card image area */}
            <div style={{
              position: 'relative',
              height: 200,
              background: '#000',
              display: 'flex',
              alignItems: 'flex-end',
              padding: 18,
            }}>
              <span style={{ position: 'absolute', top: 0, left: 0, width: 14, height: 14, background: 'var(--color-primary)' }} />
              <span style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 40,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.05)',
                letterSpacing: '-0.02em',
              }}>
                Slate
              </span>
              <span style={{
                position: 'relative',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
              }}>
                {p.cat}
              </span>
            </div>
            <div style={{ padding: '22px 22px 24px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700 }}>{p.name}</h3>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: 'var(--color-mute)', flex: 1 }}>{p.spec}</p>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 6,
                  fontSize: 14, fontWeight: 700, color: 'var(--color-primary)', textDecoration: 'none',
                  transition: 'gap 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.gap = '10px')}
                onMouseLeave={e => (e.currentTarget.style.gap = '6px')}
              >
                Enquire <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function ProductsPage() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current?.querySelectorAll('.hero-el') ?? [], {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.3,
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <main style={{ fontFamily: 'var(--font-brand)', color: 'var(--color-ink)', background: '#fff' }}>
      <Nav active="products" />

      {/* Hero */}
      <section ref={heroRef} style={{ background: '#000', color: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 32px 0' }}>
          <div className="hero-el" style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: 20 }}>
            Hardware solutions
          </div>
          <h1 className="hero-el" style={{ margin: '0 0 24px', fontWeight: 700, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.02, letterSpacing: '-0.03em', maxWidth: '16ch' }}>
            Devices built for Africa. Built for the world.
          </h1>
          <p className="hero-el" style={{ margin: '0 0 40px', maxWidth: '60ch', fontSize: 18, lineHeight: 1.6, color: 'rgba(255,255,255,0.74)' }}>
            Engineered for African infrastructure and climatic realities, meeting global performance standards — accessible through our Flexi-Pay ownership model.
          </p>

          {/* Range anchor tabs */}
          <div className="hero-el" style={{ display: 'flex', gap: 4, flexWrap: 'wrap', borderTop: '1px solid var(--color-hairline-strong)', paddingTop: 4 }}>
            {ranges.map(r => (
              <a
                key={r.id}
                href={`#${r.id}`}
                style={{
                  padding: '16px 18px',
                  fontSize: 14,
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  borderBottom: '2px solid transparent',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderBottomColor = 'var(--color-primary)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderBottomColor = 'transparent' }}
              >
                {r.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Product ranges */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 32px 0' }}>
        {ranges.map(r => <ProductRange key={r.id} r={r} />)}
      </div>

      <CTAStrip />
      <Footer />
    </main>
  )
}
