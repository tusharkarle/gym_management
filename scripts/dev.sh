#!/bin/bash

# Gym Management Application Development Launcher
# This script starts both the Vite dev server and Electron application

set -e

echo "🏋️ Starting Gym Management Application in Development Mode..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the gym-management project directory"
    exit 1
fi

# Function to clean up processes on exit
cleanup() {
    print_warning "Shutting down development servers..."
    pkill -f "vite" 2>/dev/null || true
    pkill -f "electron" 2>/dev/null || true
    print_success "Development servers stopped"
    exit 0
}

# Set trap to clean up on script exit
trap cleanup SIGINT SIGTERM EXIT

# Clean up any existing processes
print_status "Cleaning up any existing processes..."
pkill -f "vite" 2>/dev/null || true
pkill -f "electron" 2>/dev/null || true

# Start Vite development server in background
print_status "Starting Vite development server..."
npm run dev &
VITE_PID=$!

# Wait for Vite to be ready
print_status "Waiting for development server to be ready..."
sleep 3

# Check if Vite is running
if ! curl -s http://localhost:5173 > /dev/null; then
    print_warning "Vite server not ready yet, waiting a bit more..."
    sleep 2
fi

# Start Electron application
print_status "Starting Electron application..."
print_success "🚀 Gym Management Application is launching!"
print_status "You should see the application window open shortly..."

# Start Electron and wait for it
npm run electron-dev

# Note: The script will continue running until manually stopped (Ctrl+C)