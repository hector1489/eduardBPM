document.getElementById('register-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        document.getElementById('register-error').textContent = 'Las contraseñas no coinciden.';
        document.getElementById('register-error').style.display = 'block';
        return;
    }

    try {
        // Realizar la solicitud POST al backend
        const response = await fetch('https://bpm-backend.onrender.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                role: role,
                password: password
            })
        });

        if (response.ok) {
            // Registro exitoso, redirigir o mostrar un mensaje
            alert('Usuario registrado exitosamente');
            window.location.href = 'dashboard.html';
        } else {
            // Error en el registro
            const errorData = await response.json();
            document.getElementById('register-error').textContent = errorData.message || 'Error en el registro. Por favor, intente de nuevo.';
            document.getElementById('register-error').style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('register-error').textContent = 'Error de conexión. Por favor, intente de nuevo.';
        document.getElementById('register-error').style.display = 'block';
    }
});
