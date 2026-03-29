# API Reference

## Overview

The RimRevive API provides endpoints for managing quote requests and WhatsApp notifications. All API endpoints are RESTful and return JSON responses.

## Base URL

- Development: `http://localhost:3000/api`
- Production: `https://rimrevive.store/api`

## Authentication

Currently, the API does not require authentication for public endpoints. Administrative endpoints (if added) would use JWT or API key authentication.

## Rate Limiting

Rate limiting is configured at the Nginx level to prevent abuse:
- 100 requests per minute per IP address for `/api/submit-quote`
- 1000 requests per minute per IP address for other endpoints

## Endpoints

### Submit Quote Request

Submit a new quote request for rim repair services. This endpoint saves the lead to the database and sends a WhatsApp notification to the business owner.

**Endpoint:** `POST /api/submit-quote`

**Request Headers:**
```
Content-Type: application/json
Accept: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "+16041234567",
  "email": "john@example.com",
  "car_brand": "Tesla",
  "car_model": "Model 3",
  "car_year": "2023",
  "rim_position": "Front right",
  "damage_type": "Curb rash",
  "message": "Need repair for my Tesla rim",
  "photos_count": 2
}
```

**Field Descriptions:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Customer's full name |
| `phone` | string | Yes | Customer's phone number (international format) |
| `email` | string | No | Customer's email address |
| `car_brand` | string | No | Vehicle brand (e.g., Tesla, BMW, Audi) |
| `car_model` | string | No | Vehicle model |
| `car_year` | string | No | Vehicle year |
| `rim_position` | string | No | Which rim(s) need repair (e.g., "Front right", "All four") |
| `damage_type` | string | No | Type of damage (e.g., "Curb rash", "Bent", "Cracked") |
| `message` | string | No | Additional message from customer |
| `photos_count` | number | No | Number of photos uploaded (0-10) |

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Cotización enviada exitosamente",
  "leadId": 42,
  "whatsappSent": true,
  "data": {
    "name": "John Doe",
    "phone": "+16041234567",
    "submittedAt": "2026-03-29T10:30:00.000Z"
  }
}
```

**Error Responses:**

**400 Bad Request** - Missing required fields:
```json
{
  "error": "Nombre y teléfono son requeridos"
}
```

**500 Internal Server Error** - Server error:
```json
{
  "error": "Error interno del servidor",
  "details": "Error message (development only)"
}
```

**Example cURL:**
```bash
curl -X POST https://rimrevive.store/api/submit-quote \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "+16041234567",
    "car_brand": "Tesla",
    "damage_type": "Curb rash"
  }'
```

### Get API Information

Retrieve information about the API endpoint. Useful for health checks and debugging.

**Endpoint:** `GET /api/submit-quote`

**Request:** No body required.

**Success Response (200 OK):**
```json
{
  "message": "Endpoint de cotizaciones de RimRevive",
  "status": "operational",
  "endpoints": {
    "POST": "/api/submit-quote - Enviar nueva cotización",
    "GET": "/api/submit-quote - Información del endpoint"
  },
  "environment": "production"
}
```

## WhatsApp Integration

The API integrates with Twilio's WhatsApp Business API to send notifications when new quotes are submitted.

### Notification Flow

1. **Business Notification**: When a new lead is submitted, a WhatsApp message is sent to the business owner with lead details.
2. **Customer Confirmation**: (Optional) A confirmation message can be sent to the customer.

### WhatsApp Message Format

Business notification message example:
```
🚗 *NUEVO LEAD - RIMREVIVE*
📅 martes, 29 de marzo de 2026, 10:30

👤 *Cliente:* John Doe
📞 *Teléfono:* +16041234567
📧 *Email:* john@example.com
🚙 *Vehículo:* Tesla Model 3 2023
📍 *Rin(s) afectado(s):* Front right
⚡ *Tipo de daño:* Curb rash
💬 *Mensaje:* Need repair for my Tesla rim
📷 *Fotos:* 2 subida(s)

🔗 *Enlace al lead:* https://rimrevive.store/admin/leads/42
🆔 *ID:* 42

⚠️ *¡RESPONDE EN LOS PRÓXIMOS 15 MINUTOS PARA MAXIMIZAR CONVERSIÓN!*
```

### Configuration

WhatsApp integration requires the following environment variables:

```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=+1234567890  # Twilio WhatsApp number
TWILIO_TO_NUMBER=+16723382258        # Business owner's number
```

### Simulation Mode

For development and testing, WhatsApp simulation mode can be enabled:
```env
WHATSAPP_SIMULATE=true
```

When simulation mode is active, WhatsApp messages are logged to console instead of being sent.

## Database Operations

### Lead Storage

Leads are stored in a JSON file database with the following operations:

**Insert Lead:**
```typescript
const leadId = await insertLead({
  name: "John Doe",
  phone: "+16041234567",
  // ... other fields
});
```

**Get Lead by ID:**
```typescript
const lead = await getLeadById(42);
```

**Update WhatsApp Status:**
```typescript
await updateLeadWhatsappStatus(42);
```

**Insert WhatsApp Log:**
```typescript
await insertWhatsappLog({
  lead_id: 42,
  message_sid: "SM1234567890",
  to_number: "+16723382258",
  message_body: "Nuevo lead: John Doe - +16041234567",
  status: "sent"
});
```

### Database File Location

- **Development**: `./rimrevive.json` (project root)
- **Production**: `/data/rimrevive.json` (Docker volume)

## Error Handling

### Validation Errors

The API validates all incoming data:
- `name` and `phone` are required fields
- Phone numbers should be in international format
- Email format validation (if provided)
- Numeric fields validated as numbers

### WhatsApp Errors

If WhatsApp message sending fails:
- Lead is still saved to database
- Error is logged to console
- WhatsApp log entry created with `status: "failed"`
- API response includes `whatsappSent: false`

### Database Errors

If database operations fail:
- Error is logged to console
- API returns 500 Internal Server Error
- No partial data is saved (atomic operations)

## Testing the API

### Using the Web Interface
The easiest way to test the API is through the website's quote form at `https://rimrevive.store`.

### Manual Testing with cURL
```bash
# Test GET endpoint
curl https://rimrevive.store/api/submit-quote

# Test POST endpoint
curl -X POST https://rimrevive.store/api/submit-quote \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","phone":"+16041234567"}'
```

### Automated Testing
The project includes GitHub Actions CI/CD pipeline that runs automated tests.

## Monitoring

### Logging
- All API requests are logged with timestamp and IP address
- Database operations are logged to console
- WhatsApp message status is logged
- Errors include stack traces in development mode

### Health Checks
The GET endpoint serves as a basic health check. For production monitoring, consider implementing:
- `/health` endpoint with detailed system status
- Database connection checks
- External service connectivity (Twilio)

## Versioning

Currently, the API is at version 1. Future versions will be implemented with URL versioning:
```
/api/v1/submit-quote
/api/v2/submit-quote
```

## Deprecation Policy

API endpoints will be deprecated with:
1. 6 months notice before removal
2. Documentation of migration path
3. Continued support for deprecated endpoints during transition period

## Support

For API support:
1. Check the documentation first
2. Test with the GET endpoint for service status
3. Check server logs for error details
4. Contact development team for persistent issues

---

*Last Updated: March 29, 2026*