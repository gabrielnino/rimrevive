import { NextRequest, NextResponse } from 'next/server'
import { insertLead, getLeadById, updateLeadWhatsappStatus, insertWhatsappLog } from '@/lib/db'
import { sendWhatsAppNotification, sendConfirmationToClient } from '@/lib/whatsapp'

export async function POST(request: NextRequest) {
  try {
    // Parsear los datos del formulario
    const data = await request.json()
    
    console.log('📝 Datos recibidos del formulario:', data)
    
    // Validar datos requeridos
    if (!data.name || !data.phone) {
      return NextResponse.json(
        { error: 'Nombre y teléfono son requeridos' },
        { status: 400 }
      )
    }
    
    // Guardar en la base de datos
    const leadId = await insertLead({
      name: data.name,
      email: data.email || '',
      phone: data.phone,
      car_brand: data.car_brand || '',
      car_model: data.car_model || '',
      car_year: data.car_year || '',
      rim_position: data.rim_position || '',
      damage_type: data.damage_type || '',
      message: data.message || '',
      photos_count: data.photos_count || 0
    })
    
    // Obtener el lead completo
    const lead = await getLeadById(leadId)
    
    console.log('💾 Lead guardado en DB:', lead)
    
    // Enviar notificación por WhatsApp al dueño
    const whatsappResult = await sendWhatsAppNotification({
      id: leadId,
      name: data.name,
      phone: data.phone,
      email: data.email,
      car_brand: data.car_brand,
      car_model: data.car_model,
      car_year: data.car_year,
      rim_position: data.rim_position,
      damage_type: data.damage_type,
      message: data.message,
      photos_count: data.photos_count
    })
    
    // Registrar el envío de WhatsApp
    await insertWhatsappLog({
      lead_id: leadId,
      message_sid: whatsappResult.messageSid || 'unknown',
      to_number: process.env.TWILIO_TO_NUMBER || '+16723382258',
      message_body: `Nuevo lead: ${data.name} - ${data.phone}`,
      status: whatsappResult.success ? 'sent' : 'failed'
    })
    
    // Actualizar estado del lead
    if (whatsappResult.success) {
      await updateLeadWhatsappStatus(leadId)
    }
    
    // Enviar confirmación al cliente (opcional)
    if (data.phone && data.name) {
      await sendConfirmationToClient(data.phone, data.name)
    }
    
    // Responder con éxito
    return NextResponse.json({
      success: true,
      message: 'Cotización enviada exitosamente',
      leadId: leadId,
      whatsappSent: whatsappResult.success,
      data: {
        name: data.name,
        phone: data.phone,
        submittedAt: new Date().toISOString()
      }
    })
    
  } catch (error: any) {
    console.error('❌ Error procesando formulario:', error)
    
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

// Método GET para probar el endpoint
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Endpoint de cotizaciones de RimRevive',
    status: 'operational',
    endpoints: {
      POST: '/api/submit-quote - Enviar nueva cotización',
      GET: '/api/submit-quote - Información del endpoint'
    },
    environment: process.env.NODE_ENV || 'development'
  })
}