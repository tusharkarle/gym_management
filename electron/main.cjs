const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

async function initializeBackend() {
  try {
    // Start embedded backend server
    // Note: In a real implementation, you would start your NestJS backend here
    // For now, we'll simulate backend initialization
    console.log('✅ Backend services initialized in Electron')
    
    // TODO: Initialize SQLite database and NestJS backend
    // const { bootstrap } = require('../backend/main')
    // await bootstrap()
  } catch (error) {
    console.error('❌ Failed to initialize backend:', error)
  }
}

function createWindow() {
  // Create the browser window
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.cjs')
    },
    // icon: path.join(__dirname, 'assets/icon.png'), // Add app icon when available
    show: false // Don't show until ready
  })

  // Load the app
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    
    // Focus on window (in case user opened a second window)
    if (isDev) {
      mainWindow.focus()
    }
  })
}

// This method will be called when Electron has finished initialization
app.whenReady().then(async () => {
  await initializeBackend()
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, url) => {
    event.preventDefault()
  })
})