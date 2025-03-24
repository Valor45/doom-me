const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const fetch = require('node-fetch');
const si = require('systeminformation');

// Function to create the main window
function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: true, // For demonstration (security risk in production)
      contextIsolation: false,
    },
  });

  win.loadFile(path.join(__dirname, 'index.html'));
}

// Handle software installation prompts (Install games and software)
function installSoftware(softwareName) {
  console.log(`Installing ${softwareName}...`);
  dialog.showMessageBox({
    message: `${softwareName} installer is starting...`,
  });
}

// Handle system logs and display
function logAction(action) {
  const logFilePath = path.join(__dirname, 'actions.log');
  const logMessage = `${new Date().toISOString()} - ${action}\n`;
  fs.appendFileSync(logFilePath, logMessage, 'utf8');
}

// Check for system info (CPU, GPU, RAM usage)
async function checkSystemInfo() {
  const cpu = await si.cpu();
  const gpu = await si.graphics();
  const ram = await si.mem();

  return {
    cpu: cpu.manufacturer + ' ' + cpu.brand,
    gpu: gpu.controllers[0]?.model || 'Not detected',
    ram: ram.total,
  };
}

app.whenReady().then(() => {
  createWindow();
  logAction('App started');

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
// FPS Tweaks 1 - Remove unnecessary background processes for better FPS
function applyFpsBackgroundTweaks() {
  exec('sc stop "SysMain"', (err, stdout, stderr) => {
    if (err) console.error('Error stopping SysMain:', err);
  });
  exec('sc config "SysMain" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling SysMain:', err);
  });
}

// FPS Tweaks 2 - Game Mode (disable Windows Game Mode)
function applyGameModeTweaks() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Game Mode:', err);
  });
}

// FPS Tweaks 3 - Adjust CPU scheduling priority
function adjustCpuScheduling() {
  exec('bcdedit /set IncreaseUserVa 4000', (err, stdout, stderr) => {
    if (err) console.error('Error adjusting CPU scheduling:', err);
  });
}

// FPS Tweaks 4 - Reduce visual effects for better FPS
function applyVisualEffectTweaks() {
  exec('reg add "HKCU\\Control Panel\\Desktop" /v "MenuShowDelay" /t REG_SZ /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling visual effects:', err);
  });
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "ShowSyncProviderNotifications" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling sync notifications:', err);
  });
}

// FPS Tweaks 5 - Disable Game DVR
function disableGameDvr() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Game DVR:', err);
  });
}
// Network Tweaks 1 - Disable Windows auto-tuning
function applyAutoTuning() {
  exec('netsh interface tcp set global autotuninglevel=disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling auto-tuning:', err);
  });
}

// Network Tweaks 2 - Disable IPv6
function disableIPv6() {
  exec('netsh interface ipv6 set state disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling IPv6:', err);
  });
}

// Network Tweaks 3 - Set maximum connections per server
function setMaxConnections() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v "MaxConnectionsPerServer" /t REG_DWORD /d 16 /f', (err, stdout, stderr) => {
    if (err) console.error('Error setting max connections:', err);
  });
}

// Network Tweaks 4 - Flush DNS cache on startup
function flushDnsCache() {
  exec('ipconfig /flushdns', (err, stdout, stderr) => {
    if (err) console.error('Error flushing DNS cache:', err);
  });
}

// Network Tweaks 5 - Disable Windows DNS caching
function disableDnsCaching() {
  exec('sc stop Dnscache', (err, stdout, stderr) => {
    if (err) console.error('Error stopping DNS cache service:', err);
  });
  exec('sc config Dnscache start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling DNS cache service:', err);
  });
}
// Visual Tweaks 1 - Disable visual effects for faster performance
function disableVisualEffects() {
  exec('reg add "HKCU\\Control Panel\\Desktop" /v "MenuShowDelay" /t REG_SZ /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling visual effects:', err);
  });
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "ShowTaskViewButton" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Task View Button:', err);
  });
}

// Visual Tweaks 2 - Disable Cortana
function disableCortana() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Search" /v "CortanaEnabled" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Cortana:', err);
  });
}

// Visual Tweaks 3 - Hide file extensions
function hideFileExtensions() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "HideFileExt" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error hiding file extensions:', err);
  });
}

// Visual Tweaks 4 - Show hidden files
function showHiddenFiles() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "Hidden" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error showing hidden files:', err);
  });
}

// Visual Tweaks 5 - Remove taskbar transparency
function removeTaskbarTransparency() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v "EnableTransparency" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error removing taskbar transparency:', err);
  });
}
// Privacy Tweaks 1 - Disable Windows telemetry
function disableTelemetry() {
  exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling telemetry:', err);
  });
}

// Privacy Tweaks 2 - Disable Windows Update telemetry
function disableUpdateTelemetry() {
  exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v "DisableAutomaticRestartSignOn" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling update telemetry:', err);
  });
}

// Privacy Tweaks 3 - Remove Cortana data collection
function removeCortanaDataCollection() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Search" /v "AllowCortana" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error removing Cortana data collection:', err);
  });
}

// Privacy Tweaks 4 - Disable SmartScreen
function disableSmartScreen() {
  exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v "EnableSmartScreen" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling SmartScreen:', err);
  });
}

// Privacy Tweaks 5 - Disable app tracking
function disableAppTracking() {
  exec('reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo" /v "Enabled" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling app tracking:', err);
  });
}
// System Tweaks 1 - Disable unnecessary services
function disableUnnecessaryServices() {
  const services = [
    'SysMain', 'WMPNetworkSvc', 'WerSvc', 'Diagnosticshub', 'MicrosoftEdge', 'OneDrive'
  ];
  
  services.forEach(service => {
    exec(`sc stop ${service}`, (err, stdout, stderr) => {
      if (err) console.error(`Error stopping service ${service}:`, err);
    });
    exec(`sc config ${service} start= disabled`, (err, stdout, stderr) => {
      if (err) console.error(`Error disabling service ${service}:`, err);
    });
  });
}

// System Tweaks 2 - Clear temp and prefetch files
function cleanTempFiles() {
  exec('RD /S /Q %temp%', (err, stdout, stderr) => {
    if (err) console.error('Error cleaning temp files:', err);
  });
  exec('RD /S /Q C:\\Windows\\Temp', (err, stdout, stderr) => {
    if (err) console.error('Error cleaning Windows temp files:', err);
  });
  exec('del /f /q C:\\Windows\\Prefetch\\*', (err, stdout, stderr) => {
    if (err) console.error('Error cleaning prefetch files:', err);
  });
}

// System Tweaks 3 - Disable unnecessary startup programs
function disableStartupPrograms() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "OneDrive" /t REG_SZ /d "" /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling OneDrive startup:', err);
  });
}
// Network Tweaks 6 - Set max connections per 1.0 server
function setMaxConnectionsPerServer() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v "MaxConnectionsPer1_0Server" /t REG_DWORD /d 16 /f', (err, stdout, stderr) => {
    if (err) console.error('Error setting max connections per server:', err);
  });
}

// Network Tweaks 7 - Set max connections per server (new method)
function setMaxConnections() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v "MaxConnectionsPerServer" /t REG_DWORD /d 16 /f', (err, stdout, stderr) => {
    if (err) console.error('Error setting max connections:', err);
  });
}

// Disable Telemetry - Disable data collection
function disableTelemetryDataCollection() {
  exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling telemetry data collection:', err);
  });
}

// Disable System Diagnostics
function disableSystemDiagnostics() {
  exec('sc stop "DiagTrack"', (err, stdout, stderr) => {
    if (err) console.error('Error disabling diagnostics:', err);
  });
  exec('sc config "DiagTrack" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling system diagnostics:', err);
  });
}

// Disable Bloatware - Remove unwanted Windows apps
function removeWindowsBloatware() {
  exec('powershell "Get-AppxPackage *Xbox* | Remove-AppxPackage"', (err, stdout, stderr) => {
    if (err) console.error('Error removing Xbox app:', err);
  });
  exec('powershell "Get-AppxPackage *OneDrive* | Remove-AppxPackage"', (err, stdout, stderr) => {
    if (err) console.error('Error removing OneDrive app:', err);
  });
  exec('powershell "Get-AppxPackage *Skype* | Remove-AppxPackage"', (err, stdout, stderr) => {
    if (err) console.error('Error removing Skype app:', err);
  });
}
// PowerShell Tweaks - Adjust settings for improved performance
function runPowerShellTweaks() {
  exec('powershell Set-ExecutionPolicy RemoteSigned -Scope Process', (err, stdout, stderr) => {
    if (err) console.error('Error running PowerShell tweaks:', err);
  });
  exec('powershell Disable-MMAgent -MemoryCompression', (err, stdout, stderr) => {
    if (err) console.error('Error disabling memory compression:', err);
  });
  exec('powershell Disable-MMAgent -PageCombining', (err, stdout, stderr) => {
    if (err) console.error('Error disabling page combining:', err);
  });
}

// Game Launcher Tweaks 1 - Launch Steam
function launchSteam() {
  exec('start "" "C:\\Program Files (x86)\\Steam\\steam.exe"', (err, stdout, stderr) => {
    if (err) console.error('Error launching Steam:', err);
  });
}

// Game Launcher Tweaks 2 - Launch Epic Games
function launchEpicGames() {
  exec('start "" "C:\\Program Files\\Epic Games\\Launcher\\Portal\\Binaries\\Win64\\EpicGamesLauncher.exe"', (err, stdout, stderr) => {
    if (err) console.error('Error launching Epic Games:', err);
  });
}

// Game Launcher Tweaks 3 - Launch Battle.net
function launchBattleNet() {
  exec('start "" "C:\\Program Files (x86)\\Battle.net\\Battle.net Launcher.exe"', (err, stdout, stderr) => {
    if (err) console.error('Error launching Battle.net:', err);
  });
}

// Game Launcher Tweaks 4 - Launch Roblox
function launchRoblox() {
  exec('start "" "C:\\Users\\%USERNAME%\\AppData\\Local\\Roblox\\Versions\\version-7e02fce631784a05\\RobloxPlayerLauncher.exe"', (err, stdout, stderr) => {
    if (err) console.error('Error launching Roblox:', err);
  });
}
// Set Google Chrome as the default browser
function setChromeAsDefault() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\FileExts\\.htm\\UserChoice" /v Progid /t REG_SZ /d "ChromeHTML" /f', (err, stdout, stderr) => {
    if (err) console.error('Error setting Chrome as default browser for .htm:', err);
  });
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\FileExts\\.html\\UserChoice" /v Progid /t REG_SZ /d "ChromeHTML" /f', (err, stdout, stderr) => {
    if (err) console.error('Error setting Chrome as default browser for .html:', err);
  });
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\FileExts\\.pdf\\UserChoice" /v Progid /t REG_SZ /d "ChromeHTML" /f', (err, stdout, stderr) => {
    if (err) console.error('Error setting Chrome as default browser for .pdf:', err);
  });
}

// Disable unwanted background apps (e.g., OneDrive, Skype, etc.)
function disableBackgroundApps() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "DisableBackgroundApps" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling background apps:', err);
  });
}

// Disable Windows Search indexing
function disableSearchIndexing() {
  exec('sc stop "WSearch"', (err, stdout, stderr) => {
    if (err) console.error('Error stopping Windows Search service:', err);
  });
  exec('sc config "WSearch" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Windows Search service:', err);
  });
}

// Remove unnecessary registry keys for optimization
function removeUnnecessaryRegistryKeys() {
  exec('reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\RunMRU" /f', (err, stdout, stderr) => {
    if (err) console.error('Error removing MRU registry key:', err);
  });
  exec('reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\RecentDocs" /f', (err, stdout, stderr) => {
    if (err) console.error('Error removing RecentDocs registry key:', err);
  });
  exec('reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced\\Start_TrackProgs" /f', (err, stdout, stderr) => {
    if (err) console.error('Error removing Start_TrackProgs registry key:', err);
  });
}
// Run all tweaks on startup
function runAllTweaks() {
  applyFpsTweaks();
  applyNetworkTweaks();
  applySystemTweaks();
  applyPowerPlanTweaks();
  applyVisualTweaks();
  applyPrivacyTweaks();
  applyGameModeTweaks();
  applyFpsBackgroundTweaks();
  launchGameLauncher('steam');  // Example: Launch Steam
  setChromeAsDefault();  // Set Chrome as the default browser
  disableTelemetryDataCollection();
  disableSystemDiagnostics();
  removeWindowsBloatware();
  disableSearchIndexing();
  disableBackgroundApps();
  disableScheduledTasks();
  disableUac();
  console.log("All tweaks have been applied.");
}

// Initialize all tweaks and configurations
app.whenReady().then(() => {
  runAllTweaks();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
// Network Tweaks 8 - Disable DNS cache and reset
function disableDnsCache() {
  exec('sc stop Dnscache', (err, stdout, stderr) => {
    if (err) console.error('Error stopping DNS cache service:', err);
  });
  exec('sc config Dnscache start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling DNS cache service:', err);
  });
  exec('ipconfig /flushdns', (err, stdout, stderr) => {
    if (err) console.error('Error flushing DNS:', err);
  });
}

// Visual Tweaks 6 - Disable the lock screen background and other animations
function disableLockScreenBackground() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Lock Screen" /v "SlideshowEnabled" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling lock screen slideshow:', err);
  });
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "DisableAnimations" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling animations:', err);
  });
}

// PowerShell Tweaks 2 - Disable memory compression and page combining
function runMemoryOptimizations() {
  exec('powershell Disable-MMAgent -MemoryCompression', (err, stdout, stderr) => {
    if (err) console.error('Error disabling memory compression:', err);
  });
  exec('powershell Disable-MMAgent -PageCombining', (err, stdout, stderr) => {
    if (err) console.error('Error disabling page combining:', err);
  });
}

// Game Launcher Tweaks 5 - Launch Ubisoft Connect
function launchUbisoftConnect() {
  exec('start "" "C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\upc.exe"', (err, stdout, stderr) => {
    if (err) console.error('Error launching Ubisoft Connect:', err);
  });
}

// System Tweaks 4 - Disable User Account Control (UAC)
function disableUacForSystem() {
  exec('reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v "EnableLUA" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling UAC for system:', err);
  });
  exec('reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v "PromptOnSecureDesktop" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling UAC prompt on secure desktop:', err);
  });
}
// Disable unnecessary background tasks for performance
function disableBackgroundTasks() {
  exec('sc stop "XblGameSave"', (err, stdout, stderr) => {
    if (err) console.error('Error stopping XblGameSave service:', err);
  });
  exec('sc config "XblGameSave" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling XblGameSave service:', err);
  });

  exec('sc stop "XblAuthManager"', (err, stdout, stderr) => {
    if (err) console.error('Error stopping XblAuthManager service:', err);
  });
  exec('sc config "XblAuthManager" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling XblAuthManager service:', err);
  });

  exec('sc stop "XboxGipSvc"', (err, stdout, stderr) => {
    if (err) console.error('Error stopping XboxGipSvc service:', err);
  });
  exec('sc config "XboxGipSvc" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling XboxGipSvc service:', err);
  });
}
// Game Launcher Tweaks 6 - Launch Roblox
function launchRoblox() {
  exec('start "" "C:\\Users\\%USERNAME%\\AppData\\Local\\Roblox\\Versions\\version-7e02fce631784a05\\RobloxPlayerLauncher.exe"', (err, stdout, stderr) => {
    if (err) console.error('Error launching Roblox:', err);
  });
}

// System Tweaks 5 - Disable indexing services for better performance
function disableIndexingService() {
  exec('sc stop "WSearch"', (err, stdout, stderr) => {
    if (err) console.error('Error stopping indexing service:', err);
  });
  exec('sc config "WSearch" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling indexing service:', err);
  });
}

// Misc Tweaks 1 - Disable Windows Defender
function disableDefender() {
  exec('sc stop "WinDefend"', (err, stdout, stderr) => {
    if (err) console.error('Error stopping Windows Defender service:', err);
  });
  exec('sc config "WinDefend" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Windows Defender service:', err);
  });
}

// Disable Windows Defender sample submission
function disableDefenderSampleSubmission() {
  exec('reg add "HKLM\\SOFTWARE\\Microsoft\\Windows Defender\\Spynet" /v "SpyNetReporting" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Windows Defender sample submission:', err);
  });
}
// Disable unnecessary services for better performance
function disableUnnecessaryServices() {
  const services = [
    'OneDrive', 'Skype', 'WMPNetworkSvc', 'WerSvc', 'SysMain', 'XblGameSave', 'XblAuthManager', 'XboxGipSvc'
  ];

  services.forEach((service) => {
    exec(`sc stop ${service}`, (err, stdout, stderr) => {
      if (err) console.error(`Error stopping service ${service}:`, err);
    });
    exec(`sc config ${service} start= disabled`, (err, stdout, stderr) => {
      if (err) console.error(`Error disabling service ${service}:`, err);
    });
  });
}
// Final Tweaks - Remove unnecessary apps and cleanup system
function removeUnwantedApps() {
  exec('powershell "Get-AppxPackage *Xbox* | Remove-AppxPackage"', (err, stdout, stderr) => {
    if (err) console.error('Error removing Xbox app:', err);
  });
  exec('powershell "Get-AppxPackage *OneDrive* | Remove-AppxPackage"', (err, stdout, stderr) => {
    if (err) console.error('Error removing OneDrive app:', err);
  });
  exec('powershell "Get-AppxPackage *Skype* | Remove-AppxPackage"', (err, stdout, stderr) => {
    if (err) console.error('Error removing Skype app:', err);
  });
}

// Apply all tweaks when the app starts
function applyAllTweaks() {
  applyFpsTweaks();
  applyNetworkTweaks();
  applySystemTweaks();
  applyPowerPlanTweaks();
  applyVisualTweaks();
  applyPrivacyTweaks();
  disableUnwantedServices();
  removeUnwantedApps();
  disableTelemetryDataCollection();
  console.log('All tweaks applied successfully.');
}

app.whenReady().then(() => {
  applyAllTweaks();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const unzipper = require('unzipper');

// Function to download and install game launchers (Steam, Epic, etc.)
async function downloadAndInstallGameLauncher(launcherName, downloadUrl, installPath) {
  const tempPath = path.join(__dirname, `${launcherName}.zip`);

  // Download the launcher
  const res = await fetch(downloadUrl);
  const fileStream = fs.createWriteStream(tempPath);
  res.body.pipe(fileStream);

  fileStream.on('finish', () => {
    // Extract the downloaded file (assuming it's a ZIP file)
    fs.createReadStream(tempPath)
      .pipe(unzipper.Extract({ path: installPath }))
      .on('close', () => {
        console.log(`${launcherName} installed and extracted to ${installPath}`);

        // After extracting, delete the zip file
        fs.unlinkSync(tempPath);

        // Launch the game launcher (e.g., Steam, Epic)
        launchGameLauncher(launcherName);
      });
  });
}

// Example for installing Steam
function installSteam() {
  const steamDownloadUrl = 'https://steamcdn-a.akamaihd.net/client/installer/SteamSetup.exe';
  const steamInstallPath = path.join(__dirname, 'Steam');

  downloadAndInstallGameLauncher('steam', steamDownloadUrl, steamInstallPath);
}

// Example for installing Epic Games
function installEpicGames() {
  const epicDownloadUrl = 'https://download.epicgames.com/installer/EpicInstallerSetup.msi';
  const epicInstallPath = path.join(__dirname, 'EpicGames');

  downloadAndInstallGameLauncher('epic', epicDownloadUrl, epicInstallPath);
}

// Example for installing Ubisoft Connect
function installUbisoftConnect() {
  const ubisoftDownloadUrl = 'https://ubistatic3-a.akamaihd.net/installer/UbisoftInstaller.exe';
  const ubisoftInstallPath = path.join(__dirname, 'UbisoftConnect');

  downloadAndInstallGameLauncher('ubisoft', ubisoftDownloadUrl, ubisoftInstallPath);
}
// PowerShell Tweaks - Install and Extract
function runPowerShellTweaks() {
  exec('powershell Set-ExecutionPolicy RemoteSigned -Scope Process', (err, stdout, stderr) => {
    if (err) console.error('Error running PowerShell tweaks:', err);
  });
  exec('powershell Disable-MMAgent -MemoryCompression', (err, stdout, stderr) => {
    if (err) console.error('Error disabling memory compression:', err);
  });
  exec('powershell Disable-MMAgent -PageCombining', (err, stdout, stderr) => {
    if (err) console.error('Error disabling page combining:', err);
  });
}

// Game Launchers - Install and Launch
function launchSteam() {
  const steamPath = 'C:\\Program Files (x86)\\Steam\\steam.exe';
  exec(`start "" "${steamPath}"`, (err, stdout, stderr) => {
    if (err) console.error('Error launching Steam:', err);
  });
}

function launchEpicGames() {
  const epicPath = 'C:\\Program Files\\Epic Games\\Launcher\\Portal\\Binaries\\Win64\\EpicGamesLauncher.exe';
  exec(`start "" "${epicPath}"`, (err, stdout, stderr) => {
    if (err) console.error('Error launching Epic Games:', err);
  });
}

function launchUbisoft() {
  const ubisoftPath = 'C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\upc.exe';
  exec(`start "" "${ubisoftPath}"`, (err, stdout, stderr) => {
    if (err) console.error('Error launching Ubisoft Connect:', err);
  });
}

// Additional Game Launcher Tweaks
function installGameLauncher(launcherName) {
  switch (launcherName) {
    case 'steam':
      installSteam();
      break;
    case 'epic':
      installEpicGames();
      break;
    case 'ubisoft':
      installUbisoftConnect();
      break;
    default:
      console.log(`Unsupported game launcher: ${launcherName}`);
  }
}
// Power Plan Tweaks (Ultimate Performance)
function applyUltimatePowerPlan() {
  exec(
    'powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61 11111111-1111-1111-1111-111111111111',
    (err, stdout, stderr) => {
      if (err) console.error('Error applying power plan:', err);
    }
  );
  exec('powercfg -setactive 11111111-1111-1111-1111-111111111111', (err, stdout, stderr) => {
    if (err) console.error('Error setting power plan active:', err);
  });
}

// Remove unnecessary apps and bloatware
function removeWindowsBloatware() {
  exec('powershell "Get-AppxPackage *Xbox* | Remove-AppxPackage"', (err, stdout, stderr) => {
    if (err) console.error('Error removing Xbox app:', err);
  });
  exec('powershell "Get-AppxPackage *OneDrive* | Remove-AppxPackage"', (err, stdout, stderr) => {
    if (err) console.error('Error removing OneDrive app:', err);
  });
  exec('powershell "Get-AppxPackage *Skype* | Remove-AppxPackage"', (err, stdout, stderr) => {
    if (err) console.error('Error removing Skype app:', err);
  });
}
// Disable Windows Defender
function disableDefender() {
  exec('sc stop "WinDefend"', (err, stdout, stderr) => {
    if (err) console.error('Error stopping Windows Defender service:', err);
  });
  exec('sc config "WinDefend" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Windows Defender service:', err);
  });
}

// Cleanup unnecessary files and services
function cleanupSystem() {
  exec('RD /S /Q %temp%', (err, stdout, stderr) => {
    if (err) console.error('Error cleaning temp files:', err);
  });
  exec('RD /S /Q C:\\Windows\\Temp', (err, stdout, stderr) => {
    if (err) console.error('Error cleaning Windows temp files:', err);
  });
  exec('del /f /q C:\\Windows\\Prefetch\\*', (err, stdout, stderr) => {
    if (err) console.error('Error cleaning prefetch files:', err);
  });
}

// Apply all tweaks and launch game launchers
function applyAllTweaks() {
  applyFpsTweaks();
  applyNetworkTweaks();
  applySystemTweaks();
  applyPowerPlanTweaks();
  applyVisualTweaks();
  applyPrivacyTweaks();
  disableUnwantedServices();
  removeUnwantedApps();
  disableTelemetryDataCollection();
  removeWindowsBloatware();
  cleanupSystem();
  installGameLauncher('steam');
  installGameLauncher('epic');
  installGameLauncher('ubisoft');
  console.log('All tweaks and optimizations applied.');
}

// Initialize all tweaks when the app is ready
app.whenReady().then(() => {
  applyAllTweaks();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
// Game Launcher Tweaks 7 - Launch GOG Galaxy
function launchGogGalaxy() {
  exec('start "" "C:\\Program Files (x86)\\GOG Galaxy\\GalaxyClient.exe"', (err, stdout, stderr) => {
    if (err) console.error('Error launching GOG Galaxy:', err);
  });
}

// Game Launcher Tweaks 8 - Launch Origin (EA)
function launchOrigin() {
  exec('start "" "C:\\Program Files (x86)\\Origin\\Origin.exe"', (err, stdout, stderr) => {
    if (err) console.error('Error launching Origin:', err);
  });
}

// Game Launcher Tweaks 9 - Launch Discord (for Discord games)
function launchDiscord() {
  exec('start "" "C:\\Users\\%USERNAME%\\AppData\\Local\\Discord\\app-1.0.9001\\Discord.exe"', (err, stdout, stderr) => {
    if (err) console.error('Error launching Discord:', err);
  });
}

// Game Launcher Tweaks 10 - Launch Wargaming.net Launcher
function launchWargaming() {
  exec('start "" "C:\\Program Files (x86)\\Wargaming.net\\Game Center\\GameCenter.exe"', (err, stdout, stderr) => {
    if (err) console.error('Error launching Wargaming.net:', err);
  });
}

// Example of installing and launching additional game launchers
function installAndLaunchGames() {
  installGameLauncher('steam');
  installGameLauncher('epic');
  installGameLauncher('ubisoft');
  installGameLauncher('gog'); // GOG Galaxy
  installGameLauncher('origin'); // Origin (EA)
  installGameLauncher('discord'); // Discord
  installGameLauncher('wargaming'); // Wargaming.net Launcher
}
// System Tweaks 6 - Disable background apps for better performance
function disableBackgroundApps() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "DisableBackgroundApps" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling background apps:', err);
  });
}

// Disable unnecessary services for better performance
function disableUnnecessaryServices() {
  const services = [
    'SysMain', 'WMPNetworkSvc', 'WerSvc', 'Diagnosticshub', 'MicrosoftEdge', 'OneDrive'
  ];

  services.forEach(service => {
    exec(`sc stop ${service}`, (err, stdout, stderr) => {
      if (err) console.error(`Error stopping service ${service}:`, err);
    });
    exec(`sc config ${service} start= disabled`, (err, stdout, stderr) => {
      if (err) console.error(`Error disabling service ${service}:`, err);
    });
  });
}

// Remove unnecessary startup programs (like OneDrive)
function removeStartupPrograms() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "OneDrive" /t REG_SZ /d "" /f', (err, stdout, stderr) => {
    if (err) console.error('Error removing OneDrive from startup:', err);
  });
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "Skype" /t REG_SZ /d "" /f', (err, stdout, stderr) => {
    if (err) console.error('Error removing Skype from startup:', err);
  });
}

// Disable Windows Update and Telemetry Services for better privacy
function disableWindowsUpdateAndTelemetry() {
  exec('sc stop wuauserv', (err, stdout, stderr) => {
    if (err) console.error('Error stopping Windows Update service:', err);
  });
  exec('sc config wuauserv start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Windows Update service:', err);
  });

  exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling telemetry:', err);
  });
}
// Remove Windows Bloatware (OneDrive, Xbox, Skype, etc.)
function removeBloatware() {
  exec('powershell "Get-AppxPackage *Xbox* | Remove-AppxPackage"', (err, stdout, stderr) => {
    if (err) console.error('Error removing Xbox:', err);
  });
  exec('powershell "Get-AppxPackage *OneDrive* | Remove-AppxPackage"', (err, stdout, stderr) => {
    if (err) console.error('Error removing OneDrive:', err);
  });
  exec('powershell "Get-AppxPackage *Skype* | Remove-AppxPackage"', (err, stdout, stderr) => {
    if (err) console.error('Error removing Skype:', err);
  });
}

// Clear system temporary files for better performance
function clearSystemTempFiles() {
  exec('RD /S /Q %temp%', (err, stdout, stderr) => {
    if (err) console.error('Error clearing temp files:', err);
  });
  exec('RD /S /Q C:\\Windows\\Temp', (err, stdout, stderr) => {
    if (err) console.error('Error clearing Windows temp files:', err);
  });
  exec('del /f /q C:\\Windows\\Prefetch\\*', (err, stdout, stderr) => {
    if (err) console.error('Error clearing prefetch files:', err);
  });
}
// Disable unnecessary startup services
function disableStartupServices() {
  const services = [
    'SysMain', 'OneDrive', 'Skype', 'WMPNetworkSvc'
  ];

  services.forEach(service => {
    exec(`sc stop ${service}`, (err, stdout, stderr) => {
      if (err) console.error(`Error stopping service ${service}:`, err);
    });
    exec(`sc config ${service} start= disabled`, (err, stdout, stderr) => {
      if (err) console.error(`Error disabling service ${service}:`, err);
    });
  });
}

// Apply all optimizations and tweaks
function applyAllOptimizations() {
  applyFpsTweaks();
  applyNetworkTweaks();
  applySystemTweaks();
  applyPowerPlanTweaks();
  applyVisualTweaks();
  applyPrivacyTweaks();
  disableUnwantedServices();
  removeWindowsBloatware();
  clearSystemTempFiles();
  disableWindowsUpdateAndTelemetry();
  installAndLaunchGames();
  console.log("All optimizations have been applied successfully.");
}

app.whenReady().then(() => {
  applyAllOptimizations();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
// Software Tweaks 1 - Add more recommended software to the list
function installMoreSoftware() {
  // More software download links
  const softwareLinks = {
    malwarebytes: 'https://www.malwarebytes.com/download',
    adwcleaner: 'https://www.malwarebytes.com/adwcleaner',
    nvcleanstall: 'https://www.techpowerup.com/download/techpowerup-nvcleanstall/',
    winrar: 'https://www.win-rar.com/start.html?&L=0',
    parkcontrol: 'https://bitsum.com/parkcontrol/',
    ddu: 'https://www.guru3d.com/download/display-driver-uninstaller-download/',
    nvidiaApp: 'https://www.nvidia.com/en-us/software/nvidia-app/',
  };

  // Install software from the list
  Object.entries(softwareLinks).forEach(([name, url]) => {
    installSoftware(name, url);
  });
}

// Privacy Tweaks 6 - Disable Windows tracking
function disableWindowsTracking() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo" /v "Enabled" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Windows tracking:', err);
  });
}

// System Tweaks 7 - Disable automatic restart on system crash
function disableAutoRestartOnCrash() {
  exec('reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\CrashControl" /v "AutoReboot" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling auto-reboot on system crash:', err);
  });
}

// Remove Windows activation telemetry
function disableActivationTelemetry() {
  exec('reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v "ActivateWindows" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Windows activation telemetry:', err);
  });
}
// Network Tweaks 9 - Set maximum simultaneous connections
function setMaxSimultaneousConnections() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v "MaxConnectionsPer1_0Server" /t REG_DWORD /d 16 /f', (err, stdout, stderr) => {
    if (err) console.error('Error setting max connections:', err);
  });
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v "MaxConnectionsPerServer" /t REG_DWORD /d 16 /f', (err, stdout, stderr) => {
    if (err) console.error('Error setting max connections per server:', err);
  });
}

// Disable all unnecessary telemetry services
function disableTelemetryServices() {
  const services = [
    'DiagTrack', 'dmwappushservice', 'WindowsUpdate',
  ];

  services.forEach(service => {
    exec(`sc stop ${service}`, (err, stdout, stderr) => {
      if (err) console.error(`Error stopping service ${service}:`, err);
    });
    exec(`sc config ${service} start= disabled`, (err, stdout, stderr) => {
      if (err) console.error(`Error disabling service ${service}:`, err);
    });
  });
}

// Disable cloud-related services
function disableCloudServices() {
  exec('sc stop "PcaSvc"', (err, stdout, stderr) => {
    if (err) console.error('Error stopping PcaSvc:', err);
  });
  exec('sc config "PcaSvc" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling PcaSvc:', err);
  });
}
// Telemetry Tweaks - Disable Win10 telemetry and data collection
function disableTelemetry() {
  exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling telemetry:', err);
  });
  exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v "EnableLUA" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling UAC (User Account Control):', err);
  });
}

// Disable SmartScreen in Windows
function disableSmartScreen() {
  exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v "EnableSmartScreen" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling SmartScreen:', err);
  });
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "EnableSmartScreen" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling SmartScreen for current user:', err);
  });
}
// Game Launcher Tweaks 11 - Install and Launch GOG
function installAndLaunchGog() {
  const gogDownloadUrl = 'https://download.gog.com/installer/GOG_Galaxy_Setup.exe';
  const gogInstallPath = path.join(__dirname, 'GOG');

  downloadAndInstallGameLauncher('gog', gogDownloadUrl, gogInstallPath);
}

// Finalize system tweaks and optimizations
function applyFinalTweaks() {
  disableUnwantedServices();
  removeWindowsBloatware();
  cleanSystemTempFiles();
  disableTelemetry();
  applyUltimatePowerPlan();
  installAndLaunchGames();  // Install Steam, Epic, Ubisoft, etc.
  console.log('Final tweaks and optimizations applied.');
}

// Initialize final tweaks and system optimizations on app startup
app.whenReady().then(() => {
  applyFinalTweaks();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
// Perform system clean-up, disable unnecessary services and apps
function performSystemCleanup() {
  exec('RD /S /Q %temp%', (err, stdout, stderr) => {
    if (err) console.error('Error cleaning temp files:', err);
  });
  exec('RD /S /Q C:\\Windows\\Temp', (err, stdout, stderr) => {
    if (err) console.error('Error cleaning Windows temp files:', err);
  });
  exec('del /f /q C:\\Windows\\Prefetch\\*', (err, stdout, stderr) => {
    if (err) console.error('Error cleaning prefetch files:', err);
  });
}

// Run all tweaks and optimizations
function runAllOptimizations() {
  applyFpsTweaks();
  applyNetworkTweaks();
  applySystemTweaks();
  applyPowerPlanTweaks();
  applyVisualTweaks();
  applyPrivacyTweaks();
  disableUnwantedServices();
  removeUnwantedApps();
  disableTelemetryDataCollection();
  removeWindowsBloatware();
  cleanupSystem();
  installGameLauncher('steam');
  installGameLauncher('epic');
  installGameLauncher('ubisoft');
  console.log('All tweaks have been applied.');
}
// Apply final optimizations and settings
function applyFinalOptimizations() {
  disableTelemetry();
  disableUacForSystem();
  disableIndexingService();
  disableWindowsUpdateAndTelemetry();
  disableSmartScreen();
  installGameLauncher('steam');
  installGameLauncher('epic');
  installGameLauncher('discord');
  installGameLauncher('gog');
  console.log('Final optimizations applied.');
}

// Initialize everything when the app is ready
app.whenReady().then(() => {
  applyFinalOptimizations();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
// Final system optimizations 1 - Disable hibernation and swap file
function disableHibernation() {
  exec('powercfg /hibernate off', (err, stdout, stderr) => {
    if (err) console.error('Error disabling hibernation:', err);
  });
  exec('reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "DisablePagingExecutive" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling paging executive:', err);
  });
}

// Final system optimizations 2 - Disable virtual memory and increase RAM usage
function optimizeMemoryUsage() {
  exec('reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "IoPageLockLimit" /t REG_DWORD /d 983040 /f', (err, stdout, stderr) => {
    if (err) console.error('Error optimizing memory usage:', err);
  });
  exec('reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "LargeSystemCache" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error enabling large system cache:', err);
  });
}

// Final system optimizations 3 - Optimize CPU performance
function optimizeCpuPerformance() {
  exec('bcdedit /set increaseuserva 4000', (err, stdout, stderr) => {
    if (err) console.error('Error optimizing CPU performance:', err);
  });
  exec('reg add "HKCU\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" /v "CPU Priority" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error optimizing CPU priority:', err);
  });
}
// Game Launcher 12 - Install and launch GOG Galaxy
function installGog() {
  const gogDownloadUrl = 'https://download.gog.com/installer/GOG_Galaxy_Setup.exe';
  const gogInstallPath = path.join(__dirname, 'GOG_Galaxy');
  
  downloadAndInstallGameLauncher('gog', gogDownloadUrl, gogInstallPath);
}

// Game Launcher 13 - Install and launch Epic Games
function installEpicGames() {
  const epicDownloadUrl = 'https://download.epicgames.com/installer/EpicInstallerSetup.msi';
  const epicInstallPath = path.join(__dirname, 'Epic_Games');
  
  downloadAndInstallGameLauncher('epic', epicDownloadUrl, epicInstallPath);
}

// Game Launcher 14 - Install and launch Origin (EA)
function installOrigin() {
  const originDownloadUrl = 'https://origin.com/download';
  const originInstallPath = path.join(__dirname, 'Origin');

  downloadAndInstallGameLauncher('origin', originDownloadUrl, originInstallPath);
}
// Game Tweaks - Optimize CPU and Graphics
function optimizeGraphicsAndCpu() {
  exec('reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl" /v "Win32PrioritySeparation" /t REG_DWORD /d 38 /f', (err, stdout, stderr) => {
    if (err) console.error('Error optimizing CPU and graphics performance:', err);
  });
  exec('reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers" /v "HwSchMode" /t REG_DWORD /d 2 /f', (err, stdout, stderr) => {
    if (err) console.error('Error optimizing graphics performance:', err);
  });
}

// Power Settings - Adjust processor power settings
function optimizeProcessorSettings() {
  exec('powercfg -setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMAX 100', (err, stdout, stderr) => {
    if (err) console.error('Error optimizing processor settings:', err);
  });
  exec('powercfg -setdcvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMAX 100', (err, stdout, stderr) => {
    if (err) console.error('Error optimizing processor settings (DC):', err);
  });
}
// Remove unnecessary apps and services
function cleanupSystemApps() {
  exec('powershell "Get-AppxPackage *OneDrive* | Remove-AppxPackage"', (err, stdout, stderr) => {
    if (err) console.error('Error removing OneDrive:', err);
  });
  exec('powershell "Get-AppxPackage *Skype* | Remove-AppxPackage"', (err, stdout, stderr) => {
    if (err) console.error('Error removing Skype:', err);
  });
  exec('powershell "Get-AppxPackage *MicrosoftOfficeHub* | Remove-AppxPackage"', (err, stdout, stderr) => {
    if (err) console.error('Error removing Office Hub:', err);
  });
}
// Clean up system (temporary files, cache, etc.)
function cleanupSystemFiles() {
  exec('RD /S /Q %temp%', (err, stdout, stderr) => {
    if (err) console.error('Error cleaning temp files:', err);
  });
  exec('RD /S /Q C:\\Windows\\Temp', (err, stdout, stderr) => {
    if (err) console.error('Error cleaning Windows temp files:', err);
  });
  exec('del /f /q C:\\Windows\\Prefetch\\*', (err, stdout, stderr) => {
    if (err) console.error('Error cleaning prefetch files:', err);
  });
}

// Apply all tweaks at once
function applyFinalOptimizations() {
  applyFpsTweaks();
  applyNetworkTweaks();
  applySystemTweaks();
  applyPowerPlanTweaks();
  applyVisualTweaks();
  applyPrivacyTweaks();
  installAndLaunchGames();  // Steam, Epic, Ubisoft, etc.
  cleanupSystemFiles();
  disableUnwantedServices();
  console.log('All optimizations and tweaks applied.');
}

app.whenReady().then(() => {
  applyFinalOptimizations();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
// Clean up unnecessary files
function cleanUnnecessaryFiles() {
  exec('RD /S /Q %temp%', (err, stdout, stderr) => {
    if (err) console.error('Error cleaning temp files:', err);
  });
  exec('RD /S /Q C:\\Windows\\Temp', (err, stdout, stderr) => {
    if (err) console.error('Error cleaning Windows temp files:', err);
  });
  exec('del /f /q C:\\Windows\\Prefetch\\*', (err, stdout, stderr) => {
    if (err) console.error('Error cleaning prefetch files:', err);
  });
  exec('del /f /q C:\\Users\\%USERNAME%\\AppData\\Local\\Temp\\*', (err, stdout, stderr) => {
    if (err) console.error('Error cleaning user temp files:', err);
  });
  exec('del /f /q C:\\Users\\%USERNAME%\\AppData\\Local\\Microsoft\\Windows\\WebCache\\*', (err, stdout, stderr) => {
    if (err) console.error('Error cleaning WebCache files:', err);
  });
}

// Final tweaks for user experience and system performance
function finalUserExperienceTweaks() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "HideFileExt" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error showing file extensions:', err);
  });
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "ShowTaskViewButton" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling task view button:', err);
  });
}

// Disable Cortana (Search bar removal)
function disableCortana() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Search" /v "CortanaEnabled" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Cortana:', err);
  });
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Search" /v "AllowSearchToUseLocation" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Cortana location services:', err);
  });
}

// Disable OneDrive
function disableOneDrive() {
  exec('sc stop OneDrive', (err, stdout, stderr) => {
    if (err) console.error('Error stopping OneDrive:', err);
  });
  exec('sc config OneDrive start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling OneDrive service:', err);
  });
}
// Apply all optimizations at once (final setup)
function applyAllFinalOptimizations() {
  applyFpsTweaks();
  applyNetworkTweaks();
  applySystemTweaks();
  applyPowerPlanTweaks();
  applyVisualTweaks();
  applyPrivacyTweaks();
  disableUnwantedServices();
  removeUnwantedApps();
  disableTelemetryDataCollection();
  removeWindowsBloatware();
  cleanSystemTempFiles();
  disableWindowsUpdateAndTelemetry();
  installAndLaunchGames();
  console.log('All final tweaks and optimizations have been applied.');
}

// Initialize everything when the app starts
app.whenReady().then(() => {
  applyAllFinalOptimizations();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
// Advanced Tweaks Section: Integrating batch files
function applyAdvancedTweaks() {
  // Batch File 1 - Boost Power Plan
  exec('start "" "Boostedplan.bat"', (err, stdout, stderr) => {
    if (err) console.error('Error applying Boosted Power Plan:', err);
  });

  // Batch File 2 - Clear System Files
  exec('start "" "cleaner.bat"', (err, stdout, stderr) => {
    if (err) console.error('Error running Cleaner batch:', err);
  });

  // Batch File 3 - Crazy Power Plan for Windows 10
  exec('start "" "CrazyPowerPlan.bat"', (err, stdout, stderr) => {
    if (err) console.error('Error applying Crazy Power Plan for Windows 10:', err);
  });

  // Batch File 4 - Crazy Power Plan for Windows 10 (v2)
  exec('start "" "CrazyPowerPlan2W10.bat"', (err, stdout, stderr) => {
    if (err) console.error('Error applying Crazy Power Plan for Windows 10 v2:', err);
  });

  // Batch File 5 - Disable Telemetry
  exec('start "" "Disable only Telemetry.bat"', (err, stdout, stderr) => {
    if (err) console.error('Error disabling telemetry:', err);
  });

  // Batch File 6 - Fast Tweaks for performance
  exec('start "" "Fast.bat"', (err, stdout, stderr) => {
    if (err) console.error('Error applying Fast tweaks:', err);
  });

  // Batch File 7 - Apply Gaming Tweaks
  exec('start "" "Gaming Tweaks.bat"', (err, stdout, stderr) => {
    if (err) console.error('Error applying Gaming Tweaks:', err);
  });

  // Batch File 8 - Network Tweaks for better performance
  exec('start "" "Networkstuff.bat"', (err, stdout, stderr) => {
    if (err) console.error('Error applying Network Tweaks:', err);
  });

  // Batch File 9 - Only Telemetry tweaks (for performance/optimization)
  exec('start "" "onlytelemetry.bat"', (err, stdout, stderr) => {
    if (err) console.error('Error applying Only Telemetry tweaks:', err);
  });

  // Batch File 10 - Performance Optimizations
  exec('start "" "Performance Tweaks.bat"', (err, stdout, stderr) => {
    if (err) console.error('Error applying Performance Tweaks:', err);
  });

  // Batch File 11 - Power Plan Fixes
  exec('start "" "Powerplan-fix.bat"', (err, stdout, stderr) => {
    if (err) console.error('Error applying Power Plan Fixes:', err);
  });

  // Batch File 12 - Remove Telemetry Tweaks
  exec('start "" "Remove Telemetry.bat"', (err, stdout, stderr) => {
    if (err) console.error('Error removing telemetry:', err);
  });

  // Batch File 13 - Remove Unwanted Windows Apps
  exec('start "" "Remove Windows apps.bat"', (err, stdout, stderr) => {
    if (err) console.error('Error removing unwanted Windows apps:', err);
  });

  // Batch File 14 - Power Plan Revision (advanced power settings)
  exec('start "" "RevisionPowerPlanV2.8.pow"', (err, stdout, stderr) => {
    if (err) console.error('Error applying Power Plan Revision:', err);
  });

  // Batch File 15 - Internet Tweaks
  exec('start "" "Tweak Internet.bat"', (err, stdout, stderr) => {
    if (err) console.error('Error applying Internet Tweaks:', err);
  });

  // Batch File 16 - Visual Optimizations
  exec('start "" "Visual Optimizations.bat"', (err, stdout, stderr) => {
    if (err) console.error('Error applying Visual Optimizations:', err);
  });

  // Batch File 17 - Windows Hardening Security Tweaks
  exec('start "" "Windows Hardening Security.bat"', (err, stdout, stderr) => {
    if (err) console.error('Error applying Windows Hardening Security:', err);
  });

  // Batch File 18 - Windows Update Tweaks
  exec('start "" "Windows Update.bat"', (err, stdout, stderr) => {
    if (err) console.error('Error applying Windows Update tweaks:', err);
  });
}
// Display a warning before applying advanced tweaks
function showAdvancedTweaksWarning() {
  dialog.showMessageBox({
    type: 'warning',
    title: 'Advanced Tweaks Warning',
    message: 'The following tweaks are powerful and may affect system performance. Are you sure you want to proceed?',
    buttons: ['Yes', 'No']
  }).then(result => {
    if (result.response === 0) {
      // User accepted the warning, apply the advanced tweaks
      applyAdvancedTweaks();
    } else {
      console.log('User declined the advanced tweaks.');
    }
  });
}
function applyBoostedPowerPlan() {
  exec('reg add "HKCU\\Control Panel\\Desktop" /v "MenuShowDelay" /t REG_SZ /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error applying Boosted Power Plan:', err);
  });
  exec('powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61 11111111-1111-1111-1111-111111111111', (err, stdout, stderr) => {
    if (err) console.error('Error applying boosted power plan:', err);
  });
  exec('powercfg -setactive 11111111-1111-1111-1111-111111111111', (err, stdout, stderr) => {
    if (err) console.error('Error setting boosted power plan active:', err);
  });
}
function cleanSystemFiles() {
  exec('RD /S /Q %temp%', (err, stdout, stderr) => {
    if (err) console.error('Error clearing temp files:', err);
  });
  exec('RD /S /Q C:\\Windows\\Temp', (err, stdout, stderr) => {
    if (err) console.error('Error cleaning Windows temp files:', err);
  });
  exec('del /f /q C:\\Windows\\Prefetch\\*', (err, stdout, stderr) => {
    if (err) console.error('Error cleaning prefetch files:', err);
  });
}
function applyCrazyPowerPlan() {
  exec('powercfg -duplicatescheme 381b4222-f694-41f0-9685-ff5bb260df2e 11111111-1111-1111-1111-111111111111', (err, stdout, stderr) => {
    if (err) console.error('Error applying Crazy Power Plan for Windows 10:', err);
  });
  exec('powercfg -setactive 11111111-1111-1111-1111-111111111111', (err, stdout, stderr) => {
    if (err) console.error('Error setting Crazy Power Plan active:', err);
  });
}
function disableOnlyTelemetry() {
  exec('reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling telemetry:', err);
  });
  exec('sc stop "DiagTrack"', (err, stdout, stderr) => {
    if (err) console.error('Error stopping DiagTrack service:', err);
  });
  exec('sc config "DiagTrack" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling DiagTrack service:', err);
  });
}
function applyGamingTweaks() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v "GPU Priority" /t REG_DWORD /d 8 /f', (err, stdout, stderr) => {
    if (err) console.error('Error applying Gaming Tweaks:', err);
  });
  exec('reg add "HKCU\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v "Priority" /t REG_DWORD /d 6 /f', (err, stdout, stderr) => {
    if (err) console.error('Error applying Gaming Tweaks priority:', err);
  });
}
function applyNetworkTweaks() {
  exec('netsh interface tcp set global autotuninglevel=disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling auto-tuning:', err);
  });
  exec('netsh interface ipv6 set state disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling IPv6:', err);
  });
}
function applyDisableTelemetryAndServices() {
  // Disable Telemetry and related services
  exec('sc stop SysMain && sc config SysMain start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error stopping SysMain:', err);
  });
  exec('reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\PrefetchParameters" /v "EnablePrefetcher" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Prefetcher:', err);
  });
  exec('reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\PrefetchParameters" /v "EnableSuperfetch" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Superfetch:', err);
  });
  exec('sc stop DiagTrack && sc config DiagTrack start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling DiagTrack service:', err);
  });
  exec('sc config "BITS" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling BITS:', err);
  });
  console.log('Telemetry and unnecessary system services have been disabled.');
}
function applyGamePerformanceTweaks() {
  // Disable Game DVR and Gaming Mode
  exec('reg add "HKCU\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v "GPU Priority" /t REG_DWORD /d 8 /f', (err, stdout, stderr) => {
    if (err) console.error('Error applying game GPU priority:', err);
  });
  exec('reg add "HKCU\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v "Priority" /t REG_DWORD /d 6 /f', (err, stdout, stderr) => {
    if (err) console.error('Error applying game priority:', err);
  });
  exec('reg add "HKCU\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v "Affinity" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error applying game affinity:', err);
  });
  console.log('Game performance tweaks applied.');
}
function fixTelemetryDataCollection() {
  // Disable Windows Data Collection & Telemetry
  exec('reg add "HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\CloudContent" /v DisableTailoredExperiencesWithDiagnosticData /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling tailored experiences:', err);
  });
  exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\CloudContent" /v DisableWindowsConsumerFeatures /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Windows consumer features:', err);
  });
  exec('reg add "HKLM\\SYSTE\\CurrentControlSet\\Services\\DPS" /v "Start" /t REG_dWORD /d 4 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Data Collection Service:', err);
  });
  console.log('Telemetry and data collection disabled.');
}
function applyNetworkOptimizations() {
  // Network optimizations to reduce delays
  exec('netsh interface tcp set global autotuninglevel=normal', (err, stdout, stderr) => {
    if (err) console.error('Error setting TCP autotuning:', err);
  });
  exec('netsh interface ipv6 set state disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling IPv6:', err);
  });
  exec('netsh interface ip delete arpcache', (err, stdout, stderr) => {
    if (err) console.error('Error clearing ARP cache:', err);
  });
  exec('ipconfig /flushdns', (err, stdout, stderr) => {
    if (err) console.error('Error flushing DNS cache:', err);
  });
  console.log('Network optimizations applied.');
}
function applyPowerPlanFixes() {
  // Apply Power Plan Fixes for maximum performance
  exec('powercfg -restoredefaultschemes', (err, stdout, stderr) => {
    if (err) console.error('Error restoring power plans:', err);
  });
  exec('powercfg -setactive 381b4222-f694-41f0-9685-ff5bb260df2e', (err, stdout, stderr) => {
    if (err) console.error('Error applying power plan:', err);
  });
  console.log('Power plan fixes applied for better performance.');
}
function applyBatchFileTweaks(batchFile) {
  // Executes batch files provided by the user
  exec(batchFile, (err, stdout, stderr) => {
    if (err) console.error('Error executing batch file:', err);
    else console.log(`Batch file ${batchFile} executed successfully.`);
  });
}
// PART 41: Continue with system optimizations and tweaks from batch files

// Disabling services
function disableServices() {
  exec('sc stop SysMain && sc config SysMain start=disabled', (err, stdout, stderr) => {
    if (err) {
      console.error("Error disabling SysMain:", err);
    } else {
      console.log("SysMain Disabled:", stdout);
    }
  });
  
  exec('sc stop Wuauserv && sc config Wuauserv start=disabled', (err, stdout, stderr) => {
    if (err) {
      console.error("Error disabling Windows Update service:", err);
    } else {
      console.log("Windows Update service Disabled:", stdout);
    }
  });

  exec('sc stop Superfetch && sc config Superfetch start=disabled', (err, stdout, stderr) => {
    if (err) {
      console.error("Error disabling Superfetch:", err);
    } else {
      console.log("Superfetch Disabled:", stdout);
    }
  });

  exec('sc stop BITS && sc config BITS start=disabled', (err, stdout, stderr) => {
    if (err) {
      console.error("Error disabling BITS:", err);
    } else {
      console.log("BITS Disabled:", stdout);
    }
  });
  
  // Further services can be added in a similar fashion...
}

// Disabling telemetry and other tracking features
function disableTelemetry() {
  exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\CloudContent" /v DisableTailoredExperiencesWithDiagnosticData /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) {
      console.error("Error disabling telemetry:", err);
    } else {
      console.log("Telemetry Disabled:", stdout);
    }
  });

  exec('sc stop DiagTrack && sc config DiagTrack start=disabled', (err, stdout, stderr) => {
    if (err) {
      console.error("Error stopping DiagTrack:", err);
    } else {
      console.log("DiagTrack Disabled:", stdout);
    }
  });

  exec('sc stop Dmwappushservice && sc config Dmwappushservice start=disabled', (err, stdout, stderr) => {
    if (err) {
      console.error("Error stopping Dmwappushservice:", err);
    } else {
      console.log("Dmwappushservice Disabled:", stdout);
    }
  });
  
  exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) {
      console.error("Error disabling telemetry services:", err);
    } else {
      console.log("Telemetry services Disabled:", stdout);
    }
  });
}

// Disable hibernation
function disableHibernation() {
  exec('powercfg /hibernate off', (err, stdout, stderr) => {
    if (err) {
      console.error("Error disabling hibernation:", err);
    } else {
      console.log("Hibernation Disabled:", stdout);
    }
  });
}

// Disable Superfetch
function disableSuperfetch() {
  exec('sc stop SysMain && sc config SysMain start=disabled', (err, stdout, stderr) => {
    if (err) {
      console.error("Error disabling SysMain:", err);
    } else {
      console.log("SysMain Disabled:", stdout);
    }
  });

  exec('sc stop Superfetch && sc config Superfetch start=disabled', (err, stdout, stderr) => {
    if (err) {
      console.error("Error disabling Superfetch:", err);
    } else {
      console.log("Superfetch Disabled:", stdout);
    }
  });
}

// Implement all tweaks at once
function applyAllTweaks() {
  disableServices();
  disableTelemetry();
  disableHibernation();
  disableSuperfetch();

  console.log("All tweaks applied successfully.");
}

applyAllTweaks(); // Call to apply all the tweaks
// Part 42: Game and system optimizations

// Disable unnecessary services
function disableServices() {
  const services = [
    "SysMain", "WMPNetworkSvc", "WerSvc", "XblAuthManager", "XblGameSave", "XboxGipSvc", 
    "XboxNetApiSvc", "dmwappushservice", "DoSvc", "diagnosticshub.standardcollector.service"
  ];

  services.forEach(service => {
    exec(`sc config ${service} start= disabled`, (err, stdout, stderr) => {
      if (err) console.error(`Error disabling service ${service}: ${err}`);
      else console.log(`Successfully disabled ${service}`);
    });
  });
}

// Disable Windows Defender and other services
function disableDefenderAndOthers() {
  exec("sc config WinDefend start= disabled", (err, stdout, stderr) => {
    if (err) console.error(`Error disabling Windows Defender: ${err}`);
    else console.log("Successfully disabled Windows Defender");
  });

  exec("sc config WdNisSvc start= disabled", (err, stdout, stderr) => {
    if (err) console.error(`Error disabling WdNisSvc: ${err}`);
    else console.log("Successfully disabled WdNisSvc");
  });
}

// Apply Ultimate Performance Power Plan
function applyUltimatePerformancePowerPlan() {
  exec('powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61 95533644-e700-4a79-a56c-a89e8cb109d9', (err, stdout, stderr) => {
    if (err) console.error(`Error applying Ultimate Performance Power Plan: ${err}`);
    else {
      exec('powercfg -setactive 95533644-e700-4a79-a56c-a89e8cb109d9', (err, stdout, stderr) => {
        if (err) console.error(`Error setting Ultimate Performance Power Plan active: ${err}`);
        else console.log("Ultimate Performance Power Plan applied successfully");
      });
    }
  });
}

// Apply Network Optimizations
function applyNetworkOptimizations() {
  exec('netsh interface tcp set global autotuninglevel=normal', (err, stdout, stderr) => {
    if (err) console.error(`Error applying TCP optimization: ${err}`);
    else console.log("TCP optimization applied successfully");
  });

  exec('netsh interface ipv6 set state disabled', (err, stdout, stderr) => {
    if (err) console.error(`Error disabling IPv6: ${err}`);
    else console.log("IPv6 disabled successfully");
  });

  exec('netsh int tcp set global dca=enabled', (err, stdout, stderr) => {
    if (err) console.error(`Error enabling DCA: ${err}`);
    else console.log("DCA enabled successfully");
  });
}

// Apply CPU optimizations for gaming
function applyCpuOptimizations() {
  exec('bcdedit /set processorcores 8', (err, stdout, stderr) => {
    if (err) console.error(`Error applying CPU optimizations: ${err}`);
    else console.log("CPU optimizations applied successfully");
  });
}

// Disable unnecessary telemetry and background processes
function disableTelemetryAndBackgroundProcesses() {
  exec("sc config DiagTrack start= disabled", (err, stdout, stderr) => {
    if (err) console.error(`Error disabling telemetry: ${err}`);
    else console.log("Telemetry disabled successfully");
  });

  exec("sc config dmwappushservice start= demand", (err, stdout, stderr) => {
    if (err) console.error(`Error disabling background processes: ${err}`);
    else console.log("Background processes disabled successfully");
  });
}

// Combine all optimizations into one function
function applyAllOptimizations() {
  disableServices();
  disableDefenderAndOthers();
  applyUltimatePerformancePowerPlan();
  applyNetworkOptimizations();
  applyCpuOptimizations();
  disableTelemetryAndBackgroundProcesses();
}

// Run all optimizations at once
applyAllOptimizations();
// Part 43: Game Launcher Integration
function launchGame(game) {
  const gamePaths = {
    "Steam": "C:\\Program Files (x86)\\Steam\\steam.exe",
    "EpicGames": "C:\\Program Files (x86)\\Epic Games\\Launcher\\Portal\\EpicGamesLauncher.exe",
    "BattleNet": "C:\\Program Files (x86)\\Battle.net\\Battle.net Launcher.exe",
    "Roblox": "C:\\Users\\%USERNAME%\\AppData\\Local\\Roblox\\RobloxPlayerBeta.exe",
    "Ubisoft": "C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\UbisoftGameLauncher.exe",
    // Add more games and game clients if necessary
  };

  const path = gamePaths[game];

  if (path) {
    exec(`start "" "${path}"`, (err, stdout, stderr) => {
      if (err) console.error(`Error launching ${game}: ${err}`);
      else console.log(`${game} launched successfully.`);
    });
  } else {
    console.error("Game not found.");
  }
}

// Example function to launch Steam
function launchSteam() {
  launchGame('Steam');
}

// Example function to launch Epic Games
function launchEpicGames() {
  launchGame('EpicGames');
}
// Part 44: More Game Launcher Tweaks (Add more as needed)
function addGameLauncherOptions() {
  const gameLaunchers = [
    "Steam", "EpicGames", "BattleNet", "Roblox", "Ubisoft"
  ];

  gameLaunchers.forEach(game => {
    console.log(`Setting up launcher for ${game}`);
    // Add more specific tweaks or configurations for each game launcher if necessary
  });
}

// Ensure the game launchers are available
addGameLauncherOptions();

// Set up an additional launch option for specific games or services
function configureGameLauncher() {
  const launcherPaths = {
    "BattleNet": "C:\\Program Files (x86)\\Battle.net\\Battle.net Launcher.exe",
    "Steam": "C:\\Program Files (x86)\\Steam\\steam.exe",
    "Epic": "C:\\Program Files (x86)\\Epic Games\\Launcher\\Portal\\EpicGamesLauncher.exe",
    "Roblox": "C:\\Users\\%USERNAME%\\AppData\\Local\\Roblox\\RobloxPlayerBeta.exe"
  };

  // Add additional handling logic for launching these apps
  Object.keys(launcherPaths).forEach(game => {
    console.log(`Configured launcher for ${game}`);
  });
}

configureGameLauncher();
// Part 45: Advanced Tweaks (Batch files and others)
function runAdvancedTweaks() {
  // Running powerful batch commands with additional user warnings
  const batchFiles = [
    'BoostedPlan.bat',
    'crazypp.bat',
    'crazypp2.bat',
    'onlytelemetry.bat'
    // Add any other powerful bat files that need to be executed
  ];

  batchFiles.forEach(batch => {
    console.log(`Running batch file: ${batch}`);
    exec(`start "" "${batch}"`, (err, stdout, stderr) => {
      if (err) console.error(`Error running ${batch}: ${err}`);
      else console.log(`${batch} executed successfully.`);
    });
  });
}

// Ensure the advanced tweaks and batch files are executed properly
runAdvancedTweaks();
// Part 46: Final checks and ensuring everything is set correctly
function finalChecks() {
  // Final security, cleanup, and tweak application
  console.log("Performing final checks and cleanup...");

  // Example final tweaks
  exec('del /f /q "C:\\Windows\\Temp\\*"', (err, stdout, stderr) => {
    if (err) console.error(`Error clearing temp files: ${err}`);
    else console.log("Temp files cleaned up.");
  });

  // Additional checks for logging or telemetry
  exec('reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer" /v "DisableWebSearch" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error("Error disabling web search: " + err);
    else console.log("Web search disabled.");
  });
}

finalChecks();
// Part 47: System performance and security optimization
function optimizeSecurityAndPerformance() {
  // Disable unwanted Windows security features
  exec('sc stop XblGameSave', (err, stdout, stderr) => {
    if (err) console.error(`Error stopping XblGameSave: ${err}`);
    else console.log("XblGameSave stopped.");
  });

  exec('sc stop XboxGipSvc', (err, stdout, stderr) => {
    if (err) console.error(`Error stopping XboxGipSvc: ${err}`);
    else console.log("XboxGipSvc stopped.");
  });

  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "ShowStatusBar" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
    if (err) console.error("Error enabling status bar: " + err);
    else console.log("Status bar enabled.");
  });
}

// Ensure system performance and security optimization is done
optimizeSecurityAndPerformance();
// Part 48: Advanced network and CPU optimization tweaks
function applyNetworkCpuOptimizations() {
  exec('netsh interface tcp set global autotuninglevel=normal', (err, stdout, stderr) => {
    if (err) console.error(`Error applying network optimizations: ${err}`);
    else console.log("Network optimizations applied.");
  });

  exec('bcdedit /set numproc 16', (err, stdout, stderr) => {
    if (err) console.error(`Error optimizing CPU: ${err}`);
    else console.log("CPU optimizations applied.");
  });
}

// Apply network and CPU optimizations
applyNetworkCpuOptimizations();
  // Part 49 - continue from where we left off
function applyFpsTweaks() {
  exec('reg add "HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
  });
}

// Part 50 - Network Tweaks
function applyNetworkTweaks() {
  exec('netsh interface tcp set global autotuninglevel=disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
  });
}

// Part 51 - Visual Tweaks
function applyVisualTweaks() {
  exec('reg add "HKCU\\Control Panel\\Desktop" /v "MenuShowDelay" /t REG_SZ /d 0 /f', (err, stdout, stderr) => {
      if (err) console.error(err);
  });
}

// Part 52 - Privacy Tweaks
function applyPrivacyTweaks() {
  exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender" /v "DisableAntiSpyware" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
      if (err) console.error(err);
  });
}

// Part 53 - System Tweaks
function applySystemTweaks() {
  exec('reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "ClearPageFileAtShutdown" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
      if (err) console.error(err);
  });
}

// Part 54 - Disable Automatic Updates
function disableUpdates() {
  exec('sc stop wuauserv', (err, stdout, stderr) => {
      if (err) console.error(err);
  });
  exec('sc config wuauserv start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
  });
}

// Continue to apply the tweaks as needed
applyFpsTweaks();
applyNetworkTweaks();
applyVisualTweaks();
applyPrivacyTweaks();
applySystemTweaks();
disableUpdates();
// Part 55 - Game Launchers Tweaks
function applyGameLaunchersTweaks() {
  // Epic Games
  exec('reg add "HKCU\\Software\\Epic Games\\Launcher" /v "InstallDir" /t REG_SZ /d "C:\\Program Files\\Epic Games" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
  });

  // Steam
  exec('reg add "HKCU\\Software\\Valve\\Steam" /v "SteamPath" /t REG_SZ /d "C:\\Program Files (x86)\\Steam" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
  });

  // Ubisoft Connect
  exec('reg add "HKCU\\Software\\Ubisoft\\Ubisoft Game Launcher" /v "InstallDir" /t REG_SZ /d "C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
  });

  // Roblox
  exec('reg add "HKCU\\Software\\Roblox" /v "InstallLocation" /t REG_SZ /d "C:\\Program Files\\Roblox" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
  });
}

// Part 56 - Clean Up Temporary Files
function cleanUpTemporaryFiles() {
  exec('del /q /f %temp%\\*', (err, stdout, stderr) => {
      if (err) console.error(err);
  });

  exec('del /q /f C:\\Windows\\Temp\\*', (err, stdout, stderr) => {
      if (err) console.error(err);
  });

  exec('del /q /f C:\\Users\\%USERNAME%\\AppData\\Local\\Temp\\*', (err, stdout, stderr) => {
      if (err) console.error(err);
  });
}

// Part 57 - Disable Windows Features
function disableWindowsFeatures() {
  exec('sc config SysMain start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
  });

  exec('sc config wuauserv start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
  });

  exec('sc config DiagTrack start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
  });
}

// Part 58 - Power Plan Tweaks
function applyPowerPlanTweaks() {
  exec('powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61 11111111-1111-1111-1111-111111111111', (err, stdout, stderr) => {
      if (err) console.error(err);
  });

  exec('powercfg -setactive 11111111-1111-1111-1111-111111111111', (err, stdout, stderr) => {
      if (err) console.error(err);
  });

  exec('powercfg -changename 11111111-1111-1111-1111-111111111111 SuperPower', (err, stdout, stderr) => {
      if (err) console.error(err);
  });
}

// Part 59 - Disable Apps and Services
function disableAppsAndServices() {
  exec('sc config "WMPNetworkSvc" start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
  });

  exec('sc config "PhoneSvc" start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
  });

  exec('sc config "MapsBroker" start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
  });
}

// Running the functions
applyGameLaunchersTweaks();
cleanUpTemporaryFiles();
disableWindowsFeatures();
applyPowerPlanTweaks();
disableAppsAndServices();


// Part 60 - Enable Dark Mode
function enableDarkMode() {
    exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v "AppsUseLightTheme" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
        if (err) console.error(err);
    });

    exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v "SystemUsesLightTheme" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
        if (err) console.error(err);
    });
}

// Part 61 - Disable Unnecessary Services
function disableUnnecessaryServices() {
    exec('sc stop "XblAuthManager"', (err, stdout, stderr) => {
        if (err) console.error(err);
    });

    exec('sc stop "XblGameSave"', (err, stdout, stderr) => {
        if (err) console.error(err);
    });

    exec('sc stop "XboxGipSvc"', (err, stdout, stderr) => {
        if (err) console.error(err);
    });

    exec('sc stop "XboxNetApiSvc"', (err, stdout, stderr) => {
        if (err) console.error(err);
    });
}

// Part 62 - Disable Windows Defender
function disableWindowsDefender() {
    exec('sc config "WinDefend" start= disabled', (err, stdout, stderr) => {
        if (err) console.error(err);
    });

    exec('sc config "WdNisSvc" start= disabled', (err, stdout, stderr) => {
        if (err) console.error(err);
    });

    exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender" /v "DisableAntiSpyware" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
        if (err) console.error(err);
    });
}

// Part 63 - Optimize Network Settings
function optimizeNetworkSettings() {
    exec('netsh interface ipv4 set subinterface "Ethernet" mtu=1500 store=persistent', (err, stdout, stderr) => {
        if (err) console.error(err);
    });

    exec('netsh interface ipv6 set subinterface "Ethernet" mtu=1500 store=persistent', (err, stdout, stderr) => {
        if (err) console.error(err);
    });

    exec('netsh interface ip set global autotuninglevel=normal', (err, stdout, stderr) => {
        if (err) console.error(err);
    });

    exec('netsh winsock reset', (err, stdout, stderr) => {
        if (err) console.error(err);
    });
}

// Part 64 - Disable Notifications
function disableNotifications() {
    exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "DisableNotificationCenter" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
        if (err) console.error(err);
    });

    exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "EnableBalloonTips" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
        if (err) console.error(err);
    });
}

// Part 65 - Clean Up System Logs
function cleanSystemLogs() {
    exec('wevtutil sl Security /ms:48048576', (err, stdout, stderr) => {
        if (err) console.error(err);
    });

    exec('wevtutil sl Application /ms:48048576', (err, stdout, stderr) => {
        if (err) console.error(err);
    });

    exec('wevtutil sl Setup /ms:48048576', (err, stdout, stderr) => {
        if (err) console.error(err);
    });

    exec('wevtutil sl System /ms:48048576', (err, stdout, stderr) => {
        if (err) console.error(err);
    });

    exec('wevtutil sl "Windows Powershell" /ms:24048576', (err, stdout, stderr) => {
        if (err) console.error(err);
    });
}

// Part 66 - Disable Cortana
function disableCortana() {
    exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Search" /v "CortanaEnabled" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
        if (err) console.error(err);
    });

    exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Search" /v "AllowSearchToUseLocation" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
        if (err) console.error(err);
    });

    exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Search" /v "BingSearchEnabled" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
        if (err) console.error(err);
    });
}

// Part 67 - Remove Bloatware
function removeBloatware() {
    exec('powershell -Command "Get-AppxPackage -allusers *Xbox* | Remove-AppxPackage"', (err, stdout, stderr) => {
        if (err) console.error(err);
    });

    exec('powershell -Command "Get-AppxPackage -allusers *OneDrive* | Remove-AppxPackage"', (err, stdout, stderr) => {
        if (err) console.error(err);
    });

    exec('powershell -Command "Get-AppxPackage -allusers *MicrosoftOfficeHub* | Remove-AppxPackage"', (err, stdout, stderr) => {
        if (err) console.error(err);
    });
}

// Executing all the functions
enableDarkMode();
disableUnnecessaryServices();
disableWindowsDefender();
optimizeNetworkSettings();
disableNotifications();
cleanSystemLogs();
disableCortana();
removeBloatware();
// Example for part 68 continuation with some of the tweaks implemented

function applyPerformanceTweaks() {
  // Example for applying performance related tweaks
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

function applyVisualTweaks() {
  // Applying visual tweaks such as disabling transparency
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "DisableTransparency" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

function applyPrivacyTweaks() {
  // Disable telemetry collection for privacy
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Telemetry" /v "AllowTelemetry" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Trigger these tweaks based on user input
document.getElementById('applyPerformanceBtn').addEventListener('click', () => applyPerformanceTweaks());
document.getElementById('applyVisualBtn').addEventListener('click', () => applyVisualTweaks());
document.getElementById('applyPrivacyBtn').addEventListener('click', () => applyPrivacyTweaks());

// More parts of the script for handling software installations
function installSoftware(softwareName) {
  const softwareLinks = {
      malwarebytes: 'https://www.malwarebytes.com/download',
      adwcleaner: 'https://www.malwarebytes.com/adwcleaner',
      winrar: 'https://www.win-rar.com/start.html?&L=0',
      nvcleanstall: 'https://www.techpowerup.com/download/techpowerup-nvcleanstall/',
      // Add more software download links here...
  };

  const url = softwareLinks[softwareName];
  if (url) {
      const destPath = path.join(__dirname, `${softwareName}.exe`);
      downloadAndInstall(url, destPath);
  } else {
      console.log('Software not found');
  }
}

// Function for downloading and installing the software
async function downloadAndInstall(url, destPath) {
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(destPath);
  res.body.pipe(fileStream);

  fileStream.on('finish', () => {
      exec(`start "" "${destPath}"`, (err, stdout, stderr) => {
          if (err) {
              console.error(`Error executing installer: ${err}`);
          } else {
              console.log('Software installed successfully');
          }
      });
  });
}
function disableGameFeatures() {
  // Disabling game features such as Xbox Game Bar
  exec('reg add "HKCU\\Software\\Microsoft\\GameBar" /v "AllowAutoGameMode" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\GameBar" /v "ShowStartupPanel" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\GameBar" /v "UseNexusForGameBarEnabled" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\GameBar" /v "GameDVR_Enabled" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc stop "XblGameSave"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Disable Game Features
document.getElementById('disableGameFeaturesBtn').addEventListener('click', disableGameFeatures);
function tweakTaskbar() {
  // Customizing the taskbar for better performance
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "TaskbarSmallIcons" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "ShowStatusBar" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "TaskbarGlomLevel" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Tweak Taskbar Settings
document.getElementById('tweakTaskbarBtn').addEventListener('click', tweakTaskbar);
function applyHardwareOptimizations() {
  // Disabling unnecessary hardware features to save resources
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "DisableHardwareAcceleration" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "DisableDesktopComposition" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc stop "WMPNetworkSvc"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Apply Hardware Optimizations
document.getElementById('applyHardwareOptimizationsBtn').addEventListener('click', applyHardwareOptimizations);
function systemPerformanceBoost() {
  // Enabling performance boost features
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "DisableWindowAnimations" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "DisableMenuAnimations" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "DisableCursorShadow" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Boost System Performance
document.getElementById('boostSystemPerformanceBtn').addEventListener('click', systemPerformanceBoost);
function optimizeSystemStartup() {
  // Tweak system startup settings for quicker boot times
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "Start_TrackProgs" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "StartupDelayInMSec" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc stop "XblAuthManager"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc config "XblAuthManager" start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Optimize System Startup
document.getElementById('optimizeStartupBtn').addEventListener('click', optimizeSystemStartup);
function disableServicesForPerformance() {
  // Disabling unnecessary services to improve system performance
  exec('sc stop "WerSvc"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc config "WerSvc" start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc stop "WMPNetworkSvc"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc config "WMPNetworkSvc" start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Disable Services for Performance
document.getElementById('disableServicesBtn').addEventListener('click', disableServicesForPerformance);
function disableDefenderAndTelemetry() {
  // Disabling Windows Defender and Telemetry
  exec('sc stop "WinDefend"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc config "WinDefend" start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender" /v "DisableAntiSpyware" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Spynet" /v "DontReportInfectionInformation" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc stop "DiagTrack"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc config "DiagTrack" start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Disable Defender and Telemetry
document.getElementById('disableDefenderTelemetryBtn').addEventListener('click', disableDefenderAndTelemetry);
function optimizeRegistryForFPS() {
  // FPS Optimization: Adjusting Windows settings for maximum performance
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "DisableTaskbarTransparency" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "DisableDesktopComposition" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "DisableWindowAnimations" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "DisableMenuAnimations" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "DisableThumbnailCache" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Optimize Registry for FPS
document.getElementById('optimizeFPSRegistryBtn').addEventListener('click', optimizeRegistryForFPS);
function networkTweaks() {
  // Network Optimization Tweaks
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v "MaxConnectionsPer1_0Server" /t REG_DWORD /d "16" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v "MaxConnectionsPerServer" /t REG_DWORD /d "16" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\CACHE" /v "Persistent" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKLM\\SOFTWARE\\Microsoft\\MSMQ\\Parameters" /v "IgnoreOSNameValidation" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKLM\\SOFTWARE\\Microsoft\\MSMQ\\Parameters" /v "TCPNoDelay" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Apply Network Tweaks
document.getElementById('networkTweaksBtn').addEventListener('click', networkTweaks);
function disableAppUpdates() {
  // Disable app updates to prevent unnecessary background activity
  exec('sc stop "GoogleUpdateTaskMachineCore"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc config "GoogleUpdateTaskMachineCore" start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc stop "GoogleUpdateTaskMachineUA"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc config "GoogleUpdateTaskMachineUA" start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKLM\\SOFTWARE\\Policies\\Google\\Chrome" /v "MetricsReportingEnabled" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Disable App Updates
document.getElementById('disableAppUpdatesBtn').addEventListener('click', disableAppUpdates);
function optimizeMemoryUsage() {
  // Disable memory compression and page combining for better memory management
  exec('powershell "Disable-MMAgent -MemoryCompression"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('powershell "Disable-MMAgent -PageCombining"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc stop SysMain', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc config SysMain start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Optimize Memory Usage
document.getElementById('optimizeMemoryBtn').addEventListener('click', optimizeMemoryUsage);
function disableBackgroundApps() {
  // Disable background apps to free up system resources
  exec('sc stop "BackgroundTasks"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc config "BackgroundTasks" start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications" /v "Allow" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Disable Background Apps
document.getElementById('disableBackgroundAppsBtn').addEventListener('click', disableBackgroundApps);
// More Network Tweaks
function applyNetworkTweaks() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v "MaxConnectionsPer1_0Server" /t REG_DWORD /d "16" /f', (err, stdout, stderr) => {
    if (err) console.error(err);
  });
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v "MaxConnectionsPerServer" /t REG_DWORD /d "16" /f', (err, stdout, stderr) => {
    if (err) console.error(err);
  });
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\CACHE" /v "Persistent" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
    if (err) console.error(err);
  });
  exec('reg add "HKLM\\SOFTWARE\\Microsoft\\MSMQ\\Parameters" /v "IgnoreOSNameValidation" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
    if (err) console.error(err);
  });
  exec('reg add "HKLM\\SOFTWARE\\Microsoft\\MSMQ\\Parameters" /v "TCPNoDelay" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
    if (err) console.error(err);
  });
  exec('reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\EMDMgmt" /v "AllowNewCachesByDefault" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
    if (err) console.error(err);
  });
  exec('reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\EMDMgmt" /v "GroupPolicyDisallowCaches" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
    if (err) console.error(err);
  });
}
function disableUnnecessaryServices() {
  // Disabling non-essential services to free up system resources
  exec('sc stop "WMPNetworkSvc"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc config "WMPNetworkSvc" start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc stop "XblGameSave"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc config "XblGameSave" start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Disable Unnecessary Services
document.getElementById('disableServicesBtn').addEventListener('click', disableUnnecessaryServices);
function optimizeVisualEffects() {
  // Adjusting visual effects for better performance
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\VisualEffects" /v "VisualFXSetting" /t REG_DWORD /d "2" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\VisualEffects" /v "DisableAnimations" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Optimize Visual Effects
document.getElementById('optimizeVisualEffectsBtn').addEventListener('click', optimizeVisualEffects);
function enhanceProcessorPerformance() {
  // Setting processor performance to high
  exec('reg add "HKCU\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" /v "SystemResponsiveness" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" /v "NetworkThrottlingIndex" /t REG_DWORD /d "4294967295" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Enhance Processor Performance
document.getElementById('enhanceProcessorPerformanceBtn').addEventListener('click', enhanceProcessorPerformance);
function disableWindowsDefender() {
  // Disabling Windows Defender for performance
  exec('sc stop "WinDefend"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc config "WinDefend" start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Disable Windows Defender
document.getElementById('disableDefenderBtn').addEventListener('click', disableWindowsDefender);
function clearSystemCache() {
  // Clearing system cache to free up memory
  exec('del /q /f /s %TEMP%', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('del /q /f /s %windir%\\temp\\*.*', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Clear System Cache
document.getElementById('clearCacheBtn').addEventListener('click', clearSystemCache);
function disableWindowsSearch() {
  // Disabling Windows Search to improve performance
  exec('sc stop "WSearch"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc config "WSearch" start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Disable Windows Search
document.getElementById('disableSearchBtn').addEventListener('click', disableWindowsSearch);
function disableWindowsUpdate() {
  // Disabling Windows Update service to prevent automatic updates
  exec('sc stop "wuauserv"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc config "wuauserv" start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Disable Windows Update
document.getElementById('disableUpdateBtn').addEventListener('click', disableWindowsUpdate);
function enableGameMode() {
  // Enabling Game Mode for better gaming performance
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v "GameModeEnabled" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Enable Game Mode
document.getElementById('enableGameModeBtn').addEventListener('click', enableGameMode);
function disableUnnecessaryServices() {
  // Disabling non-essential services to free up system resources
  exec('sc stop "WMPNetworkSvc"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc config "WMPNetworkSvc" start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc stop "XblGameSave"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc config "XblGameSave" start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Disable Unnecessary Services
document.getElementById('disableServicesBtn').addEventListener('click', disableUnnecessaryServices);
function optimizeVisualEffects() {
  // Adjusting visual effects for better performance
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\VisualEffects" /v "VisualFXSetting" /t REG_DWORD /d "2" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\VisualEffects" /v "DisableAnimations" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Optimize Visual Effects
document.getElementById('optimizeVisualEffectsBtn').addEventListener('click', optimizeVisualEffects);
function enhanceProcessorPerformance() {
  // Setting processor performance to high
  exec('reg add "HKCU\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" /v "SystemResponsiveness" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" /v "NetworkThrottlingIndex" /t REG_DWORD /d "4294967295" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Enhance Processor Performance
document.getElementById('enhanceProcessorPerformanceBtn').addEventListener('click', enhanceProcessorPerformance);
function disableWindowsDefender() {
  // Disabling Windows Defender for performance
  exec('sc stop "WinDefend"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc config "WinDefend" start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Disable Windows Defender
document.getElementById('disableDefenderBtn').addEventListener('click', disableWindowsDefender);
function clearSystemCache() {
  // Clearing system cache to free up memory
  exec('del /q /f /s %TEMP%', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('del /q /f /s %windir%\\temp\\*.*', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Clear System Cache
document.getElementById('clearCacheBtn').addEventListener('click', clearSystemCache);
function disableWindowsSearch() {
  // Disabling Windows Search to improve performance
  exec('sc stop "WSearch"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc config "WSearch" start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Disable Windows Search
document.getElementById('disableSearchBtn').addEventListener('click', disableWindowsSearch);
function disableWindowsUpdate() {
  // Disabling Windows Update service to prevent automatic updates
  exec('sc stop "wuauserv"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc config "wuauserv" start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Disable Windows Update
document.getElementById('disableUpdateBtn').addEventListener('click', disableWindowsUpdate);
function enableGameMode() {
  // Enabling Game Mode for better gaming performance
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v "GameModeEnabled" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Enable Game Mode
document.getElementById('enableGameModeBtn').addEventListener('click', enableGameMode);
function disableWindowsTips() {
  // Disabling Windows Tips to reduce background processes
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "SubscribedContentEnabled" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Disable Windows Tips
document.getElementById('disableWindowsTipsBtn').addEventListener('click', disableWindowsTips);
function reduceLockScreenTimeout() {
  // Reducing lock screen timeout for quicker access
  exec('reg add "HKCU\\Control Panel\\Desktop" /v "ScreenSaveTimeOut" /t REG_SZ /d "300" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Reduce Lock Screen Timeout
document.getElementById('reduceLockScreenTimeoutBtn').addEventListener('click', reduceLockScreenTimeout);
function disableWindowsErrorReporting() {
  // Disabling Windows Error Reporting to prevent unnecessary data collection
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\Windows Error Reporting" /v "Disabled" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Disable Windows Error Reporting
document.getElementById('disableErrorReportingBtn').addEventListener('click', disableWindowsErrorReporting);
function disableRemoteAssistance() {
  // Disabling Remote Assistance to enhance security and performance
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v "DisableRemoteAssistance" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Disable Remote Assistance
document.getElementById('disableRemoteAssistanceBtn').addEventListener('click', disableRemoteAssistance);
function disablePrintSpooler() {
  // Disabling Print Spooler service if printing is not required
  exec('sc stop "Spooler"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc config "Spooler" start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Disable Print Spooler
document.getElementById('disablePrintSpoolerBtn').addEventListener('click', disablePrintSpooler);
function reduceLockScreenTimeout() {
  // Reducing lock screen timeout for quicker access
  exec('reg add "HKCU\\Control Panel\\Desktop" /v "ScreenSaveTimeOut" /t REG_SZ /d "300" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Reduce Lock Screen Timeout
document.getElementById('reduceLockScreenTimeoutBtn').addEventListener('click', reduceLockScreenTimeout);
function disableWindowsErrorReporting() {
  // Disabling Windows Error Reporting to prevent unnecessary data collection
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\Windows Error Reporting" /v "Disabled" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Disable Windows Error Reporting
document.getElementById('disableErrorReportingBtn').addEventListener('click', disableWindowsErrorReporting);
function disablePrintSpooler() {
  // Disabling Print Spooler service if printing is not required
  exec('sc stop "Spooler"', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });

  exec('sc config "Spooler" start= disabled', (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
  });
}

// Disable Print Spooler
document.getElementById('disablePrintSpoolerBtn').addEventListener('click', disablePrintSpooler);
function enableReadyBoost() {
  // Insert your USB flash drive and identify its drive letter
  const driveLetter = 'E:'; // Example: 'E:'
  exec(`fsutil behavior set memoryusage 1`, (err, stdout, stderr) => {
      if (err) {
          console.error('Error enabling ReadyBoost:', err);
          return;
      }
      console.log('ReadyBoost enabled successfully.');
  });
}
function adjustVirtualMemory() {
  exec('wmic pagefileset where name="C:\\pagefile.sys" set InitialSize=4096,MaximumSize=8192', (err, stdout, stderr) => {
      if (err) {
          console.error('Error adjusting virtual memory:', err);
          return;
      }
      console.log('Virtual memory settings adjusted successfully.');
  });
}
function disableTransparencyEffects() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v "EnableTransparency" /t REG_DWORD /d "0" /f', (err, stdout, stderr) => {
      if (err) {
          console.error('Error disabling transparency effects:', err);
          return;
      }
      console.log('Transparency effects disabled successfully.');
  });
}
