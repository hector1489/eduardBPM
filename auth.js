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
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then(data => {
        console.log('Respuesta del backend:', data);
        if (data.token) {
          // Almacena el token en localStorage o en donde lo necesites
          localStorage.setItem('authToken', data.token);
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
