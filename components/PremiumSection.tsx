'use client'
import { useEffect, useRef } from 'react'

const premiumFeatures = [
  {
    icon: '◈',
    title: 'Service at Your Location',
    body: 'Your home, your office, your building parking. We fit into your schedule — not the other way around.',
  },
  {
    icon: '◉',
    title: 'Premium Finish Quality',
    body: 'Color-matched, clear-coated, factory-level results. No overspray. No shortcuts. No excuses.',
  },
  {
    icon: '◆',
    title: 'Attention to Detail',
    body: 'We treat your car the way you do. Gloves, clean tools, paint protection — every single time.',
  },
  {
    icon: '◇',
    title: 'Curb Rash & Scratches',
    body: 'Deep gouges to light scuffs — we handle the full spectrum of rim damage with precision.',
  },
]

export default function PremiumSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
        })
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Accent line */}
      <div style={{
        position: 'absolute',
        top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '1px', height: '80px',
        background: 'linear-gradient(to bottom, var(--lime), transparent)',
      }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header row */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'end',
            marginBottom: '72px',
          }}
        >
          <div>
            <span className="badge badge-lime" style={{ marginBottom: '24px', display: 'inline-block' }}>
              Not For Everyone
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 60px)',
              letterSpacing: '0.04em',
              color: 'white',
              lineHeight: '0.95',
            }}>
              BUILT FOR<br />
              <span style={{ color: 'var(--lime)' }}>PEOPLE</span><br />
              WHO CARE.
            </h2>
          </div>
          <div>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: 'var(--chrome-dim)',
              fontWeight: 300,
              borderLeft: '2px solid var(--lime)',
              paddingLeft: '20px',
            }}>
              This service isn't for everyone. It's for the Tesla owner who waxes their car. The BMW driver who notices every detail. The Audi owner who chose the sport package because it mattered.
            </p>
            <p style={{
              fontSize: '13px',
              lineHeight: '1.7',
              color: 'var(--chrome-dim)',
              fontWeight: 300,
              marginTop: '16px',
              fontStyle: 'italic',
            }}>
              If you care about how your car looks, you're in the right place.
            </p>
          </div>
        </div>

        {/* Features grid */}
        <div
          className="reveal reveal-delay-2"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1px',
            background: 'var(--carbon-3)',
            border: '1px solid var(--carbon-3)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          {premiumFeatures.map(({ icon, title, body }) => (
            <div
              key={title}
              style={{
                background: 'var(--carbon-2)',
                padding: '32px 28px',
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--carbon-3)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--carbon-2)'}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28px',
                color: 'var(--lime)',
                marginBottom: '16px',
                lineHeight: 1,
              }}>{icon}</div>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '600',
                color: 'white',
                marginBottom: '10px',
                letterSpacing: '0.02em',
              }}>{title}</h3>
              <p style={{
                fontSize: '13px',
                lineHeight: '1.65',
                color: 'var(--chrome-dim)',
                fontWeight: 300,
              }}>{body}</p>
            </div>
          ))}
        </div>

        {/* Vehicle badges */}
        <div
          className="reveal reveal-delay-3"
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            marginTop: '48px',
            flexWrap: 'wrap',
          }}
        >
          {['Tesla', 'BMW', 'Audi', 'Mercedes', 'Porsche', 'Lexus'].map(brand => (
            <span
              key={brand}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--chrome-dim)',
                padding: '6px 14px',
                border: '1px solid var(--carbon-4)',
                borderRadius: '2px',
              }}
            >{brand}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
