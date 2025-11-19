#!/bin/bash

# Gym Management Application Setup Script
# Quick setup for development environment

set -e

echo "🏋️ Setting up Gym Management Application..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the gym-management project directory"
    exit 1
fi

# Install dependencies
print_status "Installing dependencies..."
npm install
print_success "Dependencies installed"

# Create necessary directories
print_status "Creating directories..."
mkdir -p assets/icons
mkdir -p dist-electron
print_success "Directories created"

# Build the application
print_status "Building application..."
npm run build
print_success "Application built"

echo ""
print_success "🎉 Setup complete!"
echo ""
print_status "To start development:"
echo "  npm run dev          # Start development server"
echo "  npm run electron-dev # Start Electron app"
echo ""
print_status "To build for distribution:"
echo "  npm run dist-quick   # Quick build"
echo "  ./scripts/deploy.sh  # Full deployment"
echo ""
print_success "Ready to develop! 🚀"