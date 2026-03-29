'use client'
import { useEffect, useRef, useState } from 'react'

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--carbon-3)',
  border: '1px solid var(--carbon-4)',
  borderRadius: '4px',
  padding: '12px 14px',
  fontSize: '14px',
  color: 'white',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  transition: 'border-color 0.2s ease',
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '10px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--chrome-dim)',
  marginBottom: '8px',
  display: 'block',
}

export default function QuoteSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [files, setFiles] = useState<string[]>([])

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

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(168,230,61,0.5)'
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'var(--carbon-4)'
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const newFiles = Array.from(e.dataTransfer.files).map(f => f.name).slice(0, 4)
    setFiles(prev => [...prev, ...newFiles].slice(0, 4))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Obtener datos del formulario
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      car_brand: formData.get('car_brand') as string,
      car_model: formData.get('car_model') as string,
      car_year: formData.get('car_year') as string,
      rim_position: formData.get('rim_position') as string,
      damage_type: formData.get('damage_type') as string,
      message: formData.get('message') as string,
      photos_count: files.length
    }
    
    try {
      // Enviar al backend
      const response = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      
      const result = await response.json()
      
      if (response.ok) {
        setSubmitted(true)
        console.log('✅ Cotización enviada:', result)
        
        // Opcional: Mostrar mensaje de éxito adicional
        if (result.whatsappSent) {
          console.log('📱 Notificación WhatsApp enviada al dueño')
        }
      } else {
        console.error('❌ Error del servidor:', result.error)
        alert('Hubo un error al enviar la cotización. Por favor intenta nuevamente.')
      }
      
    } catch (error) {
      console.error('❌ Error de red:', error)
      alert('Error de conexión. Por favor verifica tu internet e intenta nuevamente.')
    }
  }

  return (
    <section
      ref={ref}
      id="quote"
      style={{
        padding: '100px 24px',
        borderTop: '1px solid var(--carbon-3)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        bottom: '-200px', right: '-200px',
        width: '600px', height: '600px',
        background: 'radial-gradient(ellipse, rgba(168,230,61,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }}/>

      <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '16px' }}>
          <span className="badge badge-lime">Free Quote</span>
        </div>
        <h2
          className="reveal reveal-delay-1"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 5vw, 60px)',
            letterSpacing: '0.04em',
            textAlign: 'center',
            color: 'white',
            marginBottom: '12px',
          }}
        >
          GET YOUR RIM<br />REPAIR QUOTE
        </h2>
        <p
          className="reveal reveal-delay-2"
          style={{
            textAlign: 'center',
            color: 'var(--chrome-dim)',
            fontWeight: 300,
            fontSize: '14px',
            marginBottom: '48px',
          }}
        >
          Premium mobile rim repair for Tesla, BMW and Audi owners in Vancouver.
        </p>

        {submitted ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 40px',
              background: 'var(--carbon-2)',
              border: '1px solid rgba(168,230,61,0.3)',
              borderRadius: '8px',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>✓</div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '28px',
              letterSpacing: '0.05em',
              color: 'var(--lime)',
              marginBottom: '12px',
            }}>REQUEST RECEIVED</h3>
            <p style={{ fontSize: '14px', color: 'var(--chrome-dim)', fontWeight: 300 }}>
              We'll review your photos and send a quote within a few hours. Check your WhatsApp and email.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="reveal reveal-delay-3"
            style={{
              background: 'var(--carbon-2)',
              border: '1px solid var(--carbon-4)',
              borderRadius: '8px',
              padding: '40px 36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
            }}
          >
            {/* 1. Contact */}
            <div>
              <h3 style={{
                fontSize: '11px', fontFamily: 'var(--font-mono)',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--lime)', marginBottom: '16px',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <span style={{
                  width: '18px', height: '18px', background: 'var(--lime)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: 'var(--carbon)', fontSize: '9px', fontWeight: '700',
                }}>1</span>
                Contact Information
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Full Name</label>
                  <input type="text" name="name" required placeholder="Your name" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}/>
                </div>
                <div>
                  <label style={labelStyle}>Phone / WhatsApp</label>
                  <input type="tel" name="phone" required placeholder="+1 (604) 000-0000" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}/>
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" name="email" required placeholder="you@email.com" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}/>
                </div>
              </div>
            </div>

            {/* 2. Vehicle */}
            <div>
              <h3 style={{
                fontSize: '11px', fontFamily: 'var(--font-mono)',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--lime)', marginBottom: '16px',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <span style={{
                  width: '18px', height: '18px', background: 'var(--lime)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: 'var(--carbon)', fontSize: '9px', fontWeight: '700',
                }}>2</span>
                Vehicle Details
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Make</label>
                  <select name="car_brand" style={{ ...inputStyle, cursor: 'pointer' }} onFocus={handleFocus} onBlur={handleBlur}>
                    <option value="">Select...</option>
                    {['Tesla','BMW','Audi','Mercedes','Porsche','Lexus','Other'].map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Model</label>
                  <input type="text" name="car_model" placeholder="Model 3, X5..." style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}/>
                </div>
                <div>
                  <label style={labelStyle}>Year</label>
                  <input type="text" name="car_year" placeholder="2023" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}/>
                </div>
              </div>
            </div>

            {/* 3. Damage */}
            <div>
              <h3 style={{
                fontSize: '11px', fontFamily: 'var(--font-mono)',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--lime)', marginBottom: '16px',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <span style={{
                  width: '18px', height: '18px', background: 'var(--lime)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: 'var(--carbon)', fontSize: '9px', fontWeight: '700',
                }}>3</span>
                Damage Details
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Which Rim(s)?</label>
                  <select name="rim_position" style={{ ...inputStyle, cursor: 'pointer' }} onFocus={handleFocus} onBlur={handleBlur}>
                    <option value="">Select...</option>
                    {['Front Left','Front Right','Rear Left','Rear Right','Multiple Rims','All 4'].map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Damage Type</label>
                  <select name="damage_type" style={{ ...inputStyle, cursor: 'pointer' }} onFocus={handleFocus} onBlur={handleBlur}>
                    <option value="">Select...</option>
                    {['Curb Rash','Deep Scratches','Paint Chips','Scuffs','Multiple Issues'].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 4. Photos */}
            <div>
              <h3 style={{
                fontSize: '11px', fontFamily: 'var(--font-mono)',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--lime)', marginBottom: '16px',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <span style={{
                  width: '18px', height: '18px', background: 'var(--lime)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: 'var(--carbon)', fontSize: '9px', fontWeight: '700',
                }}>4</span>
                Upload Photos
              </h3>
              <div
                onDragOver={e => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                style={{
                  border: `2px dashed ${dragging ? 'var(--lime)' : 'var(--carbon-4)'}`,
                  borderRadius: '6px',
                  padding: '36px 24px',
                  textAlign: 'center',
                  background: dragging ? 'rgba(168,230,61,0.04)' : 'transparent',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '10px', color: 'var(--chrome-dim)' }}>📷</div>
                <p style={{ fontSize: '13px', color: 'var(--chrome-dim)', marginBottom: '4px' }}>
                  Drag & Drop or{' '}
                  <span style={{ color: 'var(--lime)', cursor: 'pointer' }}>Click to upload</span>
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--carbon-4)' }}>
                  Max 4 photos · JPG, PNG
                </p>
                {files.length > 0 && (
                  <div style={{ marginTop: '12px', display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {files.map(f => (
                      <span key={f} style={{
                        fontFamily: 'var(--font-mono)', fontSize: '10px',
                        background: 'rgba(168,230,61,0.1)', color: 'var(--lime)',
                        padding: '3px 8px', borderRadius: '2px',
                      }}>{f}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 5. Preferences */}
            <div>
              <h3 style={{
                fontSize: '11px', fontFamily: 'var(--font-mono)',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--lime)', marginBottom: '16px',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <span style={{
                  width: '18px', height: '18px', background: 'var(--lime)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: 'var(--carbon)', fontSize: '9px', fontWeight: '700',
                }}>5</span>
                Location & Preferences
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Your Zone in Vancouver</label>
                  <input type="text" placeholder="e.g. Kitsilano, Downtown, Burnaby..." style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}/>
                </div>
                <div>
                  <label style={labelStyle}>Additional Notes</label>
                  <textarea
                    name="message"
                    placeholder="Anything else we should know..."
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary lime-glow"
              style={{
                padding: '18px',
                borderRadius: '4px',
                fontSize: '14px',
                letterSpacing: '0.12em',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                textTransform: 'uppercase',
                marginTop: '8px',
              }}
            >
              Request My Quote →
            </button>

            <p style={{
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.1em',
              color: 'var(--carbon-4)',
              textTransform: 'uppercase',
            }}>
              No commitment · Free quote · Same-day response
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
