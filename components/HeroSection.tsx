'use client'
import { useEffect, useRef } from 'react'

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const items = el.querySelectorAll('[data-hero-item]')
    items.forEach((item, i) => {
      setTimeout(() => {
        (item as HTMLElement).style.opacity = '1'
        ;(item as HTMLElement).style.transform = 'translateY(0)'
      }, 200 + i * 150)
    })
  }, [])

  const itemStyle: React.CSSProperties = {
    opacity: 0,
    transform: 'translateY(30px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease',
  }

  return (
    <section
      ref={heroRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '100px 24px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background radial glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(ellipse at center, rgba(168, 230, 61, 0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Grid lines bg */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(168,230,61,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(168,230,61,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
        {/* Badge */}
        <div data-hero-item style={{ ...itemStyle, marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
          <span className="badge badge-lime">
            ◆ Mobile Rim Restoration · Vancouver
          </span>
        </div>

        {/* Headline */}
        <h1
          data-hero-item
          style={{
            ...itemStyle,
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 10vw, 120px)',
            lineHeight: '0.92',
            letterSpacing: '0.02em',
            color: 'white',
            marginBottom: '8px',
          }}
        >
          RESTORE YOUR
        </h1>
        <h1
          data-hero-item
          style={{
            ...itemStyle,
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 10vw, 120px)',
            lineHeight: '0.92',
            letterSpacing: '0.02em',
            color: 'var(--lime)',
            marginBottom: '8px',
          }}
        >
          RIMS
        </h1>
        <h1
          data-hero-item
          style={{
            ...itemStyle,
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 5vw, 56px)',
            lineHeight: '1.1',
            letterSpacing: '0.05em',
            color: 'var(--chrome-dim)',
            marginBottom: '32px',
            fontWeight: 400,
          }}
        >
          WITHOUT LEAVING HOME
        </h1>

        {/* Subheadline */}
        <p
          data-hero-item
          style={{
            ...itemStyle,
            fontSize: '17px',
            lineHeight: '1.7',
            color: 'var(--chrome-dim)',
            maxWidth: '520px',
            margin: '0 auto 48px',
            fontWeight: 300,
          }}
        >
          Premium mobile rim repair for{' '}
          <span style={{ color: 'var(--chrome)', fontWeight: 500 }}>Tesla, BMW, and Audi</span>{' '}
          owners in Vancouver. We come to you — no shop, no waiting.
        </p>

        {/* CTA buttons */}
        <div
          data-hero-item
          style={{
            ...itemStyle,
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '64px',
          }}
        >
          <a
            href="#quote"
            className="btn-primary"
            style={{
              padding: '16px 36px',
              borderRadius: '4px',
              fontSize: '14px',
              letterSpacing: '0.06em',
              fontWeight: '700',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
          >
            Get a Free Quote
          </a>
          <a
            href="https://wa.me/16041234567"
            className="btn-secondary"
            style={{
              padding: '16px 36px',
              borderRadius: '4px',
              fontSize: '14px',
              letterSpacing: '0.06em',
              fontWeight: '500',
              textDecoration: 'none',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        {/* Trust pills */}
        <div
          data-hero-item
          style={{
            ...itemStyle,
            display: 'flex',
            gap: '32px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {[
            { icon: '⚡', text: 'Same-Day Service' },
            { icon: '🚗', text: 'Tesla · BMW · Audi' },
            { icon: '📍', text: 'We Come To You' },
          ].map(({ icon, text }) => (
            <div
              key={text}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: 'var(--chrome-dim)',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ fontSize: '14px' }}>{icon}</span>
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        animation: 'fadeIn 2s ease 2s both',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '0.2em',
          color: 'var(--carbon-4)',
          textTransform: 'uppercase',
        }}>Scroll</span>
        <div style={{
          width: '1px',
          height: '40px',
          background: 'linear-gradient(to bottom, var(--carbon-4), transparent)',
        }} />
      </div>
    </section>
  )
}
