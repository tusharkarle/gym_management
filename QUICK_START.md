# 🚀 Gym Management Application - Quick Start Guide

## 🎯 Running the Application

### Option 1: Easy Development Launch (Recommended)
```bash
# One command to start everything
./scripts/dev.sh
```

### Option 2: Manual Launch (Two Terminals)
```bash
# Terminal 1 - Start development server
npm run dev

# Terminal 2 - Start Electron app (wait for Terminal 1 to be ready)
npm run electron-dev
```

### Option 3: Production Mode
```bash
# Build and run standalone
npm run build
npm run electron
```

---

## ✅ What You Should See

### 1. Development Server Output
```
VITE v7.2.2  ready in 200ms
➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 2. Electron Application Output
```
✅ Backend services initialized in Electron
```

### 3. Desktop Application Window
A modern desktop application window with:
- **Sidebar Navigation** with modules (Dashboard, Members, Packages, etc.)
- **Main Content Area** showing the current module
- **Professional UI** with blue and gray color scheme

---

## 🏋️ Quick Application Tour

### 🏠 Dashboard (Home Screen)
- Overview of gym statistics
- Quick access cards for all modules
- Recent activity summary

### 👥 Members Module
**Add Your First Member:**
1. Click "Add Member" button
2. Fill required fields:
   - First Name, Last Name
   - Phone (WhatsApp number)
   - Email address
   - Gender, Date of Birth
   - Address, Profession
3. Optional: Add middle name, reference, Aadhar card
4. Click "Save Member"

### 📦 Packages Module  
**Create Membership Packages:**
1. Click "Add Package"
2. Enter package name (e.g., "Monthly Basic")
3. Select duration (1, 3, 6, or 12 months)
4. Set price in rupees
5. Add description
6. Save package

### ✅ Attendance Module
**Record Member Check-ins:**
1. Use search box to find member
2. Search by name, phone, email, or member ID
3. Select member from dropdown
4. Add optional notes
5. Click "Record Check-in"

### 💰 Billing Module
**Record Payments:**
1. Click "Record Payment"
2. Select member and package
3. Enter amount (auto-filled from package price)
4. Choose payment method (Cash, Card, UPI, Bank Transfer)
5. Add notes if needed
6. Save payment record

### 📊 Reports Module
**View Analytics:**
- **Overview Tab**: Key business metrics and trends
- **Attendance Report**: Member visit frequency
- **Payment Report**: Revenue and payment status tracking
- Use date filters to analyze specific periods

### ⚙️ Settings Module
**Configure Your Gym:**
1. **Gym Information**: Enter gym details and contact info
2. **Fee Management**: Set admission fees, late fees, discounts
3. **Notifications**: Configure alerts and reminders
4. **Backup & Security**: Set up data backup preferences

---

## 📱 Key Features Walkthrough

### 🔍 Search Functionality
- **Global Search**: Search members across all modules
- **Smart Filters**: Filter by name, phone, email, member ID
- **Real-time Results**: Instant search as you type

### 📤 Export Features
- **Excel Export**: Export member data to spreadsheets
- **Report Export**: Download reports for external analysis
- **Date Range Selection**: Export specific time periods

### 💾 Data Management
- **Auto-save**: All data saved automatically
- **Local Storage**: Data stored securely on your computer
- **Backup Options**: Export/import capabilities in Settings

---

## 🛠️ Troubleshooting Common Issues

### Application Won't Start
```bash
# Check if ports are available
netstat -an | grep 5173

# If port is busy, kill existing processes
pkill -f "vite"
pkill -f "electron"

# Restart the application
./scripts/dev.sh
```

### Connection Refused Error
This error occurs when Electron starts before Vite is ready:
1. Wait for Vite to show "ready" message
2. Then start Electron
3. Or use `./scripts/dev.sh` which handles timing automatically

### Performance Issues
- **Slow loading**: Wait for complete startup (3-5 seconds)
- **Memory usage**: Normal usage is 150-200MB RAM
- **Large datasets**: Application handles 1000+ members efficiently

---

## 📋 Daily Usage Workflow

### Morning Setup
1. **Launch Application**: Use `./scripts/dev.sh` or production build
2. **Check Dashboard**: Review yesterday's stats and today's goals
3. **Verify Settings**: Ensure gym info and fees are current

### Member Registration
1. **Go to Members**: Click Members in sidebar
2. **Add New Member**: Complete registration form
3. **Assign Package**: Link member to appropriate membership package
4. **Record Payment**: Log initial payment in Billing module

### Daily Operations
1. **Attendance Tracking**: Use Attendance module for check-ins
2. **Payment Recording**: Log payments as they occur
3. **Quick Searches**: Find members quickly using search functionality

### End of Day
1. **Review Reports**: Check daily attendance and revenue
2. **Export Data**: Backup important data if needed
3. **Close Application**: Use Ctrl+C in terminal or close window

---

## 🎯 Pro Tips

### Efficiency Tips
- **Keyboard Shortcuts**: Use Tab to navigate forms quickly
- **Search by ID**: Fastest way to find specific members
- **Bulk Operations**: Use Excel export/import for large datasets

### Data Organization
- **Consistent Naming**: Use standardized package names
- **Regular Backups**: Export data weekly via Settings
- **Member Photos**: Add photo URLs in member profiles

### Business Insights
- **Monitor Attendance**: Track member engagement patterns
- **Revenue Analysis**: Use Reports to identify trends
- **Package Performance**: Compare package popularity in Reports

---

## 🚀 You're Ready to Go!

Your Gym Management Application is now ready for daily operations. The intuitive interface and comprehensive features will help you:

✅ **Streamline Member Management** - Quick registration and tracking  
✅ **Optimize Revenue** - Efficient billing and payment processing  
✅ **Monitor Performance** - Detailed analytics and reporting  
✅ **Ensure Compliance** - Complete member records and documentation  

**For additional help, refer to the README.md file or DEPLOYMENT.md for advanced configuration options.**

---

**Happy gym managing! 🏋️‍♂️💪**