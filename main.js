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


// Boosted Plan Tweaks (Advanced Tab)
function applyBoostedPlanTweaks() {
  // Enable Windows Script Host
  exec('reg add "HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Windows Script Host\\Settings" /v "Enabled" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
    if (err) console.error('Error enabling Windows Script Host:', err);
  });

  // Disable SysMain and Superfetch
  exec('net stop wuauserv', (err, stdout, stderr) => {
    if (err) console.error('Error stopping wuauserv:', err);
  });
  exec('sc config "wuauserv" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling wuauserv:', err);
  });
  exec('net stop SysMain', (err, stdout, stderr) => {
    if (err) console.error('Error stopping SysMain:', err);
  });
  exec('sc config "Sysmain" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling SysMain:', err);
  });

  // Apply Ultimate Performance Power Plan
  exec('powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61 11111111-1111-1111-1111-111111111111', (err, stdout, stderr) => {
    if (err) console.error('Error applying boosted power plan:', err);
  });

  // Set Active Power Plan to Ultimate Performance
  exec('powercfg -setactive 11111111-1111-1111-1111-111111111111', (err, stdout, stderr) => {
    if (err) console.error('Error setting active power plan:', err);
  });
}

// Apply Power Configuration Tweaks (for maximizing performance)
function applyCpuPowerOptimizations() {
  // Adjust CPU power settings
  exec('bcdedit /set IncreaseUserVa 4000', (err, stdout, stderr) => {
    if (err) console.error('Error adjusting CPU power:', err);
  });
  exec('powercfg -setacvalueindex 11111111-1111-1111-1111-111111111111 238c9fa8-0aad-41ed-83f4-97be242c8f20 29f6c1db-86da-48c5-9fdb-f2b67b1f44da 0', (err, stdout, stderr) => {
    if (err) console.error('Error applying CPU power optimizations:', err);
  });
}
// Network Tweaks (Advanced Tab)
function applyAdvancedNetworkTweaks() {
  exec('netsh int ip reset', (err, stdout, stderr) => {
    if (err) console.error('Error resetting network settings:', err);
  });

  exec('netsh int tcp reset', (err, stdout, stderr) => {
    if (err) console.error('Error resetting TCP settings:', err);
  });

  exec('netsh winsock reset', (err, stdout, stderr) => {
    if (err) console.error('Error resetting Winsock:', err);
  });

  // Enable/Disable IPv6 settings for improved network performance
  exec('netsh interface ipv6 set teredo disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Teredo:', err);
  });
  exec('netsh int tcp set global autotuninglevel=normal', (err, stdout, stderr) => {
    if (err) console.error('Error setting TCP autotuning:', err);
  });
  exec('netsh int tcp set global ecncapability=enabled', (err, stdout, stderr) => {
    if (err) console.error('Error enabling ECN capability:', err);
  });
}
// Disable Telemetry (Advanced Tab)
function disableTelemetryTweaks() {
  exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling telemetry:', err);
  });

  exec('sc config dmwappushservice start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling dmwappushservice:', err);
  });

  exec('sc config diagnosticshub.standardcollector.service start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling diagnosticshub:', err);
  });

  exec('sc config DiagTrack start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling DiagTrack:', err);
  });
}
// Security Tweaks (Advanced Tab)
function applySecurityOptimizations() {
  // Disable Windows Defender and related services
  exec('sc stop "WinDefend"', (err, stdout, stderr) => {
    if (err) console.error('Error stopping Windows Defender:', err);
  });
  exec('sc config "WinDefend" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Windows Defender service:', err);
  });

  // Disable unnecessary services like SysMain, Superfetch
  exec('sc config "SysMain" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling SysMain:', err);
  });

  // Disable SMB1 for security purposes
  exec('powershell -Command "Disable-WindowsOptionalFeature -Online -FeatureName \'SMB1Protocol\' -NoRestart"', (err, stdout, stderr) => {
    if (err) console.error('Error disabling SMB1:', err);
  });
}



// Boosted Plan Tweaks (Advanced Tab)
function applyBoostedPlanTweaks() {
  // Enable Windows Script Host
  exec('reg add "HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Windows Script Host\\Settings" /v "Enabled" /t REG_DWORD /d "1" /f', (err, stdout, stderr) => {
    if (err) console.error('Error enabling Windows Script Host:', err);
  });

  // Disable SysMain and Superfetch
  exec('net stop wuauserv', (err, stdout, stderr) => {
    if (err) console.error('Error stopping wuauserv:', err);
  });
  exec('sc config "wuauserv" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling wuauserv:', err);
  });
  exec('net stop SysMain', (err, stdout, stderr) => {
    if (err) console.error('Error stopping SysMain:', err);
  });
  exec('sc config "Sysmain" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling SysMain:', err);
  });

  // Apply Ultimate Performance Power Plan
  exec('powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61 11111111-1111-1111-1111-111111111111', (err, stdout, stderr) => {
    if (err) console.error('Error applying boosted power plan:', err);
  });

  // Set Active Power Plan to Ultimate Performance
  exec('powercfg -setactive 11111111-1111-1111-1111-111111111111', (err, stdout, stderr) => {
    if (err) console.error('Error setting active power plan:', err);
  });
}

// Apply Power Configuration Tweaks (for maximizing performance)
function applyCpuPowerOptimizations() {
  // Adjust CPU power settings
  exec('bcdedit /set IncreaseUserVa 4000', (err, stdout, stderr) => {
    if (err) console.error('Error adjusting CPU power:', err);
  });
  exec('powercfg -setacvalueindex 11111111-1111-1111-1111-111111111111 238c9fa8-0aad-41ed-83f4-97be242c8f20 29f6c1db-86da-48c5-9fdb-f2b67b1f44da 0', (err, stdout, stderr) => {
    if (err) console.error('Error applying CPU power optimizations:', err);
  });
}

// Network Tweaks (Advanced Tab)
function applyAdvancedNetworkTweaks() {
  exec('netsh int ip reset', (err, stdout, stderr) => {
    if (err) console.error('Error resetting network settings:', err);
  });

  exec('netsh int tcp reset', (err, stdout, stderr) => {
    if (err) console.error('Error resetting TCP settings:', err);
  });

  exec('netsh winsock reset', (err, stdout, stderr) => {
    if (err) console.error('Error resetting Winsock:', err);
  });

  // Enable/Disable IPv6 settings for improved network performance
  exec('netsh interface ipv6 set teredo disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Teredo:', err);
  });
  exec('netsh int tcp set global autotuninglevel=normal', (err, stdout, stderr) => {
    if (err) console.error('Error setting TCP autotuning:', err);
  });
  exec('netsh int tcp set global ecncapability=enabled', (err, stdout, stderr) => {
    if (err) console.error('Error enabling ECN capability:', err);
  });
}
// Disable Telemetry (Advanced Tab)
function disableTelemetryTweaks() {
  exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling telemetry:', err);
  });

  exec('sc config dmwappushservice start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling dmwappushservice:', err);
  });

  exec('sc config diagnosticshub.standardcollector.service start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling diagnosticshub:', err);
  });

  exec('sc config DiagTrack start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling DiagTrack:', err);
  });
}
// Security Tweaks (Advanced Tab)
function applySecurityOptimizations() {
  // Disable Windows Defender and related services
  exec('sc stop "WinDefend"', (err, stdout, stderr) => {
    if (err) console.error('Error stopping Windows Defender:', err);
  });
  exec('sc config "WinDefend" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Windows Defender service:', err);
  });

  // Disable unnecessary services like SysMain, Superfetch
  exec('sc config "SysMain" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling SysMain:', err);
  });

  // Disable SMB1 for security purposes
  exec('powershell -Command "Disable-WindowsOptionalFeature -Online -FeatureName \'SMB1Protocol\' -NoRestart"', (err, stdout, stderr) => {
    if (err) console.error('Error disabling SMB1:', err);
  });
}
// Visual Tweaks (Advanced Tab)
function applyVisualTweaks() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "ShowStatusBar" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error enabling status bar:', err);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "DisableShaking" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Aero Shake:', err);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "TaskbarGlomLevel" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error setting Taskbar Glom Level:', err);
  });

  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "MenuShowDelay" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error removing Menu Show Delay:', err);
  });
}
// Gaming Performance Optimizations (Advanced Tab)
function applyGamingTweaks() {
  // Disable Xbox Game Bar and related services
  exec('sc config xbgm start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Xbox Game Bar:', err);
  });
  exec('sc config XblAuthManager start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling XblAuthManager:', err);
  });
  exec('sc config XblGameSave start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling XblGameSave:', err);
  });

  // Disable Game DVR and Game Mode
  exec('reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Game DVR:', err);
  });
}

// FPS Tweaks 1 - Disable High Definition Audio
function disableHighDefinitionAudio() {
  exec('sc stop "hdaudio" && sc config "hdaudio" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling High Definition Audio:', err);
  });
}

// FPS Tweaks 2 - Set CPU to high performance
function setCpuToHighPerformance() {
  exec('bcdedit /set disabledynamictick yes', (err, stdout, stderr) => {
    if (err) console.error('Error setting CPU to high performance:', err);
  });
}

// FPS Tweaks 3 - Disable audio enhancements
function disableAudioEnhancements() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Multimedia\\SystemProfile" /v "AudioEnhancementMode" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling audio enhancements:', err);
  });
}

// FPS Tweaks 4 - Disable Windows 10 sleep mode (for performance)
function disableSleepMode() {
  exec('powercfg -change standby-timeout-ac 0', (err, stdout, stderr) => {
    if (err) console.error('Error disabling sleep mode:', err);
  });
}

// FPS Tweaks 5 - Set power plan to maximum performance
function setPowerPlanMaxPerformance() {
  exec('powercfg -setactive SCHEME_MIN', (err, stdout, stderr) => {
    if (err) console.error('Error setting power plan to maximum performance:', err);
  });
}
// Visual Tweaks 1 - Enable transparency effects for a more dynamic interface
function enableTransparency() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v "EnableTransparency" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error enabling transparency:', err);
  });
}

// Visual Tweaks 2 - Disable thumbnail previews for file explorer
function disableThumbnailPreviews() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "IconsOnly" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling thumbnail previews:', err);
  });
}

// Visual Tweaks 3 - Show full file extensions in File Explorer
function showFileExtensions() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "HideFileExt" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error showing file extensions:', err);
  });
}

// Visual Tweaks 4 - Disable taskbar grouping (keep taskbar icons separate)
function disableTaskbarGrouping() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "TaskbarGlomLevel" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling taskbar grouping:', err);
  });
}

// Visual Tweaks 5 - Change taskbar icon size
function changeTaskbarIconSize() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "TaskbarSmallIcons" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error changing taskbar icon size:', err);
  });
}


// Privacy Tweaks 40 - Disable Cortana completely (advanced)
function disableCortanaCompletely() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Search" /v "CortanaEnabled" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Cortana:', err);
  });
  exec('powershell -Command "Get-AppxPackage *Microsoft.Cortana* | Remove-AppxPackage"', (err, stdout, stderr) => {
    if (err) console.error('Error removing Cortana app:', err);
  });
}

// Privacy Tweaks 41 - Disable Windows Ink Workspace
function disableWindowsInk() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\PenWorkspace" /v "PenWorkspaceButtonDesiredVisibility" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Windows Ink Workspace:', err);
  });
}

// Privacy Tweaks 42 - Disable Windows Feedback
function disableWindowsFeedback() {
  exec('reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Feedback" /v "EnableFeedback" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling feedback:', err);
  });
}

// Privacy Tweaks 43 - Disable Windows error reporting
function disableErrorReporting() {
  exec('sc config WerSvc start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling error reporting service:', err);
  });
  exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\ErrorReporting" /v "DoReport" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling error reporting:', err);
  });
}

// Privacy Tweaks 44 - Disable automatic error reporting for Microsoft apps
function disableAppErrorReporting() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\AppHost" /v "EnableWebContentEvaluation" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling app error reporting:', err);
  });
}
// Network Tweaks 40 - Disable Windows Background Intelligent Transfer Service (BITS)
function disableBITS() {
  exec('sc stop "BITS"', (err, stdout, stderr) => {
    if (err) console.error('Error stopping BITS service:', err);
  });
  exec('sc config "BITS" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling BITS service:', err);
  });
}

// Network Tweaks 41 - Set DNS to Google DNS (8.8.8.8 and 8.8.4.4)
function setGoogleDNS() {
  exec('netsh interface ipv4 set dns name="Ethernet" static 8.8.8.8', (err, stdout, stderr) => {
    if (err) console.error('Error setting Google DNS (IPv4):', err);
  });
  exec('netsh interface ipv6 set dns name="Ethernet" static 2001:4860:4860::8888', (err, stdout, stderr) => {
    if (err) console.error('Error setting Google DNS (IPv6):', err);
  });
}

// Network Tweaks 42 - Enable Jumbo Frame
function enableJumboFrame() {
  exec('netsh interface ipv4 set subinterface "Ethernet" mtu=9000 store=persistent', (err, stdout, stderr) => {
    if (err) console.error('Error enabling Jumbo Frame:', err);
  });
  exec('netsh interface ipv6 set subinterface "Ethernet" mtu=9000 store=persistent', (err, stdout, stderr) => {
    if (err) console.error('Error enabling Jumbo Frame:', err);
  });
}

// Network Tweaks 43 - Disable IPv6 (for better network performance)
function disableIPv6Completely() {
  exec('netsh interface ipv6 set teredo disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling IPv6:', err);
  });
  exec('netsh interface ipv6 set state disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling IPv6 state:', err);
  });
}

// Network Tweaks 44 - Reset TCP/IP stack
function resetTcpIpStack() {
  exec('netsh int ip reset', (err, stdout, stderr) => {
    if (err) console.error('Error resetting TCP/IP stack:', err);
  });
}
// Power Plan Tweaks 40 - Set power plan to maximum performance (disable power saving)
function setMaxPerformancePowerPlan() {
  exec('powercfg -setactive SCHEME_MAX', (err, stdout, stderr) => {
    if (err) console.error('Error setting maximum performance power plan:', err);
  });
}

// Power Plan Tweaks 41 - Disable Hybrid Sleep
function disableHybridSleep() {
  exec('reg add "HKCU\\Control Panel\\PowerCfg" /v "HibernateEnabled" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Hybrid Sleep:', err);
  });
}

// Power Plan Tweaks 42 - Disable system cooling (increase CPU performance)
function disableSystemCooling() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "TaskbarSmallIcons" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling system cooling policy:', err);
  });
}

// Power Plan Tweaks 43 - Set high-performance graphics settings
function setHighPerformanceGraphics() {
  exec('powercfg -setacvalueindex 381b4222-f694-41f0-9685-ff5bb260df2e 5fb4938d-1ee8-4b0f-9a3c-5036b0ab995c dd848b2a-8a5d-4451-9ae2-39cd41658f6c 2', (err, stdout, stderr) => {
    if (err) console.error('Error setting high-performance graphics:', err);
  });
}

// Power Plan Tweaks 44 - Disable sleep mode (keep the system awake)
function disableSleepMode() {
  exec('powercfg -change standby-timeout-ac 0', (err, stdout, stderr) => {
    if (err) console.error('Error disabling sleep mode:', err);
  });
  exec('powercfg -change standby-timeout-dc 0', (err, stdout, stderr) => {
    if (err) console.error('Error disabling sleep mode for battery:', err);
  });
}

// Power Plan Tweaks 45 - Disable PCIe Link State Power Management
function disablePCIePowerManagement() {
  exec('reg add "HKCU\\Control Panel\\PowerCfg" /v "DisableLinkStatePowerManagement" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling PCIe Link State Power Management:', err);
  });
}
// FPS Tweaks 51 - Enable High Performance Power Plan
function enableHighPerformancePowerPlan() {
  exec('powercfg -setactive SCHEME_HIGH', (err, stdout, stderr) => {
    if (err) console.error('Error enabling High Performance Power Plan:', err);
  });
}

// FPS Tweaks 52 - Disable Windows Search Indexing
function disableSearchIndexing() {
  exec('sc stop "WSearch"', (err, stdout, stderr) => {
    if (err) console.error('Error stopping Windows Search service:', err);
  });
  exec('sc config "WSearch" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Windows Search service:', err);
  });
}

// FPS Tweaks 53 - Adjust Processor Scheduling for Best Performance of Programs
function adjustProcessorScheduling() {
  exec('reg add "HKCU\\Control Panel\\Desktop" /v "ProcessorScheduling" /t REG_DWORD /d 2 /f', (err, stdout, stderr) => {
    if (err) console.error('Error adjusting processor scheduling:', err);
  });
}

// FPS Tweaks 54 - Disable Windows Defender Real-Time Protection
function disableDefenderRealTimeProtection() {
  exec('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender" /v "DisableRealtimeMonitoring" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Windows Defender Real-Time Protection:', err);
  });
}

// FPS Tweaks 55 - Set CPU Priority Class to High
function setCpuPriorityHigh() {
  exec('bcdedit /set {current} priority 8', (err, stdout, stderr) => {
    if (err) console.error('Error setting CPU priority to high:', err);
  });
}
// Visual Tweaks 11 - Enable Transparency Effects
function enableTransparencyEffects() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v "EnableTransparency" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error enabling transparency effects:', err);
  });
}

// Visual Tweaks 12 - Show File Extensions for Known File Types
function showFileExtensions() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "HideFileExt" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error showing file extensions:', err);
  });
}

// Visual Tweaks 13 - Disable Aero Snap Feature
function disableAeroSnap() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "DisableAeroSnap" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Aero Snap:', err);
  });
}

// Visual Tweaks 14 - Set Taskbar Transparency
function setTaskbarTransparency() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "TaskbarTransparency" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error setting taskbar transparency:', err);
  });
}

// Visual Tweaks 15 - Change Window Border Width
function changeWindowBorderWidth() {
  exec('reg add "HKCU\\Control Panel\\Desktop" /v "BorderWidth" /t REG_SZ /d "-15" /f', (err, stdout, stderr) => {
    if (err) console.error('Error changing window border width:', err);
  });
}
// Privacy Tweaks 45 - Disable Windows Error Reporting
function disableErrorReporting() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\Windows Error Reporting" /v "DontShowUI" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling error reporting:', err);
  });
}

// Privacy Tweaks 46 - Prevent Microsoft from Sending Error Reports
function preventErrorReports() {
  exec('reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v "DontShowErrorReporting" /t REG_DWORD /d 1 /f', (err, stdout, stderr) => {
    if (err) console.error('Error preventing error reports:', err);
  });
}

// Privacy Tweaks 47 - Disable Windows Defender
function disableWindowsDefender() {
  exec('sc stop "WinDefend"', (err, stdout, stderr) => {
    if (err) console.error('Error stopping Windows Defender service:', err);
  });
  exec('sc config "WinDefend" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Windows Defender service:', err);
  });
}

// Privacy Tweaks 48 - Disable Windows Store Auto-Updates
function disableStoreAutoUpdates() {
  exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Appx" /v "PackageInstallAndUpdateBehavior" /t REG_DWORD /d 2 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Windows Store auto-updates:', err);
  });
}

// Privacy Tweaks 49 - Disable Windows Insider Program Updates
function disableInsiderProgramUpdates() {
  exec('reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v "AllowInsider" /t REG_DWORD /d 0 /f', (err, stdout, stderr) => {
    if (err) console.error('Error disabling Windows Insider Program updates:', err);
  });
}
// Network Tweaks 45 - Disable Windows Background Intelligent Transfer Service (BITS)
function disableBITS() {
  exec('sc stop "BITS"', (err, stdout, stderr) => {
    if (err) console.error('Error stopping BITS service:', err);
  });
  exec('sc config "BITS" start= disabled', (err, stdout, stderr) => {
    if (err) console.error('Error disabling BITS service:', err);
  });
}

// Network Tweaks 46 - Set DNS to Google DNS (8.8.8.8 and 8.8.4.4)
function setGoogleDNS
::contentReference[oaicite:0]{index=0}
 

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

