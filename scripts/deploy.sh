#!/bin/bash

# Gym Management Application Deployment Script
# This script builds the application for distribution

set -e

echo "🏋️ Starting Gym Management Application Build Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ to continue."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version)
print_status "Node.js version: $NODE_VERSION"

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf dist/
rm -rf dist-electron/
print_success "Previous builds cleaned"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
    print_success "Dependencies installed"
fi

# Build the React application
print_status "Building React application..."
npm run build
if [ $? -eq 0 ]; then
    print_success "React application built successfully"
else
    print_error "React build failed"
    exit 1
fi

# Build Electron application
print_status "Building Electron application..."
if npm run dist-quick; then
    print_success "Electron application built successfully"
else
    print_warning "Electron build failed, trying alternative build..."
    # Try without native dependencies
    npm run build-electron-skip-native
fi

# Check if dist-electron directory exists
if [ -d "dist-electron" ]; then
    print_success "Distribution files created in dist-electron/"
    
    # List the created files
    print_status "Created distribution files:"
    ls -la dist-electron/
    
    # Calculate file sizes
    echo ""
    print_status "File sizes:"
    du -h dist-electron/*
    
    echo ""
    print_success "🎉 Build process completed successfully!"
    print_status "Distribution files are ready in the 'dist-electron' directory"
    print_status "You can now distribute these files to end users"
    
else
    print_error "Distribution build failed - no dist-electron directory found"
    exit 1
fi

# Show installation instructions
echo ""
print_status "📦 Installation Instructions:"
echo "  • Windows: Run the .exe installer"
echo "  • macOS: Mount the .dmg file and drag to Applications"
echo "  • Linux: Make the .AppImage executable and run"

echo ""
print_status "🚀 Next Steps:"
echo "  1. Test the built application on target platforms"
echo "  2. Distribute the installer files to users"
echo "  3. Consider code signing for production releases"

echo ""
print_success "Gym Management Application deployment ready! 🏋️"