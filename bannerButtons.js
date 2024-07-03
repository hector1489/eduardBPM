
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

// Función para manejar el envío del comentario
function enviarComentario() {
  let input = document.getElementById('comment-input');
  if (input) {
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

// Agregar el listener al botón "Comentario" para crear el input
document.getElementById('comment-btn').addEventListener('click', function () {

  if (!document.getElementById('comment-input')) {
 
    let input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Escribe tu comentario...';
    input.id = 'comment-input';
    input.classList.add('form-control', 'mb-2');

    let commentBtn = document.getElementById('comment-btn');
    commentBtn.parentNode.insertBefore(input, commentBtn.nextSibling);

   
    input.focus();
  } else {
    
    enviarComentario();
  }
});


// botón de "Incidencia"


// Función para manejar el envío del comentario
function enviarIncident() {
  let input = document.getElementById('incident-input');
  if (input) {
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


document.getElementById('incident-btn').addEventListener('click', function () {
  
  
  if (!document.getElementById('incident-input')) {
 
    let input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Reporta tu Incidencia...';
    input.id = 'incident-input';
    input.classList.add('form-control', 'mb-2');

    let incidentBtn = document.getElementById('incident-btn');
    incidentBtn.parentNode.insertBefore(input, incidentBtn.nextSibling);

   
    input.focus();
  } else {
    
    enviarIncident();
  }

});
