'use client'
import { useEffect, useRef } from 'react'

export default function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
          }
        })
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      style={{
        padding: '80px 24px',
        background: 'var(--carbon-1)',
        borderTop: '1px solid var(--carbon-3)',
        borderBottom: '1px solid var(--carbon-3)',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Eyebrow */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge">The Reality</span>
        </div>

        {/* Big emotional statement */}
        <div className="reveal reveal-delay-1" style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 6vw, 72px)',
            lineHeight: '1.05',
            letterSpacing: '0.03em',
            color: 'white',
          }}>
            SCRATCHED RIMS RUIN A{' '}
            <span style={{
              color: 'var(--lime)',
              position: 'relative',
              display: 'inline-block',
            }}>
              $90,000
            </span>{' '}
            FIRST IMPRESSION.
          </p>
        </div>

        {/* 3 emotional cards */}
        <div
          className="reveal reveal-delay-2"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
          }}
        >
          {[
            {
              icon: '😤',
              title: 'The Embarrassment',
              body: 'You drive a premium vehicle — but curb rash tells a different story. Every valet, every parking lot.',
            },
            {
              icon: '⏳',
              title: 'The Wasted Time',
              body: 'Drop it off, wait, pick it up. Shops treat your Tesla like it\'s a Honda. Your time is worth more.',
            },
            {
              icon: '✨',
              title: 'The Feeling You Want',
              body: 'That detail-obsessed version of you — the one who chose this car — deserves rims that match.',
            },
          ].map(({ icon, title, body }) => (
            <div
              key={title}
              className="gradient-border"
              style={{
                background: 'var(--carbon-2)',
                borderRadius: '8px',
                padding: '32px 28px',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>{icon}</div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '22px',
                letterSpacing: '0.05em',
                color: 'white',
                marginBottom: '12px',
              }}>{title}</h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: 'var(--chrome-dim)',
                fontWeight: 300,
              }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
