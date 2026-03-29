'use client'

export default function Footer() {
  return (
    <footer
      style={{
        padding: '48px 24px',
        borderTop: '1px solid var(--carbon-3)',
        background: 'var(--carbon)',
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        {/* Brand */}
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '18px',
            letterSpacing: '0.08em',
            color: 'white',
            marginBottom: '4px',
          }}>
            RIM<span style={{ color: 'var(--lime)' }}>REVIVE</span>{' '}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', color: 'var(--chrome-dim)' }}>
              VANCOUVER
            </span>
          </div>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.1em',
            color: 'var(--carbon-4)',
            textTransform: 'uppercase',
          }}>
            Mobile Rim Restoration · Premium Vehicles
          </p>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {[
            { label: 'WhatsApp', href: 'https://wa.me/16041234567' },
            { label: 'Quote', href: '#quote' },
            { label: 'How It Works', href: '#how-it-works' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--carbon-4)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--lime)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--carbon-4)')}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.1em',
          color: 'var(--carbon-4)',
          textTransform: 'uppercase',
        }}>
          © {new Date().getFullYear()} RimRevive
        </p>
      </div>
    </footer>
  )
}
