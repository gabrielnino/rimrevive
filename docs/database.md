# Database Schema Documentation

## Overview

RimRevive uses a JSON file-based database for simplicity and ease of deployment. This document describes the database schema, data models, and operations.

## Database Architecture

### Storage Technology
- **Type**: JSON file-based database
- **File Name**: `rimrevive.json`
- **Location**:
  - Development: Project root directory (`./rimrevive.json`)
  - Production: Persistent volume (`/data/rimrevive.json`)
- **Format**: UTF-8 JSON with pretty printing (2-space indent)

### Database Structure
```json
{
  "leads": [],
  "whatsapp_logs": [],
  "lastId": {
    "leads": 0,
    "whatsapp_logs": 0
  }
}
```

### Advantages
- No external dependencies
- Easy to backup and restore
- Simple to inspect and debug
- Suitable for low to moderate traffic

### Limitations
- Not suitable for high concurrency
- No transactions or ACID guarantees
- Limited query capabilities
- File locking for write operations

## Data Models

### Lead Model

**Purpose**: Stores customer quote requests and contact information.

**TypeScript Interface**:
```typescript
interface Lead {
  id: number                    // Auto-incrementing unique identifier
  name: string                  // Customer's full name
  email: string                 // Customer's email address
  phone: string                 // Customer's phone number (international format)
  car_brand: string            // Vehicle brand (e.g., "Tesla", "BMW", "Audi")
  car_model: string            // Vehicle model (e.g., "Model 3", "X5")
  car_year: string             // Vehicle year (e.g., "2023")
  rim_position: string         // Which rim(s) need repair
  damage_type: string          // Type of damage (e.g., "Curb rash")
  message: string              // Additional message from customer
  photos_count: number         // Number of photos uploaded (0-10)
  submitted_at: string         // ISO 8601 timestamp (e.g., "2026-03-29T10:30:00.000Z")
  status: string               // Lead status: "new", "contacted", "quoted", "closed"
  whatsapp_notified: boolean   // Whether WhatsApp notification was sent
}
```

**Field Details**:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `id` | number | Auto | Unique identifier | `42` |
| `name` | string | Yes | Customer's full name | `"John Doe"` |
| `email` | string | No | Email address | `"john@example.com"` |
| `phone` | string | Yes | Phone number | `"+16041234567"` |
| `car_brand` | string | No | Vehicle brand | `"Tesla"` |
| `car_model` | string | No | Vehicle model | `"Model 3"` |
| `car_year` | string | No | Vehicle year | `"2023"` |
| `rim_position` | string | No | Affected rim position | `"Front right"` |
| `damage_type` | string | No | Type of damage | `"Curb rash"` |
| `message` | string | No | Additional notes | `"Need repair ASAP"` |
| `photos_count` | number | No | Number of photos | `2` |
| `submitted_at` | string | Auto | Submission timestamp | `"2026-03-29T10:30:00.000Z"` |
| `status` | string | Auto | Lead status | `"new"` |
| `whatsapp_notified` | boolean | Auto | Notification status | `true` |

**Status Values**:
- `"new"`: Just submitted, not yet reviewed
- `"contacted"`: Business has contacted customer
- `"quoted"`: Quote has been sent
- `"closed"`: Lead converted to customer or archived

### WhatsApp Log Model

**Purpose**: Tracks WhatsApp message delivery for auditing and troubleshooting.

**TypeScript Interface**:
```typescript
interface WhatsappLog {
  id: number                    // Auto-incrementing unique identifier
  lead_id: number               // Foreign key to leads.id
  message_sid: string           // Twilio Message SID (or "simulated-*" for dev)
  to_number: string             // Recipient phone number
  message_body: string          // Message content (truncated if long)
  status: string               // Delivery status: "sent", "failed", "delivered"
  sent_at: string              // ISO 8601 timestamp
}
```

**Field Details**:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `id` | number | Auto | Unique identifier | `15` |
| `lead_id` | number | Yes | Associated lead ID | `42` |
| `message_sid` | string | Yes | Twilio Message SID | `"SM1234567890"` |
| `to_number` | string | Yes | Recipient number | `"+16723382258"` |
| `message_body` | string | Yes | Message content | `"Nuevo lead: John Doe - +16041234567"` |
| `status` | string | Yes | Delivery status | `"sent"` |
| `sent_at` | string | Auto | Send timestamp | `"2026-03-29T10:31:00.000Z"` |

**Status Values**:
- `"sent"`: Message successfully sent to Twilio
- `"failed"`: Twilio rejected the message
- `"delivered"`: Message delivered to recipient (requires webhook)
- `"simulated"`: Development simulation mode

## Database Operations

### Core Functions

**Location**: `lib/db.ts`

#### `loadDb(): Database`
- Loads database from JSON file
- Creates default structure if file doesn't exist
- Handles JSON parsing errors
- Returns `Database` object

#### `saveDb(db: Database): void`
- Saves database to JSON file
- Creates directory if needed
- Handles write errors
- Logs success/error messages

#### `insertLead(leadData): Promise<number>`
- Adds new lead to database
- Auto-generates ID
- Sets default values (`submitted_at`, `status`, `whatsapp_notified`)
- Returns new lead ID
- **Parameters**: Object with lead fields (excluding auto fields)

#### `getLeadById(id): Promise<Lead | null>`
- Retrieves lead by ID
- Returns `null` if not found
- **Parameters**: `id: number`

#### `updateLeadWhatsappStatus(id): Promise<void>`
- Marks lead as WhatsApp notified
- Updates `whatsapp_notified` to `true`
- **Parameters**: `id: number`

#### `insertWhatsappLog(logData): Promise<void>`
- Adds WhatsApp log entry
- Auto-generates ID
- Sets `sent_at` timestamp
- **Parameters**: Object with log fields

#### `getAllLeads(): Promise<Lead[]>`
- Returns all leads sorted by submission date (newest first)
- No pagination (use with caution for large datasets)

#### `getRecentLeads(): Promise<Lead[]>`
- Returns leads from last 7 days
- Sorted by submission date (newest first)

#### `initDb(): Database`
- Initializes database if empty
- Called automatically on module import
- Returns database instance

## Data Flow

### Lead Creation Flow
1. User submits quote form
2. `insertLead()` called with form data
3. New lead added to `leads` array
4. `lastId.leads` incremented
5. Database file saved
6. Returns new lead ID for WhatsApp notification

### WhatsApp Notification Flow
1. WhatsApp message sent via Twilio
2. `insertWhatsappLog()` called with message details
3. New log added to `whatsapp_logs` array
4. `lastId.whatsapp_logs` incremented
5. `updateLeadWhatsappStatus()` called to mark lead as notified

## File Location Management

### Development Mode
```typescript
const dbPath = path.join(process.cwd(), 'rimrevive.json')
```

### Production Mode
```typescript
const dbPath = '/data/rimrevive.json'
```

### Environment Detection
```typescript
const dbPath = process.env.NODE_ENV === 'production' 
  ? '/data/rimrevive.json'
  : path.join(process.cwd(), 'rimrevive.json')
```

## Performance Considerations

### Read Operations
- Entire file loaded into memory on each read
- Suitable for small datasets (< 10,000 records)
- Consider caching for frequent reads

### Write Operations
- Entire file rewritten on each save
- File locking prevents concurrent writes
- Consider batching writes if volume increases

### Memory Usage
- Entire database loaded into memory
- Monitor file size growth
- Consider archiving old records

## Backup and Recovery

### Backup Strategy
```bash
# Manual backup
cp /data/rimrevive.json /backup/rimrevive-$(date +%Y%m%d).json

# Automated backup (cron)
0 2 * * * cp /data/rimrevive.json /backup/rimrevive-$(date +\%Y\%m\%d).json
```

### Recovery Procedure
```bash
# Stop application
docker stop rimrevive-app

# Restore backup
cp /backup/rimrevive-20240329.json /data/rimrevive.json

# Fix permissions
chown 1001:1001 /data/rimrevive.json

# Start application
docker start rimrevive-app
```

### Data Export
```bash
# Export to CSV (example)
cat /data/rimrevive.json | jq -r '.leads[] | [.id, .name, .phone, .submitted_at] | @csv' > leads.csv
```

## Migration to Production Database

### When to Migrate
Consider migrating to a real database when:
- More than 10,000 leads
- Concurrent users > 10
- Need advanced queries
- Require transactions

### Migration Options

**PostgreSQL**:
```sql
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20) NOT NULL,
  car_brand VARCHAR(50),
  car_model VARCHAR(50),
  car_year VARCHAR(4),
  rim_position VARCHAR(50),
  damage_type VARCHAR(50),
  message TEXT,
  photos_count INTEGER DEFAULT 0,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'new',
  whatsapp_notified BOOLEAN DEFAULT FALSE
);
```

**Migration Script**:
```javascript
// migrate-json-to-postgres.js
const leads = JSON.parse(fs.readFileSync('rimrevive.json')).leads
for (const lead of leads) {
  await db.query('INSERT INTO leads ...', lead)
}
```

## Security Considerations

### File Permissions
```bash
# Production permissions
chmod 600 /data/rimrevive.json
chown 1001:1001 /data/rimrevive.json
```

### Data Privacy
- Phone numbers and emails stored in plain text
- Consider encryption for sensitive fields
- GDPR compliance: implement data deletion

### Access Control
- No built-in access control
- File system permissions as primary control
- Consider adding authentication for admin features

## Monitoring

### Health Checks
```bash
# Check file size
ls -lh /data/rimrevive.json

# Check record count
cat /data/rimrevive.json | jq '.leads | length'

# Check last modification
stat /data/rimrevive.json | grep Modify
```

### Alerting
Monitor for:
- Rapid file size growth
- Permission errors
- Disk space issues
- JSON parse errors

## Troubleshooting

### Common Issues

**JSON Parse Error**:
```bash
# Validate JSON
jq . /data/rimrevive.json > /dev/null && echo "Valid JSON"

# Repair corrupted file (if possible)
cp /data/rimrevive.json /data/rimrevive.json.backup
jq . /data/rimrevive.json.backup > /data/rimrevive.json
```

**Permission Denied**:
```bash
# Check permissions
ls -la /data/rimrevive.json

# Fix permissions
chown 1001:1001 /data/rimrevive.json
chmod 600 /data/rimrevive.json
```

**File Not Found**:
```bash
# Check if file exists
ls -la /data/

# Initialize empty database
echo '{"leads":[],"whatsapp_logs":[],"lastId":{"leads":0,"whatsapp_logs":0}}' > /data/rimrevive.json
```

**Disk Full**:
```bash
# Check disk space
df -h /data

# Archive old records
cat /data/rimrevive.json | jq '.leads = .leads[-1000:]' > /data/rimrevive.json.new
mv /data/rimrevive.json.new /data/rimrevive.json
```

### Debug Commands

**View Recent Leads**:
```bash
cat /data/rimrevive.json | jq '.leads[-5:]'
```

**Count Records**:
```bash
cat /data/rimrevive.json | jq '.leads | length'
cat /data/rimrevive.json | jq '.whatsapp_logs | length'
```

**Check IDs**:
```bash
cat /data/rimrevive.json | jq '.lastId'
```

## Optimization Tips

### For Large Datasets

1. **Implement Pagination**:
```typescript
function getLeadsPaginated(page: number, limit: number): Lead[] {
  const start = (page - 1) * limit
  return db.leads.slice(start, start + limit)
}
```

2. **Add Indexes in Memory**:
```typescript
const leadById = new Map<number, Lead>()
leads.forEach(lead => leadById.set(lead.id, lead))
```

3. **Archive Old Data**:
```bash
# Move leads older than 90 days to archive
cat rimrevive.json | jq '.leads |= map(select(.submitted_at > "2025-12-31"))' > rimrevive-new.json
```

### Performance Monitoring

**Measure Operations**:
```typescript
console.time('loadDb')
const db = loadDb()
console.timeEnd('loadDb')
```

**Monitor Memory**:
```bash
# Check Node.js memory usage
docker stats rimrevive-app
```

## Future Enhancements

### Planned Improvements

1. **Database Abstraction Layer**:
   - Switch between JSON and real databases
   - Consistent API regardless of backend

2. **Data Export Features**:
   - CSV/Excel export
   - PDF reports
   - Dashboard with charts

3. **Advanced Queries**:
   - Search by name/phone
   - Filter by date range
   - Status-based filtering

4. **Data Analytics**:
   - Conversion rate tracking
   - Response time analysis
   - Geographic distribution

### Scalability Path

1. **Short-term**: Optimize JSON operations
2. **Medium-term**: Add Redis caching layer
3. **Long-term**: Migrate to PostgreSQL with connection pooling

## Example Database File

```json
{
  "leads": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+16041234567",
      "car_brand": "Tesla",
      "car_model": "Model 3",
      "car_year": "2023",
      "rim_position": "Front right",
      "damage_type": "Curb rash",
      "message": "Need repair for my Tesla rim",
      "photos_count": 2,
      "submitted_at": "2026-03-29T10:30:00.000Z",
      "status": "new",
      "whatsapp_notified": true
    }
  ],
  "whatsapp_logs": [
    {
      "id": 1,
      "lead_id": 1,
      "message_sid": "SM1234567890",
      "to_number": "+16723382258",
      "message_body": "Nuevo lead: John Doe - +16041234567",
      "status": "sent",
      "sent_at": "2026-03-29T10:31:00.000Z"
    }
  ],
  "lastId": {
    "leads": 1,
    "whatsapp_logs": 1
  }
}
```

## Related Documentation

- [API Reference](./api-reference.md) - How leads are created via API
- [Architecture Overview](./architecture.md) - Database role in overall architecture
- [Deployment Guide](./deployment.md) - Production database setup

---

*Last Updated: March 29, 2026*