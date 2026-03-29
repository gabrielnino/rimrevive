import twilio from 'twilio'

// Configuración de Twilio para WhatsApp
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER
const toNumber = process.env.TWILIO_TO_NUMBER

// Cliente Twilio (si hay credenciales)
const client = accountSid && authToken 
  ? twilio(accountSid, authToken)
  : null

// Modo simulado para desarrollo
const simulateMode = process.env.WHATSAPP_SIMULATE === 'true' || !client

export interface LeadData {
  id: number
  name: string
  phone: string
  email?: string
  car_brand?: string
  car_model?: string
  car_year?: string
  rim_position?: string
  damage_type?: string
  message?: string
  photos_count?: number
}

/**
 * Envía notificación por WhatsApp cuando alguien completa el formulario
 */
export async function sendWhatsAppNotification(lead: LeadData): Promise<{
  success: boolean
  messageSid?: string
  error?: string
}> {
  try {
    // Formatear el mensaje
    const messageBody = formatLeadMessage(lead)
    
    // En modo simulado, solo registrar en consola
    if (simulateMode) {
      console.log('📱 [SIMULADO] Mensaje WhatsApp:', {
        to: toNumber || '+16723382258',
        message: messageBody
      })
      
      return {
        success: true,
        messageSid: 'simulated-' + Date.now()
      }
    }
    
    // Verificar que tengamos las credenciales necesarias
    if (!client || !fromNumber || !toNumber) {
      throw new Error('Configuración de WhatsApp incompleta')
    }
    
    // Enviar mensaje real a través de Twilio
    const message = await client.messages.create({
      body: messageBody,
      from: fromNumber,
      to: toNumber
    })
    
    console.log('✅ WhatsApp enviado:', message.sid)
    
    return {
      success: true,
      messageSid: message.sid
    }
    
  } catch (error: any) {
    console.error('❌ Error enviando WhatsApp:', error.message)
    
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Formatea los datos del lead en un mensaje legible para WhatsApp
 */
function formatLeadMessage(lead: LeadData): string {
  const lines = [
    `🚗 *NUEVO LEAD - RIMREVIVE*`,
    `📅 ${new Date().toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}`,
    ``,
    `👤 *Cliente:* ${lead.name}`,
    `📞 *Teléfono:* ${lead.phone}`,
  ]
  
  if (lead.email) {
    lines.push(`📧 *Email:* ${lead.email}`)
  }
  
  if (lead.car_brand) {
    lines.push(`🚙 *Vehículo:* ${lead.car_brand} ${lead.car_model || ''} ${lead.car_year || ''}`.trim())
  }
  
  if (lead.rim_position) {
    lines.push(`📍 *Rin(s) afectado(s):* ${lead.rim_position}`)
  }
  
  if (lead.damage_type) {
    lines.push(`⚡ *Tipo de daño:* ${lead.damage_type}`)
  }
  
  if (lead.message) {
    lines.push(`💬 *Mensaje:* ${lead.message}`)
  }
  
  if (lead.photos_count && lead.photos_count > 0) {
    lines.push(`📷 *Fotos:* ${lead.photos_count} subida(s)`)
  }
  
  lines.push(
    ``,
    `🔗 *Enlace al lead:* ${process.env.APP_URL || 'https://rimrevive.store'}/admin/leads/${lead.id}`,
    `🆔 *ID:* ${lead.id}`,
    ``,
    `⚠️ *¡RESPONDE EN LOS PRÓXIMOS 15 MINUTOS PARA MAXIMIZAR CONVERSIÓN!*`
  )
  
  return lines.join('\n')
}

/**
 * Envía mensaje de confirmación al cliente
 */
export async function sendConfirmationToClient(phone: string, name: string): Promise<{
  success: boolean
  messageSid?: string
  error?: string
}> {
  try {
    const messageBody = `¡Hola ${name}! 👋

Gracias por solicitar tu cotización en *RimRevive Vancouver*. 

Hemos recibido tu información y estamos revisando las fotos de tus rines. Te contactaremos en los próximos minutos para darte un precio exacto y coordinar una cita.

📞 *Nuestro WhatsApp:* +1 (604) 123-4567
🌐 *Nuestro sitio:* https://rimrevive.store

¡Gracias por confiar en nosotros! 🚗💨

_Equipo RimRevive_`

    // En modo simulado
    if (simulateMode) {
      console.log('📱 [SIMULADO] Confirmación al cliente:', {
        to: `whatsapp:${phone}`,
        message: messageBody
      })
      
      return {
        success: true,
        messageSid: 'simulated-confirm-' + Date.now()
      }
    }
    
    // Enviar mensaje real
    if (!client || !fromNumber) {
      throw new Error('Configuración de WhatsApp incompleta')
    }
    
    const message = await client.messages.create({
      body: messageBody,
      from: fromNumber,
      to: `whatsapp:${phone}`
    })
    
    return {
      success: true,
      messageSid: message.sid
    }
    
  } catch (error: any) {
    console.error('❌ Error enviando confirmación:', error.message)
    return {
      success: false,
      error: error.message
    }
  }
}