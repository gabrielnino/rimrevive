import fs from 'fs'
import path from 'path'

// Configurar la ruta de la base de datos JSON
const dbPath = process.env.NODE_ENV === 'production' 
  ? '/data/rimrevive.json'  // En producción, usar volumen persistente
  : path.join(process.cwd(), 'rimrevive.json')

// Estructura de la base de datos
interface Lead {
  id: number
  name: string
  email: string
  phone: string
  car_brand: string
  car_model: string
  car_year: string
  rim_position: string
  damage_type: string
  message: string
  photos_count: number
  submitted_at: string
  status: string
  whatsapp_notified: boolean
}

interface WhatsappLog {
  id: number
  lead_id: number
  message_sid: string
  to_number: string
  message_body: string
  status: string
  sent_at: string
}

interface Database {
  leads: Lead[]
  whatsapp_logs: WhatsappLog[]
  lastId: {
    leads: number
    whatsapp_logs: number
  }
}

// Cargar base de datos
function loadDb(): Database {
  try {
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('❌ Error cargando base de datos:', error)
  }
  
  // Base de datos por defecto
  return {
    leads: [],
    whatsapp_logs: [],
    lastId: {
      leads: 0,
      whatsapp_logs: 0
    }
  }
}

// Guardar base de datos
function saveDb(db: Database) {
  try {
    // Asegurar que el directorio existe
    const dir = path.dirname(dbPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))
    console.log('💾 Base de datos guardada')
  } catch (error) {
    console.error('❌ Error guardando base de datos:', error)
  }
}

// Funciones para manejar leads
export async function insertLead(leadData: {
  name: string
  email: string
  phone: string
  car_brand: string
  car_model: string
  car_year: string
  rim_position: string
  damage_type: string
  message: string
  photos_count: number
}): Promise<number> {
  const db = loadDb()
  
  const newLead: Lead = {
    id: db.lastId.leads + 1,
    name: leadData.name,
    email: leadData.email,
    phone: leadData.phone,
    car_brand: leadData.car_brand,
    car_model: leadData.car_model,
    car_year: leadData.car_year,
    rim_position: leadData.rim_position,
    damage_type: leadData.damage_type,
    message: leadData.message,
    photos_count: leadData.photos_count,
    submitted_at: new Date().toISOString(),
    status: 'new',
    whatsapp_notified: false
  }
  
  db.leads.push(newLead)
  db.lastId.leads = newLead.id
  
  saveDb(db)
  console.log('📝 Lead guardado:', newLead)
  
  return newLead.id
}

export async function getLeadById(id: number): Promise<Lead | null> {
  const db = loadDb()
  return db.leads.find(lead => lead.id === id) || null
}

export async function updateLeadWhatsappStatus(id: number) {
  const db = loadDb()
  const lead = db.leads.find(lead => lead.id === id)
  
  if (lead) {
    lead.whatsapp_notified = true
    saveDb(db)
    console.log('✅ Lead marcado como notificado:', id)
  }
}

export async function insertWhatsappLog(logData: {
  lead_id: number
  message_sid: string
  to_number: string
  message_body: string
  status: string
}) {
  const db = loadDb()
  
  const newLog: WhatsappLog = {
    id: db.lastId.whatsapp_logs + 1,
    lead_id: logData.lead_id,
    message_sid: logData.message_sid,
    to_number: logData.to_number,
    message_body: logData.message_body,
    status: logData.status,
    sent_at: new Date().toISOString()
  }
  
  db.whatsapp_logs.push(newLog)
  db.lastId.whatsapp_logs = newLog.id
  
  saveDb(db)
  console.log('📱 Log de WhatsApp guardado:', newLog)
}

export async function getAllLeads(): Promise<Lead[]> {
  const db = loadDb()
  return db.leads.sort((a, b) => 
    new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime()
  )
}

export async function getRecentLeads(): Promise<Lead[]> {
  const db = loadDb()
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  
  return db.leads
    .filter(lead => new Date(lead.submitted_at) > oneWeekAgo)
    .sort((a, b) => 
      new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime()
    )
}

// Inicializar base de datos si no existe
export function initDb() {
  const db = loadDb()
  console.log('✅ Base de datos JSON inicializada')
  return db
}

// Inicializar al importar
initDb()