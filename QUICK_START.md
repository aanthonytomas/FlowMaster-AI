# Quick Start Guide - Docker Deployment

## 🚀 Deploy in 3 Steps

### Step 1: Make deployment script executable
```bash
chmod +x deploy.sh
```

### Step 2: Configure environment variables
```bash
# Copy the example file
cp .env.example .env

# Edit with your actual values
nano .env  # or use your preferred editor
```

### Step 3: Deploy!

**Production (Port 80):**
```bash
./deploy.sh prod
```

**Development (Port 4028 with hot reload):**
```bash
./deploy.sh dev
```

## 📋 Common Commands

### View Application
- **Production**: http://localhost:80
- **Development**: http://localhost:4028

### View Logs
```bash
# Production
docker-compose logs -f

# Development
docker-compose -f docker-compose.dev.yml logs -f
```

### Stop Application
```bash
# Production
docker-compose down

# Development
docker-compose -f docker-compose.dev.yml down
```

### Rebuild
```bash
# Production
docker-compose up -d --build

# Development
docker-compose -f docker-compose.dev.yml up -d --build
```

## 🔧 Troubleshooting

### Port already in use?
```bash
# Check what's using the port
sudo lsof -i :80    # for production
sudo lsof -i :4028  # for development

# Or change the port in docker-compose.yml
```

### Container won't start?
```bash
# Check logs
docker-compose logs

# Rebuild without cache
docker-compose build --no-cache
docker-compose up -d
```

### Need to update the app?
```bash
git pull
./deploy.sh prod
```

## 📚 Full Documentation

See [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md) for complete documentation.
