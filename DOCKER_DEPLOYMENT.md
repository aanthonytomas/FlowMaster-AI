# Docker Deployment Guide

This guide explains how to deploy the AI Task Automation Agent using Docker.

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)
- Git (for cloning the repository)

## Quick Start

### Production Deployment

```bash
# Make the deployment script executable
chmod +x deploy.sh

# Deploy to production
./deploy.sh prod
```

The application will be available at `http://localhost:80`

### Development Deployment

```bash
# Deploy to development with hot reload
./deploy.sh dev
```

The application will be available at `http://localhost:4028`

## Manual Deployment

### Production

```bash
# Build and start the production container
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

### Development

```bash
# Build and start the development container
docker-compose -f docker-compose.dev.yml up -d --build

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop the container
docker-compose -f docker-compose.dev.yml down
```

## Environment Variables

Create a `.env` file in the root directory with your configuration:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-key
VITE_OPENAI_API_KEY=your-openai-api-key
VITE_GEMINI_API_KEY=your-gemini-api-key
VITE_ANTHROPIC_API_KEY=your-anthropic-api-key
VITE_GOOGLE_ANALYTICS_ID=your-google-analytics-id
VITE_ADSENSE_ID=your-adsense-id
VITE_PERPLEXITY_API_KEY=your-perplexity-api-key
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

## Deployment Script Options

The `deploy.sh` script supports several options:

```bash
# Deploy to production
./deploy.sh prod

# Deploy to development
./deploy.sh dev

# View logs
./deploy.sh prod --logs

# Check status
./deploy.sh prod --status

# Stop containers
./deploy.sh prod --stop

# Cleanup unused Docker resources
./deploy.sh prod --cleanup
```

## Docker Files Overview

- **Dockerfile**: Multi-stage production build with Nginx
- **Dockerfile.dev**: Development build with hot reload
- **docker-compose.yml**: Production configuration
- **docker-compose.dev.yml**: Development configuration
- **nginx.conf**: Nginx server configuration
- **.dockerignore**: Files to exclude from Docker build

## Architecture

### Production Build

1. **Build Stage**: Installs dependencies and builds the React application
2. **Production Stage**: Serves the built application using Nginx
3. **Optimizations**: 
   - Multi-stage build for smaller image size
   - Gzip compression
   - Static asset caching
   - Security headers

### Development Build

- Hot module replacement (HMR) enabled
- Source code mounted as volumes for live updates
- Development dependencies included

## Health Checks

The production container includes a health check endpoint:

```bash
# Check application health
curl http://localhost/health
```

## Troubleshooting

### Container won't start

```bash
# Check logs
docker-compose logs

# Check container status
docker-compose ps

# Rebuild without cache
docker-compose build --no-cache
```

### Port already in use

```bash
# Find process using port 80
sudo lsof -i :80

# Or change the port in docker-compose.yml
ports:
  - "8080:80"  # Use port 8080 instead
```

### Environment variables not working

Ensure your `.env` file is in the root directory and properly formatted. Restart containers after updating:

```bash
docker-compose down
docker-compose up -d
```

## Production Deployment Checklist

- [ ] Update `.env` with production values
- [ ] Remove or secure sensitive files
- [ ] Configure proper domain and SSL/TLS
- [ ] Set up reverse proxy (if needed)
- [ ] Configure firewall rules
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Test health check endpoints

## Cloud Deployment

### AWS ECS

```bash
# Build and push to ECR
docker build -t ai-task-automation-agent .
docker tag ai-task-automation-agent:latest <account-id>.dkr.ecr.<region>.amazonaws.com/ai-task-automation-agent:latest
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/ai-task-automation-agent:latest
```

### Google Cloud Run

```bash
# Build and deploy
gcloud builds submit --tag gcr.io/<project-id>/ai-task-automation-agent
gcloud run deploy ai-task-automation-agent --image gcr.io/<project-id>/ai-task-automation-agent --platform managed
```

### DigitalOcean App Platform

```bash
# Use the Dockerfile directly or connect your GitHub repository
# App Platform will automatically detect and build the Dockerfile
```

## Maintenance

### Update the application

```bash
# Pull latest changes
git pull

# Rebuild and restart
./deploy.sh prod
```

### View logs

```bash
# Follow logs
docker-compose logs -f

# View last 100 lines
docker-compose logs --tail=100
```

### Backup

```bash
# Export container
docker export ai-task-automation-agent > backup.tar

# Save image
docker save ai-task-automation-agent:latest > image-backup.tar
```

## Security Best Practices

1. Never commit `.env` file to version control
2. Use secrets management for sensitive data
3. Keep Docker images updated
4. Run containers as non-root user (configured in Dockerfile)
5. Use HTTPS in production
6. Implement rate limiting
7. Regular security audits

## Support

For issues or questions:
- Check the logs: `docker-compose logs`
- Review the documentation
- Open an issue on GitHub
