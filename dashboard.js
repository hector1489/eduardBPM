document.getElementById('logout-button').addEventListener('click', function(event) {
    // Borrar la sesión
    localStorage.removeItem('loggedInUser');
    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = 'index.html';
});

document.getElementById('startAuditBtn').addEventListener('click', function() {
    // Redirigir a la página de auditoría
    window.location.href = 'auditoria.html';
});