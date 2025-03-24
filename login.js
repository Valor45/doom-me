const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Dark/Light Mode Toggle
document.getElementById('toggleTheme').addEventListener('change', () => {
  document.body.classList.toggle('dark-theme');
});

// Toggle between login and registration forms
document.getElementById('showRegister').addEventListener('click', () => {
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
});

document.getElementById('showLogin').addEventListener('click', () => {
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
});

// Login Button Click
document.getElementById('loginBtn').addEventListener('click', () => {
  const user = document.getElementById('loginUser').value;
  const pass = document.getElementById('loginPass').value;
  const key = document.getElementById('loginKey').value; // Fetch the key
  if (!key) {
    document.getElementById('login-error').innerText = 'Please enter your license key.';
    return; // Don't proceed if there's no key
  }

  window.electronAPI.sendLogin(user, pass, key); // Pass key along with user and pass
  saveLogin(user, pass, key); // Save login details
});

// Register Button Click
document.getElementById('regBtn').addEventListener('click', () => {
  const user = document.getElementById('regUser').value;
  const pass = document.getElementById('regPass').value;
  const key = document.getElementById('regKey').value;
  window.electronAPI.sendLogin(user, pass, key); // Pass key for registration
});

// Handle login result from the backend
window.electronAPI.onLoginResult((success, message) => {
  if (!success) {
    // Show error message based on success/failure
    if (registerForm.style.display === 'block') {
      document.getElementById('reg-error').innerText = message;
    } else {
      document.getElementById('login-error').innerText = message;
    }
  } else {
    // If success, load main window
    alert('Login Successful');
    window.location.href = 'index.html'; // Redirect or open the main page
  }
});

// Save login details
function saveLogin(username, password, key) {
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
  localStorage.setItem('key', key);
}

// Load saved login details
function loadSavedLogin() {
  const savedUsername = localStorage.getItem('username');
  const savedPassword = localStorage.getItem('password');
  const savedKey = localStorage.getItem('key');
  if (savedUsername && savedPassword && savedKey) {
    document.getElementById('loginUser').value = savedUsername;
    document.getElementById('loginPass').value = savedPassword;
    document.getElementById('loginKey').value = savedKey;
  }
}

// Terms and Conditions (First run)
function showTermsAndConditions() {
  const agreed = localStorage.getItem('termsAccepted');
  if (!agreed) {
    const termsDialog = document.createElement('div');
    termsDialog.innerHTML = `
      <div class="terms-container">
        <p>This software was made by Antoine. By using it, you agree to any risks that may come with it. We are not responsible for any damage caused to your system.</p>
        <p>If you agree, click "Accept". If not, the application will close.</p>
        <button id="acceptTerms">Accept</button>
        <button id="declineTerms">Decline</button>
      </div>
    `;
    document.body.appendChild(termsDialog);

    document.getElementById('acceptTerms').addEventListener('click', () => {
      localStorage.setItem('termsAccepted', true);
      termsDialog.remove();
    });

    document.getElementById('declineTerms').addEventListener('click', () => {
      window.close();
    });
  }
}

showTermsAndConditions();
