.PHONY: help build start stop restart logs clean dev dev-stop dev-logs prod prod-stop prod-logs

# Default target
help:
	@echo "AI Task Automation Agent - Commands"
	@echo ""
	@echo "Quick Start Commands:"
	@echo "  make start-all      - Start frontend & backend (auto-detect)"
	@echo "  make start-frontend - Start only frontend"
	@echo "  make start-backend  - Start only backend"
	@echo ""
	@echo "Docker Production Commands:"
	@echo "  make prod           - Build and start production container"
	@echo "  make prod-stop      - Stop production container"
	@echo "  make prod-logs      - View production logs"
	@echo ""
	@echo "Docker Development Commands:"
	@echo "  make dev            - Build and start development container"
	@echo "  make dev-stop       - Stop development container"
	@echo "  make dev-logs       - View development logs"
	@echo ""
	@echo "General Commands:"
	@echo "  make build          - Build production image"
	@echo "  make start          - Start production container"
	@echo "  make stop           - Stop all containers"
	@echo "  make restart        - Restart production container"
	@echo "  make logs           - View production logs"
	@echo "  make clean          - Remove containers and clean up"
	@echo "  make status         - Show container status"
	@echo "  make install        - Install dependencies"
	@echo "  make build-local    - Build locally (without Docker)"

# Production commands
prod: prod-stop
	@echo "Building and starting production container..."
	docker-compose up -d --build
	@echo "Production container started at http://localhost:80"

prod-stop:
	@echo "Stopping production container..."
	docker-compose down

prod-logs:
	docker-compose logs -f

# Development commands
dev: dev-stop
	@echo "Building and starting development container..."
	docker-compose -f docker-compose.dev.yml up -d --build
	@echo "Development container started at http://localhost:4028"

dev-stop:
	@echo "Stopping development container..."
	docker-compose -f docker-compose.dev.yml down

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f

# General commands
build:
	docker-compose build

start:
	docker-compose up -d

stop:
	docker-compose down
	docker-compose -f docker-compose.dev.yml down

restart: stop start

logs:
	docker-compose logs -f

status:
	@echo "Production containers:"
	@docker-compose ps
	@echo ""
	@echo "Development containers:"
	@docker-compose -f docker-compose.dev.yml ps

clean:
	@echo "Cleaning up containers and images..."
	docker-compose down -v --rmi local
	docker-compose -f docker-compose.dev.yml down -v --rmi local
	docker system prune -f
	@echo "Cleanup complete"

# Install dependencies locally
install:
	npm install

# Run tests (if available)
test:
	npm test

# Build locally (without Docker)
build-local:
	npm run build

# Start frontend and backend (auto-detect)
start-all:
	@echo "Starting all services..."
	@node start-dev.js

# Start only frontend
start-frontend:
	npm run dev

# Start only backend (if exists)
start-backend:
	@if [ -d "./backend" ]; then \
		cd backend && npm run dev; \
	else \
		echo "Backend directory not found"; \
	fi
