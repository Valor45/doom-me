// Sidebar navigation
document.querySelectorAll('.sidebar ul li[data-section]').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.sidebar ul li').forEach(li => li.classList.remove('active'));
    item.classList.add('active');
    const section = item.getAttribute('data-section');
    document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
    document.getElementById('section-' + section).style.display = 'block';
  });
});

// Apply All Recommended Tweaks button
document.getElementById('applyAllBtn')?.addEventListener('click', () => {
  if (confirm("Apply all recommended tweaks? This will enable multiple system optimizations.")) {
    window.electronAPI.applyAllTweaks().then(() => {
      alert("All recommended tweaks have been applied!");
    });
  }
});

// Toggle event handlers for all tweaks
document.querySelectorAll('input[type=checkbox][id^="toggle_"]').forEach(chk => {
  chk.addEventListener('change', () => {
    const tweakName = chk.id.replace('toggle_', '');
    window.electronAPI.applyToggle(tweakName, chk.checked);
  });
});

// System info updates
window.electronAPI.onSystemInfo(info => {
  const { cpu, gpu, ram } = info;
  document.getElementById('cpu-info').innerText = cpu;
  document.getElementById('gpu-info').innerText = gpu;
  document.getElementById('ram-info').innerText = (ram / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
});

// CPU/Memory usage updates
window.electronAPI.onUsageUpdate((cpuPercent, ramPercent) => {
  document.getElementById('cpu-usage').innerText = cpuPercent + '%';
  document.getElementById('ram-usage').innerText = ramPercent + '%';
});

// Backup/Benchmark buttons
document.getElementById('backupBtn')?.addEventListener('click', () => {
  window.electronAPI.sendRestorePoint().then(success => {
    alert(success ? "System restore point created successfully!" : "Failed to create restore point.");
  });
});

document.getElementById('benchmarkBtn')?.addEventListener('click', () => {
  window.electronAPI.runBenchmark().then(res => {
    alert(`Benchmark results:\nFPS: ${res.fps}\nCPU Usage: ${res.cpu}%\nGPU Usage: ${res.gpu}%`);
  });
});

// Software Installation
function installSoft(name) {
  if (confirm(`Install ${name}? This will download and launch the installer.`)) {
    window.electronAPI.installSoftware(name).then(() => {
      alert(`${name} installer is launching...`);
    }).catch(err => {
      alert(`Failed to install ${name}: ${err}`);
    });
  }
}

// Admin section logic
window.electronAPI.onUserData(data => {
  if (data.isAdmin) {
    document.getElementById('adminNav').style.display = 'block';
  }
});

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
  // Load initial system info
  window.electronAPI.getSystemInfo();
  
  // Start usage monitoring
  setInterval(() => {
    window.electronAPI.getUsage();
  }, 2000);
  
  // Set default section to dashboard
  document.querySelector('.sidebar ul li[data-section="dashboard"]').click();
});

// Additional IPC handlers for specific tweak feedback
window.electronAPI.onTweakApplied((tweakName, success) => {
  const toggle = document.getElementById(`toggle_${tweakName}`);
  if (toggle) {
    if (success) {
      toggle.parentNode.classList.add('applied');
      setTimeout(() => toggle.parentNode.classList.remove('applied'), 1000);
    } else {
      toggle.checked = !toggle.checked;
      alert(`Failed to apply ${tweakName} tweak`);
    }
  }
});

// Handle apply all tweaks feedback
window.electronAPI.onAllTweaksApplied((successCount, totalCount) => {
  alert(`Applied ${successCount} out of ${totalCount} tweaks successfully!`);
});

// Admin section functions
document.getElementById('pushBtn')?.addEventListener('click', () => {
  const fileInput = document.getElementById('configFile');
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      window.electronAPI.pushConfig(reader.result).then(success => {
        alert(success ? "Configuration file uploaded successfully!" : "Failed to upload configuration file.");
      });
    };
    reader.readAsText(file);
  } else {
    alert("Please select a configuration file first.");
  }
});

document.getElementById('logsBtn')?.addEventListener('click', () => {
  window.electronAPI.getLogs().then(logs => {
    const logsOutput = document.getElementById('adminOutput');
    if (logsOutput) {
      logsOutput.value = logs;
    } else {
      alert("Logs output element not found!");
    }
  });
});

document.getElementById('keysBtn')?.addEventListener('click', () => {
  window.electronAPI.getKeyStatus().then(keys => {
    const keysOutput = document.getElementById('adminOutput');
    if (keysOutput) {
      keysOutput.value = keys.map(k => 
        `${k.key} - ${k.type} - ${k.boundTo ? `Bound to ${k.boundTo}` : 'Available'}${k.expires ? ` (expires: ${k.expires})` : ''}`
      ).join('\n');
    } else {
      alert("Keys output element not found!");
    }
  });
});
