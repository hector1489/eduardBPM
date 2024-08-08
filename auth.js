document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('login-form').addEventListener('submit', function(event) {
      event.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      const users = [
          { username: 'admin', password: 'admin' },
          { username: 'testuser', password: 'testpass' },
          { username: 'marco', password: 'marco123' }
      ];

      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
          localStorage.setItem('authenticated', 'true');
          window.location.href = 'dashboard.html';
      } else {
          alert('Usuario o contraseña incorrectos');
      }
  });
});