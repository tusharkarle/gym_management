const { contextBridge, ipcRenderer } = require('electron')

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  openPath: (path) => ipcRenderer.invoke('dialog:openFile', path),
  // Add more secure API methods as needed
})