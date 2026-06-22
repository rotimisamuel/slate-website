'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from '@/components/Nav'
import CTAStrip from '@/components/CTAStrip'
import Footer from '@/components/Footer'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    num: '01', title: 'Custom Software Development', cta: 'Explore', href: '/services/software',
    lead: 'We build bespoke software from the ground up — web applications, mobile platforms, backend systems, and APIs. Full-stack, scalable, secure, built to your exact specifications.',
    tags: ['React / Next.js', 'Node.js', 'Python', 'React Native', 'PostgreSQL', 'AWS', 'Open Source'],
    cards: [
      { title: 'Web Applications', text: 'Full-stack web platforms — from enterprise portals to citizen-facing government services, built for scale and security.' },
      { title: 'Mobile Development', text: 'iOS and Android apps with offline capability, optimised for low-bandwidth environments and African mobile users.' },
      { title: 'API & Integrations', text: 'Robust API design and third-party integration — HR systems, payment gateways, and government databases.' },
      { title: 'Cloud Infrastructure', text: 'Scalable cloud architecture on AWS, Azure, or local providers — 99%+ uptime, data sovereignty compliant.' },
    ],
    caseNote: '',
  },
  {
    num: '02', title: 'Digital Transformation', cta: 'Explore', href: '/services/transformation',
    lead: 'We partner with organisations undergoing digital change — assessing existing processes, designing roadmaps, and implementing solutions that deliver measurable operational improvement.',
    tags: [],
    cards: [
      { title: 'Transformation Roadmaps', text: 'Structured, phased strategies that prioritise quick wins while building long-term digital capability.' },
      { title: 'Process Modernisation', text: 'Replacing manual and legacy processes with efficient, automated digital workflows — reducing cost and errors.' },
      { title: 'System Integration', text: 'Connecting HR, finance, operations, and field systems into a unified, coherent digital infrastructure.' },
      { title: 'Change Management', text: 'Structured adoption programmes ensuring your people embrace new technology confidently.' },
    ],
    caseNote: '',
  },
  {
    num: '03', title: 'AI Strategy & Implementation', cta: 'Explore', href: '/services/ai',
    lead: 'We help organisations understand, plan, and deploy artificial intelligence — from strategy and use-case identification through to building and integrating AI tools into operational systems.',
    tags: [],
    cards: [
      { title: 'AI Strategy', text: 'Identifying high-value AI use cases, building the business case, and developing a phased implementation roadmap.' },
      { title: 'Intelligent Tutoring', text: 'AI tutors that personalise learning paths and adapt content based on learner performance and knowledge gaps.' },
      { title: 'Predictive Analytics', text: 'Data-driven models that forecast outcomes, detect anomalies, and surface actionable insights for decisions.' },
      { title: 'Process Automation', text: 'Intelligent automation of repetitive tasks using ML, NLP, and workflow orchestration.' },
    ],
    caseNote: '',
  },
  {
    num: '04', title: 'E-Learning Platform Development', cta: 'Explore', href: '/services/elearning',
    lead: 'We design, build, and deploy scalable Learning Management Systems for governments, security agencies, universities, and corporations — open-source, mobile-first, offline-capable.',
    tags: [],
    cards: [
      { title: 'LMS Design & Build', text: 'Custom Moodle-based platforms supporting hundreds of thousands of users — 99%+ uptime with offline sync.' },
      { title: 'Mobile-First & Offline', text: 'Dedicated mobile apps with content download — equitable access for users in low-connectivity regions.' },
      { title: 'Gamification', text: 'Points, badges, leaderboards, and challenges that drive completion and embed continuous learning culture.' },
      { title: 'Analytics & Reporting', text: 'Real-time dashboards tracking enrolment, completion, performance, and knowledge gaps by region or department.' },
    ],
    caseNote: 'Slate has delivered comprehensive e-learning platform proposals for national institutions including the Nigerian Police Force — a system designed for 370,000+ officers with offline capability, AI tutoring, and HR integration.',
  },
  {
    num: '05', title: 'Technology Consulting', cta: 'Explore', href: '/services/consulting',
    lead: 'Strategic technology advisory for enterprises and institutions — system selection, vendor management, ICT governance, and investment planning.',
    tags: [],
    cards: [
      { title: 'Technology Strategy', text: 'Multi-year technology strategies aligned with your goals and the operational realities of your sector.' },
      { title: 'ICT Governance', text: 'Frameworks and policies ensuring technology investments deliver value and manage risk appropriately.' },
      { title: 'Vendor Management', text: 'Independent vendor evaluation — procurement support, contract review, and performance monitoring.' },
      { title: 'Digital Investment', text: 'Business case development and investment appraisal — ensuring every pound or naira is well spent.' },
    ],
    caseNote: '',
  },
  {
    num: '06', title: 'Hardware & Flexi-Pay', cta: 'Explore', href: '/services/hardware',
    lead: "Slate's Flexi-Pay plan makes premium hardware accessible. Acquire your device today and spread the cost over 6–24 months with a transparent 3% monthly fee on the declining balance.",
    tags: [],
    cards: [
      { title: 'Laptops & Desktops', text: 'Professional, business, and student laptops plus enterprise desktops — dustproof, built for African conditions.' },
      { title: 'Smartphones & Tablets', text: 'Flagship to essential smartphones and Pro/Student/Junior tablets — dual SIM, large batteries, offline-ready.' },
      { title: 'Power & UPS', text: 'UPS systems from 1KVA to 5KVA and solar-capable power banks — keeping devices running through outages.' },
      { title: 'Flexi-Pay Ownership', text: 'Spread the cost over 6–24 months with a transparent 3% monthly declining-balance fee — no early-payoff penalty.' },
    ],
    caseNote: '',
  },
]

function ServiceBlock({ s, index }: { s: typeof services[0]; index: number }) {
  const blockRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sidebarRef.current?.children ?? [], {
        scrollTrigger: { trigger: blockRef.current, start: 'top 80%' },
        x: -40, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
      })
      const cards = contentRef.current?.querySelectorAll('.svc-card')
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: { trigger: contentRef.current, start: 'top 82%' },
          y: 40, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
        })
      }
    }, blockRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={blockRef}
      className="rsp-stack"
      style={{
        display: 'grid',
        gridTemplateColumns: '0.85fr 1.5fr',
        gap: 56,
        alignItems: 'start',
        padding: '64px 0',
        borderTop: '1px solid var(--color-hairline)',
      }}
    >
      {/* Sticky sidebar */}
      <div ref={sidebarRef} className="rsp-unstick" style={{ position: 'sticky', top: 108 }}>
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1, color: 'var(--color-primary)', letterSpacing: '-0.03em', marginBottom: 20 }}>
          {s.num}
        </div>
        <h2 style={{ margin: '0 0 16px', fontSize: 'clamp(24px, 2.6vw, 34px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {s.title}
        </h2>
        <p style={{ margin: '0 0 24px', fontSize: 16, lineHeight: 1.6, color: 'var(--color-body)', maxWidth: '40ch' }}>
          {s.lead}
        </p>
        <Link
          href={s.href}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            height: 44, padding: '0 22px',
            background: '#000', color: '#fff',
            fontWeight: 700, fontSize: 15, textDecoration: 'none', borderRadius: 2,
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = '#000' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#fff' }}
        >
          {s.cta} <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Cards + extras */}
      <div ref={contentRef}>
        <div className="rsp-cols-1-xs" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 1, background: 'var(--color-hairline)', border: '1px solid var(--color-hairline)',
        }}>
          {s.cards.map((c, ci) => (
            <div
              key={ci}
              className="svc-card service-card"
              style={{ padding: '28px 26px', display: 'flex', flexDirection: 'column', gap: 10, minHeight: 180 }}
            >
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, lineHeight: 1.25 }}>{c.title}</h3>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--color-body)' }}>{c.text}</p>
            </div>
          ))}
        </div>

        {s.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
            {s.tags.map(t => (
              <span key={t} style={{
                fontSize: 12.5, fontWeight: 700, color: 'var(--color-body)',
                background: 'var(--color-surface-soft)', border: '1px solid var(--color-hairline)',
                borderRadius: 2, padding: '6px 12px',
              }}>{t}</span>
            ))}
          </div>
        )}

        {s.caseNote && (
          <div style={{
            position: 'relative', marginTop: 20, background: '#000', color: '#fff',
            borderRadius: 2, padding: '24px 26px',
          }}>
            <span style={{ position: 'absolute', top: 0, right: 0, width: 12, height: 12, background: 'var(--color-primary)' }} />
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: 10 }}>
              Case Note
            </div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.82)' }}>{s.caseNote}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ServicesPage() {
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
      <Nav active="services" />

      {/* Hero */}
      <section ref={heroRef} style={{ background: '#000', color: '#fff' }}>
        <div className="rsp-pad" style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 32px' }}>
          <div className="hero-el" style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: 20 }}>
            What we offer
          </div>
          <h1 className="hero-el" style={{ margin: '0 0 24px', fontWeight: 700, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.02, letterSpacing: '-0.03em', maxWidth: '16ch' }}>
            Software, hardware, &amp; everything in between.
          </h1>
          <p className="hero-el" style={{ margin: 0, maxWidth: '60ch', fontSize: 18, lineHeight: 1.6, color: 'rgba(255,255,255,0.74)' }}>
            From custom software engineering and AI strategy to e-learning platforms, technology consulting, and intelligent devices — Slate delivers across the full spectrum.
          </p>
        </div>
      </section>

      {/* Service blocks */}
      <div className="rsp-pad-x" style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 32px 32px' }}>
        {services.map((s, i) => (
          <ServiceBlock key={s.num} s={s} index={i} />
        ))}
      </div>

      <CTAStrip />
      <Footer />
    </main>
  )
}
