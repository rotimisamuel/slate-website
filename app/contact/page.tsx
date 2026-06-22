'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

gsap.registerPlugin(ScrollTrigger)

const offices = [
  {
    code: 'NG', city: 'Abuja', country: 'Nigeria · Headquarters',
    addr: 'Block 6, Flat 7, Kwali Close, Area 8, Garki, Abuja, Nigeria',
    tel: '+234 806 6977 213', email: 'hello@slateworld.io', mailto: 'mailto:hello@slateworld.io',
  },
  {
    code: 'UK', city: 'London', country: 'United Kingdom',
    addr: 'Slate Technologies Ltd, United Kingdom',
    tel: '+44 737 9499 922', email: 'uk@slateworld.io', mailto: 'mailto:uk@slateworld.io',
  },
]

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const officesRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current?.querySelectorAll('.hero-el') ?? [], {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.3,
      })
      gsap.from(officesRef.current?.querySelectorAll('.office-card') ?? [], {
        scrollTrigger: { trigger: officesRef.current, start: 'top 82%' },
        x: -40, opacity: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out',
      })
      gsap.from(formRef.current?.children ?? [], {
        scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
        y: 40, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <main style={{ fontFamily: 'var(--font-brand)', color: 'var(--color-ink)', background: '#fff' }}>
      <Nav active="contact" />

      {/* Hero */}
      <section ref={heroRef} style={{ background: '#000', color: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 32px' }}>
          <div className="hero-el" style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: 20 }}>
            Get in touch
          </div>
          <h1 className="hero-el" style={{ margin: '0 0 24px', fontWeight: 700, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.02, letterSpacing: '-0.03em', maxWidth: '14ch' }}>
            Two continents. One mission.
          </h1>
          <p className="hero-el" style={{ margin: 0, maxWidth: '56ch', fontSize: 18, lineHeight: 1.6, color: 'rgba(255,255,255,0.74)' }}>
            Our team is based in Abuja and London. We respond to all enquiries within one business day.
          </p>
        </div>
      </section>

      {/* Offices */}
      <section ref={officesRef} style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px' }}>
        <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: 28 }}>
          Global offices
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {offices.map(o => (
            <div
              key={o.code}
              className="office-card"
              style={{
                position: 'relative',
                border: '1px solid var(--color-hairline)',
                borderRadius: 2,
                padding: 32,
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-hairline)')}
            >
              <span style={{ position: 'absolute', top: 0, left: 0, width: 12, height: 12, background: 'var(--color-primary)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 40, height: 40, background: '#000', color: 'var(--color-primary)',
                  fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', borderRadius: 2,
                }}>
                  {o.code}
                </span>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{o.city}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-mute)', marginTop: 4 }}>{o.country}</div>
                </div>
              </div>
              <p style={{ margin: '0 0 18px', fontSize: 15, lineHeight: 1.6, color: 'var(--color-body)' }}>{o.addr}</p>
              <div style={{ fontSize: 14, lineHeight: 1.9, color: 'var(--color-body)', borderTop: '1px solid var(--color-hairline)', paddingTop: 16 }}>
                <div><strong>T:</strong> {o.tel}</div>
                <div><strong>E:</strong>{' '}
                  <a href={o.mailto} style={{ color: '#0046a4', textDecoration: 'none' }}>{o.email}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section style={{ background: 'var(--color-surface-soft)', borderTop: '1px solid var(--color-hairline)', borderBottom: '1px solid var(--color-hairline)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 32px' }}>
          <div ref={formRef} style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 64, alignItems: 'start' }}>
            {/* Left copy */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: 16 }}>
                Send a message
              </div>
              <h2 style={{ margin: '0 0 18px', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                Tell us about your project.
              </h2>
              <p style={{ margin: '0 0 32px', fontSize: 16, lineHeight: 1.65, color: 'var(--color-body)', maxWidth: '42ch' }}>
                Whether you&apos;re scoping a national digital programme, evaluating an LMS, or looking for the right hardware partner — we&apos;d love to hear from you.
              </p>
              <div style={{ borderTop: '1px solid var(--color-hairline)', paddingTop: 22 }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-mute)', marginBottom: 14 }}>
                  Direct channels
                </div>
                <div style={{ fontSize: 14, lineHeight: 2, color: 'var(--color-body)' }}>
                  <div><strong style={{ color: 'var(--color-primary-dark)' }}>General</strong> · <a href="mailto:hello@slateworld.io" style={{ color: 'var(--color-ink)', textDecoration: 'none' }}>hello@slateworld.io</a></div>
                  <div><strong style={{ color: 'var(--color-primary-dark)' }}>Sales</strong> · <a href="mailto:sales@slateworld.io" style={{ color: 'var(--color-ink)', textDecoration: 'none' }}>sales@slateworld.io</a></div>
                  <div><strong style={{ color: 'var(--color-primary-dark)' }}>Press</strong> · <a href="mailto:press@slateworld.io" style={{ color: 'var(--color-ink)', textDecoration: 'none' }}>press@slateworld.io</a></div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={e => { e.preventDefault(); setSent(true) }}
              style={{ background: '#fff', padding: 36, border: '1px solid var(--color-hairline)', borderRadius: 2 }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[{ label: 'Name', type: 'text', required: true }, { label: 'Organisation', type: 'text', required: false }].map(f => (
                  <div key={f.label}>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-mute)', marginBottom: 8 }}>{f.label}</label>
                    <input
                      type={f.type}
                      required={f.required}
                      style={{ width: '100%', padding: '12px 14px', border: '2px solid var(--color-hairline)', background: '#fff', fontFamily: 'inherit', fontSize: 15, borderRadius: 2, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                      onFocus={e => (e.target.style.borderColor = 'var(--color-primary)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--color-hairline)')}
                    />
                  </div>
                ))}
              </div>

              {[{ label: 'Email', type: 'email', required: true }].map(f => (
                <div key={f.label} style={{ marginTop: 16 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-mute)', marginBottom: 8 }}>{f.label}</label>
                  <input
                    type={f.type}
                    required={f.required}
                    style={{ width: '100%', padding: '12px 14px', border: '2px solid var(--color-hairline)', background: '#fff', fontFamily: 'inherit', fontSize: 15, borderRadius: 2, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                    onFocus={e => (e.target.style.borderColor = 'var(--color-primary)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--color-hairline)')}
                  />
                </div>
              ))}

              <div style={{ marginTop: 16 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-mute)', marginBottom: 8 }}>Service interest</label>
                <select
                  style={{ width: '100%', padding: '12px 14px', border: '2px solid var(--color-hairline)', background: '#fff', fontFamily: 'inherit', fontSize: 15, borderRadius: 2, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => (e.target.style.borderColor = 'var(--color-primary)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--color-hairline)')}
                >
                  <option>Custom Software Development</option>
                  <option>Digital Transformation</option>
                  <option>AI Strategy &amp; Implementation</option>
                  <option>E-Learning Platforms</option>
                  <option>Technology Consulting</option>
                  <option>Hardware &amp; Flexi-Pay</option>
                  <option>Other</option>
                </select>
              </div>

              <div style={{ marginTop: 16 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-mute)', marginBottom: 8 }}>Tell us about your project</label>
                <textarea
                  rows={5}
                  style={{ width: '100%', padding: '12px 14px', border: '2px solid var(--color-hairline)', background: '#fff', fontFamily: 'inherit', fontSize: 15, borderRadius: 2, outline: 'none', resize: 'vertical', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => (e.target.style.borderColor = 'var(--color-primary)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--color-hairline)')}
                />
              </div>

              <button
                type="submit"
                style={{
                  marginTop: 22, width: '100%', height: 52,
                  background: sent ? 'var(--color-primary)' : '#000',
                  color: sent ? '#000' : '#fff',
                  border: 'none', fontFamily: 'inherit', fontWeight: 700, fontSize: 16,
                  borderRadius: 2, cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: 'background 0.3s, color 0.3s',
                }}
              >
                {sent ? 'Message sent ✓' : <>Send enquiry <span aria-hidden="true">→</span></>}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
