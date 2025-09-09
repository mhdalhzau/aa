# POS Application Deployment Guide

## Environment Variables Required

```bash
DATABASE_URL=postgresql://username:password@host:port/database
PORT=5000
NODE_ENV=production
```

## Installation Steps

1. **Clone or extract the project files**
```bash
git clone <repository-url>
cd pos-application
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up database**
```bash
# Create PostgreSQL database
createdb pos_database

# Set environment variable
export DATABASE_URL="postgresql://username:password@localhost:5432/pos_database"

# Run database migrations
npm run db:push
```

4. **Populate initial data (optional)**
```bash
node scripts/populate-dummy-data.js
```

5. **Build application**
```bash
npm run build
```

6. **Start production server**
```bash
npm start
```

## Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

## Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Database Backup

```bash
# Backup database
pg_dump $DATABASE_URL > backup.sql

# Restore database
psql $DATABASE_URL < backup.sql
```

## Features Included

- ✅ Multi-store management
- ✅ Product inventory with stock tracking
- ✅ Customer management with debt tracking
- ✅ POS transaction system
- ✅ Debt payment installments
- ✅ Cash flow management with debt category
- ✅ Receipt generation
- ✅ Sales reporting
- ✅ Dashboard with analytics
- ✅ Mobile-responsive design
- ✅ Offline support capabilities

## System Requirements

- Node.js 18+
- PostgreSQL 12+
- 1GB RAM minimum
- 10GB storage minimum