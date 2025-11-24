#!/bin/bash

# AI Task Automation Agent - Docker Deployment Script
# Usage: ./deploy.sh [environment]
# Environments: dev, prod (default: prod)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-prod}
APP_NAME="ai-task-automation-agent"
DOCKER_COMPOSE_FILE="docker-compose.yml"

# Functions
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_requirements() {
    print_info "Checking requirements..."
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    if [ ! -f ".env" ]; then
        print_warning ".env file not found. Creating from template..."
        if [ -f ".env.example" ]; then
            cp .env.example .env
            print_info "Please update .env file with your configuration."
        else
            print_error "No .env or .env.example file found."
            exit 1
        fi
    fi
    
    print_info "All requirements met."
}

build_image() {
    print_info "Building Docker image for $ENVIRONMENT environment..."
    
    if [ "$ENVIRONMENT" = "dev" ]; then
        docker-compose -f docker-compose.dev.yml build
    else
        docker-compose -f $DOCKER_COMPOSE_FILE build
    fi
    
    print_info "Docker image built successfully."
}

stop_containers() {
    print_info "Stopping existing containers..."
    
    if [ "$ENVIRONMENT" = "dev" ]; then
        docker-compose -f docker-compose.dev.yml down || true
    else
        docker-compose -f $DOCKER_COMPOSE_FILE down || true
    fi
    
    print_info "Containers stopped."
}

start_containers() {
    print_info "Starting containers..."
    
    if [ "$ENVIRONMENT" = "dev" ]; then
        docker-compose -f docker-compose.dev.yml up -d
    else
        docker-compose -f $DOCKER_COMPOSE_FILE up -d
    fi
    
    print_info "Containers started successfully."
}

show_status() {
    print_info "Container status:"
    
    if [ "$ENVIRONMENT" = "dev" ]; then
        docker-compose -f docker-compose.dev.yml ps
    else
        docker-compose -f $DOCKER_COMPOSE_FILE ps
    fi
}

show_logs() {
    print_info "Showing logs (Ctrl+C to exit)..."
    
    if [ "$ENVIRONMENT" = "dev" ]; then
        docker-compose -f docker-compose.dev.yml logs -f
    else
        docker-compose -f $DOCKER_COMPOSE_FILE logs -f
    fi
}

cleanup() {
    print_info "Cleaning up unused Docker resources..."
    docker system prune -f
    print_info "Cleanup completed."
}

# Main deployment flow
main() {
    print_info "Starting deployment for $ENVIRONMENT environment..."
    
    check_requirements
    stop_containers
    build_image
    start_containers
    
    sleep 5
    
    show_status
    
    if [ "$ENVIRONMENT" = "dev" ]; then
        print_info "Application is running at: http://localhost:4028"
    else
        print_info "Application is running at: http://localhost:80"
    fi
    
    print_info "Deployment completed successfully!"
    
    read -p "Do you want to view logs? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        show_logs
    fi
}

# Parse command line arguments
case "${2:-}" in
    --logs)
        show_logs
        ;;
    --status)
        show_status
        ;;
    --stop)
        stop_containers
        ;;
    --cleanup)
        cleanup
        ;;
    *)
        main
        ;;
esac
