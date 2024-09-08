document.addEventListener('DOMContentLoaded', () => {
  // Inicializar o agregar otros listeners necesarios
});

function base64ToBlob(base64, contentType) {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

async function enviarImagen(imagenBase64) {
  if (!imagenBase64 || !imagenBase64.startsWith('data:image')) {
    console.warn('Formato de imagen inválido o no presente');
    return null;
  }

  try {
    console.log('Preparando imagen para envío...');

    const contentType = imagenBase64.split(',')[0].split(':')[1].split(';')[0];
    const blob = base64ToBlob(imagenBase64, contentType);
    const formData = new FormData();
    formData.append('image', blob);

    const response = await fetch('https://bpm-backend.onrender.com/upload-photo', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error al enviar la imagen: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Imagen enviada exitosamente:', result);
    return result.url;
  } catch (error) {
    console.error('Error al enviar la imagen:', error);
    return null;
  }
}

async function cargarImagenes(datos) {
  const datosConImagenes = [];

  for (const dato of datos) {
    if (dato.evidenciaFotografica && dato.evidenciaFotografica.startsWith('data:image')) {
      const urlImagen = await enviarImagen(dato.evidenciaFotografica);
      dato.evidenciaFotografica = urlImagen || '';
    }
    datosConImagenes.push(dato);
  }

  return datosConImagenes;
}

async function enviarDatosTabla() {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const filas = tabla.getElementsByTagName('tr');
  const authToken = localStorage.getItem('authToken');

  // Obtener los datos de la tabla
  const datos = Array.from(filas).map(fila => {
    const celdas = fila.getElementsByTagName('td');
    return {
      authToken: authToken || '',
      numeroRequerimiento: celdas[0]?.innerText || '',
      preguntasAuditadas: celdas[1]?.querySelector('select')?.value || celdas[1]?.innerText || '',
      desviacionOCriterio: celdas[2]?.querySelector('input')?.value || celdas[2]?.innerText || '',
      tipoDeAccion: celdas[3]?.querySelector('input')?.value || '',
      responsableProblema: celdas[4]?.querySelector('select')?.value || '',
      local: celdas[5]?.querySelector('input')?.value || '',
      criticidad: celdas[6]?.querySelector('select')?.value || celdas[6]?.innerText || '',
      accionesCorrectivas: celdas[7]?.querySelector('select')?.value || celdas[7]?.innerText || '',
      fechaRecepcionSolicitud: celdas[8]?.innerText || '',
      fechaSolucionProgramada: celdas[9]?.innerText || '',
      estado: celdas[10]?.querySelector('select')?.value || '',
      fechaCambioEstado: celdas[11]?.querySelector('input')?.value || celdas[11]?.innerText || '',
      contactoClientes: celdas[12]?.querySelector('input')?.value || celdas[12]?.innerText || '',
      evidenciaFotografica: celdas[13]?.querySelector('img')?.src || '',
      detalleFoto: celdas[14]?.querySelector('input')?.value || '',
      auditor: celdas[15]?.querySelector('select')?.value || celdas[15]?.innerText || '',
      correo: celdas[16]?.querySelector('input')?.value || '',
      fechaUltimaModificacion: celdas[17]?.innerText || ''
    };
  });

  try {
    const datosConImagenes = await cargarImagenes(datos);

    // Verificar que los campos obligatorios estén completos
    const camposObligatoriosCompletos = datosConImagenes.every(dato =>
      dato.numeroRequerimiento &&
      dato.preguntasAuditadas &&
      dato.estado
    );

    if (!camposObligatoriosCompletos) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    // Enviar los datos al backend
    const response = await fetch('https://bpm-backend.onrender.com/send-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(datosConImagenes),
    });

    if (!response.ok) {
      throw new Error(`Error al enviar los datos: ${response.statusText}`);
    }

    const result = await response.json();
    alert('Lista de Desviaciones actualizada exitosamente.');
  } catch (error) {
    console.error('Error en el envío de datos:', error);
    alert('Ocurrió un error al enviar los datos.');
  }
}
