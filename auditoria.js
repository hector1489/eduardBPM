document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está autenticado
    if (localStorage.getItem('authenticated') !== 'true') {
        window.location.href = 'index.html';
    }

    // Manejar el envío del formulario de auditoría
    document.getElementById('audit-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const module1 = document.getElementById('module1').value;
        const module2 = document.getElementById('module2').value;

        // Procesar los datos de la auditoría (puede ser una llamada a una API, almacenamiento local, etc.)
        console.log('Auditoría enviada:', { module1, module2 });

        // Mostrar un mensaje de éxito
        alert('Auditoría completada');

        // Redirigir de vuelta al panel de control
        window.location.href = 'dashboard.html';
    });
});