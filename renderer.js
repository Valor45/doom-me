// 1) Sidebar navigation
document.querySelectorAll('.sidebar ul li[data-section]').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.sidebar ul li').forEach(li => li.classList.remove('active'));
    item.classList.add('active');
    const section = item.getAttribute('data-section');
    document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
    document.getElementById('section-' + section).style.display = 'block';
  });
});

// 2) Toggling all tweaks at once
document.getElementById('toggleAll').addEventListener('click', () => {
  document.querySelectorAll('input[type=checkbox]').forEach(chk => {
    chk.checked = true;
    window.electronAPI.applyToggle(chk.id.replace('toggle_', ''), true);
  });
});

// 3) Hiding the tweak code when applied
document.querySelectorAll('input[type=checkbox][id^="toggle_"]').forEach(chk => {
  chk.addEventListener('change', () => {
    let baseId = chk.id.replace('toggle_', '');
    if (baseId.endsWith('_rec')) {
      let mainId = baseId.slice(0, -4);
      const mainChk = document.getElementById('toggle_' + mainId);
      if (mainChk) mainChk.checked = chk.checked;
      window.electronAPI.applyToggle(mainId, chk.checked);
    } else {
      window.electronAPI.applyToggle(baseId, chk.checked);
      const recChk = document.getElementById(chk.id + '_rec');
      if (recChk) recChk.checked = chk.checked;
    }
  });
});

// 4) System info updates
window.electronAPI.onSystemInfo(info => {
  const { cpu, gpu, ram } = info;
  document.getElementById('cpuName').innerText = cpu;
  document.getElementById('gpuName').innerText = gpu;
  document.getElementById('ram-info').innerText = ram;
});

// 5) CPU/Memory usage
window.electronAPI.onUsageUpdate((cpuPercent, ramPercent) => {
  document.getElementById('cpuUsage').innerText = cpuPercent + '%';
  document.getElementById('memUsage').innerText = ramPercent + '%';
});

// 6) Backup/Benchmark
document.getElementById('backupBtn')?.addEventListener('click', () => {
  window.electronAPI.sendRestorePoint().then(success => {
    alert(success ? "System restore point created." : "Failed to create restore point.");
  });
});
document.getElementById('benchmarkBtn')?.addEventListener('click', () => {
  window.electronAPI.runBenchmark().then(res => {
    alert(`Benchmark result:\nFPS: ${res.fps}\nCPU: ${res.cpu}%\nGPU: ${res.gpu}%`);
  });
});

// 7) Software Install
function installSoft(name) {
  if (confirm("Install " + name + "?")) {
    window.electronAPI.installSoftware(name).then(() => {
      alert(name + " installer is launching...");
    });
  }
}

// 8) Admin logic
window.electronAPI.onUserData(data => {
  if (data.isAdmin) {
    document.getElementById('adminNavItem').style.display = 'block';
  }
});
document.getElementById('pushBtn')?.addEventListener('click', () => {
  const fileInput = document.getElementById('configFile');
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      window.electronAPI.pushConfig(reader.result).then(success => {
        alert(success ? "Tweak file uploaded." : "Failed to upload file.");
      });
    };
    reader.readAsText(file);
  }
});
document.getElementById('logsBtn')?.addEventListener('click', () => {
  window.electronAPI.getLogs().then(txt => {
    document.getElementById('adminOutput').value = txt;
  });
});
document.getElementById('keysBtn')?.addEventListener('click', () => {
  window.electronAPI.getKeyStatus().then(kArr => {
    let out = "Key - Type - Status\n";
    kArr.forEach(k => {
      out += `${k.key} - ${k.type} - `;
      if (k.boundTo) out += `Bound to ${k.boundTo}`;
      else out += 'Available';
      if (k.expires) out += ` (expires: ${k.expires})`;
      out += "\n";
    });
    document.getElementById('adminOutput').value = out;
  });
});
