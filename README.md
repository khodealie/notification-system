# 📨 Notification System

A scalable notification system built with **NestJS**, **BullMQ**, **TypeORM**, and **PostgreSQL**, supporting multiple channels: Email, SMS, and Push notifications.

---

## 🚀 Setup Instructions

### 1. Clone & install

```bash
git clone https://github.com/your-org/notification-system.git
cd notification-system
npm install
```

### 2. Setup `.env`

Create a `.env` file in the root:

```env
# ── Postgres ─────────────────────────
PG_HOST=localhost
PG_PORT=5432
PG_USER=mininimi
PG_PASSWORD=mininimi
PG_DB=notif

# ── Redis ────────────────────────────
REDIS_HOST=localhost
REDIS_PORT=6379

# ── App ──────────────────────────────
PORT=3000
```

---

## 🧠 Architecture Overview

### Modules:

- `notification`: Handles creation, status, and dispatch of notifications.
- `provider`: Mock provider layer (e.g., SendGrid, Twilio).
- `channel`: Determines which provider to use based on notification type.
- `queue`: Background queue processor (BullMQ).
- `notification-core`: Core entities and repository logic.
- `shared`: DTOs, enums, schemas, and utility functions.

### Queue & Retry:

- Notifications are queued via BullMQ.
- Each notification tracks status (`PENDING`, `RETRYING`, `SENT`, `FAILED`).
- Failed attempts are logged in `notification_attempts`.

---

## 🔧 Migrations

### Generate a new migration

```bash
npx ts-node -r dotenv/config -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate src/database/migrations/Init -d src/database/data-source.ts
```

### Run migrations

```bash
npx ts-node -r dotenv/config -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d src/database/data-source.ts
```

---

## 📬 Sample API Usage

### Queue Notification (POST `/notifications`)

```json
{
  "channel": "EMAIL",
  "recipient": "test@example.com",
  "subject": "Welcome!",
  "content": {
    "template": "welcome_email",
    "templateData": {
      "name": "John"
    }
  }
}
```

### Immediate Send (POST `/notifications/immediate`)

```json
{
  "channel": "SMS",
  "recipient": "+123456789",
  "content": {
    "text": "Your OTP is 123456"
  }
}
```

### Get Notification Status (GET `/notifications/:id`)

Returns notification details and delivery attempts.

---

## 💡 Sample Notification Payloads

### ✅ Email

```json
{
  "channel": "EMAIL",
  "recipient": "user@example.com",
  "subject": "Welcome",
  "content": {
    "template": "welcome",
    "templateData": {
      "name": "John Doe"
    }
  }
}
```

### ✅ SMS

```json
{
  "channel": "SMS",
  "recipient": "+1234567890",
  "content": {
    "text": "Your OTP is 123456"
  }
}
```

### ✅ Push

```json
{
  "channel": "PUSH",
  "recipient": "fcm_device_token",
  "content": {
    "payload": {
      "title": "Notification Title",
      "body": "Click to view",
      "url": "https://example.com"
    }
  }
}
```

---

## 🧪 Running Tests

### Run all tests

```bash
npm run test
```

### Run unit tests only

```bash
npm run test:unit
```

### Run integration tests only

```bash
npm run test:integration
```

### Watch mode

```bash
npm run test:watch
```

---

## 👤 Author

Made with ❤️ by Ali Sohrabi.

