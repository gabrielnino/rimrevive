'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AnalisisMercadoPage() {
  return (
    <main style={{ background: 'linear-gradient(180deg, #09101d, #0e1424 40%, #0b1020)', color: '#e5e7eb', minHeight: '100vh' }}>
      <Navbar />
      
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 20px 60px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <h1 style={{ fontSize: '2.15rem', lineHeight: 1.15, margin: 0 }}>Estudio de mercado</h1>
            <span style={{ 
              display: 'inline-block', 
              padding: '5px 10px', 
              borderRadius: '999px',
              fontSize: '0.82rem', 
              border: '1px solid #23314d', 
              color: '#dbeafe', 
              background: '#0d1728'
            }}>
              Reparación cosmética móvil de rines en Vancouver
            </span>
          </div>
          
          <p style={{ color: '#94a3b8', fontSize: '0.98rem' }}>
            Análisis estratégico del mercado de reparación de rines en Vancouver — datos observables, competencia, precios y viabilidad operativa.
          </p>
        </div>

        {/* Executive Summary */}
        <section className="card">
          <h2>Resumen ejecutivo</h2>
          
          <div className="kpi">
            <div className="metric">
              <div className="num ok">1,400+</div>
              <div>Reparaciones mensuales declaradas por WheelFX</div>
            </div>
            
            <div className="metric">
              <div className="num warn">$130–$175+</div>
              <div>Rango visible de precio inicial por reparación cosmética</div>
            </div>
          </div>

          <div className="decision">
            <strong>Conclusión operativa:</strong> <span className="ok">Go condicionado</span>. Tiene sentido probar un MVP móvil <strong>solo</strong> si se compite por rapidez, conveniencia y enfoque visual premium. Entrar como "otro taller" o como "servicio barato" reduce mucho las probabilidades.
          </div>
        </section>

        {/* Contexto de mercado */}
        <section className="card">
          <h2>1) Contexto de mercado</h2>
          
          <div className="cols">
            <div>
              <h3>Lo que favorece el negocio</h3>
              <ul>
                <li>Ciudad densa con estacionamiento paralelo y bordillos: escenario típico de rayones de aro/rin.</li>
                <li>Existe demanda demostrada: al menos un jugador local comunica <strong>1,400+ reparaciones al mes</strong>.</li>
                <li>Ya hay aceptación del formato móvil: AWRS y Alloy Wheel Repair BC ofrecen servicio a domicilio / on-site.</li>
                <li>El daño cosmético es emocional y visible: esto favorece decisiones de compra rápidas si el mensaje toca el dolor correcto.</li>
              </ul>
            </div>
            
            <div>
              <h3>Lo que limita el negocio</h3>
              <ul>
                <li>Vancouver no es una ciudad totalmente auto-dependiente: la encuesta de transporte 2024 muestra hogares sin vehículo y alta presencia de car share.</li>
                <li>Competencia real ya presente en móvil y taller.</li>
                <li>Los clientes premium exigen acabado casi invisible; un mal resultado destruye reputación rápido.</li>
                <li>El mercado principal es estético, no urgente: obliga a vender bien el valor percibido.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Demanda: señales observables */}
        <section className="card">
          <h2>2) Demanda: señales observables</h2>
          
          <div style={{ overflowX: 'auto', marginTop: '16px' }}>
            <table>
              <thead>
                <tr><th>Señal</th><th>Dato observado</th><th>Lectura estratégica</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Volumen operativo visible</td>
                  <td>WheelFX declara <strong>"Over 1,400 wheel repairs monthly"</strong>.</td>
                  <td>La categoría no parece marginal. Aun si la cifra fuera promocional, es una señal fuerte de mercado activo.</td>
                </tr>
                <tr>
                  <td>Precio ancla</td>
                  <td>WheelFX publica <strong>$130–$160</strong> para "general cosmetic wheel repair"; AWRS publica <strong>cosmetic repair starting at $175/wheel</strong>.</td>
                  <td>Hay disposición a pagar por estética. Esto ayuda al margen, pero también fija una expectativa alta de resultado.</td>
                </tr>
                <tr>
                  <td>Oferta móvil explícita</td>
                  <td>AWRS y Alloy Wheel Repair BC enfatizan servicio móvil / on-site.</td>
                  <td>El mercado acepta la conveniencia como atributo vendible; también significa que tu ventaja no puede ser "ser móvil" a secas.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Competencia local visible */}
        <section className="card">
          <h2>3) Competencia local visible</h2>
          
          <div style={{ overflowX: 'auto', marginTop: '16px' }}>
            <table>
              <thead>
                <tr><th>Competidor</th><th>Formato</th><th>Señal relevante</th><th>Implicación</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>WheelFX</td>
                  <td>Taller / especialidad</td>
                  <td>Publica 1,400+ reparaciones mensuales y precio inicial de $130–$160.</td>
                  <td>Jugador fuerte; referencia de volumen y precio.</td>
                </tr>
                <tr>
                  <td>AWRS Vancouver</td>
                  <td>Móvil</td>
                  <td>Se presenta como especialista móvil; desde 2012; cosmético desde $175/rueda.</td>
                  <td>Prueba de que el móvil sí tiene cabida.</td>
                </tr>
                <tr>
                  <td>Alloy Wheel Repair BC</td>
                  <td>On-site / móvil</td>
                  <td>ICBC accredited; quick turnaround; servicio en Metro Vancouver.</td>
                  <td>La categoría ya comunica confianza y rapidez como atributos.</td>
                </tr>
                <tr>
                  <td>Elements Labs</td>
                  <td>Detalle / refinish</td>
                  <td>Ofrece rim repair dentro de un stack premium de detailing.</td>
                  <td>Competencia indirecta por cliente de auto cuidado/premium.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Recomendaciones estratégicas */}
        <section className="card">
          <h2>4) Recomendaciones estratégicas</h2>
          
          <div style={{ marginTop: '16px' }}>
            <div className="kpi">
              <div className="metric accent">
                <h3>Posicionamiento</h3>
                <p>No competir como "otro taller". Enfocarse en <strong>rapidez extrema</strong> (mismo día) y <strong>conveniencia total</strong> (sin mover el auto).</p>
              </div>
              
              <div className="metric ok">
                <h3>Precio</h3>
                <p>Partir de $150–$180 por rueda para cosmético básico. Justificar con calidad premium y conveniencia.</p>
              </div>
              
              <div className="metric danger">
                <h3>Riesgos a mitigar</h3>
                <p>Calidad inconsistente, mala comunicación de expectativas, subestimación de logística móvil.</p>
              </div>
            </div>
            
            <div className="metric warn" style={{ marginTop: '24px' }}>
              <h3>MVP recomendado</h3>
              <ul>
                <li>Servicio móvil premium para rayones cosméticos (no estructurales)</li>
                <li>Zona inicial: Vancouver Oeste / Downtown (alta densidad de autos premium)</li>
                <li>Turnaround: mismo día o 24h máximo</li>
                <li>Canal principal: WhatsApp + landing page optimizada</li>
                <li>Precio: $165/rueda (posición premium pero no excesiva)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Nota final */}
        <div className="note">
          <p><strong>Nota metodológica:</strong> Este análisis se basa en datos públicos observables (sitios web, anuncios, reseñas) de competidores activos en Vancouver. Los números de volumen deben tomarse como indicativos, no como auditoría.</p>
          <p style={{ marginTop: '10px' }}><strong>Última actualización:</strong> Marzo 2026</p>
        </div>
      </div>
      
      <Footer />

      <style jsx>{`
        .card {
          background: rgba(18, 26, 43, 0.92);
          border: 1px solid #23314d;
          border-radius: 18px;
          padding: 18px 18px 16px;
          box-shadow: 0 8px 28px rgba(0, 0, 0, 0.22);
          margin-bottom: 24px;
        }
        
        h2 {
          font-size: 1.45rem;
          margin-top: 0;
          margin-bottom: 10px;
        }
        
        h3 {
          font-size: 1.05rem;
          margin-top: 18px;
          margin-bottom: 10px;
        }
        
        .kpi {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px;
          margin-top: 16px;
        }
        
        .metric {
          background: #0d1728;
          border: 1px solid #23314d;
          border-radius: 14px;
          padding: 14px;
        }
        
        .metric.accent {
          background: rgba(96, 165, 250, 0.1);
          border-color: rgba(96, 165, 250, 0.3);
        }
        
        .metric.ok {
          background: rgba(52, 211, 153, 0.1);
          border-color: rgba(52, 211, 153, 0.3);
        }
        
        .metric.warn {
          background: rgba(245, 158, 11, 0.1);
          border-color: rgba(245, 158, 11, 0.3);
        }
        
        .metric.danger {
          background: rgba(248, 113, 113, 0.1);
          border-color: rgba(248, 113, 113, 0.3);
        }
        
        .num {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 8px;
        }
        
        .num.ok {
          color: #34d399;
        }
        
        .num.warn {
          color: #f59e0b;
        }
        
        .decision {
          margin-top: 20px;
          padding: 12px;
          background: rgba(52, 211, 153, 0.1);
          border: 1px solid rgba(52, 211, 153, 0.3);
          border-radius: 8px;
        }
        
        .ok {
          color: #34d399;
        }
        
        .cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-top: 18px;
        }
        
        @media (max-width: 768px) {
          .cols {
            grid-template-columns: 1fr;
          }
        }
        
        ul {
          padding-left: 20px;
          margin: 10px 0;
        }
        
        li {
          margin-bottom: 8px;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
        }
        
        th, td {
          text-align: left;
          padding: 12px;
          border-bottom: 1px solid #23314d;
        }
        
        th {
          font-weight: 600;
        }
        
        .note {
          margin-top: 32px;
          padding: 20px;
          background: rgba(18, 26, 43, 0.7);
          border: 1px solid #23314d;
          border-radius: 12px;
          font-size: 0.9rem;
          color: #94a3b8;
        }
      `}</style>
    </main>
  )
}