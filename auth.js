document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // URL del backend
    const loginUrl = 'https://bpm-backend.onrender.com/login';

    // Enviar los datos al backend usando fetch
    fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('authenticated', 'true');
          window.location.href = 'dashboard.html';
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error en la conexión con el servidor');
      });
  });
});
