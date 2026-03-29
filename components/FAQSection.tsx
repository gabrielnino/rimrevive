'use client'
import { useEffect, useRef, useState } from 'react'

const faqs = [
  {
    q: 'How long does the service take?',
    a: 'Most repairs take between 2 to 4 hours per rim, depending on the damage severity. For a full set of 4, we typically schedule a half-day appointment. You can stay home or go about your day.',
  },
  {
    q: 'Which areas of Vancouver do you cover?',
    a: 'We service all major Vancouver neighborhoods including Downtown, West Side, East Van, North Shore, Burnaby, and Richmond. Contact us to confirm your exact address.',
  },
  {
    q: 'Will the repaired area be visible?',
    a: 'No. We color-match your factory rim finish and apply clear coat. The repair is seamless — professional detailers won\'t be able to tell the difference.',
  },
  {
    q: 'How do I send you photos?',
    a: 'The easiest way is WhatsApp. Just send clear photos of the damaged areas in good lighting. You can also upload them directly in our quote form below.',
  },
  {
    q: 'What types of damage can you fix?',
    a: 'Curb rash, deep scratches, scuffs, paint chips, and minor gouges on alloy rims. We\'ll let you know upfront if the damage is beyond our scope.',
  },
  {
    q: 'Do you offer any guarantee?',
    a: 'Yes. We stand behind our work with a satisfaction guarantee. If the finish doesn\'t meet our quality standards, we make it right — no questions asked.',
  },
]

export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
    <section
      ref={ref}
      style={{
        padding: '100px 24px',
        background: 'var(--carbon-1)',
        borderTop: '1px solid var(--carbon-3)',
      }}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '16px' }}>
          <span className="badge">FAQ</span>
        </div>
        <h2
          className="reveal reveal-delay-1"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 5vw, 60px)',
            letterSpacing: '0.04em',
            textAlign: 'center',
            color: 'white',
            marginBottom: '60px',
          }}
        >
          QUICK ANSWERS
        </h2>

        <div className="reveal reveal-delay-2">
          {faqs.map(({ q, a }, i) => (
            <div key={i} className="faq-item">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '24px 0',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  gap: '20px',
                }}
              >
                <span style={{
                  fontSize: '15px',
                  fontWeight: '500',
                  color: openIndex === i ? 'white' : 'var(--chrome)',
                  transition: 'color 0.2s',
                  lineHeight: '1.5',
                }}>{q}</span>
                <span style={{
                  width: '24px',
                  height: '24px',
                  minWidth: '24px',
                  background: openIndex === i ? 'var(--lime)' : 'var(--carbon-4)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  color: openIndex === i ? 'var(--carbon)' : 'var(--chrome-dim)',
                  transition: 'all 0.3s ease',
                  flexShrink: 0,
                }}>
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
              <div className={`faq-answer ${openIndex === i ? 'open' : ''}`}>
                <p style={{
                  paddingBottom: '24px',
                  fontSize: '14px',
                  lineHeight: '1.75',
                  color: 'var(--chrome-dim)',
                  fontWeight: 300,
                }}>{a}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA at bottom */}
        <div
          className="reveal reveal-delay-3"
          style={{
            textAlign: 'center',
            marginTop: '60px',
            padding: '48px 32px',
            background: 'var(--carbon-2)',
            border: '1px solid var(--carbon-4)',
            borderRadius: '8px',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            letterSpacing: '0.05em',
            color: 'white',
            marginBottom: '8px',
          }}>READY TO FIX YOUR RIMS?</p>
          <p style={{
            fontSize: '13px',
            color: 'var(--chrome-dim)',
            marginBottom: '28px',
            fontWeight: 300,
          }}>
            Get your quote in minutes. No commitment required.
          </p>
          <a
            href="#quote"
            className="btn-primary"
            style={{
              display: 'inline-block',
              padding: '14px 36px',
              borderRadius: '4px',
              fontSize: '13px',
              letterSpacing: '0.1em',
              fontWeight: '700',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
          >
            Get Your Quote Today →
          </a>
        </div>
      </div>
    </section>
  )
}
