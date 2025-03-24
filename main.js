const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

// Create the main window
function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: true, // For demonstration (security risk in production)
      contextIsolation: false
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));
}

// Handle software installation prompts (Install games and software)
function installSoftware(softwareName) {
  // Logic to download and extract the selected software
  console.log(`Installing ${softwareName}...`);
  // For now, just an alert
  dialog.showMessageBox({
    message: `${softwareName} installer is starting...`
  });
}

// Handle system logs and display
function logAction(action) {
  const logFilePath = path.join(__dirname, 'actions.log');
  const logMessage = `${new Date().toISOString()} - ${action}\n`;
  fs.appendFileSync(logFilePath, logMessage, 'utf8');
}

// Check for system info (cpu, gpu, ram usage)
const si = require('systeminformation');

async function checkSystemInfo() {
  const cpu = await si.cpu();
  const gpu = await si.graphics();
  const ram = await si.mem();

  return { cpu: cpu.manufacturer + " " + cpu.brand, gpu: gpu.controllers[0]?.model || 'Not detected', ram: ram.total };
}

app.whenReady().then(() => {
  createWindow();

  // Log when the app starts
  logAction('App started');

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
const { exec } = require('child_process');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

// Function to download and install software
async function downloadAndInstall(url, destPath) {
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(destPath);
  res.body.pipe(fileStream);

  fileStream.on('finish', () => {
    exec(`start "" "${destPath}"`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error executing installer: ${err}`);
      } else {
        console.log('Software installed successfully:', stdout);
      }
    });
  });
}

// Software URLs
const softwareLinks = {
  malwarebytes: 'https://www.malwarebytes.com/download',
  adwcleaner: 'https://www.malwarebytes.com/adwcleaner',
  winrar: 'https://www.win-rar.com/start.html?&L=0',
  nvcleanstall: 'https://www.techpowerup.com/download/techpowerup-nvcleanstall/',
  // More software links go here
};

// Function to handle software installation
function installSoftware(softwareName) {
  const softwareUrl = softwareLinks[softwareName];
  if (softwareUrl) {
    const destPath = path.join(__dirname, `${softwareName}.exe`);
    downloadAndInstall(softwareUrl, destPath);
  } else {
    console.log('Software not found!');
  }
}

// Tweaks Logic (FPS, Network, Visual, Privacy, System)
function applyFpsTweaks() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error(err);
  });
}

function applyNetworkTweaks() {
  exec('netsh interface tcp set global autotuninglevel=disabled', (err, stdout, stderr) => {
    if (err) console.error(err);
  });
}

function applyVisualTweaks() {
  exec('reg add "HKCU\\Control Panel\\Desktop" /v "MenuShowDelay" /t REG_SZ /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error(err);
  });
}

function applyPrivacyTweaks() {
  exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender" /v "DisableAntiSpyware" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error(err);
  });
}

function applySystemTweaks() {
  exec('reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "ClearPageFileAtShutdown" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error(err);
  });
}
