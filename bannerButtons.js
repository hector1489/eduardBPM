// Botón de "Fotos"
document.querySelectorAll('#capture-btn').forEach(btn => {
  btn.addEventListener('click', async function () {
    const activeQuestion = this.closest('.module-section').querySelector('.pregunta.active');
    const questionId = activeQuestion ? activeQuestion.querySelector('select').id : null;

    if (!questionId) {
      console.error('No se encontró la pregunta activa.');
      return;
    }

    const id = `foto-${questionId}`;

    // Función para solicitar acceso a la cámara con un facingMode específico
    async function getCameraStream(facingMode) {
      try {
        console.log(`Intentando acceder a la cámara: ${facingMode}`);
        return await navigator.mediaDevices.getUserMedia({
          video: { facingMode }
        });
      } catch (error) {
        console.warn(`Error accediendo a la cámara (${facingMode}):`, error);
        return null;
      }
    }

    let stream = null;
    try {
      stream = await getCameraStream('environment');
      
      if (!stream) {
        console.log('No se pudo acceder a la cámara trasera, intentando con la cámara frontal.');
        stream = await getCameraStream('user');
      }

      if (!stream) {
        console.error('No se pudo acceder a ninguna cámara.');
        return;
      }

      const video = document.createElement('video');
      video.srcObject = stream;
      video.autoplay = true;

      document.body.appendChild(video);

      await new Promise(resolve => video.addEventListener('playing', resolve));

      // Añadir un retraso adicional para asegurar que el video está completamente renderizado
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      console.log('Imagen capturada, procesando...');

      const reader = new FileReader();

      reader.onloadend = () => {
        const base64data = reader.result;
        localStorage.setItem(id, base64data);
        console.log(`Foto guardada en localStorage con ID: ${id}`);
      };

      reader.onerror = () => {
        console.error('Error al leer la imagen.');
      };

      reader.readAsDataURL(blob);
     
      stream.getTracks().forEach(track => track.stop());

      document.body.removeChild(video);

    } catch (error) {
      console.error('Error durante la captura de imagen: ', error);
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const tableDetails = document.getElementById('tabla-details');

  if (tableDetails) {
    const fotoDetailsElements = tableDetails.querySelectorAll('td span[id^="foto-"]');

    fotoDetailsElements.forEach((element) => {
      const preguntaId = element.id.replace('foto-', '');

      const imageKey = `foto-${preguntaId}`;

      const imageData = localStorage.getItem(imageKey);
      if (imageData) {
        element.innerHTML = `<img src="${imageData}" alt="Imagen" style="max-width: 100px; max-height: 100px; margin: 5px;" />`;
      } else {
        element.innerHTML = 'Sin imagen';
      }
    });
  } else {
    console.error('No se encontró el elemento con ID "tabla-details".');
  }
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


document.querySelectorAll('#save-screenshot-btn').forEach(btn => {
  btn.addEventListener('click', async function () {
    try {
      // Obtener la sección activa del módulo
      const activeModule = document.querySelector('.module-section.active');
      
      if (!activeModule) {
        console.error('No se encontró la sección activa del módulo.');
        return;
      }

      // Seleccionar el contenedor a capturar
      const sectionToCapture = activeModule;
      if (!sectionToCapture) {
        console.error('No se encontró el contenedor a capturar.');
        return;
      }

      // Configuración para html2pdf
      const options = {
        margin: [10, 10, 10, 10],
        filename: `document-${Date.now()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      // Convertir la sección a PDF
      html2pdf().from(sectionToCapture).set(options).save();

    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  });
});






