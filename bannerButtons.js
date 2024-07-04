
// botón de "Fotos"

document.querySelectorAll('#capture-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const module = this.closest('.module-section');

    html2canvas(module).then(canvas => {
      let link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = module.id + '_screenshot.png';
      link.click();
    });
  });
});

// botón de "Comentario"

// Función para manejar el envío
function enviarComentario(button) {
  let input = button.nextSibling;
  if (input && input.tagName === 'INPUT' && input.id === 'comment-input') {
    let comentario = input.value.trim();
    if (comentario) {
      alert('Comentario Enviado: ' + comentario);
      input.value = '';
      input.parentNode.removeChild(input);
    } else {
      alert('Por favor escribe un comentario.');
    }
  }
}

// Agrega el listener al botón para crear el input
document.querySelectorAll('#comment-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    let input = this.nextSibling;
    
    if (!input || input.id !== 'comment-input') {
      input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Escribe y presiona nuevamente en comentario...';
      input.id = 'comment-input';
      input.classList.add('form-control', 'mb-2');

      this.parentNode.insertBefore(input, this.nextSibling);
      input.focus();
    } else {
      enviarComentario(this);
    }
  });
});


// botón de "Incidencia"

// Función para manejar el envío
function enviarIncident(button) {
  let input = button.nextSibling;
  if (input && input.tagName === 'INPUT' && input.id === 'incident-input') {
    let incidencia = input.value.trim();
    if (incidencia) {
      alert('Reporte de Incidencia Enviado: ' + incidencia);
      input.value = '';
      input.parentNode.removeChild(input);
    } else {
      alert('Por favor envie su reporte...');
    }
  }
}

// Agrega el listener al botón para crear el input
document.querySelectorAll('#incident-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    let input = this.nextSibling;
    
    if (!input || input.id !== 'incident-input') {
      input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Escribe y presiona nuevamente en Incidencia...';
      input.id = 'incident-input';
      input.classList.add('form-control', 'mb-2');

      this.parentNode.insertBefore(input, this.nextSibling);
      input.focus();
    } else {
      enviarIncident(this);
    }
  });
});


