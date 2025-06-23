
function showLogin() {
  document.getElementById('login-modal').style.display = 'flex';
}

function hideLogin() {
  document.getElementById('login-modal').style.display = 'none';
}

function login(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Dummy validation
  if (username === "admin" && password === "admin") {
    alert("Login successful!");
    hideLogin();
  } else {
    alert("Invalid credentials");
  }
}
