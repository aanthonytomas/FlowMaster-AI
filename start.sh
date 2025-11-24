#!/bin/bash

# AI Task Automation Agent - Auto Start Script
# This script automatically starts the frontend (and backend if available)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
FRONTEND_DIR="."
FRONTEND_PORT=4028
BACKEND_DIR="./backend"
BACKEND_PORT=3000

# PID files
FRONTEND_PID_FILE=".frontend.pid"
BACKEND_PID_FILE=".backend.pid"

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

print_success() {
    echo -e "${BLUE}[SUCCESS]${NC} $1"
}

# Check if port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Kill process by PID file
kill_by_pid_file() {
    local pid_file=$1
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if ps -p $pid > /dev/null 2>&1; then
            print_info "Stopping process (PID: $pid)..."
            kill $pid 2>/dev/null || true
            sleep 2
            if ps -p $pid > /dev/null 2>&1; then
                kill -9 $pid 2>/dev/null || true
            fi
        fi
        rm -f "$pid_file"
    fi
}

# Stop all services
stop_services() {
    print_info "Stopping all services..."
    
    # Stop frontend
    kill_by_pid_file "$FRONTEND_PID_FILE"
    
    # Stop backend
    kill_by_pid_file "$BACKEND_PID_FILE"
    
    # Kill any remaining processes on ports
    if check_port $FRONTEND_PORT; then
        print_warning "Killing process on port $FRONTEND_PORT..."
        lsof -ti:$FRONTEND_PORT | xargs kill -9 2>/dev/null || true
    fi
    
    if check_port $BACKEND_PORT; then
        print_warning "Killing process on port $BACKEND_PORT..."
        lsof -ti:$BACKEND_PORT | xargs kill -9 2>/dev/null || true
    fi
    
    print_success "All services stopped."
}

# Start frontend
start_frontend() {
    print_info "Starting frontend..."
    
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        print_warning "node_modules not found. Installing dependencies..."
        npm install
    fi
    
    # Check if port is already in use
    if check_port $FRONTEND_PORT; then
        print_error "Port $FRONTEND_PORT is already in use!"
        print_info "Run './start.sh stop' to stop existing services."
        return 1
    fi
    
    # Start frontend in background
    cd "$FRONTEND_DIR"
    npm run dev > frontend.log 2>&1 &
    local pid=$!
    echo $pid > "$FRONTEND_PID_FILE"
    
    # Wait for frontend to start
    print_info "Waiting for frontend to start..."
    local max_attempts=30
    local attempt=0
    while [ $attempt -lt $max_attempts ]; do
        if check_port $FRONTEND_PORT; then
            print_success "Frontend started successfully on port $FRONTEND_PORT (PID: $pid)"
            return 0
        fi
        sleep 1
        ((attempt++))
    done
    
    print_error "Frontend failed to start. Check frontend.log for details."
    return 1
}

# Start backend (if exists)
start_backend() {
    if [ -d "$BACKEND_DIR" ]; then
        print_info "Starting backend..."
        
        # Check if backend has package.json
        if [ ! -f "$BACKEND_DIR/package.json" ]; then
            print_warning "Backend directory exists but no package.json found. Skipping backend."
            return 0
        fi
        
        # Check if node_modules exists in backend
        if [ ! -d "$BACKEND_DIR/node_modules" ]; then
            print_warning "Backend node_modules not found. Installing dependencies..."
            cd "$BACKEND_DIR"
            npm install
            cd - > /dev/null
        fi
        
        # Check if port is already in use
        if check_port $BACKEND_PORT; then
            print_error "Port $BACKEND_PORT is already in use!"
            return 1
        fi
        
        # Start backend in background
        cd "$BACKEND_DIR"
        npm run dev > ../backend.log 2>&1 &
        local pid=$!
        cd - > /dev/null
        echo $pid > "$BACKEND_PID_FILE"
        
        # Wait for backend to start
        print_info "Waiting for backend to start..."
        local max_attempts=30
        local attempt=0
        while [ $attempt -lt $max_attempts ]; do
            if check_port $BACKEND_PORT; then
                print_success "Backend started successfully on port $BACKEND_PORT (PID: $pid)"
                return 0
            fi
            sleep 1
            ((attempt++))
        done
        
        print_error "Backend failed to start. Check backend.log for details."
        return 1
    else
        print_info "No backend directory found. Running frontend only."
        return 0
    fi
}

# Show status
show_status() {
    print_info "Service Status:"
    echo ""
    
    # Frontend status
    if [ -f "$FRONTEND_PID_FILE" ]; then
        local pid=$(cat "$FRONTEND_PID_FILE")
        if ps -p $pid > /dev/null 2>&1; then
            echo -e "  ${GREEN}●${NC} Frontend: Running (PID: $pid, Port: $FRONTEND_PORT)"
        else
            echo -e "  ${RED}●${NC} Frontend: Stopped (stale PID file)"
            rm -f "$FRONTEND_PID_FILE"
        fi
    else
        if check_port $FRONTEND_PORT; then
            echo -e "  ${YELLOW}●${NC} Frontend: Running (unknown PID, Port: $FRONTEND_PORT)"
        else
            echo -e "  ${RED}●${NC} Frontend: Not running"
        fi
    fi
    
    # Backend status
    if [ -d "$BACKEND_DIR" ]; then
        if [ -f "$BACKEND_PID_FILE" ]; then
            local pid=$(cat "$BACKEND_PID_FILE")
            if ps -p $pid > /dev/null 2>&1; then
                echo -e "  ${GREEN}●${NC} Backend: Running (PID: $pid, Port: $BACKEND_PORT)"
            else
                echo -e "  ${RED}●${NC} Backend: Stopped (stale PID file)"
                rm -f "$BACKEND_PID_FILE"
            fi
        else
            if check_port $BACKEND_PORT; then
                echo -e "  ${YELLOW}●${NC} Backend: Running (unknown PID, Port: $BACKEND_PORT)"
            else
                echo -e "  ${RED}●${NC} Backend: Not running"
            fi
        fi
    fi
    
    echo ""
    print_info "Access URLs:"
    echo "  Frontend: http://localhost:$FRONTEND_PORT"
    if [ -d "$BACKEND_DIR" ]; then
        echo "  Backend:  http://localhost:$BACKEND_PORT"
    fi
}

# Show logs
show_logs() {
    local service=${1:-all}
    
    if [ "$service" = "frontend" ] || [ "$service" = "all" ]; then
        if [ -f "frontend.log" ]; then
            print_info "Frontend logs (Ctrl+C to exit):"
            tail -f frontend.log
        else
            print_warning "No frontend logs found."
        fi
    fi
    
    if [ "$service" = "backend" ] || [ "$service" = "all" ]; then
        if [ -f "backend.log" ]; then
            print_info "Backend logs (Ctrl+C to exit):"
            tail -f backend.log
        else
            print_warning "No backend logs found."
        fi
    fi
}

# Main function
main() {
    case "${1:-start}" in
        start)
            print_info "Starting AI Task Automation Agent..."
            start_frontend
            start_backend
            echo ""
            show_status
            echo ""
            print_success "All services started successfully!"
            print_info "Run './start.sh logs' to view logs"
            print_info "Run './start.sh stop' to stop all services"
            ;;
        stop)
            stop_services
            ;;
        restart)
            stop_services
            sleep 2
            main start
            ;;
        status)
            show_status
            ;;
        logs)
            show_logs "${2:-all}"
            ;;
        frontend)
            start_frontend
            show_status
            ;;
        backend)
            start_backend
            show_status
            ;;
        *)
            echo "Usage: $0 {start|stop|restart|status|logs|frontend|backend}"
            echo ""
            echo "Commands:"
            echo "  start    - Start all services (default)"
            echo "  stop     - Stop all services"
            echo "  restart  - Restart all services"
            echo "  status   - Show service status"
            echo "  logs     - Show logs (use 'logs frontend' or 'logs backend' for specific service)"
            echo "  frontend - Start only frontend"
            echo "  backend  - Start only backend"
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
