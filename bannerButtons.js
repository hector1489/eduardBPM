// Botón de "Fotos"
document.querySelectorAll('#capture-btn').forEach(btn => {
  btn.addEventListener('click', async function () {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Captura el elemento de la pregunta activa
    const activeQuestion = this.closest('.module-section').querySelector('.pregunta.active');
    const questionId = activeQuestion ? activeQuestion.querySelector('select').id : null;

    if (!questionId) {
      console.error('No se encontró la pregunta activa.');
      return;
    }

    const id = `foto-${questionId}`;

    if (isMobile) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = stream;
        video.autoplay = true;

        await new Promise(resolve => video.addEventListener('playing', resolve));

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64data = reader.result;
          localStorage.setItem(id, base64data);
          console.log(`Foto guardada en localStorage con ID: ${id}`);
        };

        reader.readAsDataURL(blob);
        stream.getTracks().forEach(track => track.stop());

      } catch (error) {
        console.error('Error accediendo a la cámara: ', error);
      }
    } else {
      // Captura de pantalla en dispositivos no móviles
      try {
        const canvas = await html2canvas(activeQuestion);

        canvas.toBlob(blob => {
          if (blob) {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64data = reader.result;
              localStorage.setItem(id, base64data);
              console.log(`Captura de pantalla guardada en localStorage con ID: ${id}`);
            };
            reader.readAsDataURL(blob);
          }
        }, 'image/png');

      } catch (error) {
        console.error('Error al capturar la pantalla:', error);
      }
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
