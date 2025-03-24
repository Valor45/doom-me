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

// FPS/Performance Tweaks
function applyFpsTweaks() {
  // Example tweak: Disable Aero Glass
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\DWM" /v "AeroGlass" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) {
      console.log(`Error applying FPS tweak: ${stderr}`);
    } else {
      console.log('FPS Tweak: Disabled Aero Glass');
    }
  });

  // Adjust Processor Affinity Mask (Additional tweaks can go here)
}

// Network Tweaks
function applyNetworkTweaks() {
  // Flush DNS Cache
  exec('ipconfig /flushdns', (err, stdout, stderr) => {
    if (err) {
      console.log(`Error applying network tweak: ${stderr}`);
    } else {
      console.log('Network Tweak: Flushed DNS Cache');
    }
  });

  // Disable IPv6 (Additional tweaks can go here)
  exec('netsh interface ipv6 set teredo disabled', (err, stdout, stderr) => {
    if (err) {
      console.log(`Error applying network tweak: ${stderr}`);
    } else {
      console.log('Network Tweak: Disabled IPv6');
    }
  });
}

// Visual Tweaks
function applyVisualTweaks() {
  // Example tweak: Enable/Disable Dark Mode
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v "AppsUseLightTheme" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) {
      console.log(`Error applying visual tweak: ${stderr}`);
    } else {
      console.log('Visual Tweak: Enabled Dark Mode');
    }
  });

  // Disable Window Animations (Additional tweaks can go here)
}

// Privacy Tweaks
function applyPrivacyTweaks() {
  // Disable Telemetry
  exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) {
      console.log(`Error applying privacy tweak: ${stderr}`);
    } else {
      console.log('Privacy Tweak: Disabled Telemetry');
    }
  });

  // Disable Windows Update (Additional tweaks can go here)
}

// Game Launcher Tweaks
function applyGameLauncherTweaks() {
  // Install and launch Steam
  installSoftware('Steam');
  
  // Install and launch Epic Games (Additional tweaks can go here)
}

// Miscellaneous Tweaks
function applyMiscTweaks() {
  // Disable Windows Defender
  exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender" /v "DisableAntiSpyware" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) {
      console.log(`Error applying misc tweak: ${stderr}`);
    } else {
      console.log('Misc Tweak: Disabled Windows Defender');
    }
  });

  // Remove Windows Bloatware (Additional tweaks can go here)
}

// Function to apply all tweaks (triggered by a button in GUI)



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
    if (err) {
      console.log(`Error disabling telemetry: ${stderr}`);
    } else {
      console.log('Privacy Tweak: Disabled Telemetry');
    }
  });
}

// Privacy Tweaks 2 - Disable Windows Update telemetry
function disableUpdateTelemetry() {
  exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v "DisableAutomaticRestartSignOn" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) {
      console.log(`Error disabling update telemetry: ${stderr}`);
    } else {
      console.log('Privacy Tweak: Disabled Update Telemetry');
    }
  });
}

// Privacy Tweaks 3 - Remove Cortana data collection
function removeCortanaDataCollection() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Search" /v "AllowCortana" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) {
      console.log(`Error removing Cortana data collection: ${stderr}`);
    } else {
      console.log('Privacy Tweak: Removed Cortana Data Collection');
    }
  });
}

// Privacy Tweaks 4 - Disable SmartScreen
function disableSmartScreen() {
  exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v "EnableSmartScreen" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) {
      console.log(`Error disabling SmartScreen: ${stderr}`);
    } else {
      console.log('Privacy Tweak: Disabled SmartScreen');
    }
  });
}

// Privacy Tweaks 5 - Disable app tracking
function disableAppTracking() {
  exec('reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo" /v "Enabled" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) {
      console.log(`Error disabling app tracking: ${stderr}`);
    } else {
      console.log('Privacy Tweak: Disabled App Tracking');
    }
  });
}
// Game Launcher Tweaks 1 - Install and launch Steam
function applySteamTweaks() {
  installSoftware('Steam');
}

// Game Launcher Tweaks 2 - Install and launch Epic Games
function applyEpicGamesTweaks() {
  installSoftware('Epic Games');
}

// Game Launcher Tweaks 3 - Install and launch Battle.net
function applyBattleNetTweaks() {
  installSoftware('Battle.net');
}

// Game Launcher Tweaks 4 - Install and launch Roblox
function applyRobloxTweaks() {
  installSoftware('Roblox');
}

// Game Launcher Tweaks 5 - Install and launch Ubisoft Connect
function applyUbisoftConnectTweaks() {
  installSoftware('Ubisoft Connect');
}

// Game Launcher Tweaks 6 - Install and launch GOG Galaxy
function applyGogGalaxyTweaks() {
  installSoftware('GOG Galaxy');
}

// Game Launcher Tweaks 7 - Install and launch Origin (EA)
function applyOriginTweaks() {
  installSoftware('Origin');
}

// Game Launcher Tweaks 8 - Install and launch Discord
function applyDiscordTweaks() {
  installSoftware('Discord');
}

// Game Launcher Tweaks 9 - Install and launch Wargaming.net Launcher
function applyWargamingTweaks() {
  installSoftware('Wargaming.net');
}
// Miscellaneous Tweaks 1 - Disable Windows Defender
function disableDefender() {
  exec('sc stop "WinDefend"', (err, stdout, stderr) => {
    if (err) console.error('Error stopping Windows Defender service:', err);
  });
  exec('sc config "WinDefend" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Windows Defender service:', err);
  });
}

// Miscellaneous Tweaks 2 - Remove Windows Bloatware
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

// Miscellaneous Tweaks 3 - Clear system cache
function clearSystemCache() {
  exec('del /q /f /s %TEMP%', (err, stdout, stderr) => {
    if (err) console.error('Error clearing temp files:', err);
  });
  exec('del /q /f /s C:\\Windows\\Temp\\*.*', (err, stdout, stderr) => {
    if (err) console.error('Error clearing Windows temp files:', err);
  });
}

// Miscellaneous Tweaks 4 - Disable unnecessary startup services
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

// Miscellaneous Tweaks 5 - Disable Windows Update and Telemetry
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

// Power Plan Tweaks 1 - Apply Ultimate Performance Plan
function applyUltimatePowerPlan() {
  exec('powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61 95533644-e700-4a79-a56c-a89e8cb109d9', (err, stdout, stderr) => {
    if (err) console.error(`Error applying Ultimate Performance Power Plan: ${err}`);
  });
  exec('powercfg -setactive 95533644-e700-4a79-a56c-a89e8cb109d9', (err, stdout, stderr) => {
    if (err) console.error(`Error setting Ultimate Performance Power Plan active: ${err}`);
    else console.log("Ultimate Performance Power Plan applied successfully");
  });
}

// Power Plan Tweaks 2 - Optimize CPU performance for better gaming
function optimizeCpuPerformance() {
  exec('bcdedit /set processorcores 8', (err, stdout, stderr) => {
    if (err) console.error(`Error optimizing CPU performance: ${err}`);
    else console.log("CPU optimizations applied successfully");
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

// Final Tweaks - Clean system cache and files
function cleanSystemTempFiles() {
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

// Apply all final optimizations and settings
function applyFinalOptimizations() {
  disableUnwantedServices();
  removeWindowsBloatware();
  cleanSystemTempFiles();
  disableTelemetry();
  applyUltimatePowerPlan();
  installAndLaunchGames();  // Steam, Epic, Ubisoft, etc.
  console.log('Final tweaks and optimizations applied.');
}





function applyAllTweaks() {
  applyFpsTweaks();
  applyNetworkTweaks();
  applyVisualTweaks();
  applyPrivacyTweaks();
  applyGameLauncherTweaks();
  applyMiscTweaks();
}

// Add any other tweaks or additional functions as necessary

