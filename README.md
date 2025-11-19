# 🏋️ Gym Management System

A comprehensive desktop application for managing gym operations, built with React, TypeScript, and Electron.

## ✨ Features

### 📋 Complete Member Management
- Member registration with all required fields (name, contact, demographics)
- Advanced search and filtering capabilities
- Excel export functionality
- Member profile management

### 📦 Package Management
- Multiple membership durations (1, 3, 6, 12 months)
- Flexible pricing and package comparison
- Automatic savings calculations
- Visual package presentation

### ✅ Attendance Tracking
- Quick member check-in system
- Real-time attendance monitoring
- Historical attendance reports
- Date-based filtering and analytics

### 💰 Billing & Payments
- Multiple payment method support (Cash, Card, UPI, Bank Transfer)
- Payment status tracking (Paid, Due, Overdue)
- Revenue analytics and summaries
- Payment history management

### 📊 Reports & Analytics
- Business overview dashboard
- Attendance frequency reports
- Payment collection analytics
- Customizable date range filtering

### ⚙️ Settings & Configuration
- Gym information management
- Fee structure configuration
- Notification preferences
- Backup and security settings

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# In another terminal, start Electron
npm run electron-dev
```

### Building for Production

```bash
# Build web application
npm run build

# Build desktop application
npm run build-electron

# Build Windows EXE
npm run build-win

# Build Mac DMG
npm run build-mac

# Quick distribution build (skip native dependencies)
npm run dist-quick
```

## 🖥️ Desktop Application

The application is built with Electron and can be distributed as:
- **Windows**: `.exe` installer
- **macOS**: `.dmg` disk image
- **Linux**: `.AppImage` (configured)

### Distribution Files
Built applications will be available in the `dist-electron/` directory.

## 🎯 Usage Guide

### 1. Initial Setup
1. Navigate to **Settings** → **Gym Information**
2. Enter your gym details and contact information
3. Configure fee structure in **Fee Management**

### 2. Package Configuration
1. Go to **Packages** module
2. Create membership packages with different durations
3. Set pricing and descriptions

### 3. Member Management
1. Use **Members** module to register new members
2. Fill in all required information
3. Use search and filters to manage existing members

### 4. Daily Operations
1. **Attendance**: Use quick check-in for daily member visits
2. **Billing**: Record payments and track revenue
3. **Reports**: Monitor business performance and member engagement

## 💼 Technical Stack

- **Frontend**: React 19, TypeScript, Custom CSS Framework
- **Desktop**: Electron with secure configuration
- **Backend Ready**: NestJS architecture prepared
- **Database**: SQLite with TypeORM (configured)
- **Build Tools**: Vite, Electron Builder
- **Export**: ExcelJS for spreadsheet generation

## 📁 Project Structure

```
gym-management/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Main application pages
│   ├── services/      # API services and mock data
│   ├── utils/         # Helper utilities
│   └── types/         # TypeScript type definitions
├── electron/          # Electron main and preload scripts
├── assets/           # Application icons and resources
├── dist/            # Web application build output
└── dist-electron/   # Desktop application builds
```

## 🔧 Configuration

### Electron Builder Configuration
The application is configured in `package.json` under the `build` section:
- Windows: NSIS installer with desktop shortcuts
- macOS: DMG with custom background and window settings
- Linux: AppImage for universal compatibility

### Development vs Production
- **Development**: Hot reload with Vite dev server
- **Production**: Optimized build with code splitting

## 📊 Data Management

The application currently uses mock data for development and testing. For production use:

1. **Backend Integration**: Replace mock services with real API calls
2. **Database Setup**: Initialize SQLite database with production schema
3. **Data Migration**: Import existing member and payment data

## 🛡️ Security Features

- Context isolation enabled in Electron
- Node integration disabled in renderer process
- Secure preload script for IPC communication
- Input validation across all forms

## 📈 Performance Optimization

- Lazy loading for large data sets
- Efficient state management
- Optimized bundle size with code splitting
- Responsive design for various screen sizes

## 🚀 Deployment

### For Development/Testing
```bash
npm run electron-dev
```

### For Production Distribution
```bash
npm run build-electron
# Distributable files will be in dist-electron/
```

### Installation
- **Windows**: Run the `.exe` installer
- **macOS**: Mount the `.dmg` and drag to Applications
- **Linux**: Make `.AppImage` executable and run

## 📞 Support

For technical support or feature requests, please refer to the project documentation or contact the development team.

---

**Built with ❤️ for modern gym management**
