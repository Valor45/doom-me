const { contextBridge, ipcRenderer } = require('electron');

// Exposing safe functions to renderer
contextBridge.exposeInMainWorld('electronAPI', {
  sendLogin: (user, pass, key) => ipcRenderer.send('login', { user, pass, key }),
  onLoginResult: (callback) => ipcRenderer.on('login-result', callback),
  installSoftware: (name) => ipcRenderer.send('install-software', name),
  applyToggle: (toggleName, state) => ipcRenderer.send('apply-toggle', { toggleName, state }),
  sendRestorePoint: () => ipcRenderer.invoke('create-restore-point'),
  runBenchmark: () => ipcRenderer.invoke('run-benchmark'),
  getLogs: () => ipcRenderer.invoke('get-logs'),
  getKeyStatus: () => ipcRenderer.invoke('get-key-status'),
  onSystemInfo: (callback) => ipcRenderer.on('system-info', callback),
  onUsageUpdate: (callback) => ipcRenderer.on('usage-update', callback),
});
