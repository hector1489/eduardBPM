// botón de "Fotos"
document.querySelectorAll('#capture-btn').forEach(btn => {
  btn.addEventListener('click', async function () {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (isMobile) {
      // Si es un dispositivo móvil, tomar una foto con la cámara
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      try {
        // Solicitar acceso a la cámara del dispositivo
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const track = stream.getVideoTracks()[0];

        // Crear un elemento video para capturar una imagen
        const video = document.createElement('video');
        video.srcObject = stream;

        // Esperar a que el video se cargue
        await new Promise(resolve => video.addEventListener('loadedmetadata', resolve));

        // Configurar el canvas con las dimensiones del video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Esperar un breve momento para estabilizar la imagen
        setTimeout(() => {
          // Dibujar el frame actual del video en el canvas
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Detener el stream de video
          track.stop();
          stream.getTracks().forEach(track => track.stop());

          // Crear un enlace para descargar la imagen
          let link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = 'auditoria.png';
          link.click();

        }, 500); // Esperar ms

      } catch (error) {
        console.error('Error accediendo a la cámara: ', error);
      }
    } else {
      // Si es una pantalla grande, hacer un screenshot de la pantalla actual
      const module = this.closest('.module-section');

      html2canvas(module).then(canvas => {
        let link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = module.id + '_screenshot.png';
        link.click();
      });
    }
  });
});

// botón de "Comentario"
let comentarios = [];

// cargar los comentarios desde localStorage
function cargarComentarios() {
  const datosGuardados = localStorage.getItem('comentarios');
  if (datosGuardados) {
    comentarios = JSON.parse(datosGuardados);
  }
}

cargarComentarios();

// guarda los comentarios en localStorage
function guardarComentarios() {
  localStorage.setItem('comentarios', JSON.stringify(comentarios));
}

// envío de comentarios
function enviarComentario(button) {
  let input = button.nextSibling;
  let preguntaContainer = button.closest('.form-group.pregunta.active');
  let select = preguntaContainer ? preguntaContainer.querySelector('select') : null;

  if (input && input.tagName === 'INPUT' && input.id === 'comment-input') {
    let comentario = input.value.trim();
    if (comentario) {
      let nuevoComentario = {
        id: Date.now(),
        texto: comentario,
        questionId: select ? select.id : null
      };
      comentarios.push(nuevoComentario);

      guardarComentarios();

      console.log('Comentarios:', JSON.stringify(comentarios, null, 2));

      alert('Comentario Enviado: ' + comentario);
      input.value = '';
      input.parentNode.removeChild(input);
    } else {
      alert('Por favor escribe un comentario.');
    }
  }
}
// crea el input para los comentarios
document.querySelectorAll('#comment-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    let input = this.nextSibling;

    if (!input || input.id !== 'comment-input') {
      input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Escribe tu comentario...';
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
let incidentes = [];

// envia el incidente
function enviarIncident(btn) {
  let input = btn.nextSibling;

  if (input && input.id === 'incident-input' && input.value.trim() !== '') {
    let incidente = {
      id: Date.now(),
      text: input.value.trim()
    };
    incidentes.push(incidente);
    alert('Reporte de Incidencia Enviado: ' + incidente);
    console.log('Incidentes:', JSON.stringify(incidentes, null, 2));
    input.value = '';
  }
}

//crea el input
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

//saca una foto al resumen y la descarga "edo"

function capturarYDescargar() {
  html2canvas(document.body).then(canvas => {
    let link = document.createElement('a');
    link.download = 'captura-auditoria.png';
    link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    link.click();
  });
}
