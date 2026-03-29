'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const isDragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => { if (isDragging.current) updatePosition(e.clientX) }
    const onTouchMove = (e: TouchEvent) => { if (isDragging.current) updatePosition(e.touches[0].clientX) }
    const onUp = () => { isDragging.current = false }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('touchmove', onTouchMove, { passive: true })
    document.addEventListener('mouseup', onUp)
    document.addEventListener('touchend', onUp)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('touchend', onUp)
    }
  }, [updatePosition])

  // Generate a realistic rim SVG
  const RimBefore = () => (
    <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="rimGradBefore" cx="50%" cy="45%">
          <stop offset="0%" stopColor="#3a3a3a"/>
          <stop offset="60%" stopColor="#1a1a1a"/>
          <stop offset="100%" stopColor="#0a0a0a"/>
        </radialGradient>
        <radialGradient id="tireGrad" cx="50%" cy="50%">
          <stop offset="70%" stopColor="#111"/>
          <stop offset="100%" stopColor="#0a0a0a"/>
        </radialGradient>
      </defs>
      {/* Tire */}
      <circle cx="200" cy="200" r="195" fill="url(#tireGrad)" stroke="#222" strokeWidth="2"/>
      <circle cx="200" cy="200" r="160" fill="url(#rimGradBefore)"/>
      {/* Spokes */}
      {[0,60,120,180,240,300].map(deg => (
        <g key={deg} transform={`rotate(${deg} 200 200)`}>
          <rect x="192" y="60" width="16" height="100" rx="6" fill="#555" opacity="0.8"/>
        </g>
      ))}
      <circle cx="200" cy="200" r="55" fill="#111" stroke="#444" strokeWidth="2"/>
      <circle cx="200" cy="200" r="30" fill="#1a1a1a"/>
      {/* Curb rash damage marks */}
      <path d="M155 280 L175 265 L185 285 L160 295Z" fill="#222" stroke="#666" strokeWidth="1" opacity="0.9"/>
      <path d="M145 270 L170 260 L172 275" fill="none" stroke="#888" strokeWidth="2" opacity="0.7"/>
      <path d="M130 290 L165 275 L168 290 L135 302Z" fill="#1a1a1a" stroke="#777" strokeWidth="1.5"/>
      <path d="M150 285 Q160 270 175 278" fill="none" stroke="#999" strokeWidth="1.5" opacity="0.6"/>
      {/* Scratches */}
      <line x1="148" y1="278" x2="178" y2="262" stroke="#aaa" strokeWidth="1" opacity="0.4"/>
      <line x1="142" y1="285" x2="162" y2="268" stroke="#bbb" strokeWidth="0.8" opacity="0.3"/>
      {/* Center cap logo area */}
      <circle cx="200" cy="200" r="22" fill="#222" stroke="#333" strokeWidth="1"/>
      <text x="200" y="205" textAnchor="middle" fill="#555" fontSize="10" fontFamily="sans-serif">◉</text>
    </svg>
  )

  const RimAfter = () => (
    <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="rimGradAfter" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#e8e8e8"/>
          <stop offset="30%" stopColor="#b0b0b0"/>
          <stop offset="70%" stopColor="#686868"/>
          <stop offset="100%" stopColor="#2a2a2a"/>
        </radialGradient>
        <radialGradient id="spokeGrad" cx="50%" cy="30%">
          <stop offset="0%" stopColor="#d4d4d4"/>
          <stop offset="100%" stopColor="#707070"/>
        </radialGradient>
        <radialGradient id="tireGrad2" cx="50%" cy="50%">
          <stop offset="70%" stopColor="#111"/>
          <stop offset="100%" stopColor="#080808"/>
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {/* Tire */}
      <circle cx="200" cy="200" r="195" fill="url(#tireGrad2)" stroke="#333" strokeWidth="2"/>
      <circle cx="200" cy="200" r="160" fill="url(#rimGradAfter)"/>
      {/* Bright ring highlight */}
      <circle cx="200" cy="200" r="158" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3"/>
      {/* Spokes — clean */}
      {[0,60,120,180,240,300].map(deg => (
        <g key={deg} transform={`rotate(${deg} 200 200)`}>
          <rect x="192" y="60" width="16" height="100" rx="6" fill="url(#spokeGrad)"/>
          <rect x="193" y="62" width="6" height="96" rx="3" fill="rgba(255,255,255,0.25)" opacity="0.6"/>
        </g>
      ))}
      <circle cx="200" cy="200" r="55" fill="#1a1a1a" stroke="#555" strokeWidth="1.5"/>
      <circle cx="200" cy="200" r="30" fill="#111"/>
      {/* Highlight reflections */}
      <ellipse cx="150" cy="130" rx="40" ry="15" fill="rgba(255,255,255,0.06)" transform="rotate(-30 150 130)"/>
      {/* Center cap */}
      <circle cx="200" cy="200" r="22" fill="#1e1e1e" stroke="#666" strokeWidth="1.5"/>
      <text x="200" y="205" textAnchor="middle" fill="#aaa" fontSize="11" fontFamily="sans-serif">◉</text>
      {/* Lime glow accent */}
      <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(168,230,61,0.06)" strokeWidth="2"/>
    </svg>
  )

  return (
    <div
      ref={containerRef}
      className="ba-slider"
      onMouseDown={e => { isDragging.current = true; updatePosition(e.clientX) }}
      onTouchStart={e => { isDragging.current = true; updatePosition(e.touches[0].clientX) }}
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '600px',
        aspectRatio: '1 / 1',
        background: 'var(--carbon-2)',
        border: '1px solid var(--carbon-4)',
      }}
    >
      {/* Before layer */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <RimBefore />
        <div style={{
          position: 'absolute', bottom: '16px', left: '16px',
          fontFamily: 'var(--font-mono)', fontSize: '11px',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
          background: 'rgba(0,0,0,0.6)', padding: '4px 10px', borderRadius: '3px',
        }}>Before</div>
      </div>

      {/* After layer */}
      <div className="ba-after" style={{ width: `${position}%` }}>
        <div style={{ width: containerRef.current?.offsetWidth || 600, height: '100%', position: 'relative' }}>
          <RimAfter />
          <div style={{
            position: 'absolute', bottom: '16px', left: '16px',
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--lime)',
            background: 'rgba(0,0,0,0.6)', padding: '4px 10px', borderRadius: '3px',
          }}>After</div>
        </div>
      </div>

      {/* Handle */}
      <div className="ba-handle" style={{ left: `${position}%` }} />
    </div>
  )
}

export default function BeforeAfterSection() {
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
    <section ref={ref} style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '16px' }}>
          <span className="badge badge-lime">Transformation</span>
        </div>
        <h2
          className="reveal reveal-delay-1"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 6vw, 72px)',
            letterSpacing: '0.04em',
            textAlign: 'center',
            color: 'white',
            marginBottom: '16px',
          }}
        >
          SEE THE DIFFERENCE
        </h2>
        <p
          className="reveal reveal-delay-2"
          style={{
            textAlign: 'center',
            color: 'var(--chrome-dim)',
            fontWeight: 300,
            fontSize: '15px',
            marginBottom: '60px',
          }}
        >
          Drag the slider. This is what we do.
        </p>

        <div
          className="reveal reveal-delay-3"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '60px',
            flexWrap: 'wrap',
          }}
        >
          <BeforeAfterSlider />

          {/* Stats panel */}
          <div style={{ maxWidth: '280px' }}>
            {[
              { number: '2–4h', label: 'Average service time' },
              { number: '100%', label: 'Mobile — no shop visit' },
              { number: '5★', label: 'Finishing quality' },
            ].map(({ number, label }, i) => (
              <div
                key={label}
                style={{
                  padding: '28px 0',
                  borderBottom: i < 2 ? '1px solid var(--carbon-3)' : 'none',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '52px',
                  letterSpacing: '0.02em',
                  color: 'var(--lime)',
                  lineHeight: 1,
                  marginBottom: '6px',
                }}>{number}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--chrome-dim)',
                }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
