'use client'
import { useEffect, useRef } from 'react'

const steps = [
  {
    num: '01',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="5" width="18" height="14" rx="2"/>
        <path d="M3 9h18"/>
        <path d="M9 13h6"/>
      </svg>
    ),
    title: 'Send Your Photos',
    body: 'Snap a few shots of your rims and send them via WhatsApp or the quote form. Takes 2 minutes.',
    tag: 'No appointment needed',
  },
  {
    num: '02',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4"/>
        <circle cx="12" cy="12" r="9"/>
      </svg>
    ),
    title: 'Get Your Quote',
    body: 'We review the damage and send a precise quote within hours. Fixed price, no surprises.',
    tag: 'Same-day response',
  },
  {
    num: '03',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3"/>
        <rect x="9" y="11" width="14" height="10" rx="2"/>
        <circle cx="12" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
      </svg>
    ),
    title: 'We Come to You',
    body: 'Our technician arrives at your home or office. Your car never leaves your driveway.',
    tag: 'All Vancouver areas',
  },
]

export default function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
        })
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="how-it-works"
      style={{
        padding: '100px 24px',
        background: 'var(--carbon-1)',
        borderTop: '1px solid var(--carbon-3)',
        borderBottom: '1px solid var(--carbon-3)',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '16px' }}>
          <span className="badge">The Process</span>
        </div>
        <h2
          className="reveal reveal-delay-1"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 5vw, 64px)',
            letterSpacing: '0.04em',
            textAlign: 'center',
            color: 'white',
            marginBottom: '16px',
          }}
        >
          THREE STEPS. ZERO HASSLE.
        </h2>
        <p
          className="reveal reveal-delay-2"
          style={{
            textAlign: 'center',
            color: 'var(--chrome-dim)',
            fontWeight: 300,
            fontSize: '15px',
            marginBottom: '72px',
            maxWidth: '400px',
            margin: '0 auto 72px',
          }}
        >
          Designed for people who value their time as much as their car.
        </p>

        <div
          className="reveal reveal-delay-3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {steps.map(({ num, icon, title, body, tag }, i) => (
            <div
              key={num}
              style={{
                background: 'var(--carbon-2)',
                border: '1px solid var(--carbon-4)',
                borderRadius: '8px',
                padding: '36px 32px',
                position: 'relative',
                transition: 'border-color 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(168,230,61,0.3)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--carbon-4)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              }}
            >
              {/* Step number */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '80px',
                lineHeight: 1,
                color: 'rgba(168,230,61,0.08)',
                position: 'absolute',
                top: '16px',
                right: '20px',
                letterSpacing: '-0.02em',
                userSelect: 'none',
              }}>{num}</div>

              {/* Icon */}
              <div style={{
                color: 'var(--lime)',
                marginBottom: '20px',
                display: 'inline-flex',
                background: 'rgba(168,230,61,0.08)',
                padding: '12px',
                borderRadius: '8px',
              }}>
                {icon}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                letterSpacing: '0.05em',
                color: 'white',
                marginBottom: '12px',
              }}>{title}</h3>

              <p style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: 'var(--chrome-dim)',
                fontWeight: 300,
                marginBottom: '20px',
              }}>{body}</p>

              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--lime)',
                borderTop: '1px solid var(--carbon-4)',
                paddingTop: '16px',
                display: 'block',
              }}>→ {tag}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="reveal reveal-delay-4"
          style={{ textAlign: 'center', marginTop: '60px' }}
        >
          <a
            href="#quote"
            className="btn-primary"
            style={{
              display: 'inline-block',
              padding: '16px 40px',
              borderRadius: '4px',
              fontSize: '13px',
              letterSpacing: '0.1em',
              fontWeight: '700',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
          >
            Start With Step 1 →
          </a>
        </div>
      </div>
    </section>
  )
}
